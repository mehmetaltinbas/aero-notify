import { db } from '@/db';
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const { rows } = await db.query(
        `SELECT id, password FROM users WHERE email = $1`,
        [email]
    );

    if (!rows.length) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    const responseJson: ResponseBase = {
        isSuccess: true,
        message: 'Signed in'
    }
    const response = NextResponse.json(responseJson);

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
