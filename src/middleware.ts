// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from './lib/auth';

export function middleware(req: NextRequest) {
  console.log(`Request: ${req.method} ${req.nextUrl.pathname}`);

  if (req.nextUrl.pathname.startsWith('/api/private')) {
    try {
      const user = getUserFromRequest(req);
      if (!user) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
