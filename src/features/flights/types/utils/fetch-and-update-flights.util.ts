import { db } from "@/db";
import { EUROPEAN_TIMEZONES } from "@/features/flights/constants/european-timezones.constant";
import { FlightData } from "@/features/flights/types/aviataion-stack/flight-data.interface";
import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";

// cron job
export async function fetchAndUpdateFlights(): Promise<void> {
    console.log('🛫 Fetching flights...');
    
    const response = await fetch(`${process.env.AVIATIONSTACK_API_URL}?access_key=${process.env.AVIATONSTACK_API_KEY}&airline_iata=TK&dep_iata=IST`);
    const data = await response.json();
    
    // Filter only European timezone flights
    const europeanFlights: FlightData[] = data.data.filter((flight: FlightData) => {
        return flight.arrival?.timezone && EUROPEAN_TIMEZONES.includes(flight.arrival.timezone as any);
    });
    
    console.log(`✅ Found ${europeanFlights.length} European flights`);

    const { rows: storedFlights } = await db.query<FlightDbRow>(
        `SELECT * FROM flights`
    )

    for (const flight of europeanFlights) {
        const flightInfo = {
            flightNumber: Number(flight.flight.number),
            flightDate: new Date(flight.flight_date),
            arrivalIata: flight.arrival.iata,
            status: flight.flight_status,
            delay: flight.arrival.delay ?? 0
        }

        const existingFlight = storedFlights.find(f =>
            f.flightNumber === flightInfo.flightNumber &&
            f.flightDate.toISOString().split('T')[0] === flightInfo.flightDate.toISOString().slice(0, 10) &&
            f.arrivalIata === flightInfo.arrivalIata
        )

        if (!existingFlight) {
            await db.query(
                `INSERT INTO flights (flightNumber, flightDate, arrivalIata, status, delay) VALUES ($1, $2, $3, $4, $5)`,
                [flightInfo.flightNumber, flightInfo.flightDate, flightInfo.arrivalIata, flightInfo.status, flightInfo.delay]
            )

            console.log(`🔔 Flight updated: TK${flightInfo.flightNumber}`);

            // TODO: notify subscribed users via email here
        }
    }
}
