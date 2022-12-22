resource "aws_cloudwatch_log_group" "birdnest_ecs_logs" {
  name = "birdnest_ecs_logs"
  retention_in_days = 1
}

