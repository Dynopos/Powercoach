# Laman web Power Action Resources

Laman statik (HTML + CSS + JS) — tiada pelayan atau pangkalan data diperlukan. Boleh dihoskan di Netlify, GitHub Pages, cPanel atau mana-mana hosting.

## Kandungan laman
1. **Hero** — slogan "Gerakkan potensi. Hasilkan tindakan.", foto Afizul Mohammad, statistik (15+ tahun, 10,000+ peserta) dan lencana HRD Corp
2. **Program** — High-Performance Team Building, Customer Service Excellence, Kesihatan Mental di Tempat Kerja + program tersuai
3. **Galeri** — gambar sesi, gambar jurulatih, 7 klip video dan **Album program** (46 gambar, boleh ditapis: dalam dewan / luar / sesi / kumpulan)
3b. **Kata peserta** — video testimoni peserta
4. **Pendekatan** — 3 langkah kerja
5. **Jurulatih** — profil, pengalaman dan kelayakan Afizul Mohammad
6. **HRD Corp** — Registered Training Provider & HRD Corp Claimable (dengan penafian syarat)
7. **Sumber** — afizulmohammad.com dan motivasipekerja.com
8. **Soalan lazim** (6 soalan)
9. **CTA** WhatsApp + e-mel, footer, butang WhatsApp terapung

## Struktur fail
```
index.html            laman utama (termasuk data berstruktur JSON-LD untuk Google)
css/style.css         semua gaya & warna
js/main.js            menu telefon, animasi skrol, marquee, FAQ
assets/img/           logo, foto, lencana HRD Corp (WebP)
og-image.jpg          gambar pratonton bila pautan dikongsi (WhatsApp/Facebook)
favicon.png, icon-*.png, apple-touch-icon.png, site.webmanifest
robots.txt, sitemap.xml, llms.txt (untuk Google & enjin AI), 404.html
```

## Cara menukar
- **Pautan WhatsApp**: cari & ganti `https://wa.link/lsq0qn` dalam `index.html`.
- **E-mel**: cari & ganti `poweraction17@yahoo.com` dalam `index.html` dan `llms.txt`.
- **Teks**: edit terus dalam `index.html`. Jika ubah soalan lazim, ubah juga bahagian `FAQPage` dalam skrip JSON-LD di `<head>` supaya sama.
- **Warna**: tukar token di bahagian atas `css/style.css` (`--brand`, `--brand-hi`, dll.).
- **Gambar**: ganti fail dalam `assets/img/` dengan nama yang sama.
- Selepas mengubah CSS/JS, naikkan nombor `?v=1` → `?v=2` dalam `index.html` supaya pelayar tidak guna salinan lama.

## Alamat laman
Laman live di domain sendiri: **https://teambuildingbest.com/** (GitHub Pages + fail `CNAME`).
Jika domain bertukar, kemas kini `CNAME` dan cari & ganti `https://teambuildingbest.com/` dalam:
`index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`.

## Deploy (GitHub Pages)
1. Repo GitHub → **Settings → Pages**.
2. **Source: Deploy from a branch** → pilih branch laman ini dan folder **/ (root)** → **Save**.
3. Tunggu 1–2 minit, laman akan live di alamat di atas. Setiap kali fail dikemas kini dan di-push, laman dikemas kini sendiri.
4. Domain sendiri: Settings → Pages → **Custom domain**, kemudian tetapkan DNS (rekod CNAME ke `dynopos.github.io`).

## Selepas terbit
- Daftar di Google Search Console dan hantar `sitemap.xml`.
- Daftar di Bing Webmaster Tools (digunakan oleh ChatGPT/Copilot).
- Letak URL laman dalam Google Business Profile & semua media sosial.

## Galeri
- Album: `assets/img/album-01..46-(480|1280).webp`. Tambah gambar album: salin satu blok `<figure class="alb__item" data-cat="...">` (kategori: dalam, luar, sesi, kumpulan) dan kemas kini nombor pada butang penapis.
- Gambar sesi: `assets/img/sesi-*.webp`; gambar jurulatih: `assets/img/jurulatih-1..5-*.webp` (3 saiz: 640, 1280, 1920). Video: `assets/video/sesi-1..8.mp4` (sesi-6 = testimoni) + gambar muka `sesi-*.webp`.
- Video dimainkan senyap secara automatik bila kelihatan; klik untuk tonton dengan bunyi.
- Tambah gambar baharu: salin satu blok `<figure class="gal__item ...">` dalam `index.html` dan tukar nama fail & kapsyen.

## Bento bergilir (gambar bertukar)
- 5 petak galeri utama menukar gambar secara automatik (pudar lembut), satu petak setiap ~1.8 saat secara bergilir.
- Berhenti bila tetikus di atas petak, bila tab tidak aktif, atau bila paparan besar dibuka; tidak bergerak jika pelawat pilih "kurangkan animasi".
- Tukar senarai gambar: dalam `index.html`, setiap `<figure class="gal__item gal--a rot ...">` ada beberapa `<img class="rot__img">` — tambah/buang `<img>` dan titik `<i>` dalam `rot__dots` mengikut bilangan.
