# FITCAMP — Next.js Edition (Refactored)

Proyek **FITCAMP** telah berhasil direfaktor dari HTML/CSS/JavaScript statis menjadi aplikasi modern berbasis **Next.js (App Router)**, **React**, **TypeScript**, dan **Tailwind CSS**.

---

## 🚀 Fitur yang Direfaktor ke Next.js

1. **Home / Outfit Analyzer (`/`)**:
   - Pemilihan item Baju, Celana, dan Sepatu secara interaktif dengan indicator pilihan aktif.
   - Color picker dinamis untuk setiap item dengan kode warna hex.
   - Algoritma analisis outfit: Dominant Style, Overall Score, Style Compatibility, Color Compatibility, Style Analysis bar charts, rekomendasi cerdas.
   - Simpan outfit langsung ke akun pengguna (tersinkronisasi secara real-time via `AuthContext` dan `localStorage`).

2. **Gallery (`/gallery`)**:
   - Inspirasi outfit kampus dengan layout grid responsif.
   - Filter kategori real-time: *All*, *Casual*, *Formal*, *Streetwear*, *Elegant*, *Hijab*.
   - Fitur pencarian instan berdasarkan nama, kategori, deskripsi, atau tags.
   - Modal detail outfit interaktif dengan backdrop blur, escape listener, dan tags.

3. **Account (`/account`)**:
   - Sistem autentikasi client-side: Sign In & Sign Up (validasi email unik, hash demo).
   - Profil pengguna: Ubah nama & email, upload foto profil custom via file picker (Base64).
   - Riwayat Outfit (*Outfit History*): Tampilan 3 item, swatch warna, dominant style, skor kecocokan, dan tombol hapus outfit.
   - Sinkronisasi status login di Navbar (menampilkan foto/nama pengguna yang sedang login).

4. **Arsip Kode Vanilla (`legacy_vanilla/`)**:
   - File lama (`index.html`, `gallery.html`, `account.html`, dll.) tetap disimpan rapi di dalam folder `legacy_vanilla/` sebagai referensi.

---

## 🛠️ Cara Menjalankan Proyek

Pastikan Node.js (versi 18.x ke atas) sudah terpasang.

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000).

3. **Build untuk Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Struktur Direktori

```
FIX COBA1/
├── public/                 # Aset gambar statis
│   ├── img-home/          # Foto baju, celana, sepatu
│   └── img-galeri/        # Foto inspirasi galeri
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout (Poppins font, Navbar, Footer, AuthProvider)
│   │   ├── page.tsx       # Halaman Home & Outfit Analyzer
│   │   ├── globals.css    # Tailwind CSS & tema Fitcamp
│   │   ├── gallery/
│   │   │   └── page.tsx   # Halaman Galeri Outfit & Modal
│   │   └── account/
│   │       └── page.tsx   # Halaman Akun, Profil & History
│   ├── components/
│   │   ├── Navbar.tsx     # Komponen navigasi atas
│   │   └── Footer.tsx     # Komponen footer
│   ├── context/
│   │   └── AuthContext.tsx# State management autentikasi & riwayat outfit
│   ├── data/
│   │   └── outfits.ts     # Data katalog baju, celana, sepatu & galeri
│   ├── lib/
│   │   └── analyzer.ts    # Algoritma perhitungan kecocokan & rekomendasi
│   └── types/
│       └── index.ts       # Definisi TypeScript interface
├── legacy_vanilla/        # Arsip file HTML/CSS/JS lama
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```
