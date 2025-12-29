import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { BlackButton } from "@/features/shared/components/black-button";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";

export function FlightCard({ flight, fetchFlights }: { 
    flight: FlightDbRow & { isSubscribed: boolean };
    fetchFlights(): Promise<void>
}) {
    const departureTime = new Date(flight.departureScheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const flightDate = new Date(flight.flightDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    async function handleSubscribe() {
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/subscriptions/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flightId: flight.id })
        })).json() as ResponseBase;
        alert(response.message);
        await fetchFlights();
    }

    return (
        <div className="w-full md:w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
            {/* Flight header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold">Flight {flight.flightNumber}</h3>
                <span className="text-gray-800 text-sm sm:text-base">{flightDate}</span>
            </div>

            {/* Flight details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Departure time</p>
                    <p className="font-medium text-sm sm:text-base">{departureTime}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Status</p>
                    <p className="font-medium text-sm sm:text-base">{flight.status}</p>
                </div>
            </div>

            {/* Subscribe button */}
            <div className="flex justify-end">
                {!flight.isSubscribed ? 
                    <BlackButton onClick={handleSubscribe}>Subscribe</BlackButton>
                    :
                    <div className="cursor-default rounded-full bg-gray-400 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white transition">
                        Already Subscribed
                    </div>
                }
            </div>
        </div>
    );
}
