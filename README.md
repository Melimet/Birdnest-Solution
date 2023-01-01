# Birdnest-Solution ![CI/CD](https://github.com/Melimet/Birdnest-Solution/actions/workflows/main.yml/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/7943437e5a25b59d174a/maintainability)](https://codeclimate.com/github/Melimet/Birdnest-Solution/maintainability)

## Project is hosted [here](http://birdnest-alb-772143449.eu-north-1.elb.amazonaws.com/)
## Description

This is my solution to [Reaktor](https://www.reaktor.com/) winter 2022 [code challenge](https://assignments.reaktor.com/birdnest/). 
TLDR: Fetch location data from an external api -> Parse the response data -> fetch data from a second external api based on the parsed response -> display second api data on a website

### Logic of my solution in short
1. Poll drones api once every second
2. Parse received data and poll pilots api if any NDZ infractions occur
3. Update database based on pilot data
4. Emit latest pilot data to all clients through [Socket.io](https://socket.io/)

### Tech stack
Frontend: React.js + TypeScript
Backend: Node.js + Typescript
DB: PostgreSql

The production application and the database are hosted on AWS ECS and RDS instances. These cloud instances were created using terraform. More information about the deployment can be found further down in this readme.

Monadikuikka images in frontend header were generated by [Dall-e](https://labs.openai.com/).


## Installation
Below are two different ways to run the project: through docker or shell scripts.
In order for the app to work, both ways require a postgreSQL db to be setup and configured to a environment file. 
Easiest way to setup postgres is to have docker installed and run `./scripts/dev_db.sh` which starts a docker image running a postgresql database locally.
The database can be stopped with `docker stop pgsql-dev`
__Alternatives to using docker(not recommended)__
[Here](https://www.codecademy.com/article/installing-and-using-postgresql-localyl) is a guide to setup postgres locally. Alternatively postgres can be setup quite easily on a service such as [fly.io](https://fly.io/docs/postgres/getting-started/create-pg-cluster/).


### Step 0 for both ways
0. After cloning the repository with `git clone https://github.com/Melimet/Birdnest-Solution.git`, configure environment variables in `./backend/.env`. The environment file must be configured so that the app can connect to a postgresql database - Otherwise the app will not run. `./backend/` contains a `.env.pub` file which contains a model .env file with examples. `.env.pub` must be renamed to `.env`

__If you are using pgsql docker image__, `./backend/.env.pub` is already configured correctly, just rename it to `.env`

### Shell scripts (Tested on Ubuntu)

1. Excecute these commands in project root folder. These commands install required dependencies and start the app.
```
sh scripts/install_dependencies.sh
sh scripts/build_and_copy_frontend.sh
sh scripts/start.sh
```
2. The project can now be accessed in http://localhost:3001/.

### Docker (Works on every machine with Docker installed)
1. If you don't have docker installed, follow the [installation guide](https://docs.docker.com/get-docker/)
2. Execute in console
```
docker build -t birdnest-solution-image .
docker run -p 3001:3001 -d --env-file ./backend/.env --name birdnest-solution-container birdnest-solution-image
```
3. The project can now be accessed in http://localhost:3001/. The docker image will be running in the backround, it can be shut down with
```
docker stop birdnest-solution-container 
docker rm birdnest-solution-container
```

## CI/CD 

CI is implemented through a simplistic Github actions which runs linters and existing tests. 
On a succesful CI run, the CD pipeline builds a new container image based on the latest commit and pushes it to [AWS ECR](https://aws.amazon.com/ecr/).

## Cloud architecture

__Disclaimer__: This is my second time doing anything with AWS and the absolute first time using [Terraform](https://www.terraform.io/), but this project seemed like a good excuse to try them out. I ended up working quite alot on the cloud deployment and this was by far the most challenging part of the project, but the end result was satisfying.

The application is hosted inside an [ECS](https://aws.amazon.com/ecs/) [Fargate](https://aws.amazon.com/fargate/) instance and the production database is hosted in [AWS RDS](https://aws.amazon.com/rds/). The deployment in it's entirety is done through Terraform. The deployment files can be viewed in `./terraform`. 

Terraform's state is configured to be stored in Terraform cloud. Terraform validates and updates(if necessary) it's own state on each push to Github.

## Testing

Testing is implemented in the form of unit and integration tests in the backend. E2E tests were considered but seemed to be overkill since frontend has next to no functionalities and only passively displays information.

## Improvements
- For improved scalability, backend could be split in to two separate entities: A poller api that polls the provided apis and writes the pilot info into database and a simple express backend that responds to frontend's api requests.
- Testing could be expanded by quite alot.
- ~~Now that the application polls once every second, timestamps update even though they shouldn't.~~ Fixed
- CD pipeline only pushes latest image to ECR, production is not updated right away