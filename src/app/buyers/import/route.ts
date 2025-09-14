// src/app/buyers/import/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { buyers } from '@/db/schema';
import { parse as csvParse } from 'csv-parse/sync'; // ✅ fixed import
import { buyerSchema } from '@/lib/validators/buyer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'Invalid file upload' }, { status: 400 });
    }

    const text = await file.text();

    const records = csvParse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const validRows: any[] = [];
    const errors: { row: number; message: string }[] = [];

    records.forEach((row: any, i: number) => {
      try {
        const parsed = buyerSchema.parse(row);
        validRows.push({
          ...parsed,
          tags: parsed.tags ? JSON.stringify(parsed.tags) : JSON.stringify([]),
        });
      } catch (err: any) {
        errors.push({ row: i + 2, message: err.message });
      }
    });

    if (errors.length > 0) {
      return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
    }

    await db.transaction(async (tx) => {
      for (const row of validRows) {
        await tx.insert(buyers).values(row);
      }
    });

    return NextResponse.json({ imported: validRows.length });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Import failed' }, { status: 500 });
  }
}
