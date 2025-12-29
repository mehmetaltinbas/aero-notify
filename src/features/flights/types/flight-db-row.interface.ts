import { AviationstackFlightStatus } from "@/features/flights/types/aviataion-stack/aviationstack-flight-status.enum";

export interface FlightDbRow {
    flightNumber: number;
    flightDate: Date;
    departureScheduled: Date;
    status: AviationstackFlightStatus;
}
