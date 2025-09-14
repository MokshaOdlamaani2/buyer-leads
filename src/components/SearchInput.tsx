// src/components/SearchInput.tsx
'use client';

import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="search"
      placeholder="Search by name, phone, or email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full max-w-md"
    />
  );
}
