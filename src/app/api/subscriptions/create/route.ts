import { db } from "@/db";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { CreateSubscriptionDto } from "@/features/subscriptions/types/dto/create-subscription.dto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { isSuccess: false, message: "unauthorized: missing userId" } as ResponseBase,
            { status: 401 }
        );
    }

    let requestBody: CreateSubscriptionDto;
    try {
        requestBody = await request.json() as CreateSubscriptionDto;
    } catch {
        return NextResponse.json(
            { isSuccess: false, message: "invalid JSON body" } as ResponseBase,
            { status: 400 }
        );
    }

    const flightId = requestBody.flightId;
    if (!flightId) {
        return NextResponse.json(
            { isSuccess: false, message: "missing flightId" } as ResponseBase,
            { status: 400 }
        );
    }

    try {
        const flightRes = await db.query(
            `SELECT id FROM flights WHERE id = $1`,
            [flightId]
        );
        if (flightRes.rowCount === 0) {
            return NextResponse.json(
                { isSuccess: false, message: "flight not found" } as ResponseBase,
                { status: 404 }
            );
        }

        await db.query(
            `INSERT INTO subscriptions ("userId", "flightId")
             VALUES ($1, $2)`,
            [userId, flightId]
        );

        return NextResponse.json(
            { isSuccess: true, message: "subscription created" } as ResponseBase
        );

    } catch (error: any) {
        if (error.code === "23505") { // unique_violation
            return NextResponse.json(
                { isSuccess: false, message: "already subscribed to this flight" } as ResponseBase,
                { status: 400 }
            );
        }

        console.error("subscription creation error:", error);
        return NextResponse.json(
            { isSuccess: false, message: "Server error" } as ResponseBase,
            { status: 500 }
        );
    }
}
