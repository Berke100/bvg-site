# Sponsor / iş birliği logoları

Logoyu bu klasöre koy, dosya varsa site otomatik gösterir; koymazsan marka
renkli bir isim rozeti kalır (kırık görsel çıkmaz).

Mevcut sponsorlar (`src/lib/site.ts` içindeki `SPONSORS` dizisi):

| Marka              | Dosya adı                 |
| ------------------ | -------------------------- |
| ProteinOcean       | `proteinocean.png`         |
| Solana Crossroads  | `crossroads.png`           |
| Sui                | `sui.png`                  |
| Sakarya Teknokent  | `sakarya-teknokent.png`    |
| SUBÜMEKTOP         | `subumektop.png`           |
| TAG                | `tag.png`                  |
| New Bi'Es          | `new-bies.png`             |

Yeni bir sponsor eklerken:
1. Logoyu bu klasöre koy (tercihen şeffaf arka planlı `.png`, geniş/yatay format, dosya adında boşluk kullanma).
2. `src/lib/site.ts` içindeki `SPONSORS` dizisine `{ name: "Marka Adı", logo: "/sponsors/dosya-adi.png" }` olarak ekle.

## Notlar
- Logolar kendi renkleriyle gösterilir (gri tonlama yok) — bu yüzden koyu/açık her iki temada da okunaklı, sade logolar en iyi sonucu verir.
- Orijinal logolardan arkaplanı siyah/beyaz olanların (crossroads, new-bies, subumektop, proteinocean) arka planı, site koyu temayla uyumlu görünsün diye şeffaflaştırıldı.
- `next/image` SVG dosyalarını varsayılan olarak optimize etmiyor (güvenlik) — SVG logo eklersen PNG'ye çevirip koy.
