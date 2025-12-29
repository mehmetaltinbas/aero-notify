import { db } from '@/db';
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
import { SignUpDto } from '@/features/users/types/dto/sign-up.dto';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const signUpDto = await req.json() as SignUpDto;

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    try {
        await db.query(
        `INSERT INTO users (email, password) VALUES ($1, $2)`,
        [signUpDto.email, hashedPassword]
        );

        const response: ResponseBase = {
            isSuccess: true,
            message: 'signed up'
        }
        return NextResponse.json(response);
    } catch {
        const response: ResponseBase = {
            isSuccess: false,
            message: 'error'
        }
        return NextResponse.json(response);
    }
}
