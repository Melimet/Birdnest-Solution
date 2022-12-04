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
  db_name                 = "birdnest-db"  
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.3"
  instance_class       = "db.t3.micro"
}