// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buyer Leads',
  description: 'Mini app to manage buyer leads',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">🏠 Buyer Lead Intake App</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
