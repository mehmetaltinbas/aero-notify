import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';
import './interval';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    console.log('server starting...');
    
    createServer(async (req, res) => {
        const parsedUrl = parse(req.url!, true);
        await handle(req, res, parsedUrl);
    }).listen(port, async () => {
        console.log(`server ready`);
    });
});
