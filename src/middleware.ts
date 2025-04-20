import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PROTECTED_PATHS = ['/admin', '/events'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Solo autenticación, no comprobación de rol
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/events/:path*', '/events'],
};
