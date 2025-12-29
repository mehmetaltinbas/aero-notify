import { FlightDbRow } from '@/features/flights/types/flight-db-row.interface';
import nodemailer from 'nodemailer';

export async function sendStatusChangeEmail(to: string, flight: FlightDbRow) {
    debugger;
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const subject = `Flight TK${flight.flightNumber} status changed`;
    const text = `
        Flight TK${flight.flightNumber} on ${flight.flightDate.toLocaleString("en-US", { month: "long" })} ${flight.flightDate.getDate()} ${flight.flightDate.getFullYear()} has changed status to ${flight.status}.
        Departure time: ${flight.departureScheduled.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
    `;

    await transporter.sendMail({
        from: `"Aero Notify" <no-reply@aero.com>`,
        to,
        subject,
        text,
    });

    console.log(`✉️  Email sent to ${to} for flight TK${flight.flightNumber}`);
}
