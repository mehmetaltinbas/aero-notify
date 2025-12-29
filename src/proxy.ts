import { JwtPayload } from '@/features/shared/types/jwt-payload.interface';
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
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
    if (!jwt) {
        const response: ResponseBase = {
            isSuccess: false,
            message: 'no jwt found in cookies'
        };
        return NextResponse.json(response);
    }

    try {
        const decoded = jsonwebtoken.verify(jwt, process.env.JWT_SECRET!) as JwtPayload;

        if (!decoded.userId) {
            const response: ResponseBase = {
                isSuccess: false,
                message: 'no userId'
            };
            return NextResponse.json(response);
        }

        const response = NextResponse.next();
        response.headers.set('x-user-id', `${decoded.userId}`);
        return response;
    } catch {
        const response: ResponseBase = {
            isSuccess: false,
            message: 'jwt verify threw an error'
        };
        return NextResponse.json(response);
    }
}
 
export const config = {
    matcher: [
        '/api/subscriptions',
        '/api/subscriptions/create',
        // '/api/flights/update',
        '/flights'
    ],
};
