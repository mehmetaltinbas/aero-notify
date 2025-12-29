'use client';

import { FlightCard } from '@/features/flights/components/flight-card';
import { FlightDbRow } from '@/features/flights/types/flight-db-row.interface';
import { ReadMultipleFlightsResponse } from '@/features/flights/types/response/flights-response.interface';
import { BlackButton } from '@/features/shared/components/black-button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FlightsPage() {
    const [flights, setFlights] = useState<Array<FlightDbRow & { isSubscribed: boolean }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchFlights() {
            const response = await (await fetch(
                `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/flights`
            )).json() as ReadMultipleFlightsResponse;
            setFlights(response.flights || []);
            setIsLoading(false);
        }

        fetchFlights();
    }, []);

    async function handleSignOut() {
        await fetch('/api/users/sign-out', { method: 'POST' });
        router.push('/');
    }

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-gray-400 text-lg">
                <div className="animate-pulse mb-4 w-16 h-16 rounded-full bg-gray-300"></div>
                Loading flights...
            </div>
        );
    }

    return (
        <main className="min-h-screen p-4 md:p-8 bg-gray-50 relative">
            {/* Sign Out Button */}
            <div className="absolute top-4 right-4">
                <BlackButton onClick={handleSignOut}>Sign Out</BlackButton>
            </div>

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center mb-8 px-2">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Turkish Airlines Flights (TK)</h1>
                <p className="text-sm sm:text-lg text-gray-600">
                    Departure: Istanbul Airport &nbsp;•&nbsp; Arrival: Antalya Airport
                </p>
            </div>

            {/* Flight list */}
            <div className="max-w-3xl mx-auto flex flex-col gap-6 px-2">
                {flights.map((flight, index) => (
                    <FlightCard key={`flight-${flight.id}-${index}`} flight={flight} fetchFlights={async () => {
                        const response = await (await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/flights`)).json() as ReadMultipleFlightsResponse;
                        setFlights(response.flights || []);
                    }} />
                ))}
            </div>
        </main>
    );
}
