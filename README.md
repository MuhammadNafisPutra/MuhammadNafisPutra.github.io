# Website Portofolio · Muhammad Nafis Putra

Situs statis: `index.html`, `style.css`, `script.js`, plus folder `assets/`. Tidak perlu
instalasi atau build. Buka `index.html` di browser untuk melihatnya.

## Isi

- `assets/img/`: foto dan screenshot proyek (format WebP agar ringan)
- `assets/sertifikat/`: PDF sertifikat yang ditautkan dari bagian Sertifikat
- `assets/cv-muhammad-nafis-putra.pdf`: CV versi web (tanpa alamat rumah)

## Mengubah konten

Semua teks ada di `index.html`, dikelompokkan per bagian (HERO, PROJECT, PENGALAMAN, SERTIFIKAT, KONTAK).
Warna dan huruf diatur di bagian atas `style.css` (`--wine`, `--crimson`, `--gold`, `--display`, dll.).

Menambah proyek: salin satu blok `<li class="proj ...">` di dalam `<ul class="grid">`.
- `proj--main` = kartu besar (2 per baris), `proj--small` = kartu kecil (3 per baris), `proj--wide` = selebar halaman.
- `data-cat` menentukan kategori filter: `app`, `data`, `web`, atau `design`. Perbarui angka kecil di tombol filter.

## Menerbitkan gratis lewat GitHub Pages

1. Buat repository baru di GitHub bernama `MuhammadNafisPutra.github.io`.
2. Unggah semua isi folder ini (bukan foldernya) ke repository tersebut.
3. Buka **Settings → Pages**, pilih branch `main`, lalu simpan.
4. Situs aktif di `https://muhammadnafisputra.github.io` dalam beberapa menit.

## Catatan

- Nomor WhatsApp tercantum di bagian Kontak. Hapus blok WhatsApp kalau tidak ingin nomor itu publik.
- Animasi otomatis dimatikan untuk pengunjung yang mengaktifkan "kurangi gerakan" di perangkatnya.
