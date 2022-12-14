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

resource "aws_ecs_task_definition" "birdnest-ecs-task" {
  family = "birdnest-ecs-task"
  container_definitions=<<CONTAINER_DEFINITION
  [
    {
      "name": "birdnest-ecs-container",
      "image": "${aws_ecr_repository.birdnest-ecr.repository_url}:birdnest-image",

      "environment": [
        
         {"name": "PORT", "value": "3001"},
         {"name": "DB_PORT", "value": "5432"},
         {"name": "DB_PASSWORD", "value": "${data.aws_secretsmanager_secret_version.current.secret_string}"},
         {"name": "DB_HOST", "value": "${aws_db_instance.birdnest_rds.address}"},
         {"name": "DB_USERNAME", "value": "melimet"},
         {"name": "DB_NAME", "value": "birdnestDb"}
  
      ],

      "essential": true,
      "portMappings": [
        {
          "containerPort": 3001,
          "hostPort": 3001
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.birdnest_ecs_logs.id}",
          "awslogs-region": "eu-north-1",
          "awslogs-stream-prefix": "birdnest-ecs-container" 
        }
      }
    }
  ]
CONTAINER_DEFINITION
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
    security_groups = [
      aws_security_group.birdnest_ecs_security_group.id,
      aws_security_group.birdnest_load_balancer_security_group.id
    ]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name = "birdnest-ecs-container"
    container_port = 3001
  }

  depends_on = [aws_lb_listener.birdnest_listener]

  tags = {
    "name" = "birdnest-ecs-service"
  }
}