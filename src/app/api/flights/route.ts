import { db } from "@/db";
import { ReadMultipleFlightsResponse } from "@/features/flights/types/response/flights-response.interface";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { rows } = await db.query(`SELECT * FROM flights`);

        const response: ReadMultipleFlightsResponse = { 
            isSuccess: true,
            message: 'read all',
            flights: rows
        }
        return NextResponse.json(response)
    } catch (error) {
        const response: ResponseBase = {
            isSuccess: false,
            message: 'failed to read flights',
        };

        return NextResponse.json(response, { status: 500 });
    }
}
