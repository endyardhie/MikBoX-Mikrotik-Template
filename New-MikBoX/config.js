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

  /* ---------- Info / tanya jawab di bawah halaman login ([] = disembunyikan) ---------- */
  judulInfo: "Info & tanya jawab",
  info: [
    // judul diisi = pertanyaan yang bisa diketuk untuk membuka jawabannya (FAQ)
    // judul ""    = teks biasa (pengumuman, aturan, jam operasional, dll). Baris baru: \n
    { judul: "Bagaimana cara beli voucher?", isi: "Pilih paket di atas, bayar QRIS dari aplikasi bank atau e-wallet apa saja, voucher langsung aktif." },
    { judul: "Di mana melihat sisa waktu?", isi: "Saat terhubung, buka http://wi.fi untuk melihat kode voucher dan sisa waktunya." },
    { judul: "", isi: "Gunakan internet dengan bijak. Terima kasih." },
  ],

  /* ---------- Kontak ("" = disembunyikan) ---------- */
  whatsapp: "",                      // contoh: "6281234567890"
  instagram: "",                     // contoh: "https://instagram.com/namaakun"
  facebook: "",
  tiktok: "",
};
