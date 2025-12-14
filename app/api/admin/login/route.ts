import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (verifyCredentials(username, password)) {
      const token = hashPassword(password);
      
      return NextResponse.json(
        { success: true, token },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
