/**
 * BVG site geneli sabit veriler.
 * Menü, iletişim bilgileri, etkinlikler ve istatistikler burada toplanır;
 * sayfalar bu tek kaynaktan beslenir.
 */

export const SITE = {
  name: "BVG",
  tagline: "Kampüsün en güçlü network'ü",
  university: "Sakarya Uygulamalı Bilimler Üniversitesi",
  instagram: "https://instagram.com/blockchainvegelecek",
  instagramHandle: "@blockchainvegelecek",
  email: "blockchainvegelecek@gmail.com",
} as const;

/**
 * Üyelik başvuru formu — kendi tasarımımızla native form, gönderimde bir
 * Google Apps Script Web App'ine POST atılır; script aynı Google Sheet'e
 * (Google Form'un yanıtlarının düştüğü sheet) satır ekler.
 *
 * Google Form'un kendi `formResponse` endpoint'ine doğrudan POST atma
 * (entry.XXXXXXX tekniği) artık Google'ın bot korumasınca 401 ile
 * reddediliyor — bu yüzden Apps Script bir ara katman olarak kullanılıyor.
 * Script kaynağı ve deploy adımları için Berke'de. Script `doPost`'ta
 * `Form Responses 1` sheet'ine bu alan adlarıyla satır ekliyor.
 */
export const MEMBERSHIP_FORM_ACTION =
  "https://script.google.com/macros/s/AKfycbwg25HdDa51Qt1fo7N-Vk-jq2D2AxjzdBhpNjcJlZGbIgjqRb0-z66UXDXQoweBODzdxQ/exec";

export const MEMBERSHIP_FORM_FIELDS = {
  adSoyad: "adSoyad",
  email: "email",
  telefon: "telefon",
  universite: "universite",
  sinif: "sinif",
  bolum: "bolum",
} as const;

export const UNIVERSITE_OPTIONS = [
  "Sakarya Uygulamalı Bilimler Üniversitesi",
  "Sakarya Üniversitesi",
  "Diğer:",
] as const;

export const SINIF_OPTIONS = [
  "Hazırlık",
  "1. Sınıf",
  "2. Sınıf",
  "3. Sınıf",
  "4. Sınıf",
  "Diğer",
] as const;

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/etkinlikler", label: "Etkinlikler" },
  { href: "/teknofest", label: "Teknofest" },
  { href: "/girisim", label: "BVG Girişim" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export type EventItem = {
  slug: string;
  title: string;
  meta: string; // Konuşmacı / kategori / kısa etiket
  description: string;
  tag: string; // Kart üstü rozet metni
  featured?: boolean;
  /**
   * Gerçek görseller ekibin elinde. Buraya /public altındaki dosya yolu gelecek.
   * Örn: image: "/events/spor-zirvesi.jpg"
   */
  image?: string;
};

/*
 * GÖRSEL EKLEME (ekip için — kod bilmeye gerek yok):
 * Aşağıdaki `image` alanlarındaki dosya adlarıyla fotoğrafları public/events/
 * klasörüne koyman yeterli. Dosya varsa fotoğraf otomatik görünür; yoksa
 * marka renkli yer tutucu kalır (kırık görsel çıkmaz).
 *
 * Mevcut dosyalar (public/events/):
 *   spor-zirvesi.webp
 *   crossroads.png
 *   teknofest.webp
 *   tanisma-etkinligi.webp
 *   voleybol-turnuvasi.jpg
 *   playstation-turnuvasi.jpg
 *   proteinocean-stant.webp
 * (Yeni dosya eklerken uzantıyı buradaki `image` alanıyla birebir eşleştir.)
 */
export const EVENTS: EventItem[] = [
  {
    slug: "spor-zirvesi",
    title: "Spor Zirvesi",
    meta: "Konuşmacılar: Göktuğ Alaf & Koray Girgin",
    tag: "Öne çıkan",
    featured: true,
    image: "/events/spor-zirvesi.webp",
    description:
      "1000'den fazla katılımcıyla salonu dolduran zirvemiz. Göktuğ Alaf ve Koray Girgin'in konuk olduğu ilham verici bir buluşma.",
  },
  {
    slug: "tanisma-etkinligi",
    title: "Tanışma Etkinliği",
    meta: "Group Up! · Dönem açılışı",
    tag: "Topluluk",
    image: "/events/tanisma-etkinligi.webp",
    description:
      "Yeni üyelerle kaynaştığımız, dönemi hep birlikte açtığımız samimi tanışma buluşması.",
  },
  {
    slug: "proteinocean-stant",
    title: "ProteinOcean Standı",
    meta: "Kampüs standı · marka iş birliği",
    tag: "İş birliği",
    image: "/events/proteinocean-stant.webp",
    description:
      "Kampüste kurduğumuz stantla üyelerimizi marka iş birliklerimizle buluşturduğumuz enerjik bir gün.",
  },
  {
    slug: "teknofest",
    title: "Teknofest — Blokzincir Yarışması",
    meta: "TÜBİTAK · Milli Teknoloji Hamlesi",
    tag: "Yarışma",
    image: "/events/teknofest.webp",
    description:
      "Türkiye'nin en büyük teknoloji festivalinde, blokzincir yarışmasında ekibimizle sahnedeydik.",
  },
  {
    slug: "voleybol-turnuvasi",
    title: "Voleybol Turnuvası",
    meta: "Kampüs içi turnuva",
    tag: "Turnuva",
    image: "/events/voleybol-turnuvasi.jpg",
    description:
      "Bölümler arası kaynaşmayı büyüten, rekabetin dostlukla buluştuğu enerjik bir turnuva.",
  },
  {
    slug: "playstation-turnuvasi",
    title: "PlayStation Turnuvası",
    meta: "Kampüs içi turnuva",
    tag: "Turnuva",
    image: "/events/playstation-turnuvasi.jpg",
    description:
      "Molalarda ekranların başında toplanan, herkesin katılabildiği eğlenceli bir rekabet.",
  },
  {
    slug: "crossroads",
    title: "Crossroads",
    meta: "Blockchain sektör konferansı",
    tag: "Sektör",
    image: "/events/crossroads.png",
    description:
      "Solana ekosisteminin öne çıkan isimlerini dinlediğimiz, sektörün nabzını sahada tuttuğumuz büyük konferans.",
  },
];

/*
 * Hero (ana sayfa üst bölüm) görseli.
 * Dosya: public/hero/spor-zirvesi.webp — otomatik görünür.
 */
export const HERO_IMAGE = "/hero/spor-zirvesi.webp";

// "Neden BVG?" kartları — icon alanı icons.tsx içindeki IconName'lerle eşleşir
export const WHY_CARDS = [
  {
    icon: "network",
    title: "Network",
    text: "Bölüm fark etmeksizin kampüsün en geniş öğrenci ağına katıl; doğru insanlarla tanış.",
  },
  {
    icon: "book",
    title: "Eğitim",
    text: "Kodlamadan farklı alanlara düzenli eğitimlerle kendini sürekli geliştir.",
  },
  {
    icon: "briefcase",
    title: "Staj Fırsatları",
    text: "Sektör bağlantılarımız sayesinde staj ve kariyer kapıları arala.",
  },
  {
    icon: "calendar",
    title: "Etkinlikler",
    text: "Zirveler, turnuvalar ve gezilerle dolu bir dönem seni bekliyor.",
  },
] as const;

export type SponsorItem = {
  name: string;
  /**
   * Gerçek logo ekibin elinde. Buraya /public/sponsors altındaki dosya yolu
   * gelecek (örn. logo: "/sponsors/proteinocean.png"). Boş bırakılırsa
   * otomatik olarak marka renkli bir isim rozeti gösterilir.
   */
  logo?: string;
};

// İş birliği yaptığımız markalar — logo eklemek için public/sponsors/README.md'ye bak.
export const SPONSORS: SponsorItem[] = [{ name: "ProteinOcean" }];

// Büyüme/etki sayaç bandı — ekibin verdiği gerçek rakamlar (Ağu 2026).
export const IMPACT_STATS = [
  { value: "500+", label: "Instagram takipçisi" },
  { value: "500+", label: "Aktif üye" },
  { value: "15+", label: "Düzenlenen etkinlik" },
  { value: "10+", label: "Teknofest finalist takımı" },
] as const;
