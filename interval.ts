import dotenv from 'dotenv';
import http from 'http';
import https from 'https';

dotenv.config();

setInterval(
    () => {
        console.log("inside interval: ", process.env.NEXT_PUBLIC_APP_BASE_URL)
        const client = process.env.NODE_ENV === 'development' ? http : https;
        client
            .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/flights/update`, (res) => {
                if (res.statusCode === 200) {
                    console.log(
                        `[interval] flights updated at ${new Date().toISOString()}`,
                    );
                } else {
                    console.log(
                        `[interval] falied to update flights ${res.statusCode} at ${new Date().toISOString()}`,
                    );
                }
            })
            .on('error', (e) => {
                console.error(
                    `[interval] error: ${e.message} at ${new Date().toISOString()}`,
                );
            });
    },
    0.25 * 60 * 1000,
)
