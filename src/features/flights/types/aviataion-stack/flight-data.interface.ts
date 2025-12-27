import { Airline } from "@/features/flights/types/aviataion-stack/airline.interface";
import { FlightInfo } from "@/features/flights/types/aviataion-stack/flight-info.interface";
import { FlightStatus } from "@/features/flights/types/aviataion-stack/flight-status.enum";
import { FlightTime } from "@/features/flights/types/aviataion-stack/flight-time.interface";

export interface FlightData {
    flight_date: Date;
    flight_status: FlightStatus;
    departure: FlightTime;
    arrival: FlightTime;
    airline: Airline;
    flight: FlightInfo;
    aircraft: unknown | null;
    live: unknown | null;
}
