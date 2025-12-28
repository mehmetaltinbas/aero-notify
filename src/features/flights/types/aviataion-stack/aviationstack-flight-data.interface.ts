import { AviationstackAirline } from "@/features/flights/types/aviataion-stack/aviationstack-airline.interface";
import { AviationstackFlightInfo } from "@/features/flights/types/aviataion-stack/aviationstack-flight-info.interface";
import { AviationstackFlightStatus } from "@/features/flights/types/aviataion-stack/aviationstack-flight-status.enum";
import { AviationstackFlightTime } from "@/features/flights/types/aviataion-stack/aviationstack-flight-time.interface";

export interface AviationstackFlightData {
    flight_date: Date;
    flight_status: AviationstackFlightStatus;
    departure: AviationstackFlightTime;
    arrival: AviationstackFlightTime;
    airline: AviationstackAirline;
    flight: AviationstackFlightInfo;
    aircraft: unknown | null;
    live: unknown | null;
}
