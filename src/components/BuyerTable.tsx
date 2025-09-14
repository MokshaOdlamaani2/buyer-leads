// src/components/BuyerTable.tsx
'use client';

import React from 'react';

type Buyer = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string;
  city: string;
  propertyType: string;
  bhk?: string | null;
  purpose: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  timeline: string;
  source: string;
  notes?: string | null;
  tags: string[];
  status: string;
};

type Props = {
  buyers: Buyer[];
};

export default function BuyerTable({ buyers }: Props) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Name</th>
          <th className="border border-gray-300 px-2 py-1">Phone</th>
          <th className="border border-gray-300 px-2 py-1">Email</th>
          <th className="border border-gray-300 px-2 py-1">City</th>
          <th className="border border-gray-300 px-2 py-1">Property</th>
          <th className="border border-gray-300 px-2 py-1">BHK</th>
          <th className="border border-gray-300 px-2 py-1">Status</th>
        </tr>
      </thead>
      <tbody>
        {buyers.map((buyer) => (
          <tr key={buyer.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-2 py-1">{buyer.fullName}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.phone}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.email || '-'}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.city}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.propertyType}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.bhk || '-'}</td>
            <td className="border border-gray-300 px-2 py-1">{buyer.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
