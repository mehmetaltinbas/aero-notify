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
          <button className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800">
            Get Started
          </button>
          <button className="rounded-full border border-gray-300 px-6 py-3 transition hover:bg-gray-100">
            Learn More
          </button>
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
          when flight status or delay information changes.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
        <div className="text-center">
          <h3 className="text-lg font-medium">Flight Tracking</h3>
          <p className="mt-3 text-sm text-gray-600">
            View flights for a selected airline across a 10-day period.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium">Smart Monitoring</h3>
          <p className="mt-3 text-sm text-gray-600">
            Periodic checks detect status and delay changes automatically.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium">Instant Alerts</h3>
          <p className="mt-3 text-sm text-gray-600">
            Receive email notifications only when something changes.
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
