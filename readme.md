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
