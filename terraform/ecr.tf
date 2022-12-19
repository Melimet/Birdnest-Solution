resource "aws_ecr_repository" "birdnest-ecr" {
  name = "birdnest-ecr"
  image_tag_mutability = "MUTABLE"
}