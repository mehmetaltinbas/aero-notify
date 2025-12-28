import { fetchAndUpdateFlights } from '@/features/flights/utils/fetch-and-update-flights.util';
import { sleep } from '@/features/shared/utils/sleep.util';
import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    console.log('🚀 Server starting...');
    
    // Cron job - runs every 6 hour
    // cron.schedule('0 */6 * * *', async () => {
    //     console.log('⏰ Cron triggered:', new Date().toISOString());
    //     await fetchAndUpdateFlights()
    // });

    await sleep(5 * 1000)
    console.log('\n✈️ Fetching flights (one-time run)...');
    await fetchAndUpdateFlights();
    console.log('\n✅ Flight update completed');
    
    console.log('\n✅ Cron job started - runs every 6 hour');
    
    createServer(async (req, res) => {
        const parsedUrl = parse(req.url!, true);
        await handle(req, res, parsedUrl);
    }).listen(port, () => {
        console.log(`✅ Server ready on http://localhost:${port}`);
    });
});
