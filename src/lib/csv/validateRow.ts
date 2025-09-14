// src/lib/csv/validateRow.ts
import { buyerSchema } from '@/lib/validators/buyer';

const parseNumber = (val: string | undefined): number | null => {
  if (!val) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
};

export function validateRow(row: Record<string, any>) {
  // Map CSV row fields to buyerSchema expected shape
  const mapped = {
    fullName: row['Full Name'],
    email: row['Email'] || null,
    phone: row['Phone'],
    city: row['City'],
    propertyType: row['Property Type'],
    bhk: row['BHK'] || null,
    purpose: row['Purpose'],
    budgetMin: parseNumber(row['Budget Min']),
    budgetMax: parseNumber(row['Budget Max']),
    timeline: row['Timeline'],
    source: row['Source'],
    notes: row['Notes'] || null,
    tags: row['Tags'] ? JSON.parse(row['Tags']) : [],
    status: row['Status'],
  };

  try {
    buyerSchema.parse(mapped);
    return { valid: true, data: mapped };
  } catch (e) {
    return { valid: false, error: e };
  }
}
