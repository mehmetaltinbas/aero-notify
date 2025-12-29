import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { SubscriptionDbRow } from "@/features/subscriptions/types/subscription-db-row.interface";
import { UserDbRow } from "@/features/users/types/user-db-row.interface";

export type SubscriptionWithRelations = SubscriptionDbRow & {
    flight: FlightDbRow;
    user: UserDbRow;
};
