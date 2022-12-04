terraform {
  cloud {
    organization = "melimet-org"
    workspaces {
      name = "Birdnest-Solution"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-north-1"
}

resource "aws_db_instance" "birdnest_rds" {
  identifier           = "birdnest-rds"
  db_name              = "birdnest-db"  
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.3"
  instance_class       = "db.t3.micro"
  username             = "melimet"
  password             = random_password.db_master_pass.result
}

resource "random_password" "db_master_pass" {
  length            = 40
  special           = true
  min_special       = 5
  override_special  = "!#$%^&*()-_=+[]{}<>:?"
  keepers           = {
    pass_version  = 1
  }
}

resource "aws_secretsmanager_secret" "db-pass" {
  name = "db-pass-${terraform.workspace}"
}

resource "aws_secretsmanager_secret_version" "db-pass-val" {
  secret_id     = aws_secretsmanager_secret.db-pass.id
  secret_string = random_password.db_master_pass.result
}