// src/lib/csv/exportBuyers.ts

import type { Buyer } from '@/db/schema'; // adjust this import to your Buyer type

export function exportBuyersToCSV(buyers: Buyer[]) {
  const headers = [
    'Full Name',
    'Email',
    'Phone',
    'City',
    'Property Type',
    'BHK',
    'Purpose',
    'Budget Min',
    'Budget Max',
    'Timeline',
    'Source',
    'Notes',
    'Tags',
    'Status',
  ];

  const rows = buyers.map(buyer => [
    buyer.fullName,
    buyer.email || '',
    buyer.phone,
    buyer.city,
    buyer.propertyType,
    buyer.bhk || '',
    buyer.purpose,
    buyer.budgetMin?.toString() || '',
    buyer.budgetMax?.toString() || '',
    buyer.timeline,
    buyer.source,
    buyer.notes || '',
    buyer.tags ? JSON.stringify(buyer.tags) : '',
    buyer.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  return csvContent;
}
