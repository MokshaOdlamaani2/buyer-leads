// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Buyer Leads App</h1>
      <p className="mb-4">You can:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link href="/buyers" className="text-blue-600 underline">
            View & Search Buyers
          </Link>
        </li>
        <li>
          <Link href="/buyers/new" className="text-blue-600 underline">
            Add a New Buyer
          </Link>
        </li>
        <li>
          <Link href="/buyers/import" className="text-blue-600 underline">
            Import Buyers via CSV
          </Link>
        </li>
        <li>
          <Link href="/buyers/export" className="text-blue-600 underline">
            Export Buyers to CSV
          </Link>
        </li>
      </ul>
    </main>
  );
}
