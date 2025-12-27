import { FlightStatus } from "@/features/flights/types/aviataion-stack/flight-status.enum";

export interface FlightDbRow {
    flightNumber: number;
    flightDate: Date;
    arrivalIata: string;
    status: FlightStatus;
    delay: number;
}
