import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.owner = "6281513607731"
// Definisi global info
global.info = {
    owner: ['6281513607731'],
    namabot: 'DitssBot',
    nama_owner: 'ditss.'
};
global.limit = {
	free: 20,
	premium: 999,
	vip: 9999
}

global.user = {
    owner: 'ⓞ',       // Owner
    admin: 'Ⓐ',       // Admin
    premium: 'Ⓟ',     // Premium
    limit: 'Ⓛ',       // Limit
    vip: 'Ⓥ',         // VIP
    member: 'Ⓜ',      // Member
    guest: 'Ⓖ'        // Guest
}

global.money = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

global.api = {
    ditss: "https://api-ditss.vercel.app",
    example: "https://example.com/api"
};
global.ress = {
    key: 'Apikey Anda telah habis',
    owner: `${global.user?.owner || 'ⓞ'} Fitur Khusus Owner!`,
    admin: `${global.user?.admin || 'Ⓐ'} Fitur Khusus Admin!`,
    BotAdmin: 'Bot Bukan Admin!',
    ingroup: 'Gunakan di Group!',
    private: 'Gunakan di Privat Chat!',
    limit: `${global.user?.limit || 'Ⓛ'} Limit Anda Telah Habis!`,
    premium: `${global.user?.premium || 'Ⓟ'} Khusus User Premium!`,
    wait: 'Loading...',
    error: 'Error!',
    done: 'Done'
}


//db
global.tempatDB = 'database.json' // Taruh url mongodb di sini jika menggunakan mongodb. Format : 'mongodb+srv://...'
global.tempatStore = 'baileys_store.json' // Taruh url mongodb di sini jika menggunakan mongodb. Format : 'mongodb+srv://...'

// Hot reload opsional
fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Config diperbarui: ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`)
        .then(() => console.log('Config berhasil reload!'))
        .catch(err => console.error('Gagal reload config:', err));
});