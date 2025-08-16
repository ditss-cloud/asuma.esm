# 🤖 Asuma Base MD (ESM)

Base WhatsApp Bot (Multi Device) dengan struktur **ECMAScript Modules (ESM)**.  
Didesain ringan, bersih, dan fleksibel untuk developer yang mau bikin bot WhatsApp dari nol.  

Mendukung **2 gaya development**:
- ⚡ **Case Handler** → cocok buat yang suka pakai `switch-case`
- 🧩 **Plugins System** → modular, gampang dikembangkan & dibagi

---

## ✨ Fitur Utama
- 🔹 Multi Device support (Baileys)
- 🔹 Struktur modern ESM
- 🔹 Case handler
- 🔹 Plugins handler
- 🔹 Mudah dikembangkan (AI, game, store, dll)

---

## 📂 Struktur Project
```bash
asuma-esm/
│── index.js            # Entry point
│── WhatsApp.js         # Handler utama (case & plugins)
│── config.js           # Konfigurasi global
│── package.json
│── README.md
│
├── database/           # Penyimpanan data
│   ├── baileys_store.json
│   ├── database.json
│   ├── error.json
│   └── sampah/
│
├── lib/                # Library & helper
│   ├── sticker.js
│   ├── fetchBuffer.js
│   ├── myfunction.js
│   ├── ai/
│   ├── func/
│   └── utils/
│
├── plugins/            # Plugins command
│   └── example.js
│
└── source/             # Backend tambahan
    ├── dashboard.js
    ├── database.js
    ├── loadDatabase.js
    └── server.js
```
🚀 Instalasi

# Clone repo
git clone https://github.com/ditss-cloud/asuma.esm
cd asuma-base-md

# Install dependencies
npm install

# Start bot
node index.js


#⚡ Contoh Command

Case Handler (WhatsApp.js)

case 'ping': {
   m.reply("Pong 🏓")
}
break

Plugins (plugins/example.js)

export default {
  command: ['menu', 'help'],
  handler: async (m, { conn }) => {
    await m.reply("Ini contoh plugin menu ✨")
  }
}


---

⚙️ Konfigurasi

Edit file config.js untuk mengatur:

Owner

Nama bot

Prefix

API Keys

Pesan default


Contoh:

global.owner = ["6281513607731"]
global.botName = "Asuma MD"
global.prefix = "."


---

📌 Catatan

Repo ini hanya base → tidak ada fitur bawaan.

Cocok untuk developer yang mau belajar & kembangkan bot sendiri.

Dibangun dengan Baileys.
