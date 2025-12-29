'use client'

import { BlackButton } from "@/features/shared/components/black-button";
import { ResponseBase } from '@/features/shared/types/response/response-base.response';
import { SignInDto } from "@/features/users/types/dto/sign-in.dto";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [signInDto, setSignInDto] = useState<SignInDto>({
        email: '',
        password: '',
    });

    async function handleSignInSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/users/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInDto)
        })).json() as ResponseBase;
        alert(response.message);
        if (response.isSuccess) router.push('/flights');
    }

    return (
        <div className="w-full h-[75%] flex flex-col justify-center items-center gap-2">
                <p className="text-lg">Sign In</p>
                <input
                    onChange={(event) =>
                        setSignInDto({
                            ...signInDto,
                            email: event.target.value,
                        })
                    }
                    type="text"
                    value={signInDto.email}
                    placeholder="email..."
                    className="p-2 border rounded-full"
                />
                <input
                    onChange={(event) =>
                        setSignInDto({
                            ...signInDto,
                            password: event.target.value,
                        })
                    }
                    value={signInDto.password}
                    type="password"
                    placeholder="password..."
                    className="p-2 border rounded-full"
                />
                <BlackButton onClick={handleSignInSubmit}>sign in</BlackButton>
                <p>or</p>
                <BlackButton onClick={() => router.push('/sign-up')}>
                    sign up
                </BlackButton>
        </div>
    );
}
