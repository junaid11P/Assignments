import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes
    if (pathname.startsWith('/portfolio')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Auth routes (redirect to portfolio if already logged in)
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/portfolio', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/portfolio/:path*'],
};
