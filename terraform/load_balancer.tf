resource "aws_alb" "birdnest_load_balancer" {
  name               = "birdnest_alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = aws_subnet.public.*.id
  security_groups    = [aws_security_group.load_balancer_security_group.id]
}

resource "aws_lb_target_group" "target_group" {
  name     = "birdnest_target_group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.birdnest-vpc.id
  target_type = "ip"
}

resource "aws_lb_listener" "birdnest_listener" {
  load_balancer_arn = aws_alb.birdnest_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}