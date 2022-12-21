resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "birdnest-execution-task-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json

  inline_policy {
    name = "secrets-manager-access-policy"
    policy = jsonencode({
      Statement = [
        {
          Action = [
            "secretsmanager:GetSecretValue",
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            "logs:CreateLogStream",
            "logs:PutLogEvents"]
          Effect= "Allow"
          Resource = "*"
        },
      ]
    })
  }
}

resource "aws_iam_service_linked_role" "ecsServiceLinkedRole" {
  aws_service_name = "ecs.amazonaws.com" 
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}