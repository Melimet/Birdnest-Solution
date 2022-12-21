resource "aws_ecs_cluster" "birdnest-ecs-cluster" {
  name = "birdnest-ecs-cluster"
  tags = {
    "name" = "birdnest-ecs-cluster"
  }
}

data "aws_secretsmanager_secret" "secrets" {
  name = "db-pass-Birdnest-Solution"
}

data "aws_secretsmanager_secret_version" "current" {
  secret_id = data.aws_secretsmanager_secret.secrets.id
}

data "template_file" "env_vars" {
  vars = {PORT= 3001,
    DB_PORT= 5432,
    DB_NAME= "birdnestDb",
    DB_PASSWORD= data.aws_secretsmanager_secret_version.current.secret_string,
    DB_HOST= "birdnest-rds.cytbr08afwwn.eu-north-1.rds.amazonaws.com"}
}


resource "aws_ecs_task_definition" "birdnest-ecs-task" {
  family = "birdnest-ecs-task"
  container_definitions=<<TASK_DEFINITION
  [
    {
      "name": "birdnest-ecs-container",
      "image": "${aws_ecr_repository.birdnest-ecr.repository_url}:birdnest-image",
      "environment": [${data.template_file.env_vars.rendered}],
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3001,
          "hostPort": 3001
        }
      ]
    }
  ]
TASK_DEFINITION
  cpu= "256"
  memory= "512"
  requires_compatibilities = ["FARGATE"]
  network_mode = "awsvpc"
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  task_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_ecs_service" "birdnest-ecs-service" {
  name = "birdnest-ecs-service"
  cluster = aws_ecs_cluster.birdnest-ecs-cluster.id
  task_definition = "${aws_ecs_task_definition.birdnest-ecs-task.family}:${aws_ecs_task_definition.birdnest-ecs-task.revision}"
  desired_count = 1
  launch_type = "FARGATE"

  network_configuration {
    subnets = aws_subnet.private.*.id
    assign_public_ip = true
  }
  tags = {
    "name" = "birdnest-ecs-service"
  }
}