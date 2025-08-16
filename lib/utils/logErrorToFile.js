/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : logErrorToFile.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import fs from 'fs';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lokasi penyimpanan database/error.json
const errorFilePath = path.join(__dirname, '../../database/error.json');

export async function logErrorToFile(e, m) {
    try {
        const errorData = {
            time: new Date().toISOString(),
            user: m?.pushName || "Unknown User",
            no: m?.sender || "Unknown Number",
            name: e?.name || "UnknownError",
            message: e?.message || String(e),
            stack: e?.stack || util.format(e)
        };

        // Pastikan folder database ada
        const dbDir = path.dirname(errorFilePath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        let logs = [];
        if (fs.existsSync(errorFilePath)) {
            try {
                logs = JSON.parse(fs.readFileSync(errorFilePath, 'utf8'));
            } catch {
                logs = [];
            }
        }

        logs.push(errorData);
        fs.writeFileSync(errorFilePath, JSON.stringify(logs, null, 2));
    } catch (err) {
        console.error('Gagal menyimpan log error:', err);
    }
}