/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : detectOperator.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import '../../config.js';
import fetch from 'node-fetch';

export async function detectOperator(phoneNumber) {
  const baseUrl = api.ditss.startsWith('http') ? api.ditss : `https://${api.ditss}`;
  const url = `${baseUrl}/api/detect-operator?phoneNumber=${encodeURIComponent(phoneNumber)}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    return (data.status && data.result && data.result.operator) ? data.result.operator : null;
  } catch (error) {
    console.error('Failed to detect operator:', error);
    return null;
  }
}
