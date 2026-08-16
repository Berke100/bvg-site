# Sponsor / iş birliği logoları

Logoyu bu klasöre koy, dosya varsa site otomatik gösterir; koymazsan marka
renkli bir isim rozeti kalır (kırık görsel çıkmaz).

Mevcut sponsorlar (`src/lib/site.ts` içindeki `SPONSORS` dizisi):

| Marka          | Dosya adı (henüz eklenmedi) |
| -------------- | ---------------------------- |
| ProteinOcean   | `proteinocean.png`           |

Yeni bir sponsor eklerken:
1. Logoyu bu klasöre koy (tercihen şeffaf arka planlı `.png` veya `.svg`, geniş/yatay format).
2. `src/lib/site.ts` içindeki `SPONSORS` dizisine `{ name: "Marka Adı", logo: "/sponsors/dosya-adi.png" }` olarak ekle (veya mevcut satıra `logo` alanını ekle).

## Notlar
- Logo şeridi otomatik gri tonlama (grayscale) uygular, üzerine gelince renkli olur — bu yüzden koyu/açık her iki temada da okunaklı, sade logolar en iyi sonucu verir.
