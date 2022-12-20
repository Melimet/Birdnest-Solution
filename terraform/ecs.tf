resource "aws_ecs_cluster" "birdnest-ecs-cluster" {
  name = "birdnest-ecs-cluster"
  tags = {
    "name" = "birdnest-ecs-cluster"
  }
}

data "aws_secretsmanager_secret" "secrets" {
  arn = "arn:aws:secretsmanager:eu-north-1:254904283749:secret:db-pass-Birdnest-Solution-O7DDvq"
}

data "aws_secretsmanager_secret_version" "current" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "template_file" "env_vars" {
  template = {
    "PORT"=3001,
    "DB_HOST"="birdnest-rds.cytbr08afwwn.eu-north-1.rds.amazonaws.com",
    "DB_PASSWORD"=jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)
    "DB_PORT"=5432,
    "DB_USERNAME"="melimet",
    "DB_NAME"="birdnestDb"
  }
}


resource "aws_ecs_task_definition" "birdnest-ecs-task" {
  family = "birdnest-ecs-task"
  container_definitions= <<DEFINITION
  [
    {
      "name": "birdnest-ecs-container",
      "image": "${aws_ecr_repository.birdnest-ecr.repository_url}",
      "cpu": "256", 
      "memory": "512"
      environment: ${data.template_file.env_vars.rendered}
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3001,
          "hostPort": 3001
        }
      ]
    }
  ]
  DEFINITION
  cpu= "256"
  memory= "512"
  requires_compatibilities = [
    "FARGATE"
  ]
}