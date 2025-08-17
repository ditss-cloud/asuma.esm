/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : server.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import express from 'express';
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fsPromises } from 'fs';

// Setup __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ambil package.json tanpa assert
const packageJsonPath = join(__dirname, '../package.json');
const packageInfo = JSON.parse(await fsPromises.readFile(packageJsonPath, 'utf8'));

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

app.all('/', (req, res) => {
    if (process.send) {
        process.send('uptime');
        process.once('message', (uptime) => {
            res.json({
                bot_name: packageInfo.name,
                version: packageInfo.version,
                author: packageInfo.author,
                description: packageInfo.description,
                uptime: `${Math.floor(uptime)} seconds`
            });
        });
    } else {
        res.json({ error: 'Process not running with IPC' });
    }
});

app.all('/process', (req, res) => {
    const { send } = req.query;
    if (!send) return res.status(400).json({ error: 'Missing send query' });
    if (process.send) {
        process.send(send);
        res.json({ status: 'Send', data: send });
    } else {
        res.json({ error: 'Process not running with IPC' });
    }
});

app.all('/chat', (req, res) => {
    const { message, to } = req.query;
    if (!message || !to) return res.status(400).json({ error: 'Missing message or to query' });
    res.json({ status: 200, mess: 'does not start' });
});

export { app, server, PORT };
