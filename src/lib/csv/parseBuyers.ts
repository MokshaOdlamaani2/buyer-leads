// src/lib/csv/parseBuyers.ts
import Papa from 'papaparse';

export function parseBuyers(csvText: string) {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (results.errors.length) {
    throw new Error(
      `CSV parsing error: ${results.errors.map(e => e.message).join(', ')}`
    );
  }

  return results.data as Record<string, string>[];
}
