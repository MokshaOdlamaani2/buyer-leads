import { NextResponse } from 'next/server';
import { buyerSchema } from '@/lib/validators/buyer';
import { db } from '@/db/client';
import { buyers, buyer_history } from '@/db/schema';
import { rateLimit } from '@/lib/rateLimit';
import { eq } from 'drizzle-orm';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait.' },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();
    const id = params.id;

    const parsed = buyerSchema.parse(json);

    // Step 1: Fetch existing buyer
    const existing = await db.query.buyers.findFirst({
      where: eq(buyers.id, id),
    });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Buyer not found' }, { status: 404 });
    }

    // Step 2: Prepare update and diff
    const updateData = {
      ...parsed,
      tags: parsed.tags ? JSON.stringify(parsed.tags) : JSON.stringify([]),
    };

    const diff: Record<string, { from: any; to: any }> = {};
    for (const key in updateData) {
      if (updateData[key] !== existing[key]) {
        diff[key] = {
          from: existing[key],
          to: updateData[key],
        };
      }
    }

    // Step 3: Skip update if no changes
    if (Object.keys(diff).length === 0) {
      return NextResponse.json({ success: true, message: 'No changes detected.' });
    }

    // Step 4: Run update and history insert in a transaction
    await db.transaction(async (tx) => {
      await tx.update(buyers).set(updateData).where(eq(buyers.id, id));

      await tx.insert(buyer_history).values({
        buyerId: id,
        changedBy: 'demo-user-id', // 🔧 Replace with actual user ID from session/auth
        changedAt: new Date(),
        diff: JSON.stringify(diff),
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error updating buyer' },
      { status: 400 }
    );
  }
}
