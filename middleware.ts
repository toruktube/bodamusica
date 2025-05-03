import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.protocol === 'http:') {
    return NextResponse.redirect(`https://${request.nextUrl.host}${request.nextUrl.pathname}`, 301);
  }
}
