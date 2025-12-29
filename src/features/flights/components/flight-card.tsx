import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { BlackButton } from "@/features/shared/components/black-button";
import { ResponseBase } from "@/features/shared/types/response/response-base.response";

export function FlightCard({ flight }: { flight: FlightDbRow & { isSubscribed: boolean } }) {
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
    }

    return (
        <div className="w-[700px] bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            {/* Flight header */}
            <div className="w-[400px] flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Flight {flight.flightNumber}</h3>
                <span className="text-gray-800">{flightDate}</span>
            </div>

            {/* Flight details */}
            <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                    <p className="text-gray-500 text-sm">Departure time</p>
                    <p className="font-medium">{departureTime}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-medium">{flight.status}</p>
                </div>
            </div>

            {/* Subscribe button */}
            <div className="flex justify-end">
                {!flight.isSubscribed ? 
                    <BlackButton onClick={async (event) => await handleSubscribe()}>Subscribe</BlackButton>
                    :
                    <div className="cursor-default rounded-full bg-gray-400 px-4 py-2 text-sm text-white transition">
                        Already Subscribed
                    </div>
                }
            </div>
        </div>
    );
}
