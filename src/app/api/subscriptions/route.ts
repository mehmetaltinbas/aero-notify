import { db } from "@/db";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { SubscriptionWithRelations } from "@/features/subscriptions/subscription-db-row-with-relations.type";
import { ReadMultipleSubscriptionsResponse } from "@/features/subscriptions/types/response/read-subscriptions.response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { isSuccess: false, message: "Unauthorized: missing userId" } as ResponseBase,
            { status: 401 }
        );
    }

    try {
        // Fetch subscriptions with flight and user info
        const { rows } = await db.query(
            `
            SELECT 
                s.*,
                row_to_json(f) AS flight,
                row_to_json(u) AS user
            FROM subscriptions s
            JOIN flights f ON s."flightId" = f.id
            JOIN users u ON s."userId" = u.id
            WHERE s."userId" = $1
            ORDER BY s."createdAt" DESC
            `,
            [userId]
        );

        // Map rows into SubscriptionWithRelations structure
        const subscriptions: SubscriptionWithRelations[] = rows.map(row => {
            delete row.user.password;
            return row;
        });

        const response: ReadMultipleSubscriptionsResponse = {
            subscriptions
        };

        return NextResponse.json(
            { isSuccess: true, message: "Subscriptions fetched", ...response }
        );

    } catch (err) {
        console.error("Error fetching subscriptions:", err);
        return NextResponse.json(
            { isSuccess: false, message: "Server error" } as ResponseBase,
            { status: 500 }
        );
    }
}
