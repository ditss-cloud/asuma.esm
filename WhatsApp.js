import './config.js';
import chalk from 'chalk';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import util from 'util';
import axios from 'axios';
import cron from 'node-cron';
import moment from 'moment-timezone';
import { spawn, exec, execSync } from 'child_process';
import PhoneNumber from 'awesome-phonenumber';
import { LoadDataBase } from './source/loadDatabase.js';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { getBuffer } from './lib/fetchBuffer.js';
import { detectOperator } from './lib/func/detectOperator.js';
import { logErrorToFile } from './lib/utils/logErrorToFile.js';
import { fetchJson } from './lib/utils/fetchJson.js';
import { 
    cmdAdd, 
    cmdDel, 
    cmdAddHit, 
    addExpired, 
    getPosition, 
    getExpired, 
    getStatus, 
    checkStatus, 
    getAllExpired, 
    checkExpired 
} from './source/database.js';
import * as baileys from '@whiskeysockets/baileys';
const { proto, 
       makeWASocket, 
       useMultiFileAuthState, 
       jidDecode,
       delay
} = baileys;
const errorCache = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const errorFilePath = join(__dirname, 'database', 'error.json');

// Ambil package.json
const packageJsonPath = join(__dirname, 'package.json');
const pkg = JSON.parse(await fsPromises.readFile(packageJsonPath, 'utf8'));
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
export default async function (Ditss, m, store) {
    await LoadDataBase(Ditss, m);
    try {
let body = "";

try {
    body =
        // Versi baru Baileys, button/list interaktif
        (m.mtype === 'interactiveResponseMessage'
            ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson || "{}")?.id
            : "") ||

        // Chat biasa
        m.message?.conversation ||

        // Caption media
        m.message?.imageMessage?.caption ||
        m.message?.videoMessage?.caption ||

        // Extended text
        m.message?.extendedTextMessage?.text ||

        // Tombol versi lama
        m.message?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        m.message?.templateButtonReplyMessage?.selectedId ||

        // Context info tombol/list
        m.message?.messageContextInfo?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.messageContextInfo?.listResponseMessage?.singleSelectReply?.selectedRowId ||

        // Fallback terakhir (kalau semua kosong)
        m.text ||
        "";
} catch {
    // Kalau parsing gagal
    body = m.text || "";
}

body = body.trim();
        const budy = (typeof m.text == 'string' ? m.text : '')
m.device = /^3A/.test(m.id) ? 'ios' : m.id.startsWith('3EB') ? 'web' : /^.{21}/.test(m.id) ? 'android' : /^.{18}/.test(m.id) ? 'desktop' : 'unknown';
  // Ambil admin grup
const getGroupAdmins = (participants) => {
    return participants
        .filter(u => u.admin === 'admin' || u.admin === 'superadmin')
        .map(u => u.jid);
};

// Normalisasi JID
const normalize = jid => jid.split(':')[0] + '@s.whatsapp.net';

// Nomor bot
const botNumber = Ditss.decodeJid(Ditss.user.id);

// Metadata & peserta grup
const groupMetadata = m.isGroup ? await Ditss.groupMetadata(m.chat).catch(() => ({})) : null;
const groupMembers = m.isGroup ? groupMetadata.participants || [] : [];
const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : [];

// Cek status
        const isBotAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(botNumber)) : false;
        const isAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(m.sender)) : false;
        // isAdmin
        m.isAdmins = isAdmins
        m.isAdmin = isAdmins
        let isAdmin = isAdmins
        // bot admin
        m.isBotAdmin = isBotAdmins
        m.isBotAdmins = isBotAdmins
        let isBotAdmin = isBotAdmins
        
        // db
        const userdb = global.db.users[m.sender]
        const set = db.set[botNumber]
        const premium = db.premium
        const prefixMatch = body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi);
        const prefix = prefixMatch ? prefixMatch[0] : "";
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : "";
        const args = body.trim().split(/ +/).slice(1);
        const q = args.join(' '), text = q
        const pushname = m.pushName || db.users[m.sender].name;
        const sender = m.key?.remoteJid || "unknown";
        const isOwner = m && m.sender && info.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isCreator = isOwner;
        const nomore = m.sender.replace(/[^0-9]/g, '')
        const ments = (text) => {
    text = typeof text === 'string' ? text : ''
    return text.includes('@') 
        ? [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') 
        : []
}
        const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const isVip = db.users[m.sender] ? db.users[m.sender].vip : false
		const isBan = db.users[m.sender] ? db.users[m.sender].ban : false
		const isLimit = db.users[m.sender] ? (db.users[m.sender].limit > 0) : false
		const isPremium = isCreator || checkStatus(m.sender, premium) || false
		const isNsfw = m.isGroup ? db.groups[m.chat].nsfw : false
        
        // func ppuser 
let ppuser, ppgroup, ppnyauser, ppnyaGrup;
// ppuser
try {
    ppuser = await Ditss.profilePictureUrl(m.sender, 'image');
} catch (err) {
    ppuser = `${api.ditss}/img/ppuserr.jpg`;
}

// ppgroup
try {
    ppgroup = await Ditss.profilePictureUrl(m.chat, 'image');
} catch (err) {
    ppgroup = `${api.ditss}/img/ppuserr.jpg`;
}

// buffer ppuser
try {
    ppnyauser = await getBuffer(ppuser);
} catch (e) {
    ppnyauser = await getBuffer(`${api.ditss}/img/ppuserr.jpg`);
}

// buffer ppgroup
try {
    ppnyaGrup = await getBuffer(ppgroup);
} catch (e) {
    ppnyaGrup = await getBuffer(`${api.ditss}/img/ppuserr.jpg`);
}
                //function 
        const reply = (anu) => {
    const mentionJid = [m.sender]; 
    const { message, key } = generateWAMessageFromContent(m.chat, {
        interactiveMessage: {
            body: { text: null },
            footer: { text: anu },
            nativeFlowMessage: {
                ai: !m.isGroup,
                buttons: [
                    { text: "DitssGanteng" }
                ]
            }
        }
    }, {
        quoted: {
            key: {
                participant: m.sender,
                remoteJid: "0@s.whatsapp.net"
            },
            message: {
                conversation: `${body}`
            }
        },
        contextInfo: {
            mentionedJid: ments(anu)
        }
    });

    Ditss.relayMessage(m.chat, { viewOnceMessage: { message } }, { messageId: key.id });
};
        //furnion
        async function editp(...teksArray) {
    if (!teksArray || teksArray.length === 0) return;

    let { key } = await Ditss.sendMessage(m.chat, {
        text: teksArray[0]
    }, { quoted: m });

    for (let i = 1; i < teksArray.length; i++) {
        await delay(2000); // delay antar edit biar smooth
        await Ditss.sendMessage(m.chat, {
            text: teksArray[i],
            edit: key
        }).catch(console.error);
    }
}
// ===== Debug Console Logs =====
let senderIntl = PhoneNumber('+' + sender.replace('@s.whatsapp.net', '')).getNumber('international')
let waktuPesan = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

// Hitung size pesan/file
let filesize = 0
if (m?.msg) {
    filesize = m.msg.vcard?.length ||
               m.msg.fileLength?.low || m.msg.fileLength ||
               m.msg.axolotlSenderKeyDistributionMessage?.length ||
               m.text?.length || 0
} else {
    filesize = body?.length || 0
}
let sizeSuffix = ['', ...'KMGTP'][Math.floor(Math.log(filesize || 1) / Math.log(1000))] || ''
let sizePretty = filesize === 0 ? 0 : (filesize / 1000 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1)

// Nama chat/grup
let chatName = await Ditss.getName(m.chat)

// ===== Tampilkan Log =====
console.log(`
╭┈❲ ${chalk.redBright(Ditss.user?.name || 'BOT')}
│ ${chalk.black(chalk.bgYellow(waktuPesan))}
│• Message ${chalk.black(chalk.bgGreen(isCmd ? 'Command' : 'Chat'))}
│• Size: ${chalk.magenta(`${filesize} [${sizePretty} ${sizeSuffix}B]`)}
│• From: ${chalk.green(`${senderIntl}${pushname ? ' ~' + pushname : ''}`)}
│• Chat: ${chalk.green(`${m.chat}${chatName ? ' ~' + chatName : ''}`)}
│• Type: ${chalk.black(chalk.bgYellow(m.mtype || 'Unknown'))}
╰┈┈⟐ ❲ ${chalk.bold.cyan('Debug Log')} ❳
`.trim())
if (body) {
    console.log(isCmd ? chalk.yellow(body) : body)
}
if (m.key.fromMe) return
if (isCmd) {
    console.log(chalk.cyanBright(`⚙️ Perintah: ${command}`))
    console.log(chalk.gray(`📎 Argumen: ${args.join(" ") || "(kosong)"}`))
}
console.log()
  if (!global._resetLimitScheduled) {
  global._resetLimitScheduled = true

  cron.schedule('0 0 * * *', async () => { // 00:00 setiap hari
    let totalUser = 0
    let totalPrem = 0

    for (let jid in global.db.users) {
      let user = global.db.users[jid]
      let isPremium = !!user.premium

      user.limit = isPremium ? global.limit.prem : global.limit.user
      totalUser++
      if (isPremium) totalPrem++
    }
    console.log(`✅ Semua limit user berhasil direset. Total: ${totalUser} user, ${totalPrem} premium.`)
    for (const no of global.info.owner) {
      const jod = no + '@s.whatsapp.net'
      await Ditss.sendMessage(jod, {
        text: `🌙 hai ${global.info.nama_owner}...

selamat ${salam} ya... 🌌
aku cuma mau bilang...

✨ limit para user udah aku reset, biar mereka bisa main bot kamu lagi tanpa batas, cie cie~ 🥹

📊 total yang direset: *${totalUser.toLocaleString()}* user
👑 Yang premium: *${totalPrem}* user

tenang aja... meski tengah malam begini, aku tetep inget tugas... walau yang ngingetin buat tidur itu gak ada 😔💔

salam hangat dari aku, bot kesayanganmu... 🥹😖`
      })
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  })
}
        switch (command) {
            case 'menu':
                await Ditss.sendMessage(sender, {
                    text: `Hello kak ${pushname}\n*Menu Bot:*\n1. ping\n2. owner\n3. info`
                });
                break;
                
                			case 'totalpesan': {
				let messageCount = {};
				let messages = store?.messages[m.chat]?.array || [];
				let participants = m?.metadata?.participants?.map(p => p.id) || store?.messages[m.chat]?.array?.map(p => p.key.participant) || [];
				messages.forEach(mes => {
					if (mes.key?.participant && mes.message) {
						messageCount[mes.key.participant] = (messageCount[mes.key.participant] || 0) + 1;
					}
				});
				let totalMessages = Object.values(messageCount).reduce((a, b) => a + b, 0);
				let date = new Date().toLocaleDateString('id-ID');
				let zeroMessageUsers = participants.filter(user => !messageCount[user]).map(user => `- @${user.replace(/[^0-9]/g, '')}`);
				let messageList = Object.entries(messageCount).map(([sender, count], index) => `${index + 1}. @${sender.replace(/[^0-9]/g, '')}: ${count} Pesan`);
				let result = `Total Pesan ${totalMessages} dari ${participants.length} anggota\nPada tanggal ${date}:\n${messageList.join('\n')}\n\nNote: ${text.length > 0 ? `\n${zeroMessageUsers.length > 0 ? `Sisa Anggota yang tidak mengirim pesan (Sider):\n${zeroMessageUsers.join('\n')}` : 'Semua anggota sudah mengirim pesan!'}` : `\nCek Sider? ${prefix + command} --sider`}`;
				m.reply(result)
			}
			break
case 'get': {
    if (!text) return reply("Eh, bro! Mana linknya? 😅 Kirim dulu dong biar aku bisa ambil datanya.");

    let args = text.split(' ');
    let url = args[0];
    let tipe = args[1] ? args[1].toLowerCase() : null;

    if (!tipe) {
        return Ditss.sendMessage(m.chat, {
            text: `🔥 Pilih tipe konten yang mau aku ambil dari link ini:\n${url}`,
            buttons: [
                { buttonId: `.get ${url} img`, buttonText: { displayText: '🖼️ Image' }, type: 1 },
                { buttonId: `.get ${url} vid`, buttonText: { displayText: '🎬 Video' }, type: 1 },
                { buttonId: `.get ${url} zip`, buttonText: { displayText: '🗜️ Zip' }, type: 1 },
                { buttonId: `.get ${url} html`, buttonText: { displayText: '📄 HTML' }, type: 1 },
            ],
            headerType: 1
        }, { quoted: m });
    }

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        switch(tipe) {
            case 'img':
                await Ditss.sendMessage(m.chat, { image: response.data, caption: "🖼️ Nih gambarnya!" }, { quoted: m });
                break;
            case 'vid':
                await Ditss.sendMessage(m.chat, { video: response.data, caption: "🎬 Nih videonya!" }, { quoted: m });
                break;
            case 'html':
                await Ditss.sendMessage(m.chat, { document: response.data, fileName: "file.html", mimetype: "text/html", caption: "📄 File HTML siap dikirim!" }, { quoted: m });
                break;
            case 'zip':
            default:
                await Ditss.sendMessage(m.chat, { document: response.data, fileName: "file.zip", mimetype: "application/zip", caption: "🗜️ File ZIP berhasil diambil!" }, { quoted: m });
                break;
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        await reply("Oops! Gagal ambil datanya 😅. Coba lagi nanti ya.");
    }
    break;
}
                case 'backup': {
    if (!isCreator) return m.reply(ress.owner);

    switch (args[0]) {
        case 'all': {
            try {
                m.reply('📦 Sedang mengumpulkan semua file untuk backup...');

                const ls = execSync("ls").toString().split("\n").filter((file) =>
                    file !== "node_modules" &&
                    file !== "package-lock.json" &&
                    file !== "yarn.lock" &&
                    file !== ""
                );

                console.log("🗂️ File yang akan dibackup:", ls);

                const escapedFiles = ls.map(file => `"${file}"`).join(" ");
                execSync(`zip -r Backup.zip ${escapedFiles}`);

                if (!fs.existsSync('./Backup.zip')) {
                    return m.reply('❌ File ZIP tidak ditemukan, backup gagal.');
                }

                await Ditss.sendMessage(m.sender, {
                    document: fs.readFileSync('./Backup.zip'),
                    mimetype: "application/zip",
                    fileName: "Backup.zip",
                });

                execSync("rm -rf Backup.zip");
                m.reply('✅ Backup selesai, file berhasil dikirim ke owner.');
            } catch (err) {
                console.error(err);
                m.reply('⚠️ Terjadi kesalahan saat proses backup.');
            }
            break;
        }

        case 'auto': {
            if (set.autobackup) return m.reply('ℹ️ Auto Backup sudah aktif sebelumnya.');
            set.autobackup = true;
            m.reply('✅ Auto Backup berhasil diaktifkan!');
            break;
        }

        case 'session': {
            await m.reply({
                document: fs.readFileSync('./node_modules/.bin/Session'),
                mimetype: 'application/json',
                fileName: 'creds.json'
            });
            break;
        }

        case 'database': {
            try {
                const dbPath = './database/database.json';
                if (!fs.existsSync(dbPath)) {
                    console.log('❌ File database tidak ditemukan.');
                    return;
                }

                const buffer = fs.readFileSync(dbPath);
                const tanggal = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

                for (const no of global.owner) {
                    const jid = no + '@s.whatsapp.net';
                    const quoted = {
                        key: {
                            fromMe: false,
                            participant: '0@s.whatsapp.net',
                            remoteJid: jid,
                        },
                        message: {
                            conversation: `✅ Backup Berhasil dikirim pada ${tanggal}`
                        }
                    };

                    await Ditss.sendMessage(jid, {
                        document: buffer,
                        fileName: `database-${tanggal.replace(/[^\d]/g, '-')}.json`,
                        mimetype: 'application/json',
                        caption: `📦 *Backup Berhasil*\n📅 ${tanggal}\n\nFile database.json telah berhasil dibackup.`
                    }, { quoted });
                }

                console.log(`✅ Auto backup sukses dikirim ke ${global.owner.length} owner.`);
            } catch (err) {
                console.error('❌ Gagal auto backup:', err);
            }
            break;
        }

        default: {
            let DitssGanteng = '✨ Gunakan salah satu perintah berikut:\n- backup auto\n- backup all\n- backup database\n- backup session';
            let buttons = [
                {
                    buttonId: "backup",
                    buttonText: { displayText: "🗂️ Gunakan Perintah Backup" },
                    type: 4,
                    nativeFlowInfo: {
                        name: "single_select",
                        paramsJson: JSON.stringify({
                            title: "💾 Pilih Perintah Backup yang Tersedia",
                            sections: [
                                {
                                    title: "Daftar Perintah Backup",
                                    rows: [
                                        { title: "📦 Backup Semua", description: "Backup semua data sekaligus", id: ".backup all" },
                                        { title: "🕒 Backup Otomatis", description: "Mengaktifkan backup otomatis", id: ".backup auto" },
                                        { title: "💼 Backup Session", description: "Backup file session bot", id: ".backup session" },
                                        { title: "🗃️ Backup Database", description: "Backup file database bot", id: ".backup database" },
                                    ],
                                },
                            ],
                        }),
                    },
                },
            ];

            Ditss.sendMessage(
                m.chat,
                {
                    text: DitssGanteng,
                    footer: `© Powered by ${global.info.namabot}`,
                    buttons,
                    headerType: 1,
                    viewOnce: true,
                },
                { quoted: m }
            );
        }
    }
    break;
}
  case 'mf':
case 'mediafire': {
    try {
        if (!text) return m.reply(`Contoh: ${prefix + command} https://www.mediafire.com/file/xxxxx`);
        if (!text.includes('mediafire.com')) return m.reply('Harus berupa link MediaFire!');
        const res = await fetchJson(`${api.ditss}/download/mediafire?apikey=DitssGanteng&url=${encodeURIComponent(text.trim())}`);
        if (!res.status || !res.result || !res.result.download_url) {
            return m.reply('Gagal mengambil data. Link tidak valid atau API error!');
        }

        const { filename, size, mimetype, owner, created, download_url } = res.result;

        // Format tanggal upload
        const uploadDate = new Date(created).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Info file dulu
        const info = `
📂 *MediaFire Downloader*
───────────────────────
📄 *Nama File:* ${filename}
📏 *Ukuran File:* ${size}
📦 *Tipe File:* ${mimetype}
👤 *Pemilik:* ${owner || '-'}
📆 *Diunggah:* ${uploadDate}
🌐 *Link:* ${text}

Tunggu sebentar, mengirim file...
`.trim();

        editp(info, `Tunggu Sebentar, Mengirim File... ${filename}`);

        // Escape karakter di URL + handle redirect
        const safeUrl = download_url.replace(/ /g, '%20').replace(/\+/g, '%2B');

        // Ambil buffer file
        const media = await getBuffer(safeUrl);

        // Kirim file ke chat
        setTimeout(async () => {
            await Ditss.sendMessage(m.chat, {
                document: media,
                fileName: filename,
                mimetype: mimetype || 'application/octet-stream'
            }, {
                quoted: m
            });
        }, 2000);
        await m.react("💦")

    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat memproses permintaan kamu:\n' + err.message);
    }
    break;
}
               case 'brat': {
    if (!text) return reply(`Contoh: ${command} DitssGanteng`);
    if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`);

    await reply(ress.wai);

    let res = await fetch(`${api.ditss}/imagecreator/brat?apikey=DitssGanteng&text=${encodeURIComponent(text)}`);
    if (!res.ok) return m.reply(`Terjadi kesalahan saat memproses permintaanmu.`);

    let arrayBuffer = await res.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    await Ditss.sendSticker(m.chat, buffer, m, {
        packname: text,
        author: pushname
    });
break;
                   }
                case 'kick':
case 'dor':
case 'buang':
case '😛':
case 'hedsot':
case 'duar': {
if (!m.isGroup) return reply(ress.group)                // Pastikan di grup
if (!isCreator && !isAdmin) return reply(ress.admin)   // Hanya creator atau admin yang bisa
if (!isBotAdmin) return reply(ress.BotAdmin)           // Pastikan bot juga admin
 let target

 // Mention
 if (m.mentionedJid && m.mentionedJid[0]) {
 target = m.mentionedJid[0]
 }
 // Reply
 else if (m.quoted) {
 target = m.quoted.sender
 }
 // Argumen angka
 else if (args[0]) {
 let input = args[0].replace(/[^0-9]/g, '')
 let found = participants.find(p => p.id.replace(/[^0-9]/g, '').endsWith(input))
 if (found) target = found.id
 }

 if (!target) return reply('❌ Target tidak ditemukan!\nGunakan: tag / reply / nomor / ujung nomor.')
 if (global.info.owner.includes(target)) return reply('❌ Tidak bisa kick Owner.')
 if (target === m.sender) return reply('❌ Tidak bisa kick diri sendiri.')

 let buffer = "https://raw.githubusercontent.com/media-clouds/upload/id/447920601019/mce05oaq.webp"

 Ditss.sendSticker(m.chat, buffer, m, {
 packname: "yahahahahahahahah di kick😛",
 author: global.info.namabot
 })

 // Kick target
 try {
 await Ditss.groupParticipantsUpdate(m.chat, [target], 'remove')
 m.reply(`✅ Sukses mengeluarkan @${target.split('@')[0]}`, null, {
 mentions: [target]
 })
 // db.data.users[m.sender].exp += await randomNomor(20) // aktifkan jika perlu
 } catch (err) {
 console.log(err)
 m.reply('❌ Gagal mengeluarkan user, mungkin bukan anggota grup atau sudah keluar.')
 }
}
break
 case 'add':
case 'culik':
case 'masukin': {
    if (!m.isGroup) return m.reply(ress.group);           // pastikan di grup
    if (!isAdmins && !isOwner) return m.reply(ress.admin); // pastikan sender admin/owner
    if (!isBotAdmins) return m.reply(ress.BotAdmin);      // pastikan bot admin

    let target;

    // Ambil nomor target dari teks atau reply
    if (text) {
        target = text.replace(/[^0-9]/g, '');
    } else if (m.quoted) {
        target = m.quoted.sender?.split('@')[0];
    }

    if (!target || target.length < 9) 
        return m.reply(`Contoh: ${prefix + command} 628xxxx atau reply pesan target`);

    // Normalisasi nomor
    const normalizeJid = jid => jid.replace(/[^0-9]/g, '');
    const numberJid = normalizeJid(target) + '@s.whatsapp.net';

    try {
        // Kirim request add user
        const res = await Ditss.groupParticipantsUpdate(m.chat, [numberJid], 'add');

        for (let i of res) {
            switch (i.status) {
                case 200:
                    return m.reply(`✅ Berhasil menambahkan @${target} ke grup!`, { mentions: [numberJid] });
                case 401:
                    return m.reply('❌ Gagal! Target memblokir bot.');
                case 409:
                    return m.reply('⚠️ Target sudah berada di grup.');
                case 500:
                    return m.reply('❌ Gagal! Grup sudah penuh.');
                case 408: {
                    let inv = await Ditss.groupInviteCode(m.chat);
                    await Ditss.sendMessage(numberJid, {
                        text: `*Undangan Grup:*\nAdmin @${m.sender.split('@')[0]} mengundang kamu ke grup *${groupMetadata.subject}*\nGabung melalui link:\nhttps://chat.whatsapp.com/${inv}`,
                        mentions: [m.sender]
                    }, { quoted: m });
                    return m.reply(`⚠️ Target baru saja keluar dari grup. Link undangan dikirim ke wa.me/${target}`);
                }
                case 403: {
                    let code = i.content?.content?.[0]?.attrs?.code;
                    let exp = i.content?.content?.[0]?.attrs?.expiration;
                    if (!code) return m.reply('❌ Gagal! Tidak bisa mengirim undangan.');
                    await Ditss.sendGroupInvite(m.chat, numberJid, code, exp, groupMetadata.subject, 
                        `Admin: @${m.sender.split('@')[0]} mengundang kamu ke grup ini`, null, { mentions: [m.sender] });
                    return m.reply(`🚫 Target private. Undangan dikirim ke wa.me/${target}`);
                }
                default:
                    return m.reply(`Status: ${i.status}`);
            }
        }

    } catch (err) {
        console.error('❌ Error add user:', err);
        m.reply('❌ Terjadi kesalahan saat menambahkan user. Pastikan nomor valid & bot admin.');
    }
}
break;
            case 'ping':
                await Ditss.sendMessage(sender, { text: 'Pong! Bot aktif.' });
                break;
            default:
                
                // batas
                //import util from 'util';

if (budy.startsWith('>')) {
    if (!isOwner) return;
    try {
        let evaled = await eval(budy.slice(1)); // '> ' → slice(1)
        if (typeof evaled !== 'string') evaled = util.inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        await m.reply(String(err));
    }
}

if (budy.startsWith('=>')) {
    if (!isOwner) return;
    
    async function Return(sul) {
        let sat = JSON.stringify(sul, null, 2);
        let bang = util.format(sat);
        if (sat === undefined) bang = util.format(sul);
        await m.reply(bang);
    }

    try {
        const result = await eval(`(async () => { return ${budy.slice(3)} })()`);
        await Return(result);
    } catch (e) {
        await m.reply(String(e));
    }
}
                if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}
        }

    } catch (e) {
    if (/over\s?limit|rate\s?limit|quota\s?exceeded|too many requests|status.?429/i.test(e?.message)) {
        console.warn('[⚠️ Terjadi kesalahan pada server.]');
        return;
    }

    const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
    const now = Date.now();
    if (!errorCache[errorKey]) errorCache[errorKey] = [];
    errorCache[errorKey] = errorCache[errorKey].filter(ts => now - ts < 600000);
    if (errorCache[errorKey].length >= 3) return;
    errorCache[errorKey].push(now);

    let msg;
    if (e?.status === 404) msg = '❌ Resource tidak ditemukan (404).';
    else if (e?.status === 403) msg = '🚫 Akses dibatasi (403).';
    else if (e?.code === 'ETIMEDOUT') msg = '⏱️ Server terlalu lama merespons.';
    else if (e?.code === 'ENOTFOUND') msg = '🌐 Server tidak ditemukan.';
    else if (e?.code === 'ERR_OSSL_BAD_DECRYPT') msg = '🔐 Gagal mendekripsi data.';
    else if (e?.name === 'TypeError') msg = '⚠️ Terjadi kesalahan tipe data.';
    else if (e?.name === 'ReferenceError') msg = '⚠️ Ada variabel yang belum didefinisikan.';
    else if (e?.name === 'SessionError') msg = '🔁 Masalah dengan sesi.';
    else if (e?.name === 'AxiosError') msg = '🌐 Gagal mengambil data.';
    else if (e?.message?.includes('not-acceptable') || e?.data === 406) msg = '📛 Permintaan tidak diterima server (406).';
    else if (e?.output?.statusCode === 408 || e?.message?.includes('Timed Out')) msg = '⏳ Permintaan melebihi batas waktu.';
    else if (e?.output?.statusCode === 404 || e?.message?.includes('myAppStateKey')) msg = '🔑 State key tidak ditemukan.';
    else if (e?.output?.statusCode === 500 || e?.message?.includes('internal-server-error')) msg = '💥 Terjadi kesalahan pada server.';
    else if (e?.message?.includes('Media upload failed on all hosts')) msg = '📤 Gagal mengunggah media.';
    else if (e?.message?.includes('No sessions')) msg = '🔌 Session tidak ditemukan.';
    else if (e?.message?.includes('Cannot find ffmpeg')) msg = '📼 FFMPEG belum terpasang.';
    else if (e?.message?.includes('Cannot find module')) msg = '📦 Modul belum terpasang.';

    if (msg) {
        m.reply(`${msg}\n\nError: ${e?.name || e?.code || e?.status || 'Tidak diketahui'}\nLog error telah dikirim ke owner.`);
    }

    await logErrorToFile(e, m);

    if (/over\s?limit|rate\s?limit|quota\s?exceeded|too many requests|status.?429/i.test(e?.message)) {
        console.warn('[⚠️ LIMIT BLOCKED]');
        return;
    }

    await Ditss.sendMessage(
        global.info.owner[0] + "@s.whatsapp.net",
        {
            text: `👋 Halo owner, ada error yang perlu dicek.\n\n` +
                  `📦 Version: *${pkg.version}*\n\n` +
                  `🪵 *Log error:*\n\n${util.format(e)}`,
            contextInfo: { isForwarded: true }
        },
        { quoted: m }
    );
}
}

fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.redBright(`Update ${__filename}`));
    import(`${import.meta.url}?update=${Date.now()}`).then(module => {
        console.log('Kode diperbarui!');
    }).catch(err => console.error('Gagal memperbarui:', err));
});
