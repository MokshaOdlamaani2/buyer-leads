import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres:buyer-leads123@db.wdbvuezcplntmwrygmzb.supabase.co:5432/postgres',
  },
});
