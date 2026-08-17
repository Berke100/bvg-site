import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForShortLivedToken,
  exchangeForLongLivedToken,
} from "@/lib/instagram";

function htmlPage(title: string, body: string) {
  return new NextResponse(
    `<!doctype html><html lang="tr"><head><meta charset="utf-8"/><title>${title}</title>
    <style>body{font-family:system-ui,sans-serif;background:#0d0b08;color:#f5efe4;max-width:640px;margin:60px auto;padding:0 20px;line-height:1.6}
    code{background:#1a1712;padding:2px 6px;border-radius:4px;word-break:break-all;display:inline-block}
    h1{font-size:1.4rem}</style></head>
    <body><h1>${title}</h1>${body}</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

/**
 * Instagram'ın OAuth izin ekranından dönen ?code parametresini alır,
 * kısa ömürlü token'a, ardından 60 günlük uzun ömürlü token'a çevirir.
 * Token'ı hiçbir yerde saklamıyoruz — ekranda bir kere gösteriyoruz,
 * Vercel ortam değişkenine (INSTAGRAM_ACCESS_TOKEN) elle eklenmesi
 * gerekiyor. Bu route App Secret gibi hassas veri döndürmez.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error_description");

  if (error) {
    return htmlPage("İzin reddedildi", `<p>${error}</p>`);
  }
  if (!code) {
    return htmlPage("Kod bulunamadı", "<p>URL'de ?code parametresi yok.</p>");
  }

  try {
    const shortLived = await exchangeCodeForShortLivedToken(code);
    const longLived = await exchangeForLongLivedToken(shortLived.access_token);
    const expiresInDays = Math.round(longLived.expires_in / 86400);

    return htmlPage(
      "Bağlantı tamam 🎉",
      `<p>Aşağıdaki token'ı Vercel'de <code>INSTAGRAM_ACCESS_TOKEN</code> ortam değişkenine ekle (yaklaşık ${expiresInDays} gün geçerli):</p>
       <p><code>${longLived.access_token}</code></p>
       <p>Ekledikten sonra bu sayfayı kapatabilirsin.</p>`,
    );
  } catch (err) {
    return htmlPage(
      "Bir şeyler ters gitti",
      `<p>${err instanceof Error ? err.message : "Bilinmeyen hata"}</p>`,
    );
  }
}
