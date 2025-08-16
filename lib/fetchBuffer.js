/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : fetchBuffer.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import axios from 'axios';

/**
 * Mengambil file dari URL dalam bentuk Buffer
 * @param {string} url - Link file
 * @param {object} options - Opsi tambahan untuk request axios
 * @returns {Promise<Buffer>}
 */
export async function getBuffer(url, options = {}) {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return Buffer.from(res.data);
  } catch (err) {
    throw new Error(`Gagal mengambil buffer dari URL: ${err.message}`);
  }
}