import { NextResponse } from 'next/server';
import { getDb } from '@/lib/backendDb';

export async function GET() {
  try {
    const db = getDb();
    const usersWithoutPassword = db.users.map(({ password, ...u }: any) => u);
    return NextResponse.json(usersWithoutPassword);
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
