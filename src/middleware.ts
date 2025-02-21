import { NextRequest, NextResponse } from 'next/server'
//  There is two part in middleware:

// 1) Logic part
export function middleware(request: NextRequest) {
    try {

        const path = request.nextUrl.pathname;
        const isPublicPath = path === '/login' || path === '/signup'

        const token = request.cookies.get("token")?.value || ""

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }

        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }

    } catch (error: any) {
        return NextResponse.json({ error: "Error Occurred" })
    }
}

// 1) "Matching Paths" part
export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
    ],
}