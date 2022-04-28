This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Check the `mailio-nft-bridge` repo for `conf.yml` file.

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
