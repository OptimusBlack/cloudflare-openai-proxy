# Cloudflare OpenAI Proxy Worker

This repository contains a single Cloudflare Worker (worker.js) that acts as a simple reverse proxy to the OpenAI API. It forwards incoming requests to api.openai.com and returns the responses.

Important: This proxy forwards request headers and bodies as-is. For production use, ensure you secure access (for example, by injecting your own API key on the worker side or enabling authentication) to avoid exposing your OpenAI credentials.

Steps

1. Fork this repository

2. Setup a Cloudflare Worker on your Cloudflare account
   - Sign in to the Cloudflare dashboard and open the Workers section.
   - Create a new Worker.

3. Connect your GitHub to the Cloudflare Worker and allow your forked repository
   - In the Worker creation flow, choose to connect a GitHub repository.
   - Authorize Cloudflare to access your GitHub account and select your fork of this repository.
   - Choose the repository and branch you want Cloudflare to use.
   - Update the build command from `npx wrangler deploy` to `npx wrangler deploy worker.js`.

4. Every update to the code in this repository on your selected live branch will be deployed to the Cloudflare Worker instantly.
   - When you push changes to the selected branch in your fork, Cloudflare will automatically build/deploy the Worker.

Notes

- The worker in this repo simply rewrites incoming requests to `https://api.openai.com/v1/...` and forwards headers and body.
- For security, consider storing your OpenAI API key as a secret/environment variable in Cloudflare and modify the worker to inject the Authorization header server-side instead of relying on client-provided headers.

Files

- worker.js — Cloudflare Worker script that proxies requests to the OpenAI API.

License

- No license specified. Fork as needed.
