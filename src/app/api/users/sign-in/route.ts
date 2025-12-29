import { db } from '@/db';
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
import { SignInDto } from '@/features/users/types/dto/sign-in.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const signInDto = await req.json() as SignInDto;

    const { rows } = await db.query(
        `SELECT id, password FROM users WHERE email = $1`,
        [signInDto.email]
    );

    if (!rows.length) {
        return NextResponse.json({ isSuccess: false, message: 'invalid credentials' } as ResponseBase, { status: 401 });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(signInDto.password, user.password);

    if (!isValid) {
        return NextResponse.json({ isSuccess: false, message: 'invalid credentials' } as ResponseBase, { status: 401 });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    const response = NextResponse.json({
        isSuccess: true,
        message: 'Signed in'
    } as ResponseBase);

    response.cookies.set({
        name: 'jwt',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
}
