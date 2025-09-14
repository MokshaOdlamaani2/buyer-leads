// src/components/FilterControls.tsx
'use client';

import React from 'react';
import { cityEnum, propertyTypeEnum, statusEnum, timelineEnum } from '@/src/lib/validators/buyer';

type Props = {
  filters: {
    city?: string;
    propertyType?: string;
    status?: string;
    timeline?: string;
  };
  onChange: (filters: Partial<typeof filters>) => void;
};

export default function FilterControls({ filters, onChange }: Props) {
  return (
    <div className="flex space-x-4 flex-wrap">
      <select
        value={filters.city || ''}
        onChange={(e) => onChange({ ...filters, city: e.target.value || undefined })}
      >
        <option value="">All Cities</option>
        {cityEnum.options.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        value={filters.propertyType || ''}
        onChange={(e) => onChange({ ...filters, propertyType: e.target.value || undefined })}
      >
        <option value="">All Property Types</option>
        {propertyTypeEnum.options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}
      >
        <option value="">All Statuses</option>
        {statusEnum.options.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select value={filters.timeline || ''}
        onChange={(e) => onChange({ ...filters, timeline: e.target.value || undefined })}
      >
        <option value="">All Timelines</option>
        {timelineEnum.options.map((timeline) => (
          <option key={timeline} value={timeline}>
            {timeline}
          </option>
        ))}
      </select>
    </div>
  );
}
