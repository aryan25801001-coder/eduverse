import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'gridx_backend_db.json');

// Initial seed data
const initialData = {
  users: [
    {
      id: 'u1',
      name: 'Arjun Solar Farm',
      email: 'arjun@solargrid.in',
      password: 'password123',
      role: 'seller'
    },
    {
      id: 'u2',
      name: 'Rohan Energy Consumer',
      email: 'rohan@consumer.in',
      password: 'password123',
      role: 'buyer'
    },
    {
      id: 'u3',
      name: 'Dev Smart Grid',
      email: 'dev@smartgrid.in',
      password: 'password123',
      role: 'both'
    }
  ],
  houses: [
    {
      id: 'h1',
      userId: 'u1',
      name: 'Main Solar Array',
      address: 'Sector 44, Gurugram',
      capacity: 15.5,
      latitude: 28.4595,
      longitude: 77.0266
    },
    {
      id: 'h2',
      userId: 'u2',
      name: 'Residency Meter',
      address: 'DLF Phase 3, Gurugram',
      capacity: 5.0,
      latitude: 28.4902,
      longitude: 77.0898
    }
  ],
  wallets: [
    {
      userId: 'u1',
      balance: 1250,
      totalEarned: 4500
    },
    {
      userId: 'u2',
      balance: 120,
      totalEarned: 350
    },
    {
      userId: 'u3',
      balance: 850,
      totalEarned: 2900
    }
  ]
};

export function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return initialData;
  }
}

export function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
