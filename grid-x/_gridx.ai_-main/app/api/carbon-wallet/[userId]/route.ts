import { NextResponse } from 'next/server';
import { getDb } from '@/lib/backendDb';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const db = getDb();
    const wallet = db.wallets.find((w: any) => w.userId === userId);

    if (!wallet) {
      return NextResponse.json({
        userId,
        balance: 100,
        totalEarned: 100
      });
    }

    return NextResponse.json(wallet);
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
