import { JwtPayload } from '@/features/shared/types/jwt-payload.interface';
import jsonwebtoken from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
 
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // if (path === '/api/flights/update') {
    //     const response: ResponseBase = {
    //         isSuccess: false,
    //         message: "this endpoint isn't reachable, it is an interval endpoint"
    //     };
    //     return NextResponse.json(response);
    // }

    const jwt = request.cookies.get('jwt')?.value;
    if (!jwt) return NextResponse.redirect(new URL('/', request.url));;

    try {
        const decoded = jsonwebtoken.verify(jwt, process.env.JWT_SECRET!) as JwtPayload;

        if (!decoded.userId) return NextResponse.redirect(new URL('/', request.url));

        const response = NextResponse.next();
        response.headers.set('x-user-id', `${decoded.userId}`);
        return response;
    } catch {
        return NextResponse.redirect(new URL('/', request.url));
    }
}
 
export const config = {
    matcher: [
        '/api/subscriptions',
        '/api/subscriptions/create',
        // '/api/flights/update',
        '/api/flights',
        '/flights'
    ],
};
