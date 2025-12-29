import { db } from "@/db";
import { FlightDbRow } from "@/features/flights/types/flight-db-row.interface";
import { sendStatusChangeEmail } from "@/features/subscriptions/utilities/send-status-change-email.util";

export async function notifySubscribedUsers(flightId: number): Promise<void> {
    debugger;
    const { rows: subscribers } = await db.query<{ email: string }>(
        `SELECT u.email
         FROM subscriptions s
         JOIN users u ON s."userId" = u.id
         WHERE s."flightId" = $1`,
        [flightId]
    );

    if (!subscribers.length) return;

    const { rows } = await db.query<FlightDbRow>(
        `SELECT * FROM flights WHERE id = $1`,
        [flightId]
    );

    if (!rows.length) return;
    const flight = rows[0];

    await Promise.all(subscribers.map(subscriber => sendStatusChangeEmail(subscriber.email, flight)))
}
