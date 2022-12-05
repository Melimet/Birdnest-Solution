resource "aws_db_instance" "birdnest_rds" {
  identifier           = "birdnest-rds"
  db_name              = "birdnestDb"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.3"
  instance_class       = "db.t3.micro"
  username             = "melimet"
  password             = random_password.db_master_pass.result
  publicly_accessible    = true
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