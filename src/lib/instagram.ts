import "server-only";
import type { InstagramPost } from "@/lib/site";

/**
 * Instagram Graph API entegrasyonu (server-only — App Secret ve access
 * token istemciye asla gitmiyor). Kurulum: public/instagram/README.md
 * yerine bkz. INSTAGRAM_SETUP.md (repo kökünde) — Meta app oluşturma,
 * Business Login akışı ve token yenileme adımları orada.
 *
 * Ortam değişkenleri (Vercel'de tanımlanır, repoya asla commit edilmez):
 *   INSTAGRAM_APP_ID        — Meta App Dashboard'daki App ID
 *   INSTAGRAM_APP_SECRET    — Meta App Dashboard'daki App Secret
 *   INSTAGRAM_REDIRECT_URI  — örn. https://bvgtoplulugu.com/api/instagram/callback
 *   INSTAGRAM_ACCESS_TOKEN  — uzun ömürlü (60 gün) token, OAuth akışı sonunda elde edilir
 *   INSTAGRAM_REFRESH_SECRET — /api/instagram/refresh'i korumak için rastgele bir parola
 */

const AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize";
const SHORT_LIVED_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";
const REFRESH_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";
const MEDIA_URL = "https://graph.instagram.com/me/media";

export function getInstagramAuthorizeUrl() {
  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  if (!appId || !redirectUri) return null;

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "instagram_business_basic",
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

type ShortLivedTokenResponse = {
  access_token: string;
  user_id: string;
};

export async function exchangeCodeForShortLivedToken(code: string) {
  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  if (!appId || !appSecret || !redirectUri) {
    throw new Error("Instagram app ortam değişkenleri eksik");
  }

  const body = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  });

  const res = await fetch(SHORT_LIVED_TOKEN_URL, { method: "POST", body });
  if (!res.ok) {
    throw new Error(`Kısa ömürlü token alınamadı: ${await res.text()}`);
  }
  return (await res.json()) as ShortLivedTokenResponse;
}

type LongLivedTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function exchangeForLongLivedToken(shortLivedToken: string) {
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!appSecret) throw new Error("INSTAGRAM_APP_SECRET eksik");

  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: appSecret,
    access_token: shortLivedToken,
  });

  const res = await fetch(`${LONG_LIVED_TOKEN_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Uzun ömürlü token alınamadı: ${await res.text()}`);
  }
  return (await res.json()) as LongLivedTokenResponse;
}

export async function refreshLongLivedToken(currentToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: currentToken,
  });

  const res = await fetch(`${REFRESH_TOKEN_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Token yenilenemedi: ${await res.text()}`);
  }
  return (await res.json()) as LongLivedTokenResponse;
}

type MediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

/**
 * Hesabın son gönderilerini çeker. Token yoksa ya da istek başarısız
 * olursa (süresi dolmuş, henüz bağlanmamış vb.) sessizce boş dizi döner
 * — /haberler sayfasındaki "Yakında burada" yedek görünümü devreye girer,
 * sayfa asla kırık görünmez.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const params = new URLSearchParams({
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    access_token: token,
    limit: "9",
  });

  try {
    const res = await fetch(`${MEDIA_URL}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as { data: MediaItem[] };
    return json.data
      .filter((item) => item.media_type !== "VIDEO")
      .map((item) => ({
        image:
          item.media_type === "CAROUSEL_ALBUM" && item.thumbnail_url
            ? item.thumbnail_url
            : item.media_url,
        caption: item.caption ?? "",
        permalink: item.permalink,
        date: new Date(item.timestamp).toLocaleDateString("tr-TR", {
          month: "long",
          year: "numeric",
        }),
      }));
  } catch {
    return [];
  }
}
