import { db } from "@/db";
import { AviataionstackFlightsResponse } from "@/features/flights/types/aviataion-stack/aviationstack-flights-response.interface";
import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    debugger;
    console.log('🛫 Fetching flights...');
    
    const response = await (await fetch(`${process.env.AVIATION_STACK_API_BASE_URL}?access_key=${process.env.AVIATIONSTACK_API_KEY}&airline_iata=TK&dep_iata=IST&arr_iata=AYT`)).json() as AviataionstackFlightsResponse;

    console.log(`found ${response.data.length} Antalya flights`);

    const { rows: storedFlights } = await db.query<FlightDbRow>(
        `SELECT * FROM flights`
    )

    for (const flight of response.data) {
        const flightInfo = {
            flightNumber: Number(flight.flight.number),
            flightDate: new Date(flight.flight_date),
            departureScheduled: new Date(flight.departure.scheduled),
            status: flight.flight_status
        }

        const existingFlight = storedFlights.find(f =>
            f.flightNumber === flightInfo.flightNumber &&
            f.flightDate.toISOString().split('T')[0] === flightInfo.flightDate.toISOString().slice(0, 10)
        )

        if (!existingFlight) {
            await db.query(
                `INSERT INTO flights (flightNumber, flightDate, departureScheduled, status) VALUES ($1, $2, $3, $4)`,
                [flightInfo.flightNumber, flightInfo.flightDate, flightInfo.departureScheduled, flightInfo.status]
            )

            console.log(`new flight added: TK${flightInfo.flightNumber}`);
            continue;
        }

        if (existingFlight.status !== flightInfo.status) {
            await db.query(
                `UPDATE flights
                SET status = $1
                WHERE flightNumber = $2 AND flightDate = $3 AND departureScheduled = $4`,
                [flightInfo.status, flightInfo.flightNumber, flightInfo.flightDate, flightInfo.departureScheduled]
            );

            console.log(`🔔 Flight updated: TK${flightInfo.flightNumber}`);

            // TODO: notify subscribed users via email here
        }
    }

    console.log("✅ Flight sync completed");
    const responseJSON: ResponseBase = {
        isSuccess: true,
        message: 'success'
    }
    return NextResponse.json(responseJSON);
}