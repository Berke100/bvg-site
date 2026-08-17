import { NextRequest, NextResponse } from "next/server";
import { refreshLongLivedToken } from "@/lib/instagram";

/**
 * Uzun ömürlü token 60 günde bir yenilenmeli. Bu route'u Vercel Cron ile
 * ~30 günde bir tetikleyip dönen yeni token'ı INSTAGRAM_ACCESS_TOKEN
 * ortam değişkenine elle güncellemek yeterli (bkz. INSTAGRAM_SETUP.md).
 * `secret` parametresi INSTAGRAM_REFRESH_SECRET ile eşleşmezse çalışmaz —
 * rastgele biri bu URL'i bulup token'ı boşa harcamasın diye.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.INSTAGRAM_REFRESH_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!currentToken) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN tanımlı değil" },
      { status: 500 },
    );
  }

  try {
    const refreshed = await refreshLongLivedToken(currentToken);
    const expiresInDays = Math.round(refreshed.expires_in / 86400);
    return NextResponse.json({
      message: `Yeni token alındı, ${expiresInDays} gün geçerli. INSTAGRAM_ACCESS_TOKEN ortam değişkenini bununla güncelle.`,
      access_token: refreshed.access_token,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 },
    );
  }
}
