import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { buyers } from '@/db/schema';

export async function GET() {
  const allBuyers = await db.select().from(buyers);

  const header = Object.keys(allBuyers[0] || {}).join(',');
  const rows = allBuyers
    .map((buyer) =>
      Object.values(buyer).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');

  const csv = `${header}\n${rows}`;

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="buyers-export.csv"',
    },
  });
}
