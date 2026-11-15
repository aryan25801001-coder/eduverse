import { NextResponse } from 'next/server';
import { getDb } from '@/lib/backendDb';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json(db.houses);
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
