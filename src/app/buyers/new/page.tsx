// src/app/buyers/new/page.tsx
'use client';

import { useState } from 'react';

export default function NewBuyerPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Chandigarh');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bhk, setBhk] = useState('');
  const [purpose, setPurpose] = useState('Buy');
  const [timeline, setTimeline] = useState('0-3m');
  const [source, setSource] = useState('Website');
  const [status, setStatus] = useState('New');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const payload = {
      fullName,
      phone,
      city,
      propertyType,
      bhk: bhk || null,
      purpose,
      timeline,
      source,
      status,
      notes: notes || null,
    };

    try {
      const res = await fetch('/api/buyers/new/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || 'Failed to create buyer');

      setSuccess(true);
      setFullName('');
      setPhone('');
      setBhk('');
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'Error submitting form');
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Buyer</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">Buyer created successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="\d{10,15}"
            placeholder="10 to 15 digits"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border p-2 rounded">
            <option>Chandigarh</option>
            <option>Mohali</option>
            <option>Zirakpur</option>
            <option>Panchkula</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Apartment</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Office</option>
            <option>Retail</option>
          </select>
        </div>

        {(propertyType === 'Apartment' || propertyType === 'Villa') && (
          <div>
            <label className="block mb-1">BHK</label>
            <select value={bhk} onChange={(e) => setBhk(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select BHK</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>Studio</option>
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1">Purpose</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full border p-2 rounded">
            <option>Buy</option>
            <option>Rent</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Timeline</label>
          <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full border p-2 rounded">
            <option>0-3m</option>
            <option>3-6m</option>
            <option>&gt;6m</option>
            <option>Exploring</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Source</label>
          <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full border p-2 rounded">
            <option>Website</option>
            <option>Referral</option>
            <option>Walk-in</option>
            <option>Call</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
            <option>New</option>
            <option>Qualified</option>
            <option>Contacted</option>
            <option>Visited</option>
            <option>Negotiation</option>
            <option>Converted</option>
            <option>Dropped</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Buyer
        </button>
      </form>
    </div>
  );
}
