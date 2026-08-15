# Marka dosyaları

## Logo
`bvg-logo.png` — gerçek BVG logosu. header'daki `Logo` bileşeni
(`src/components/logo.tsx`) bunu otomatik gösterir. Değiştirmek
istersen aynı dosya adıyla üzerine yaz; dosya hiç yoksa (404) coin
işareti + "BVG" kelime markası placeholder'ına düşer (kırık görsel
çıkmaz).

Aynı görsel `src/app/icon.png` olarak da kopyalandı — Next.js App
Router'ın `icon` dosya kuralı gereği favicon/sekme ikonu otomatik
buradan üretilir. Logoyu güncellersen ikisini de (bu dosyayı ve
`src/app/icon.png`'yi) aynı anda değiştir.
