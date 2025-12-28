import { Pool } from "pg";

export const db = new Pool({
    connectionString: process.env.DB_URL,
});

export async function waitForDb(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            // Use a simple query that doesn't depend on table existence
            await db.query("SELECT 1");
            console.log("✅ Database connected");
            return;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log(JSON.stringify(error, null, 2))
            console.log(`⏳ Waiting for DB... (${i + 1}/${retries}) - Error: ${errorMessage}`);
            
            // Log connection details for debugging (without sensitive info)
            if (i === 0) {
                const dbUrl = process.env.DB_URL;
                if (!dbUrl) {
                    console.error("❌ DB_URL environment variable is not set!");
                } else {
                    // Log connection string without password
                    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@');
                    console.log(`🔍 Connection string: ${maskedUrl}`);
                }
            }
            
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error("❌ Database not reachable after all retries");
}
