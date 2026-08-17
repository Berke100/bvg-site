# Instagram gönderileri (/haberler sayfası)

Instagram'ın resmi embed widget'ı sabit beyaz kart olarak geliyor ve CSS ile
sitenin koyu temasına boyanamıyor — bu yüzden gönderiler kendi kart
tasarımımızla gösteriliyor.

Yeni bir gönderi eklerken:
1. Gönderinin görselini bu klasöre koy (tercihen kare/1:1 format, `.jpg`/`.png`/`.webp`).
2. `src/lib/site.ts` içindeki `INSTAGRAM_POSTS` dizisine ekle:

```ts
{
  image: "/instagram/dosya-adi.jpg",
  caption: "Gönderideki açıklama metni.",
  permalink: "https://instagram.com/p/XXXXXXXXXXX/", // gerçek gönderi linki (opsiyonel)
  date: "Ağustos 2026", // opsiyonel
}
```

`permalink` verilirse kartta "Gönderiyi gör" linki çıkar ve gerçek Instagram
gönderisine götürür. Dizi boşken `/haberler` sayfası kırık/boş görünmez —
"Yakında burada" mesajıyla Instagram takip linkine yönlendirir.
