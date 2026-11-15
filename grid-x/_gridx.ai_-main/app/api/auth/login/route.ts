import { NextResponse } from 'next/server';
import { getDb } from '@/lib/backendDb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = getDb();
    const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a simple token
    const token = `real_jwt_token_${Math.random().toString(36).substring(2)}${Date.now()}`;

    // Don't return password in the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
