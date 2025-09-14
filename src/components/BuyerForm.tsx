// src/components/BuyerForm.tsx
'use client';

import React, { useState } from 'react';
import {
  buyerSchema,
  cityEnum,
  propertyTypeEnum,
  bhkEnum,
  purposeEnum,
  timelineEnum,
  sourceEnum,
  statusEnum,
} from '@/src/lib/validators/buyer';
import { z } from 'zod';

type BuyerFormProps = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
};

export default function BuyerForm({ initialData, onSubmit }: BuyerFormProps) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    city: initialData?.city || cityEnum.options[0],
    propertyType: initialData?.propertyType || propertyTypeEnum.options[0],
    bhk: initialData?.bhk ?? '', // keep as empty string for select, parse to null on submit
    purpose: initialData?.purpose || purposeEnum.options[0],
    budgetMin: initialData?.budgetMin !== undefined && initialData?.budgetMin !== null ? String(initialData.budgetMin) : '',
    budgetMax: initialData?.budgetMax !== undefined && initialData?.budgetMax !== null ? String(initialData.budgetMax) : '',
    timeline: initialData?.timeline || timelineEnum.options[0],
    source: initialData?.source || sourceEnum.options[0],
    notes: initialData?.notes || '',
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    status: initialData?.status || statusEnum.options[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // Convert budgetMin and budgetMax to numbers or undefined
      // Convert bhk empty string to null for optional field
      const parsed = buyerSchema.parse({
        ...formData,
        budgetMin: formData.budgetMin ? Number(formData.budgetMin) : undefined,
        budgetMax: formData.budgetMax ? Number(formData.budgetMax) : undefined,
        bhk: formData.bhk === '' ? null : formData.bhk,
        tags: Array.isArray(formData.tags) ? formData.tags : [],
      });

      setErrors({});
      await onSubmit(parsed);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errs: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path.length) {
            errs[error.path[0] as string] = error.message;
          }
        });
        setErrors(errs);
      } else {
        // Unexpected error
        console.error(err);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName">Full Name*</label>
        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="input"
        />
        {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone*</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input"
        />
        {errors.phone && <p className="text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="city">City*</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="select"
        >
          {cityEnum.options.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-600">{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="propertyType">Property Type*</label>
        <select
          id="propertyType"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
          className="select"
        >
          {propertyTypeEnum.options.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.propertyType && <p className="text-red-600">{errors.propertyType}</p>}
      </div>

      {(formData.propertyType === 'Apartment' || formData.propertyType === 'Villa') && (
        <div>
          <label htmlFor="bhk">BHK*</label>
          <select
            id="bhk"
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            required
            className="select"
          >
            <option value="">Select</option>
            {bhkEnum.options.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.bhk && <p className="text-red-600">{errors.bhk}</p>}
        </div>
      )}

      <div>
        <label htmlFor="purpose">Purpose*</label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          className="select"
        >
          {purposeEnum.options.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.purpose && <p className="text-red-600">{errors.purpose}</p>}
      </div>

      <div>
        <label htmlFor="budgetMin">Budget Min</label>
        <input
          id="budgetMin"
          name="budgetMin"
          type="number"
          min={0}
          value={formData.budgetMin}
          onChange={handleChange}
          className="input"
        />
        {errors.budgetMin && <p className="text-red-600">{errors.budgetMin}</p>}
      </div>

      <div>
        <label htmlFor="budgetMax">Budget Max</label>
        <input
          id="budgetMax"
          name="budgetMax"
          type="number"
          min={0}
          value={formData.budgetMax}
          onChange={handleChange}
          className="input"
        />
        {errors.budgetMax && <p className="text-red-600">{errors.budgetMax}</p>}
      </div>

      <div>
        <label htmlFor="timeline">Timeline*</label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          required
          className="select"
        >
          {timelineEnum.options.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.timeline && <p className="text-red-600">{errors.timeline}</p>}
      </div>

      <div>
        <label htmlFor="source">Source*</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
          className="select"
        >
          {sourceEnum.options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.source && <p className="text-red-600">{errors.source}</p>}
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          maxLength={1000}
          className="textarea"
        />
        {errors.notes && <p className="text-red-600">{errors.notes}</p>}
      </div>

      <div>
        <label htmlFor="status">Status*</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="select"
        >
          {statusEnum.options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.status && <p className="text-red-600">{errors.status}</p>}
      </div>

      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
