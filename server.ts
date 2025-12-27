import { fetchAndUpdateFlights } from '@/features/flights/types/utils/fetch-and-update-flights.util';
import { createServer } from 'http';
import next from 'next';
import cron from 'node-cron';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    console.log('🚀 Server starting...');
    
    // Cron job - runs every 3 hour
    cron.schedule('0 */3 * * *', async () => {
        console.log('⏰ Cron triggered:', new Date().toISOString());
        await fetchAndUpdateFlights()
    });
    
    console.log('✅ Cron job started - runs every hour');
    
    createServer(async (req, res) => {
        const parsedUrl = parse(req.url!, true);
        await handle(req, res, parsedUrl);
    }).listen(port, () => {
        console.log(`✅ Server ready on http://localhost:${port}`);
    });
});
