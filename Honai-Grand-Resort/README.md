# Honai Grand Resort — login page hotspot MikroTik untuk MikBoX

Gaya resort/hotel: foto besar (slideshow) di samping panel gradasi dengan logo, tombol emas, dan
daftar paket seperti kartu tarif kamar. Di HP foto tampil di atas, formulir di bawahnya. Fungsinya
sama dengan `New-MikBoX`: login voucher/member (CHAP), trial, beli voucher QRIS lewat MikBoX, cek
voucher, sisa waktu main & masa aktif di halaman status, info/FAQ.

| File | Isi |
|---|---|
| `config.js` | **Satu-satunya file yang perlu diedit** (nama, warna, foto, info/FAQ, kontak, MikBoX) |
| `foto/` | Foto resort Anda untuk slideshow (JPG/WebP, landscape, ±1600 px, < 300 KB per foto) |
| `login.html`, `status.html`, … | Halaman hotspot |
| `assets/` | `app.js` (mesin, sama dengan New-MikBoX), `resort.js` (slideshow + tombol chat), `style.css`, `md5.js` |

## Pasang

1. Edit `config.js`: `namaHotspot`, `slogan`, `warna` (`ungu`, `hijau`, `biru`, `marun`), `mikbox.idToko`.
2. Opsional: upload foto ke `foto/` lalu isi `foto: ["foto/1.jpg", "foto/2.jpg"]`. Tanpa foto, tampil
   ilustrasi honai bawaan. Logo PNG transparan: `logo: "logo.png"`.
3. Upload seluruh folder `Honai-Grand-Resort` ke router (Winbox → Files).
4. **IP → Hotspot → Server Profiles** → profil hotspot → **HTML Directory** = `Honai-Grand-Resort`.
5. Walled-garden ke alamat MikBoX (lihat MikBoX → Router → Jual Online).

## Catatan

- Paket, harga, waktu main, dan masa aktif diambil otomatis dari MikBoX.
- Isi `whatsapp` di `config.js` menampilkan tombol chat emas mengambang di pojok kanan bawah.
- Foto yang tidak ditemukan dilewati; animasi slideshow mati bila HP meminta gerak dikurangi.

Lisensi: MIT (lihat `LICENSE`). Kode, ilustrasi, dan desain ditulis sendiri untuk MikBoX.
