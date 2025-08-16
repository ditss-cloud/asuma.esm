// File: /lib/utils/userAgents.js
/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : userAgents.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
const userAgents = [
  // ------------------ Windows - Chrome ------------------
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36',
  'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.179 Safari/537.36',
  // ------------------ Windows - Firefox ------------------
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:118.0) Gecko/20100101 Firefox/118.0',
  'Mozilla/5.0 (Windows NT 11.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0',
  // ------------------ MacOS - Safari ------------------
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  // ------------------ iPhone ------------------
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  // ------------------ Android - Chrome ------------------
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 14; SM-S908N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 13; Xiaomi 13 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Mobile Safari/537.36',
  // Tambahkan semua User-Agent lain sampai 120+ ...
];

// Fungsi shuffle (Fisher-Yates) untuk acak array
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Ambil user-agent acak
export function getRandomUserAgent() {
  const shuffled = shuffleArray(userAgents);
  return shuffled[0];
}

// Ambil n user-agent acak sekaligus
export function getRandomUserAgents(n = 1) {
  const shuffled = shuffleArray(userAgents);
  return shuffled.slice(0, n);
}

//import { getRandomUserAgent, getRandomUserAgents } from './lib/utils/userAgents.js';