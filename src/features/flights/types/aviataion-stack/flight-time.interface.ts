export interface FlightTime {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay?: number | null;
    baggage?: string | null;
    scheduled: string;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
}
