// src/lib/auth.ts

// Dummy auth functions. Replace with real authentication logic.

export function getUserFromRequest(req: Request) {
  // In real app, extract from req headers or cookies
  return {
    id: 'user-123',
    name: 'Test User',
    role: 'admin',
  };
}

export function requireAuth(req: Request) {
  const user = getUserFromRequest(req);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
