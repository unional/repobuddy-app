# repobuddy

Handles the boring work of repository management.

## Setup

```sh
# Install dependencies
yarn

# Run the bot
yarn start
```

## Docker

```sh
# 1. Build container
docker build -t repobuddy .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> syncbuddy
```
