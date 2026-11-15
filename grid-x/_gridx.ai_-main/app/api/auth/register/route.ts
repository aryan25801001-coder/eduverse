import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/backendDb';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const db = getDb();
    const existingUser = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const newUserId = `u${db.users.length + 1}`;
    const newUser = {
      id: newUserId,
      name,
      email,
      password,
      role
    };

    db.users.push(newUser);

    // Also seed a carbon wallet and a house for the new user
    db.wallets.push({
      userId: newUserId,
      balance: 100,
      totalEarned: 100
    });

    db.houses.push({
      id: `h${db.houses.length + 1}`,
      userId: newUserId,
      name: `${name}'s Smart Grid Node`,
      address: 'Gurugram Metro Area',
      capacity: 6.5,
      latitude: 28.4595 + (Math.random() - 0.5) * 0.05,
      longitude: 77.0266 + (Math.random() - 0.5) * 0.05
    });

    saveDb(db);

    const token = `real_jwt_token_${Math.random().toString(36).substring(2)}${Date.now()}`;
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
