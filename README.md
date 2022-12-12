# Birdnest-Solution ![CI/CD](https://github.com/Melimet/Birdnest-Solution/actions/workflows/main.yml/badge.svg)

Solution to reaktor 2022 summer code challenge
## Description
Monadikuikka images in frontend header were generated by [Dall-e](https://labs.openai.com/).
## Installation

## Architecture

## Testing

## Improvements
- Parsing of xml does not feel very elegant, a cleaner approach would be to convert the xml to eg. json and then retrieve the wanted data.
- For better scalability, backend could be split in to two separate entities: A poller api that polls the provided apis and writes the pilot info into database and a simple express backend that responds to frontend's api requests.