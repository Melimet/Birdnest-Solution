resource "aws_security_group" "birdnest_ecs_security_group" {
  vpc_id      = aws_vpc.birdnest-vpc.id
  ingress = {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]  
    ipv6_cidr_blocks = ["::/0"]
  }


  tags = {
    "name" = "birdnest-ecs-security-group"
  }
}
  
