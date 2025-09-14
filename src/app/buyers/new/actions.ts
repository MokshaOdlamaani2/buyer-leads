// src/app/buyers/new/actions.ts

import { NextResponse } from 'next/server';
import { buyerSchema } from '@/lib/validators/buyer';
import { db } from '@/db/client';
import { buyers } from '@/db/schema';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait.' },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();

    const parsed = buyerSchema.parse(json);

    const result = await db.insert(buyers).values({
      ...parsed,
      tags: parsed.tags ? JSON.stringify(parsed.tags) : JSON.stringify([]),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error creating buyer' },
      { status: 400 }
    );
  }
}
