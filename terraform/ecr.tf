// create ECR repository for birdnest
resource "aws_ecr_repository" "birdnest" {
  name = "birdnest"
  image_tag_mutability = "MUTABLE"
}