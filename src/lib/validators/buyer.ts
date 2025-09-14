// src/lib/validators/buyer.ts
import { z } from 'zod';

export const cityEnum = z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']);
export const propertyTypeEnum = z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']);
export const bhkEnum = z.enum(['1', '2', '3', '4', 'Studio']);
export const purposeEnum = z.enum(['Buy', 'Rent']);
export const timelineEnum = z.enum(['0-3m', '3-6m', '>6m', 'Exploring']);
export const sourceEnum = z.enum(['Website', 'Referral', 'Walk-in', 'Call', 'Other']);
export const statusEnum = z.enum([
  'New',
  'Qualified',
  'Contacted',
  'Visited',
  'Negotiation',
  'Converted',
  'Dropped',
]);

export const buyerSchema = z
  .object({
    fullName: z.string().min(2).max(80),
    email: z.string().email().optional().nullable(),
    phone: z.string().regex(/^\d{10,15}$/, 'Phone must be 10-15 digits'),
    city: cityEnum,
    propertyType: propertyTypeEnum,
    bhk: z.string().optional().nullable(),
    purpose: purposeEnum,
    budgetMin: z.number().int().optional().nullable(),
    budgetMax: z.number().int().optional().nullable(),
    timeline: timelineEnum,
    source: sourceEnum,
    notes: z.string().max(1000).optional().nullable(),
    tags: z.array(z.string()).optional(),
    status: statusEnum.optional().default('New'),
  })
  .superRefine(({ budgetMin, budgetMax, propertyType, bhk }, ctx) => {
    if (
      budgetMin !== undefined &&
      budgetMax !== undefined &&
      budgetMax !== null &&
      budgetMin !== null &&
      budgetMax < budgetMin
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['budgetMax'],
        message: 'budgetMax must be greater than or equal to budgetMin',
      });
    }
    if ((propertyType === 'Apartment' || propertyType === 'Villa') && !bhk) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['bhk'],
        message: 'bhk is required for Apartment and Villa',
      });
    }
  });
