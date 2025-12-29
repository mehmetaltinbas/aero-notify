import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";

export interface ReadMultipleFlightsResponse extends ResponseBase {
    flights: (FlightDbRow & { isSubscribed: boolean })[]
}
