# Website Portofolio · Muhammad Nafis Putra

Situs statis: `index.html`, `style.css`, `script.js`, plus folder `assets/`. Tidak perlu
instalasi atau build. Buka `index.html` di browser untuk melihatnya.

## Isi

- `assets/img/`: foto dan screenshot proyek (format WebP agar ringan)
- `assets/sertifikat/`: PDF sertifikat yang ditautkan dari bagian Sertifikat
- `assets/cv-muhammad-nafis-putra.pdf`: CV versi web (tanpa alamat rumah)

## Mengubah konten

Semua teks ada di `index.html`, dikelompokkan per bagian (HERO, INDEX, CASES, LAINNYA, TENTANG, RUNDOWN, SERTIFIKAT, KONTAK).
Warna dan huruf diatur di bagian atas `style.css` (`--wine`, `--crimson`, `--gold`, `--display`, dll.).

Menambah proyek utama: salin satu blok `<article class="case ...">` dan tambahkan barisnya di daftar
`<ol class="plist">` (atribut `data-peek` berisi gambar yang muncul saat kursor diarahkan).
Semua proyek memakai gaya yang sama; cukup ganti teks, gambar, dan link-nya.

## Menerbitkan gratis lewat GitHub Pages

1. Buat repository baru di GitHub bernama `MuhammadNafisPutra.github.io`.
2. Unggah semua isi folder ini (bukan foldernya) ke repository tersebut.
3. Buka **Settings → Pages**, pilih branch `main`, lalu simpan.
4. Situs aktif di `https://muhammadnafisputra.github.io` dalam beberapa menit.

## Catatan

- Nomor WhatsApp tercantum di bagian Kontak. Hapus blok WhatsApp kalau tidak ingin nomor itu publik.
- Animasi otomatis dimatikan untuk pengunjung yang mengaktifkan "kurangi gerakan" di perangkatnya.
