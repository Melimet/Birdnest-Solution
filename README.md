# Birdnest-Solution
Solution to reaktor 2022 summer code challenge
## Description

## Installation

## Architecture

## Testing

## Future improvements
- Parsing of xml does not feel very elegant, a cleaner approach would be to convert the xml to eg. json and then retrieve the wanted data.
- For better scalability, backend could be split in to two separate entities: A poller api that polls the provided apis and writes the pilot info into database and a simple express backend that responds to frontend's api requests.