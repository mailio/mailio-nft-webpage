# Mailio NFT Web3 
![https://discord.gg/hXjFS2zWra](https://img.shields.io/static/v1?label=discord&message=developers&color=green)
![GitHub issues](https://img.shields.io/github/issues/mailio/mailio-nft-bridge)

## Running staging on single server

```yaml
version: '3'

services:
  mailio-nft-bridge-staging:
    image: mailio/mailio-nft-bridge:staging_01
    command: [ "/app/main", "--config", "/config/conf.yml" ]
    ports:
      - '8082:8080'
    volumes:
      - /data:/data:rw
      - /config/conf.yml:/config/conf.yml:ro
  mailio-nft-web-staging:
    image: mailio/mailio-nft-web:staging_01
    ports: 
      - '3002:3000'
```

Check the [mailio-nft-bridge](https://github.com/mailio/mailio-nft-bridge) repo for `conf.yml` file.

## Reload caddy confirguration
```
$ caddy_container_id=$(docker ps | grep caddy | awk '{print $1;}')
$ docker exec -w /etc/caddy $caddy_container_id caddy reload
```

## Sync with Rclone

Create `rclone.conf` and safe it to `~/.config/rclone/rclone.conf`
```
[spaces-nyc3]
provider = DigitalOcean
type = s3
env_auth = false
access_key_id = your key
secret_access_key = your secret key 
endpoint = nyc3.digitaloceanspaces.com
acl = private
```

Run rclone sync
```
rclone sync /data spaces-sfo2:emptymailio/mailio-nfts-staging
```

Add crontab once a day at 11:
```
00 11 * * * rclone sync /data spaces-sfo2:emptymailio/mailio-nfts-staging
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

This is a parallel project to `eth-salt-lake` repository `web3-starter-kit`. 

[Reusable GitHub template of the web3-starter-kit framework can be found here](https://github.com/eth-salt-lake/web3-starter-kit)

[Article with a detailed explanation of the framework](https://igor.technology/building-web3-frontend-for-your-dapp/)