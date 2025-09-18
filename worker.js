/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

async function handleRequest(req, ctx) {
  const url = new URL(req.url)
  url.host = 'api.openai.com'
  url.pathname = `/v1${url.pathname}`
  
  console.log("For testing ", url.toString())
  
  return fetch(
    url.toString(),
    {
      method: req.method,
      headers: req.headers,
      body: req.body,
      signal: req.signal,
    }
  )
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, ctx);
  }
};
