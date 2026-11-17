/* =====================================================================
 *  NEW-MIKBOX — PENGATURAN LOGIN PAGE (satu-satunya file yang perlu diedit)
 *
 *  Ubah nilai di antara tanda kutip "...", simpan, lalu upload ulang file ini
 *  ke folder hotspot router (Winbox → Files).
 *    - Teks selalu di dalam tanda kutip:  "seperti ini"
 *    - true = aktif, false = mati
 *    - Isian kosong "" = bagian itu disembunyikan
 *    - Jangan hapus tanda koma di akhir baris
 * ===================================================================== */

var CONFIG = {

  /* ---------- Identitas ---------- */
  namaHotspot: "MikBoX WiFi",
  slogan: "Internet cepat, bayar praktis",
  logo: "",                          // "" = ikon bawaan. Contoh: "logo.png" (upload ke folder yang sama)
  pengumuman: "",                    // "" = mati. Contoh: "Gangguan jaringan pukul 22.00–23.00"
  footer: "MikBoX",

  /* ---------- Tampilan ---------- */
  warna: "pink",                     // "pink", "biru", "hijau", "ungu", "oranye"
  mode: "otomatis",                  // "otomatis" (ikut HP), "terang", "gelap"

  /* ---------- Form login ---------- */
  loginMember: true,                 // true = ada pilihan Username + Password
  hurufVoucher: "biasa",             // "biasa", "besar" (otomatis HURUF BESAR), "kecil"
  tombolTrial: true,                 // tampil hanya bila trial aktif di server profile router

  /* ---------- Jual voucher online (MikBoX + QRIS) ---------- */
  mikbox: {
    alamat: "https://mikbox.mediakomputer.com",
    idToko: "",                      // dari MikBoX → Router → Jual Online. "" = bagian beli disembunyikan
    // Daftar paket & harga diambil otomatis dari MikBoX, tidak perlu ditulis di sini.
  },

  /* ---------- Kontak ("" = disembunyikan) ---------- */
  whatsapp: "",                      // contoh: "6281234567890"
  instagram: "",                     // contoh: "https://instagram.com/namaakun"
  facebook: "",
  tiktok: "",
};
