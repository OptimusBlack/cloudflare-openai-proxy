/**
 * Reverse proxy to the OpenAI API.
 *
 * Incoming requests are forwarded to https://api.openai.com with their
 * method, headers, body and abort signal preserved as-is (pure pass-through).
 */

const UPSTREAM_HOST = "api.openai.com";

/** Headers that must not be forwarded to the upstream origin. */
const HOP_BY_HOP_HEADERS = [
  "host",
  "cf-connecting-ip",
  "cf-ipcountry",
  "cf-ray",
  "cf-visitor",
  "cf-worker",
  "cf-ew-via",
  "cf-trace-id",
  "x-forwarded-for",
  "x-forwarded-proto",
  "x-real-ip",
] as const;

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = UPSTREAM_HOST;
    url.port = "";

    const headers = new Headers(request.headers);
    for (const name of HOP_BY_HOP_HEADERS) {
      headers.delete(name);
    }

    return fetch(new Request(url, { ...request, headers, redirect: "manual" }), {
      signal: request.signal,
    });
  },
} satisfies ExportedHandler;
