import { BlackButton } from "@/features/shared/components/black-button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Hero */}
            <section className="flex flex-col items-center justify-center px-6 pt-32 text-center">
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                AeroNotify
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600">
                Smart flight monitoring with real-time email notifications.
            </p>
            <div className="mt-10 flex gap-4">
                <Link href="/sign-up">
                    <BlackButton>
                    Get Started
                    </BlackButton>
                </Link>
            </div>
            </section>

            {/* Divider */}
            <div className="mx-auto my-24 h-px max-w-5xl bg-gray-200" />

            {/* About */}
            <section className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-medium">
                Built for IoT Principles
            </h2>
            <p className="mt-6 text-gray-600">
                AeroNotify is an IoT-based system developed as part of the IoT Principles
                lecture. It continuously monitors airline flights and notifies users
                when flight status information changes.
            </p>
            <p className="mt-6 text-gray-600">
                Integrates the Aviationstack API for flights data. This third-party API acts as a sensor, and sending emails to subscribed users functions as an actuator.
            </p>
            <p className="mt-6 text-gray-600">
                For simplicity and quick testability. App filters the data by Turkish Airlines, Istanbul Airport departure airport and Antalya Airport for arrival airport.
            </p>
            </section>

            {/* Features */}
            <section className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
            <div className="text-center">
                <h3 className="text-lg font-medium">Subscribe to Flights</h3>
                <p className="mt-3 text-sm text-gray-600">
                    For simplicity and easy testing, the app filters flights to Turkish Airlines, departing from Istanbul Airport and arriving at Antalya Airport.
                </p>
            </div>

            <div className="text-center">
                <h3 className="text-lg font-medium">Smart Monitoring</h3>
                <p className="mt-3 text-sm text-gray-600">
                    Periodic checks detect status changes automatically.
                </p>
            </div>

            <div className="text-center">
                <h3 className="text-lg font-medium">Instant Alerts</h3>
                <p className="mt-3 text-sm text-gray-600">
                    Receive email notifications only when status any of subscribed flights changes.
                </p>
            </div>
            </section>

            {/* Footer */}
            <footer className="mt-32 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
            AeroNotify — IoT Principles Project
            </footer>
        </main>
    );
}
