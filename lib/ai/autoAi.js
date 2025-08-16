/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : autoAi.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import '../../config.js';
import axios from 'axios';
import { getPrompt } from './promptToki.js';
export async function handleAutoAi({ m, body, pushname, Ditss, set, isCmd }) {
    if (!body) return;
    if (!(set.autoaiprivate && !m.isGroup && !isCmd && !m.key.fromMe)) return;

    const pushNama = pushname || 'Kamu';
    const prompt = getPrompt(pushNama);

    const requestData = {
        content: body,
        user: m.sender,
        prompt
    };

    try {
        const quoted = m.quoted || m;
        const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;
        if (mimetype && /image/.test(mimetype)) {
            requestData.imageBuffer = await quoted.download();
        }

        const response = await axios.post('https://luminai.my.id', requestData);
        const hasil = response.data?.result;

        if (!hasil) {
            await m.reply('Maaf, aku gak ngerti maksud kamu~');
            return;
        }

        try {
            const vnRes = await axios.get(
                `https://${api.ditss}/tools/tts-nahida?apikey=DitssGanteng&text=${encodeURIComponent(hasil)}`,
                { responseType: 'arraybuffer' }
            );

            await Ditss.sendMessage(m.chat, {
                audio: vnRes.data,
                mimetype: 'audio/mp4',
                ptt: true,
                ai: true,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        title: `Asuma Auto AI`,
                        body: `Powered by Ditss`,
                        thumbnailUrl: `${api.ditss}/media/image/mawdli20.jpg`,
                        sourceUrl: `https://api.ditss.cloud`,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: m });

        } catch {
            await Ditss.sendMessage(m.chat, {
                text: hasil,
                ai: true,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        title: `Asuma Auto AI`,
                        body: `Powered by Ditss`,
                        thumbnailUrl: `${api.ditss}/media/image/mawdli20.jpg`,
                        sourceUrl: `https://api.ditss.cloud`,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: m });
        }

    } catch (err) {
        console.error('Auto AI error:', err);
        await m.reply('Lagi error nih, coba nanti lagi ya 😿');
    }
}
