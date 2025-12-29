import { db } from "@/db";
import { AviationstackFlightStatus } from "@/features/flights/types/aviataion-stack/aviationstack-flight-status.enum";
import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { NextRequest, NextResponse } from "next/server";
import { dummyData } from "../../../../../dummy-data";

export async function GET(req: NextRequest) {
    debugger;
    console.log('🛫 fetching flights...');
    
    // const response = await (await fetch(`${process.env.AVIATION_STACK_API_BASE_URL}?access_key=${process.env.AVIATIONSTACK_API_KEY}&airline_iata=TK&dep_iata=IST&arr_iata=AYT`)).json() as AviataionstackFlightsResponse;
    const response = dummyData;

    console.log(`found ${response.data.length} Antalya flights`);

    const { rows: storedFlights } = await db.query<FlightDbRow>(
        `SELECT * FROM flights`
    )

    for (const flight of response.data) {
        debugger;
        const flightInfo = {
            flightNumber: Number(flight.flight.number),
            flightDate: `${new Date(flight.flight_date).getFullYear()}-${new Date(flight.flight_date).getMonth() + 1}-${new Date(flight.flight_date).getDate()}`,
            departureScheduled: new Date(flight.departure.scheduled),
            status: flight.flight_status && flight.flight_status !== 'unknown' ? flight.flight_status : (
                new Date(flight.departure.scheduled).getTime() - new Date().getTime() > 0 ? AviationstackFlightStatus.Scheduled : new Date(flight.arrival.scheduled).getTime() - new Date().getTime() > 0 ? AviationstackFlightStatus.Active : AviationstackFlightStatus.Landed
            ),
        }

        const existingFlight = storedFlights.find(flightDbRow =>{
            const storedFlightDate = `${flightDbRow.flightDate.getFullYear()}-${flightDbRow.flightDate.getMonth() + 1}-${flightDbRow.flightDate.getDate()}`

            return flightDbRow.flightNumber === flightInfo.flightNumber &&
            storedFlightDate === flightInfo.flightDate &&
            flightDbRow.departureScheduled.toISOString() === flightInfo.departureScheduled.toISOString()
        })

        if (!existingFlight) {
            await db.query(
                `INSERT INTO flights ("flightNumber", "flightDate", "departureScheduled", status) VALUES ($1, $2, $3, $4)`,
                [flightInfo.flightNumber, flightInfo.flightDate, flightInfo.departureScheduled, flightInfo.status]
            )

            console.log(`new flight added: TK${flightInfo.flightNumber}`);
            continue;
        }

        if (existingFlight.status !== flightInfo.status) {
            await db.query(
                `UPDATE flights
                SET status = $1
                WHERE "flightNumber" = $2 AND "flightDate" = $3 AND "departureScheduled" = $4`,
                [flightInfo.status, flightInfo.flightNumber, flightInfo.flightDate, flightInfo.departureScheduled]
            );

            console.log(`status change on flight TK${flightInfo.flightNumber}, updated to ${flightInfo.status} from ${existingFlight.status}`);

            // TODO: notify subscribed users via email here
        }
    }

    console.log("flight sync completed");
    const responseJSON: ResponseBase = {
        isSuccess: true,
        message: 'success'
    }
    return NextResponse.json(responseJSON);
}