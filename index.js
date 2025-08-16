process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection:', reason)
})
/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : A
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import './config.js';
import { startDashboard } from './source/dasboard.js';
import * as baileys from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import pino from 'pino';
import PhoneNumber from 'awesome-phonenumber';
import readline from 'readline';
import { smsg } from './lib/myfunction.js';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { dataBase } from './source/database.js';
import { app, server, PORT } from './source/server.js';

const { proto, makeWASocket, useMultiFileAuthState, jidDecode } = baileys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usePairingCode = true;

// Fungsi prompt input terminal
const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(text, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const storeDB = dataBase(global.tempatStore);
const database = dataBase(global.tempatDB);

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./node_modules/.bin/Session');

  try {
    // Load database utama
    const loadData = await database.read();
    const storeLoadData = await storeDB.read();

    // Database umum
    if (!loadData || Object.keys(loadData).length === 0) {
      global.db = {
        hit: {},
        set: {},
        cmd: {},
        store: {},
        users: {},
        game: {},
        groups: {},
        database: {},
        premium: [],
        sewa: [],
      };
      await database.write(global.db);
    } else {
      global.db = loadData;
    }

    // Database store Baileys
    if (!storeLoadData || Object.keys(storeLoadData).length === 0) {
      global.store = {
        contacts: {},
        presences: {},
        messages: {},
        groupMetadata: {},
      };
      await storeDB.write(global.store);
    } else {
      // Convert keyId array → Set
      for (let jid in storeLoadData.messages) {
        if (Array.isArray(storeLoadData.messages[jid]?.keyId)) {
          storeLoadData.messages[jid].keyId = new Set(storeLoadData.messages[jid].keyId);
        }
      }
      global.store = storeLoadData;
    }

    // Auto save database & store setiap 30 detik
    setInterval(async () => {
      if (global.db) await database.write(global.db);
      if (global.store) {
        let saveData = JSON.parse(JSON.stringify(global.store, (key, value) => {
          if (value instanceof Set) return [...value];
          return value;
        }));
        await storeDB.write(saveData);
      }
    }, 30 * 1000);

  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  global.store.loadMessage = function (remoteJid, id) {
    const messages = global.store.messages?.[remoteJid]?.array;
    if (!messages) return null;
    return messages.find(msg => msg?.key?.id === id) || null;
  };

  const Ditss = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });

  // Pairing code
  if (usePairingCode && !Ditss.authState.creds.registered) {
    const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62:\n');
    const code = await Ditss.requestPairingCode(phoneNumber.trim());
    console.log(`Pairing code: ${code}`);
  }

  Ditss.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server) ? `${decode.user}@${decode.server}` : jid;
    } else return jid;
  };

  Ditss.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
      console.log('Koneksi terputus, mencoba menyambung ulang...', shouldReconnect);
      if (shouldReconnect) connectToWhatsApp();
    } else if (connection === 'open') {
        startDashboard(info, global.db, global.store);
      console.log('Bot berhasil terhubung!');
    }
  });

  Ditss.ev.on('creds.update', saveCreds);

  // Simpan pesan ke store.json
  Ditss.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages?.[0];
      if (!proto?.WebMessageInfo || !mek?.message || !mek.key) return;

      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
        ? mek.message.ephemeralMessage.message
        : mek.message;

      if (mek.key?.remoteJid === 'status@broadcast') return;
      if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
      if (mek.key.id.startsWith('Pondaaa_')) return;

      const remoteJid = mek.key.remoteJid;
      global.store.messages[remoteJid] ??= {};
      global.store.messages[remoteJid].array ??= [];
      global.store.messages[remoteJid].keyId ??= new Set();

      if (!(global.store.messages[remoteJid].keyId instanceof Set)) {
        global.store.messages[remoteJid].keyId = new Set(global.store.messages[remoteJid].array.map(m => m.key.id));
      }

      if (global.store.messages[remoteJid].keyId.has(mek.key.id)) return;

      global.store.messages[remoteJid].array.push(mek);
      global.store.messages[remoteJid].keyId.add(mek.key.id);

      if (global.store.messages[remoteJid].array.length > (global.chatLength || 250)) {
        const removed = global.store.messages[remoteJid].array.shift();
        global.store.messages[remoteJid].keyId.delete(removed.key.id);
      }

      if (!global.store.groupMetadata || Object.keys(global.store.groupMetadata).length === 0) {
        global.store.groupMetadata = await Ditss.groupFetchAllParticipating().catch(() => ({}));
      }

      const m = smsg(Ditss, mek, global.store);
      const { default: handlemsg } = await import('./WhatsApp.js');
      handlemsg(Ditss, m, chatUpdate, global.store);

    } catch (err) {
      console.log(chalk.redBright("Error on messages.upsert:"), err);
    }
  });
    
       Ditss.ev.on('groups.update', (update) => {
		for (const n of update) {
			if (store.groupMetadata[n.id]) {
				Object.assign(store.groupMetadata[n.id], n);
			} else store.groupMetadata[n.id] = n;
		}
	});

  Ditss.getName = async (jid, withoutContact = false) => {
    const id = Ditss.decodeJid(jid);
    withoutContact = Ditss.withoutContact || withoutContact;
    let v;

    if (id.endsWith("@g.us")) {
      return new Promise(async (resolve) => {
        v = global.store.contacts[id] || {};
        if (!(v.name || v.subject)) v = await Ditss.groupMetadata(id) || {};
        resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
      });
    } else {
      v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } :
        id === Ditss.decodeJid(Ditss.user.id) ? Ditss.user :
          (global.store.contacts[id] || {});

      return (withoutContact ? '' : v.name) || v.subject || v.verifiedName ||
        PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    }
  };

  Ditss.sendContact = async (jid, kon, quoted = '', opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await Ditss.getName(i + '@s.whatsapp.net'),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Ditss.getName(i + '@s.whatsapp.net')}\nFN:${await Ditss.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      });
    }
    Ditss.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted });
  };
}

connectToWhatsApp();

// Handle exit
const cleanup = async (signal) => {
  console.log(`Received ${signal}. Menyimpan database...`);
  if (global.db) await database.write(global.db);
  if (global.store) {
    let saveData = JSON.parse(JSON.stringify(global.store, (key, value) => {
      if (value instanceof Set) return [...value];
      return value;
    }));
    await storeDB.write(saveData);
  }
  server.close(() => {
    console.log('Server closed. Exiting...');
    process.exit(0);
  });
};

process.on('SIGINT', () => cleanup('SIGINT'));
process.on('SIGTERM', () => cleanup('SIGTERM'));
process.on('exit', () => cleanup('exit'));

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Address localhost:${PORT} in use. Please retry when the port is available!`);
    server.close();
  } else console.error('Server error:', error);
});

setInterval(() => {}, 1000 * 60 * 10);

fs.watchFile(__filename, () => {
  fs.unwatchFile(__filename);
  console.log(chalk.redBright(`Update ${__filename}`));
  import(`${import.meta.url}?update=${Date.now()}`).then(() => {
    console.log('Kode diperbarui!');
  }).catch(err => console.error('Gagal memperbarui:', err));
});