# Marka dosyaları

## Logo
`bvg-logo.png` dosyasını bu klasöre koy — header'daki `Logo` bileşeni
(`src/components/logo.tsx`) otomatik olarak bunu gösterir. Dosya yokken
(404) coin işareti + "BVG" kelime markası placeholder'ı kalır (kırık
görsel çıkmaz).

- Yatay/geniş logo önerilir, şeffaf arkaplan (`.png`).
- `.svg` kullanacaksan dosya adını `bvg-logo.svg` yap ve
  `src/components/logo.tsx` içindeki `src="/brand/bvg-logo.png"` satırını
  buna göre güncelle.

## Favicon
`src/app/favicon.ico` hâlâ Next.js'in varsayılan ikonu. Gerçek logodan
üretilen `.ico` dosyasını doğrudan `src/app/favicon.ico` yoluna
kopyalayıp üzerine yaz — Next.js App Router dosya kuralı gereği bu
otomatik algılanır, kod tarafında değişiklik gerekmez.
