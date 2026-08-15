# Etkinlik fotoğrafları

Etkinlik görsellerini bu klasöre, aşağıdaki adlarla koy. Dosyayı koyduğun an
site otomatik gösterir; koymazsan marka renkli yer tutucu kalır (kırık görsel çıkmaz).

| Etkinlik                          | Dosya adı                    |
| ---------------------------------- | ----------------------------- |
| Spor Zirvesi (öne çıkan)           | `spor-zirvesi.webp`          |
| Tanışma Etkinliği                  | `tanisma-etkinligi.webp`     |
| ProteinOcean Standı                | `proteinocean-stant.webp`    |
| Teknofest — Blokzincir Yarışması   | `teknofest.webp`             |
| Voleybol Turnuvası                 | `voleybol-turnuvasi.jpg`     |
| PlayStation Turnuvası              | `playstation-turnuvasi.jpg`  |
| Crossroads                         | `crossroads.png`             |

Bu liste `src/lib/site.ts` içindeki `EVENTS` dizisiyle birebir eşleşir —
yeni bir etkinlik eklerken oradaki `image` alanını ve bu tabloyu birlikte
güncelle.

## Notlar
- Önerilen: yatay (landscape) fotoğraf, en az ~1200px genişlik, `.jpg` veya `.webp`.
- Uzantıyı değiştirirsen (örn. `.png`) `src/lib/site.ts` içindeki `image` yolunu da güncelle.
- Kartlar görseli otomatik kırpar (object-cover), bu yüzden çok önemli detayları kenarlara koyma.
