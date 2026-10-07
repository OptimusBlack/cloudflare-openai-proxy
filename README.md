# Cloudflare OpenAI Proxy Worker

This repository contains a Cloudflare Worker (TypeScript, [`src/index.ts`](src/index.ts)) that acts as a pure pass-through reverse proxy to the OpenAI API. It forwards incoming requests to `api.openai.com` and streams the responses back unchanged.

> **Important:** This proxy forwards request headers and bodies as-is. For production use, ensure you secure access (for example, by injecting your own API key on the worker side or enabling authentication) to avoid exposing your OpenAI credentials.

## Placement

The worker is configured with an explicit **placement hint** of `aws:us-east-1` in [`wrangler.jsonc`](wrangler.jsonc), so Cloudflare runs it in the data center with the lowest latency to the AWS us-east-1 region (where OpenAI's API is fronted). See [Worker Placement](https://developers.cloudflare.com/workers/configuration/placement/).

## Requirements

- Node.js 18+ (Node 20+ recommended)
- npm

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

Starts a local dev server at http://localhost:8787.

## Deploy

```sh
npm run deploy
```

Deploys the worker to your Cloudflare account using Wrangler.

You can also connect the repo in the Cloudflare dashboard (Workers → Connect to Git) so that every push to your selected branch is built and deployed automatically.

## Other scripts

| Script | Description |
| --- | --- |
| `npm run typecheck` | Type-check the TypeScript sources |
| `npm run cf-typegen` | Generate `worker-configuration.d.ts` runtime types via `wrangler types` |

## Files

- `src/index.ts` — Worker script that proxies requests to the OpenAI API.
- `wrangler.jsonc` — Wrangler configuration (name, compatibility date, placement hint, observability).
- `tsconfig.json` — TypeScript configuration.

## Notes

- The worker simply rewrites incoming requests to `https://api.openai.com/v1/...` and forwards method, headers (minus hop-by-hop headers), body, and abort signals.
- For security, consider storing your OpenAI API key as a secret in Cloudflare and injecting the `Authorization` header server-side instead of relying on client-provided headers.
- By default the wrangler config disables the `workers.dev` subdomain. Set `"workers_dev": true` in `wrangler.jsonc` if you want to enable it.

## License

No license specified. Fork as needed.
