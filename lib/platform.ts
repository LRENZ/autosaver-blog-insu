// Platform bindings helper for Cloudflare Pages
// This uses the unstable_getEnvVar API from Next.js

export type CloudflareEnv = {
  DB: D1Database;
};

// Get environment bindings
// For wrangler pages dev, bindings are available via process.env
export function getEnv(): CloudflareEnv {
  // During development with wrangler pages dev, bindings are injected
  // We'll access them through the global context
  if (typeof globalThis !== 'undefined' && (globalThis as any).__env) {
    return (globalThis as any).__env;
  }
  
  throw new Error('Cloudflare bindings not available. Run with: wrangler pages dev');
}

export function getDB(): D1Database {
  return getEnv().DB;
}
