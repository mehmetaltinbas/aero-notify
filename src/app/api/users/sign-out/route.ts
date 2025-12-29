import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        isSuccess: true,
        message: 'Signed out',
    });

    // Remove the cookie using the exact same options as when it was set
    response.cookies.set({
        name: 'jwt',
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',       // must match original path
        maxAge: 0,       // expire immediately
    });

    return response;
}
