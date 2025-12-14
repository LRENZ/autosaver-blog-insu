import Database from 'better-sqlite3';
import path from 'path';

// SQLite adapter that mimics D1Database interface
class SQLiteAdapter {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  prepare(query: string) {
    const stmt = this.db.prepare(query);
    
    return {
      bind: (...params: any[]) => {
        return {
          run: () => {
            const result = stmt.run(...params);
            return {
              success: true,
              meta: {
                duration: 0,
                last_row_id: result.lastInsertRowid,
                changes: result.changes,
              },
            };
          },
          first: () => {
            const result = stmt.get(...params);
            return result || null;
          },
          all: () => {
            const results = stmt.all(...params);
            return {
              success: true,
              results: results || [],
              meta: {
                duration: 0,
              },
            };
          },
        };
      },
      run: () => {
        const result = stmt.run();
        return {
          success: true,
          meta: {
            duration: 0,
            last_row_id: result.lastInsertRowid,
            changes: result.changes,
          },
        };
      },
      first: () => {
        const result = stmt.get();
        return result || null;
      },
      all: () => {
        const results = stmt.all();
        return {
          success: true,
          results: results || [],
          meta: {
            duration: 0,
          },
        };
      },
    };
  }
}

let dbInstance: SQLiteAdapter | null = null;

export function getDB(): any {
  if (dbInstance) {
    return dbInstance;
  }

  // Try multiple paths for database
  const possiblePaths = [
    // Vercel/Production environment
    path.join(process.cwd(), 'data/production.db'),
    // Local wrangler development
    path.join(
      process.cwd(),
      '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/8788c020b3deaef0f620db29eb016f892b2d4366158b1aff890bc056e577c5e0.sqlite'
    ),
  ];

  for (const dbPath of possiblePaths) {
    try {
      const fs = require('fs');
      if (fs.existsSync(dbPath)) {
        dbInstance = new SQLiteAdapter(dbPath);
        console.log('Database connected:', dbPath);
        return dbInstance;
      }
    } catch (error) {
      console.log('Failed to connect to', dbPath, error);
    }
  }

  console.error('Failed to connect to any database path');
  return null;
}
