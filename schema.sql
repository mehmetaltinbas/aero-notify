DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,

    "flightNumber" INTEGER NOT NULL,
    "flightDate" DATE NOT NULL,
    "arrivalIata" TEXT NOT NULL,

    status TEXT NOT NULL,
    delay INTEGER NOT NULL DEFAULT 0,

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE ("flightNumber", "flightDate", "arrivalIata")
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,

    "userId" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY ("flightId") REFERENCES flights(id) ON DELETE CASCADE,

    UNIQUE ("userId", "flightId")
);
