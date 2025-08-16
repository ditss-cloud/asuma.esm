# 🤖 Asuma Base MD (ESM)

![Node.js](https://img.shields.io/badge/node-%3E=18.x-green)
![License](https://img.shields.io/github/license/ditss-cloud/asuma.esm)
![Made with Baileys](https://img.shields.io/badge/baileys-whatsapp%20api-blue)

Base WhatsApp Bot (Multi Device) dengan struktur **ECMAScript Modules (ESM)**.  
Didesain ringan, bersih, dan fleksibel untuk developer yang ingin bikin bot WhatsApp dari nol.

---

## ✨ Fitur Utama
- 🔹 Multi Device support (Baileys)
- 🔹 Struktur modern ESM
- 🔹 Dua gaya development: **Case Handler** & **Plugins System**
- 🔹 Mudah dikembangkan (AI, game, toko, dsb)
- 🔹 Tidak ada fitur bawaan, 100% base untuk belajar & eksperimen

---

## 📂 Struktur Project

```bash
asuma-esm/
│── index.js             # Entry point
│── WhatsApp.js          # Handler utama (case & plugins)
│── config.js            # Konfigurasi global
│── package.json
│── README.md
│
├── database/            # Penyimpanan data
│   ├── baileys_store.json
│   ├── database.json
│   ├── error.json
│   └── sampah/
│
├── lib/                 # Library & helper
│   ├── sticker.js
│   ├── fetchBuffer.js
│   ├── myfunction.js
│   ├── ai/
│   ├── func/
│   └── utils/
│
├── plugins/             # Plugins command
│   └── example.js
│
└── source/              # Backend tambahan
    ├── dashboard.js
    ├── database.js
    ├── loadDatabase.js
    └── server.js
```

---

## 🚀 Instalasi

1. **Clone repo**
    ```bash
    git clone https://github.com/ditss-cloud/asuma.esm
    cd asuma-esm
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start bot**
    ```bash
    node index.js
    ```

> **Catatan:**  
> Pastikan Node.js versi **18.x** atau lebih baru.

---

## ⚡ Contoh Command

### Case Handler (`WhatsApp.js`)

```js
case 'ping': {
   m.reply("Pong 🏓")
}
break
```

### Plugins System (`plugins/example.js`)

```js
export default {
  command: ['menu', 'help'],
  handler: async (m, { conn }) => {
    await m.reply("Ini contoh plugin menu ✨")
  }
}
```

---

## ⚙️ Konfigurasi

Edit file `config.js` untuk mengatur data bot:

```js
global.owner = "6281513607731"
// Info bot & owner
global.info = {
    owner: ['6281513607731'],
    namabot: 'DitssBot',
    nama_owner: 'ditss.'
};
// Limit & user type
global.limit = {
    free: 20,
    premium: 999,
    vip: 9999
}
global.user = {
    owner: 'ⓞ',
    admin: 'Ⓐ',
    premium: 'Ⓟ',
    limit: 'Ⓛ',
    vip: 'Ⓥ',
    member: 'Ⓜ',
    guest: 'Ⓖ'
}
// Money & API
global.money = {
    free: 10000,
    premium: 1000000,
    vip: 10000000
}
global.api = {
    ditss: "https://api-ditss.vercel.app",
    example: "https://example.com/api"
}
// Response default
global.ress = {
    key: 'Apikey Anda telah habis',
    owner: `${global.user?.owner || 'ⓞ'} Fitur Khusus Owner!`,
    ...
}
```

---

## 📚 Referensi & Dokumentasi

- [Baileys WhatsApp API](https://github.com/WhiskeySockets/Baileys)
- [ECMAScript Modules (ESM)](https://nodejs.org/docs/latest-v18.x/api/esm.html)

---

## 💡 FAQ

**Q:** Kok botnya nggak jalan?  
**A:** Cek versi Node.js kamu, pastikan minimal 18.x. Lihat error di terminal, biasanya masalah dependency atau permission.

**Q:** Gimana cara bikin plugin sendiri?  
**A:** Lihat contoh di `plugins/example.js`, lalu buat file baru di folder `plugins/`.

**Q:** Bisa deploy di VPS?  
**A:** Sangat bisa! Pastikan sudah install Node.js dan npm di VPS kamu.

---

## 🤝 Kontribusi

- Pull request & issue sangat welcome!
- Ikuti struktur dan gaya penulisan yang sudah ada.
- Diskusi dan feedback silakan lewat [issue tracker](https://github.com/ditss-cloud/asuma.esm/issues).

---

## 📌 Catatan

Repo ini hanya base → **tidak ada fitur bawaan**.  
Cocok untuk developer yang mau belajar & kembangkan bot WhatsApp sendiri.  
Dibangun dengan Baileys.  
Lisensi: MIT

---

**Copyright © ditss-cloud**
