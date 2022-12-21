resource "aws_vpc" "birdnest-vpc" {
  cidr_block           = "10.10.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "birdnest-vpc"
  }
}

resource aws_vpc_endpoint "ecr-api" {
  vpc_id = aws_vpc.birdnest-vpc.id
  service_name = "api.ecr.eu-north-1.amazonaws.com" 
}

#resource aws_vpc_endpoint "ecr-dkr" {
#  vpc_id = aws_vpc.birdnest-vpc.id
#  service_name = "${aws_ecr_repository.birdnest-ecr.registry_id}.dkr.ecr.eu-north-1.amazonaws.com"
#}


resource "aws_internet_gateway" "birdnest-igw" {
  vpc_id = aws_vpc.birdnest-vpc.id
  tags = {
    Name = "birdnest-igw"
  }

}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.birdnest-vpc.id
  count             = length(var.private_subnets)
  cidr_block        = element(var.private_subnets, count.index)
  availability_zone = "eu-north-1a"

  tags = {
    Name        = "birdnest-private-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.birdnest-vpc.id
  cidr_block              = element(var.public_subnets, count.index)
  availability_zone       = "eu-north-1a"
  count                   = length(var.public_subnets)
  map_public_ip_on_launch = true

  tags = {
    Name        = "birdnest-public-subnet-${count.index + 1}"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.birdnest-vpc.id

  tags = {
    Name        = "birdnest-routing-table-public"
  }
}

resource "aws_route" "public" {
  subnet_ids             = [aws_subnet.private.*.id]
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.birdnest-igw.id
}

resource "aws_route_table_association" "public" {
  count          = length(var.public_subnets)
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public.id
}