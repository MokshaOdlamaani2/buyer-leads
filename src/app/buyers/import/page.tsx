// src/app/buyers/import/page.tsx
'use client';

import { useState } from 'react';

export default function ImportBuyersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) {
      setMessage('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/buyers/import/route', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();

    if (res.ok) {
      setMessage(`Success: Imported ${json.imported} buyers.`);
    } else {
      setMessage(`Error: ${json.message}`);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Import Buyers (CSV)</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload CSV
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
