<p align="center">
  <img src="https://api-ditss.vercel.app/page/IMG-20250312-WA0045.png" alt="DitssBot Logo" width="180"/><br/>
  <b>Asuma Base MD (ESM)</b><br/>
  <i>Lightweight WhatsApp Multi-Device Bot Base</i>
</p>

<p align="center">
  <a href="https://github.com/ditss-cloud/asuma.esm/stargazers"><img src="https://img.shields.io/github/stars/ditss-cloud/asuma.esm?style=for-the-badge" alt="Stars"/></a>
  <a href="https://github.com/ditss-cloud/asuma.esm/network/members"><img src="https://img.shields.io/github/forks/ditss-cloud/asuma.esm?style=for-the-badge" alt="Forks"/></a>
  <a href="https://github.com/ditss-cloud/asuma.esm/actions"><img src="https://img.shields.io/github/actions/workflow/status/ditss-cloud/asuma.esm/node.js.yml?style=for-the-badge&label=build" alt="Build Status"/></a>
  <a href="https://www.codefactor.io/repository/github/ditss-cloud/asuma.esm"><img src="https://www.codefactor.io/repository/github/ditss-cloud/asuma.esm/badge?style=for-the-badge" alt="CodeFactor"/></a>
  <a href="https://github.com/ditss-cloud/asuma.esm"><img src="https://img.shields.io/github/license/ditss-cloud/asuma.esm?style=for-the-badge" alt="License"/></a>
  <a href="https://github.com/WhiskeySockets/Baileys"><img src="https://img.shields.io/badge/baileys-whatsapp%20api-blue?style=for-the-badge" alt="Baileys"/></a>
  <img src="https://img.shields.io/badge/node-%3E=20.x-green?style=for-the-badge" alt="Node.js 20+"/>
</p>

---

## 🤖 Asuma Base MD (ESM)

Base WhatsApp Bot Multi Device dengan struktur **ECMAScript Modules (ESM)**  
Didesain ringan, modern, dan fleksibel untuk developer yang ingin membangun bot WhatsApp dari nol.

> 💡 **Cocok untuk belajar, eksperimen, atau bikin bot WhatsApp custom.**  
> Support Node.js 20+, base sudah support WhatsApp Button.

---

## 🖼️ Demo

<p align="center">
  <img src="https://raw.githubusercontent.com/ditss-cloud/asuma.esm/main/assets/demo-menu.png" alt="Demo Main Menu" width="350"/>
  <img src="https://raw.githubusercontent.com/ditss-cloud/asuma.esm/main/assets/demo-button.gif" alt="Demo Button" width="350"/>
</p>

Contoh tampilan menu dan button bot WhatsApp.  
Lihat lebih banyak [di folder assets](assets/) atau [di wiki](https://github.com/ditss-cloud/asuma.esm/wiki/Demo).

---

## ⚡ Quick Start

Langsung jalankan dengan satu baris:

```bash
git clone https://github.com/ditss-cloud/asuma.esm && cd asuma-esm && npm install && node index.js
```

> **Pastikan Node.js versi 20.x atau terbaru.**

---

## ✨ Fitur Utama

- 🔹 **Multi Device Support** (Baileys)
- 🔹 **Struktur Modern ESM**
- 🔹 **2 Gaya Development:** Case Handler & Plugins System
- 🔹 **Modular & Mudah Dikembangkan** (AI, game, toko, dsb)
- 🔹 **Support WhatsApp Button** (base)
- 🔹 Tidak ada fitur bawaan, murni untuk belajar/eksperimen
- 🔹 **Open Source, Kontributif**

---

## 📊 Statistik Repo

- ⭐ **Stars:** [![Stars](https://img.shields.io/github/stars/ditss-cloud/asuma.esm?style=social)](https://github.com/ditss-cloud/asuma.esm/stargazers)
- 🍴 **Forks:** [![Forks](https://img.shields.io/github/forks/ditss-cloud/asuma.esm?style=social)](https://github.com/ditss-cloud/asuma.esm/network/members)
- 👀 **Watchers:** ![Watchers](https://img.shields.io/github/watchers/ditss-cloud/asuma.esm)
- 🛠️ **Contributors:** ![Contributors](https://img.shields.io/github/contributors/ditss-cloud/asuma.esm)

---

## 📁 Struktur Project

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

1. **Clone repository**
    ```bash
    git clone https://github.com/ditss-cloud/asuma.esm
    cd asuma-esm
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Jalankan bot**
    ```bash
    node index.js
    ```
> **Pastikan Node.js versi 20.x atau terbaru.**

---

## ⚙️ Konfigurasi

Edit file `config.js` sesuai kebutuhan bot-mu:

```js
global.owner = "6281513607731" // Nomor owner utama (WhatsApp)
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
    owner: 'ⓞ',
    admin: 'Ⓐ',
    premium: 'Ⓟ',
    limit: 'Ⓛ',
    vip: 'Ⓥ',
    member: 'Ⓜ',
    guest: 'Ⓖ'
}
global.money = {
    free: 10000,
    premium: 1000000,
    vip: 10000000
}
global.api = {
    ditss: "https://api-ditss.vercel.app",
    example: "https://example.com/api"
}
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
global.tempatDB = 'database.json' // Bisa diganti URL MongoDB jika pakai database cloud
global.tempatStore = 'baileys_store.json' // Bisa diganti URL MongoDB jika pakai database cloud
```

---

## 🧑‍💻 Gaya Development

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

### WhatsApp Button Support
Base bot sudah mendukung pengiriman WhatsApp button, bisa digunakan di handler dan plugin.  
Lihat contoh di folder `lib/` dan `plugins/`.

---

## 📚 Referensi & Dokumentasi

- [Baileys WhatsApp API (by adiwajsing)](https://github.com/WhiskeySockets/Baileys)
- [ECMAScript Modules (ESM)](https://nodejs.org/docs/latest-v20.x/api/esm.html)
- [Node.js Docs](https://nodejs.org/en/docs/)
- [Wiki/Dokumentasi Tambahan](https://github.com/ditss-cloud/asuma.esm/wiki)

---

## ❓ FAQ

**Q:** Bot nggak jalan?  
**A:** Cek versi Node.js kamu (harus minimal 20.x). Lihat error di terminal, biasanya masalah dependency atau permission.

**Q:** Cara bikin plugin sendiri?  
**A:** Lihat contoh di `plugins/example.js`, lalu buat file baru di folder `plugins/`.

**Q:** Bisa deploy di VPS?  
**A:** Sangat bisa! Pastikan sudah install Node.js dan npm di VPS kamu.

**Q:** Bisa pakai database selain JSON lokal?  
**A:** Bisa! Ganti global.tempatDB dan global.tempatStore ke URL MongoDB atau database lain sesuai kebutuhan.

**Q:** Tidak mengerti/ada error?  
**A:** [Hubungi WhatsApp owner](https://wa.me/6281513607731) untuk konsultasi langsung.

---

## 🤝 Kontribusi

- Pull request & issue sangat welcome!
- Ikuti struktur dan gaya penulisan yang sudah ada.
- Diskusi dan feedback via [issue tracker](https://github.com/ditss-cloud/asuma.esm/issues).

---

## 💰 Donasi & Support

Bantu project ini agar terus berkembang:

- [Saweria](https://saweria.co/ditss)
- [Trakteer](https://trakteer.id/ditss)
- [Contact WhatsApp](https://wa.me/6281513607731) (langsung chat owner)

---

## 📌 Catatan

- Ini **base repo**: Tidak ada fitur bawaan, cocok untuk belajar dan eksperimen bot WhatsApp.
- Dibangun menggunakan [Baileys](https://github.com/WhiskeySockets/Baileys) (WhatsApp Web API).
- Bebas dikembangkan, open source, dan gratis!

---

## 🙏 Credits

- **WhatsApp Baileys** by [adiwajsing](https://github.com/adiwajshing) & [WhiskeySockets](https://github.com/WhiskeySockets/Baileys)
- **Ditss** (Author & Maintainer): [github.com/ditss-cloud](https://github.com/ditss-cloud)
- Semua kontributor & komunitas open source

---

## 📝 Lisensi

MIT License  
Silakan pakai, modifikasi, dan kembangkan sesuai kebutuhan.

---

<p align="center"><sub>Copyright © ditss-cloud</sub></p>
