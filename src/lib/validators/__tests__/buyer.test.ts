// src/lib/validators/__tests__/buyer.test.ts

import { buyerSchema } from '../buyer';

describe('buyerSchema', () => {
  it('validates a correct buyer', () => {
    const validData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'Chandigarh',
      propertyType: 'Apartment',
      bhk: '2',
      purpose: 'Buy',
      budgetMin: 5000000,
      budgetMax: 7000000,
      timeline: '0-3m',
      source: 'Website',
      notes: 'Some notes',
      tags: ['vip'],
      status: 'New',
    };
    expect(() => buyerSchema.parse(validData)).not.toThrow();
  });

  it('rejects if budgetMax < budgetMin', () => {
    const invalidData = {
      fullName: 'John Doe',
      phone: '1234567890',
      city: 'Chandigarh',
      propertyType: 'Apartment',
      bhk: '2',
      purpose: 'Buy',
      budgetMin: 7000000,
      budgetMax: 5000000,
      timeline: '0-3m',
      source: 'Website',
    };
    expect(() => buyerSchema.parse(invalidData)).toThrow(/budgetMax must be greater/);
  });

  it('requires bhk for Apartment and Villa', () => {
    const invalidData = {
      fullName: 'Jane Doe',
      phone: '1234567890',
      city: 'Mohali',
      propertyType: 'Apartment',
      bhk: null,
      purpose: 'Buy',
      timeline: '0-3m',
      source: 'Referral',
    };
    expect(() => buyerSchema.parse(invalidData)).toThrow(/bhk is required/);
  });
});
