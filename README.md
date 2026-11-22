# Laman web Power Action Resources

Laman statik (HTML + CSS + JS) — tiada pelayan atau pangkalan data diperlukan. Boleh dihoskan di Netlify, GitHub Pages, cPanel atau mana-mana hosting.

## Kandungan laman
1. **Hero** — slogan "Gerakkan potensi. Hasilkan tindakan.", foto Afizul Mohammad, statistik (15+ tahun, 10,000+ peserta) dan lencana HRD Corp
2. **Program** — High-Performance Team Building, Customer Service Excellence, Kesihatan Mental di Tempat Kerja + program tersuai
3. **Galeri** — 5 gambar & 4 klip video sebenar dari sesi latihan (klik untuk besarkan / main dengan bunyi)
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
Laman dihoskan di GitHub Pages: https://dynopos.github.io/Powercoach/
Jika guna domain sendiri nanti, cari & ganti `https://dynopos.github.io/Powercoach/` dengan domain baharu dalam:
`index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`.

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
- Gambar sesi: `assets/img/sesi-*.webp`; gambar jurulatih: `assets/img/jurulatih-1..5-*.webp` (3 saiz: 640, 1280, 1920). Video: `assets/video/sesi-1..4.mp4` + gambar muka `sesi-*.webp`.
- Video dimainkan senyap secara automatik bila kelihatan; klik untuk tonton dengan bunyi.
- Tambah gambar baharu: salin satu blok `<figure class="gal__item ...">` dalam `index.html` dan tukar nama fail & kapsyen.
