resource "aws_ecs_cluster" "birdnest-ecs-cluster" {
  name = "birdnest-ecs-cluster"
  tags = {
    "name" = "birdnest-ecs-cluster"
  }
}

