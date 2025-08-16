/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : dasboard.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import '../config.js';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { dirname, join } from 'path';
import os from 'os';
import axios from 'axios';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { sizeFormatter } from 'human-readable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});

let dashboardShown = false; // <- pastikan hanya sekali tampil

export async function startDashboard(info, globalDb, globalStore) {
    try {
        if (dashboardShown) return; // keluar kalau sudah ditampilkan
        dashboardShown = true;

        const packageJsonPath = join(__dirname, '../package.json'); // sesuaikan folder root
        const jarsekaiFolder = join(__dirname, '../'); // folder utama untuk hitung plugin

        const totalFoldersAndFiles = await getTotalFoldersAndFiles(jarsekaiFolder);
        const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
        const packageJsonObj = JSON.parse(packageJsonData);
        const { data: ip } = await axios.get('https://api.ipify.org');

        const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
        const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);

        const dbUsers = globalDb?.users ? Object.keys(globalDb.users).length : 0;
        const dbGroups = globalDb?.groups ? Object.keys(globalDb.groups).length : 0;
        const dbGame = globalDb?.game ? Object.keys(globalDb.game).length : 0;
        const storeContacts = globalStore?.contacts ? Object.keys(globalStore.contacts).length : 0;

        console.clear();
        console.log(`❲ Dashboard ❳
• Name Bot: ${chalk.white(packageJsonObj.name)}
• Versi Script: ${chalk.white(packageJsonObj.version)}
• Deskripsi: ${chalk.white(packageJsonObj.description)}
• OS: ${chalk.white(os.type())}
• CPU: ${chalk.white(os.cpus()[0].model)}
• Memory: ${chalk.white(freeRamInGB.toFixed(2) + ' / ' + ramInGB.toFixed(2))} GB
• IP Publik: ${chalk.red(ip)}
• Nama Pengguna: ${chalk.white(info.namaowner)}

❲ ${chalk.bgCyan(chalk.black('Database & Store'))} ❳
• Total User: ${chalk.white(dbUsers)}
• Total Group: ${chalk.white(dbGroups)}
• Total Game: ${chalk.white(dbGame)}
• Total Store Contacts: ${chalk.white(storeContacts)}

❲ ${chalk.bgGreen(chalk.black('Plugins'))} ❳
• Total File: ${chalk.white(totalFoldersAndFiles.files)}
• Total Folder: ${chalk.white(totalFoldersAndFiles.folders)}
• Creator Script: ${chalk.bold.cyan('ditss.')}
`);
    } catch (err) {
        console.error(chalk.red(`❌ Gagal menampilkan dashboard: ${err}`));
    }
}

async function getTotalFoldersAndFiles(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) reject(err);
            else {
                let folders = 0;
                let filesCount = 0;
                files.forEach((file) => {
                    const filePath = join(folderPath, file);
                    if (fs.statSync(filePath).isDirectory()) folders++;
                    else filesCount++;
                });
                resolve({ folders, files: filesCount });
            }
        });
    });
    }
