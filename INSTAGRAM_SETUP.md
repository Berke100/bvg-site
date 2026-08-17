# Instagram'dan otomatik gönderi çekme — kurulum

`/haberler` sayfası artık Instagram Graph API'den son gönderileri otomatik
çekebilecek şekilde hazır (kod tarafı bitti). Devreye almak için aşağıdaki
adımları senin yapman gerekiyor — bunlar senin Instagram/Meta hesabınla
yapılıyor, ben tarafımdan yapılamıyor.

## 1) Instagram hesabını Business/Creator hesabına çevir

Instagram uygulaması → Profil → Menü → Ayarlar ve gizlilik → Hesap türü ve
araçlar → "Profesyonel hesaba geç". Zaten Business/Creator ise bu adımı atla.

## 2) Meta for Developers'ta uygulama oluştur

1. https://developers.facebook.com/ adresine git, Instagram hesabınla/Facebook
   hesabınla giriş yap.
2. **My Apps → Create App**. Bir uygulama adı ver (örn. "BVG Site").
3. Uygulama panelinde **Add Product** → **Instagram** ürününü ekle.
4. Instagram ürünü ayarlarında **Business Login** / **Instagram API with
   Instagram Login** akışını yapılandır (Facebook Sayfası gerekmez).
5. **Redirect URI** (OAuth geri dönüş adresi) olarak tam olarak şunu gir:
   ```
   https://bvgtoplulugu.com/api/instagram/callback
   ```
6. **Instagram Tester** olarak kendi Instagram hesabını (BVG hesabı) ekle —
   uygulama henüz Meta incelemesinden geçmediği için (kendi hesabımızın
   verisini çektiğimiz sürece incelemeye gerek yok) sadece "tester" olarak
   eklenen hesaplar veri çekebilir. Ekledikten sonra Instagram
   uygulamasından (telefonunda) gelen tester davetini kabul etmen gerekiyor:
   Instagram → Ayarlar → Uygulamalar ve web siteleri → Davetler.
7. App Dashboard'ın ana sayfasından **App ID** ve **App Secret**'ı not al.

## 3) Bana bu bilgileri ver, Vercel'e ekleyeyim

Şu değerleri paylaş (App Secret dahil — bu repoya asla commit edilmiyor,
sadece Vercel'in ortam değişkenlerine gidiyor):
- `INSTAGRAM_APP_ID`
- `INSTAGRAM_APP_SECRET`

Ben bunları ve şu ikisini Vercel'e eklerim:
- `INSTAGRAM_REDIRECT_URI` = `https://bvgtoplulugu.com/api/instagram/callback`
- `INSTAGRAM_REFRESH_SECRET` = rastgele bir parola (ben üretirim)

## 4) Bağlantıyı kur (tek seferlik)

Ortam değişkenleri eklenip siteye yeniden deploy edildikten sonra tarayıcıda
şu adresi aç:
```
https://bvgtoplulugu.com/api/instagram/connect
```
Instagram'ın izin ekranına yönlenirsin, izin ver → geri dönünce ekranda bir
token göreceksin. O token'ı bana ilet (veya kendin Vercel dashboard'dan
`INSTAGRAM_ACCESS_TOKEN` ortam değişkenine ekle). Ekledikten sonra tekrar
deploy gerekiyor — ben hallederim.

## 5) Bakım — ~45 günde bir

Token 60 gün geçerli. Süresi dolmadan yenilemek için ~45 günde bir şu
adresi ziyaret et (URL'deki `SECRET` yerine 3. adımda verdiğim
`INSTAGRAM_REFRESH_SECRET` değerini yaz):
```
https://bvgtoplulugu.com/api/instagram/refresh?secret=SECRET
```
Dönen JSON'daki yeni `access_token` değerini `INSTAGRAM_ACCESS_TOKEN`
ortam değişkenine güncelle (bana iletirsen ben de yaparım). Bunu
unutursan site kırılmaz — token süresi dolunca `/haberler` sayfası
otomatik olarak `src/lib/site.ts`'teki elle eklenen listeye (veya boşsa
"Yakında burada" mesajına) düşer.

## Not

Bu adımları yapmak istemezsen sorun değil — `/haberler` sayfası zaten
`src/lib/site.ts` içindeki `INSTAGRAM_POSTS` dizisine elle gönderi
ekleyerek de çalışıyor (bkz. `public/instagram/README.md`).
