resource "aws_security_group" "birdnest_ecs_security_group" {
  vpc_id      = aws_vpc.birdnest-vpc.id
  name        = "birdnest-ecs-security-group"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    security_groups = [aws_security_group.birdnest_load_balancer_security_group.id]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
  
resource "aws_security_group" "birdnest_load_balancer_security_group" {
  vpc_id      = aws_vpc.birdnest-vpc.id
  name        = "birdnest-load-balancer-security-group"

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}