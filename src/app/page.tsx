import Link from "next/link";
import {
  Button,
  Card,
  Container,
  CoinEdge,
  Kicker,
  SectionHeading,
  Stat,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Photo } from "@/components/photo";
import { HeroCarousel } from "@/components/hero-carousel";
import { Icon, ArrowRightIcon, SparkIcon, TrophyIcon } from "@/components/icons";
import { SponsorStrip } from "@/components/sponsor-strip";
import { HERO_IMAGE, IMPACT_STATS, SPONSORS, WHY_CARDS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Arka plan ışıması */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(242,183,5,0.35), transparent 65%)",
          }}
        />
        <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
          <HeroCarousel
            slides={[
              <div
                key="spor-zirvesi"
                className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div>
                  <Reveal>
                    <Kicker>Geçtiğimiz dönem · Spor Zirvesi</Kicker>
                  </Reveal>
                  <Reveal delay={60}>
                    <h1 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
                      Kampüsün{" "}
                      <span className="text-gold-gradient">en güçlü</span>{" "}
                      network&apos;ü
                    </h1>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
                      Bölüm fark etmez. Spor Zirvesi&apos;nde konuklarımız{" "}
                      <strong className="font-semibold text-cream">
                        Göktuğ Alaf
                      </strong>{" "}
                      ve{" "}
                      <strong className="font-semibold text-cream">
                        Koray Girgin
                      </strong>{" "}
                      ile 1000&apos;den fazla katılımcıyı bir araya getirdik.
                      BVG, seni doğru insanlarla, gerçek fırsatlarla
                      buluşturan topluluk.
                    </p>
                  </Reveal>
                  <Reveal delay={180}>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Button href="/uyelik">
                        Aramıza Katıl
                        <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                      <Button href="/etkinlikler" variant="outline">
                        Etkinlikleri Gör
                      </Button>
                    </div>
                  </Reveal>
                </div>

                <div className="relative">
                  {/* Foto: public/hero/spor-zirvesi.jpg konunca otomatik görünür */}
                  <Photo
                    src={HERO_IMAGE}
                    alt="Spor Zirvesi — konuşmacılar Göktuğ Alaf & Koray Girgin"
                    label="Spor Zirvesi — Göktuğ Alaf & Koray Girgin"
                    ratio="aspect-[4/5]"
                    priority
                  />
                  <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-line bg-bg/90 px-5 py-4 backdrop-blur sm:block">
                    <div className="font-display text-2xl font-bold text-gold-gradient">
                      1000+ katılımcı
                    </div>
                    <div className="text-xs text-cream-dim">
                      Göktuğ Alaf & Koray Girgin
                    </div>
                  </div>
                </div>
              </div>,
              <div
                key="yakinda"
                className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div>
                  <Kicker>Yakında</Kicker>
                  <h1 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
                    Bu sezon kampüse{" "}
                    <span className="text-gold-gradient">güçlü isimler</span>{" "}
                    geliyor
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
                    Perde arkasında büyük buluşmalar hazırlıyoruz. Görüşmeler
                    sürüyor — ismi henüz veremeyiz ama sürprizlerimiz büyük
                    olacak. Takipte kal.
                  </p>
                  <div className="mt-9">
                    <Button href="/haberler" variant="outline">
                      Haberdar ol
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-amber/30 bg-gradient-to-br from-surface-2/40 via-surface to-bg">
                  <SparkIcon className="absolute right-6 top-6 h-10 w-10 text-gold/40" />
                  <div className="flex h-full items-center justify-center">
                    <SparkIcon className="h-24 w-24 text-gold/20" />
                  </div>
                </div>
              </div>,
            ]}
          />
        </Container>
        <CoinEdge />
      </section>

      {/* ============ BAŞARI VURGUSU (Teknofest) ============ */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <SectionHeading kicker="Kanıtlanmış başarı" title="Sahada varız">
                Son üç yıldır Türkiye&apos;nin en büyük teknoloji yarışmasında
                boy gösteriyor, kürsüye aday takımlar çıkarıyoruz. Bu, bir
                topluluğun değil; ekip olabilmenin gücü.
              </SectionHeading>
              <div className="mt-8">
                <Button href="/teknofest" variant="outline">
                  Başarı hikayemiz
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Card className="relative overflow-hidden">
                <TrophyIcon className="absolute -right-6 -top-6 h-32 w-32 text-gold/10" />
                <div className="relative grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-display text-5xl font-bold text-gold-gradient">
                      3 yıl
                    </div>
                    <div className="mt-2 text-sm text-cream-dim">
                      Üst üste katılım
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-5xl font-bold text-gold-gradient">
                      10+
                    </div>
                    <div className="mt-2 text-sm text-cream-dim">
                      Finalist takım
                    </div>
                  </div>
                </div>
                <p className="relative mt-8 border-t border-line pt-6 text-sm leading-relaxed text-cream-dim">
                  Fikirden prototipe uzanan yolda ekiplerimizi mentorluk ve
                  network ile destekliyoruz.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============ İŞ BİRLİKLERİ ============ */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cream-dim">
              İş birliği yaptığımız markalar
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-8">
            <SponsorStrip sponsors={SPONSORS} />
          </Reveal>
        </Container>
      </section>

      {/* ============ BÜYÜME / ETKİ SAYACI ============ */}
      <section className="border-y border-line bg-surface/30 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <Stat value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ NEDEN BVG? ============ */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              center
              kicker="Neden BVG?"
              title="Katılmak için dört sağlam sebep"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <Card className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                    <Icon name={card.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl text-cream">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-cream-dim">
                    {card.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ KAPANIŞ CTA ============ */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface-2/50 via-surface to-bg px-6 py-16 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,183,5,0.4), transparent 70%)",
                }}
              />
              <h2 className="relative mx-auto max-w-2xl text-3xl text-cream sm:text-5xl">
                Bölüm fark etmez, aramıza katıl
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-lg text-cream-dim">
                Bir formu doldurman yeterli. Gerisi network, etkinlik ve
                fırsatlarla dolu bir dönem.
              </p>
              <div className="relative mt-9 flex justify-center">
                <Button href="/uyelik">
                  Üyelik formunu doldur
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="relative mt-6 text-xs text-cream-dim">
                Zaten üye misin?{" "}
                <Link href="/etkinlikler" className="text-gold hover:underline">
                  Etkinliklere göz at
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
