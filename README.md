#  Buyer Lead Intake App

A mini app to create, view, filter, and manage **real estate buyer leads**.

## 🚀 Stack

- Next.js 14 (App Router)
- TypeScript
- Drizzle ORM + SQLite
- Zod (validation)
- TailwindCSS (UI)
- CSV import/export
- Middleware + rate limit
- Unit tests via Vitest

---

## 📦 Setup

```bash
npm install
cp .env.example .env
npx drizzle-kit push   # or db:migrate
npm run dev
