'use client';

import { useEffect, useState } from 'react';

export default function FlightsPage() {
    const [flights, setFlights] = useState<Array<object>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFlights = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_BASE_URL}/flights`
        );
        const data = await response.json();
        setFlights(data.data || []);
        setIsLoading(false);
        };

        fetchFlights();
    }, []);

    return ( isLoading ?
        <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading flights...
        </div>
        :
        <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
            Turkish Airlines Flights (TK)
        </h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight, index) => (
            <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
                <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">
                    {flight.flight.iata}
                </span>
                <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {flight.flight_status}
                </span>
                </div>

                <div className="text-sm text-gray-600">
                <p>
                    <strong>From:</strong> {flight.departure.airport} (
                    {flight.departure.iata})
                </p>
                <p>
                    <strong>To:</strong> {flight.arrival.airport} (
                    {flight.arrival.iata})
                </p>
                </div>

                <div className="mt-3 text-sm">
                <p>
                    <strong>Departure Delay:</strong>{' '}
                    {flight.departure.delay ?? 0} min
                </p>
                <p>
                    <strong>Arrival Delay:</strong>{' '}
                    {flight.arrival.delay ?? 0} min
                </p>
                </div>
            </div>
            ))}
        </div>
        </main>
    );
}
