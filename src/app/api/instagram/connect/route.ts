import { NextResponse } from "next/server";
import { getInstagramAuthorizeUrl } from "@/lib/instagram";

/**
 * /api/instagram/connect ziyaret edilince Instagram'ın izin ekranına
 * yönlendirir. INSTAGRAM_APP_ID / INSTAGRAM_REDIRECT_URI ortam
 * değişkenleri Vercel'de tanımlıysa çalışır.
 */
export async function GET() {
  const url = getInstagramAuthorizeUrl();
  if (!url) {
    return NextResponse.json(
      {
        error:
          "INSTAGRAM_APP_ID veya INSTAGRAM_REDIRECT_URI ortam değişkeni eksik.",
      },
      { status: 500 },
    );
  }
  return NextResponse.redirect(url);
}
