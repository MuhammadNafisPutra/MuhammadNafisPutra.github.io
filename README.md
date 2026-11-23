# Website Portofolio · Muhammad Nafis Putra

Situs statis: `index.html`, `style.css`, `script.js`, plus folder `assets/`. Tidak perlu
instalasi atau build. Buka `index.html` di browser untuk melihatnya.

## Isi

- `assets/img/`: foto dan screenshot proyek (format WebP agar ringan)
- `assets/sertifikat/`: PDF sertifikat yang ditautkan dari bagian Sertifikat
- `assets/cv-muhammad-nafis-putra.pdf`: CV versi web (tanpa alamat rumah)

## Mengubah konten

Semua teks ada di `index.html`, dikelompokkan per bagian (HERO, KARYA, LAINNYA, TENTANG, dst.).
Warna diatur di bagian atas `style.css` (`--wine`, `--brass`, `--paper`, dll.).

Menambah proyek kecil: salin satu blok `<li class="card">` di bagian LAINNYA.
Menambah proyek utama: salin satu blok `<article class="work">`; tambahkan kelas `work--flip`
agar gambarnya berada di sisi kanan.

## Menerbitkan gratis lewat GitHub Pages

1. Buat repository baru di GitHub bernama `MuhammadNafisPutra.github.io`.
2. Unggah semua isi folder ini (bukan foldernya) ke repository tersebut.
3. Buka **Settings → Pages**, pilih branch `main`, lalu simpan.
4. Situs aktif di `https://muhammadnafisputra.github.io` dalam beberapa menit.

## Catatan

- Nomor WhatsApp tercantum di bagian Kontak. Hapus blok WhatsApp kalau tidak ingin nomor itu publik.
- Animasi otomatis dimatikan untuk pengunjung yang mengaktifkan "kurangi gerakan" di perangkatnya.
