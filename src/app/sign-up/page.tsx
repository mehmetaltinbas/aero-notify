'use client'

import { BlackButton } from '@/features/shared/components/black-button';
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
import { SignUpDto } from '@/features/users/types/dto/sign-up.dto';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [signUpDto, setSignUpDto] = useState<SignUpDto>({
        email: '',
        password: '',
    });

    async function signUp() {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/users/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpDto)
        })).json() as ResponseBase;
        alert(response.message);
        if (response.isSuccess) router.push('/sign-in');
    }

    return (
        <div className="h-[75%] flex flex-col justify-center items-center gap-2">
            <p className="text-lg">Sign Up</p>
            <input
                onChange={(event) =>
                    setSignUpDto({
                        ...signUpDto,
                        email: event.target.value,
                    })
                }
                type="text"
                placeholder="email..."
                className="p-2 border rounded-full"
            />
            <input
                onChange={(event) =>
                    setSignUpDto({
                        ...signUpDto,
                        password: event.target.value,
                    })
                }
                type="password"
                placeholder="password..."
                className="p-2 border rounded-full"
            />
            <BlackButton onClick={signUp}>sign up</BlackButton>
            <p>or</p>
            <BlackButton onClick={() => router.push('/sign-in')}>
                sign in
            </BlackButton>
        </div>
    );
}
