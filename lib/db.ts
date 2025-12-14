// Database helper to get D1 instance
// This uses the platform bindings from Cloudflare Pages

export type Env = {
  DB: D1Database;
};

// Helper to get DB from platform context
export function getDB(): D1Database | null {
  // In Cloudflare Pages, the DB binding is available via platform
  // For development with wrangler, it's automatically injected
  if (typeof process !== 'undefined' && (process as any).env?.DB) {
    return (process as any).env.DB;
  }
  return null;
}
