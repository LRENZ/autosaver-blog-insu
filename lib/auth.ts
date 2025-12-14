// Simple authentication for admin panel
// Username: admin
// Password: creatorshouse1!

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'creatorshouse1!',
};

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function hashPassword(password: string): string {
  // Simple hash for cookie storage (not cryptographically secure, but good enough for demo)
  return Buffer.from(`${password}:autosaver`).toString('base64');
}

export function verifyHash(hash: string): boolean {
  try {
    const decoded = Buffer.from(hash, 'base64').toString('utf-8');
    const [password] = decoded.split(':');
    return password === ADMIN_CREDENTIALS.password;
  } catch {
    return false;
  }
}
