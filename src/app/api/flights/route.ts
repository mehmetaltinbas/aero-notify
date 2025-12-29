import { db } from "@/db";
import { AviationstackFlightStatus } from "@/features/flights/types/aviataion-stack/aviationstack-flight-status.enum";
import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { ReadMultipleFlightsResponse } from "@/features/flights/types/response/flights-response.interface";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { isSuccess: false, message: "Unauthorized: missing userId" } as ResponseBase,
                { status: 401 }
            );
        }

        // Fetch all flights
        const { rows: flights } = await db.query(`SELECT * FROM flights`);

        // Fetch all flight IDs the user is subscribed to
        const { rows: subscribedRows } = await db.query(
            `SELECT "flightId" FROM subscriptions WHERE "userId" = $1`,
            [userId]
        );
        const subscribedFlightIds = subscribedRows.map((r) => r.flightId);

        // Map flights and add isSubscribed
        const flightsWithSubscription = flights
            .filter((f: FlightDbRow) => f.status !== AviationstackFlightStatus.Landed)
            .map((f: FlightDbRow) => ({
                ...f,
                isSubscribed: subscribedFlightIds.includes(f.id),
            }));

        return NextResponse.json({
            isSuccess: true,
            message: "read all",
            flights: flightsWithSubscription,
        } as ReadMultipleFlightsResponse);
    } catch (error) {
        return NextResponse.json(
            { isSuccess: false, message: "failed to read flights" } as ResponseBase,
            { status: 500 }
        );
    }
}
