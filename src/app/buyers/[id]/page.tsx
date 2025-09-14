'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Buyer = {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
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

export default function BuyerDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop() ?? '';
  const router = useRouter();

  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBuyer() {
      try {
        const res = await fetch(`/api/buyers/${id}`);
        if (!res.ok) throw new Error('Failed to fetch buyer');
        const json = await res.json();
        setBuyer(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBuyer();
  }, [id]);

  if (loading) return <p>Loading buyer...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!buyer) return <p>Buyer not found</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Buyer Details: {buyer.fullName}</h2>
      <dl className="grid grid-cols-2 gap-4 max-w-xl">
        <dt className="font-semibold">Phone:</dt>
        <dd>{buyer.phone}</dd>

        <dt className="font-semibold">Email:</dt>
        <dd>{buyer.email ?? '-'}</dd>

        <dt className="font-semibold">City:</dt>
        <dd>{buyer.city}</dd>

        <dt className="font-semibold">Property Type:</dt>
        <dd>{buyer.propertyType}</dd>

        <dt className="font-semibold">BHK:</dt>
        <dd>{buyer.bhk ?? '-'}</dd>

        <dt className="font-semibold">Purpose:</dt>
        <dd>{buyer.purpose}</dd>

        <dt className="font-semibold">Budget Min:</dt>
        <dd>{buyer.budgetMin ?? '-'}</dd>

        <dt className="font-semibold">Budget Max:</dt>
        <dd>{buyer.budgetMax ?? '-'}</dd>

        <dt className="font-semibold">Timeline:</dt>
        <dd>{buyer.timeline}</dd>

        <dt className="font-semibold">Source:</dt>
        <dd>{buyer.source}</dd>

        <dt className="font-semibold">Status:</dt>
        <dd>{buyer.status}</dd>

        <dt className="font-semibold">Notes:</dt>
        <dd>{buyer.notes ?? '-'}</dd>

        <dt className="font-semibold">Tags:</dt>
        <dd>{buyer.tags.join(', ')}</dd>
      </dl>
    </div>
  );
}
