import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const isVerified = request.cookies.get("isVerified")?.value === "true"; 

    console.log("Token:", token, "isVerified:", isVerified); 

    // Public routes accessible without authentication
    const isPublicPath = ["/", "/login", "/signup", "/verifyemail"].includes(path);

    // Default path `/`
    if (path === "/") {
        if (token && !isVerified) {
            return NextResponse.redirect(new URL("/verifyemail", request.nextUrl)); // Unverified users must verify
        }
        if (token && isVerified) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl)); // Verified users go to dashboard
        }
    }

    // Redirect signup users to login
    if (path === "/signup" && token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (path === "/login" && token) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

    // Allow movement from dashboard to attendance
    if (path === "/attendance" && token && isVerified) {
        return NextResponse.next(); // Allow access
    }

    // If the user is logged in and tries to access login or signup, redirect to dashboard
    if ((path === "/login" || path === "/signup") && token) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    // If the user is not logged in and tries to access a protected page, send them to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",
        "/verifyemail",
        "/dashboard",
        "/attendance" 
    ],
};
