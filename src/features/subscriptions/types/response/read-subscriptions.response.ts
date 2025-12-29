import { SubscriptionWithRelations } from "@/features/subscriptions/subscription-db-row-with-relations.type";

export interface ReadMultipleSubscriptionsResponse {
    subscriptions: SubscriptionWithRelations[]
}
