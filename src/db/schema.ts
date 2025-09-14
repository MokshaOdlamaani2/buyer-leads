// src/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core';

export const buyers = pgTable('buyers', {
  id: uuid('id').primaryKey().defaultRandom(),

  fullName: varchar('full_name', { length: 80 }),
  email: varchar('email', { length: 255, mode: 'optional' }),
  phone: varchar('phone', { length: 15 }),

  city: varchar('city', { length: 50 }),
  propertyType: varchar('property_type', { length: 50 }),
  bhk: varchar('bhk', { length: 10, mode: 'optional' }),

  purpose: varchar('purpose', { length: 10 }),
  budgetMin: integer('budget_min', { mode: 'optional' }),
  budgetMax: integer('budget_max', { mode: 'optional' }),

  timeline: varchar('timeline', { length: 20 }),
  source: varchar('source', { length: 20 }),
  status: varchar('status', { length: 20 }).default('New'),

  notes: text('notes', { mode: 'optional' }),
  tags: jsonb('tags').default('[]'),

  ownerId: uuid('owner_id'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const buyer_history = pgTable('buyer_history', {
  id: uuid('id').primaryKey().defaultRandom(),

  buyerId: uuid('buyer_id').notNull().references(() => buyers.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),

  changedBy: uuid('changed_by').notNull(),
  changedAt: timestamp('changed_at').defaultNow(),

  diff: jsonb('diff').notNull(),
});
