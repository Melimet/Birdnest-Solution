variable "cidr" {
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of public subnets"
  default = ["10.10.100.0/24"]
}

variable "private_subnets" {
  description = "List of private subnets"
  default = ["10.10.0.0/24"]
}
