import dotenv from 'dotenv';
import http from 'http';
import https from 'https';

dotenv.config();

let isRunning: boolean = false

setInterval(
    async () => {
        if (isRunning) return;
        isRunning = true;

        console.log("interval: ", process.env.NEXT_PUBLIC_APP_BASE_URL);

        try {
            const client = process.env.NODE_ENV === 'development' ? http : https;
            await new Promise<void>((resolve, reject) => {
                client
                    .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/flights/update`, (res) => {
                        if (res.statusCode === 200) {
                            console.log(
                                `[interval] flights updated at ${new Date().toISOString()}`,
                            );
                            resolve()
                        } else {
                            console.log(
                                `[interval] falied to update flights ${res.statusCode} at ${new Date().toISOString()}`,
                            );
                            resolve();
                        }
                    })
                    .on('error', (e) => {
                        console.error(
                            `[interval] error: ${e.message} at ${new Date().toISOString()}`,
                        );
                        reject(e);
                    });
            })
        } finally {
            isRunning = false
        }
    },
    360 * 60 * 1000,
)
