// souce/loadDatabase.js
/*
 * -----------------------------------------------------------------------------
 *  Author         : Ditss
 *  GitHub         : https://github.com/ditss-dev
 *  WhatsApp       : https://wa.me/6281513607731
 *  Channel        : https://whatsapp.com/channel/0029VaimJO0E50UaXv9Z1J0L
 *  File           : loadDatabase.js
 *  Description    : Source code project Asuma - WhatsApp Bot
 *  Created Year   : 2025
 * -----------------------------------------------------------------------------
 *  📌 Feel free to use and modify this script.
 *  ⚠️  Please keep the header intact when redistributing.
 * -----------------------------------------------------------------------------
 */
import '../config.js';
import { checkStatus } from './database.js';
export async function LoadDataBase(Ditss, m) {
	try {
		const botNumber = await Ditss.decodeJid(Ditss.user.id);
		let game = global.db.game || {};
		let premium = global.db.premium || [];
		let user = global.db.users[m.sender] || {};
		let setBot = global.db.set[botNumber] || {};
		
		global.db.game = game;
		global.db.users[m.sender] = user;
		global.db.set[botNumber] = setBot;
		
		const defaultSetBot = {
			lang: 'id',
			limit: 0,
			money: 0,
			status: 0,
			join: false,
			public: false,
			anticall: false,
			original: false,
			readsw: false,
			autobio: false,
			autoread: false,
			antispam: false,
			autotyping: false,
			grouponly: false,
			multiprefix: false,
			privateonly: false,
			author: global.author || 'ditss',
			autobackup: false,
			botname: global.botname || 'asuma toki ><',
			packname: global.packname || 'Bot WhatsApp',
			template: 'documentMessage',
			owner: (global.info.owner || []).map(id => ({ id, lock: true })),
		};
		for (let key in defaultSetBot) {
			if (!(key in setBot)) setBot[key] = defaultSetBot[key];
		}
		
		const limitUser = user.vip ? global.limit.vip : checkStatus(m.sender, premium) ? global.limit.premium : global.limit.free;
		const moneyUser = user.vip ? global.money.vip : checkStatus(m.sender, premium) ? global.money.premium : global.money.free;
		
		const defaultUser = {
            name: m.pushName,
			vip: false,
			ban: false,
			afkTime: -1,
			afkReason: '',
			register: false,
			limit: limitUser,
			money: moneyUser,
			lastclaim: Date.now(),
			lastbegal: Date.now(),
			lastrampok: Date.now(),
		};
		for (let key in defaultUser) {
			if (!(key in user)) user[key] = defaultUser[key];
		}
		
		if (m.isGroup) {
			let group = global.db.groups[m.chat] || {};
			global.db.groups[m.chat] = group;
			
			const defaultGroup = {
				url: '',
				text: {},
				warn: {},
				tagsw: {},
				nsfw: false,
				mute: false,
				leave: false,
				setinfo: false,
				antilink: false,
				demote: false,
				antitoxic: false,
				promote: false,
				welcome: false,
				antivirtex: false,
				antitagsw: false,
				antidelete: false,
				antihidetag: false,
				waktusholat: false,
			};
			for (let key in defaultGroup) {
				if (!(key in group)) group[key] = defaultGroup[key];
			}
		}
		
		const defaultGame = {
			suit: {},
			chess: {},
			chat_ai: {},
			menfes: {},
			tekateki: {},
			akinator: {},
			tictactoe: {},
			tebaklirik: {},
			kuismath: {},
			blackjack: {},
			tebaklagu: {},
			tebakkata: {},
			family100: {},
			susunkata: {},
			tebakbom: {},
			ulartangga: {},
			tebakkimia: {},
			caklontong: {},
			tebakangka: {},
			tebaknegara: {},
			tebakgambar: {},
			tebakbendera: {},
		};
		for (let key in defaultGame) {
			if (!(key in game)) game[key] = defaultGame[key];
		}
		
	} catch (e) {
		throw e
	}
}