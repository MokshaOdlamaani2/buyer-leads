// src/app/api/buyers/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/src/db/client';
import { buyers } from '@/src/db/schema';
import { sql, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 10;

    const offset = (page - 1) * pageSize;

    const result = await db
      .select()
      .from(buyers)
      .orderBy(desc(buyers.updatedAt))
      .limit(pageSize)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(buyers);
    const totalItems = Number(totalCountResult[0]?.count || 0);
    const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);

    return NextResponse.json({
      buyers: result,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    console.error('Error fetching buyers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch buyers' },
      { status: 500 }
    );
  }
}
