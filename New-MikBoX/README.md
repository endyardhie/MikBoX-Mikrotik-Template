# New-MikBoX — Login Page Hotspot MikroTik

Author: **Endy Ardhie**

Login page hotspot yang ringan, responsif (HP & desktop), mode terang/gelap, dan terhubung
dengan **MikBoX** untuk jual voucher online lewat QRIS. Tanpa lisensi pihak ketiga, tanpa CDN
(tidak butuh walled-garden tambahan selain MikBoX).

## Isi folder

| File | Fungsi |
|---|---|
| `config.js` | **Satu-satunya file yang perlu diedit** (nama, warna, info/FAQ, kontak, MikBoX) |
| `login.html` | Login voucher / member, tombol Coba gratis (trial), daftar paket + tombol Beli (otomatis dari MikBoX) |
| `status.html` | Kode voucher yang sedang dipakai, sisa waktu/kuota, tombol Salin & Logout |
| `logout.html`, `alogin.html`, `error.html` | Halaman setelah logout / berhasil login / error |
| `redirect.html`, `rlogin.html`, `radvert.html` | File wajib hotspot MikroTik |
| `assets/` | Tampilan & logika (`style.css`, `app.js`, `md5.js` untuk login CHAP) |

## Pasang di router

1. Edit `config.js` (nama hotspot, `warna`, `mikbox.idToko`).
2. Winbox → **Files** → upload seluruh folder ini (mis. `New-MikBoX`).
3. **IP → Hotspot → Server Profiles** → profil hotspot → **HTML Directory** = `New-MikBoX`.
4. Jual online lewat MikBoX: izinkan halaman toko dibuka sebelum login:
   ```
   /ip hotspot walled-garden ip add action=accept dst-host=mikbox.mediakomputer.com comment="MikBoX"
   ```
   `idToko` dan perintah walled-garden yang tepat ada di **MikBoX → Router → Jual Online**.

## Catatan

- Login memakai **CHAP** bila aktif di server profile (password tidak dikirim polos); otomatis
  memakai PAP bila CHAP mati.
- Daftar paket, nama, dan harga diambil langsung dari MikBoX (**Router → Jual Online**). Ubah paket
  di MikBoX, login page ikut berubah tanpa upload ulang. Bila MikBoX tidak terjangkau, bagian beli
  disembunyikan dan login voucher tetap jalan.
- Setelah membayar di MikBoX, pelanggan kembali ke `login?mbx_voucher=KODE` dan login otomatis.
- Pelanggan bisa melihat kode vouchernya kapan saja dengan membuka alamat hotspot (mis. `http://wi.fi`)
  saat sudah terhubung.

Lisensi: MIT (lihat `LICENSE`).
