import type { Metadata } from "next";
import { Button, Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EventCard, FeaturedEventCard } from "@/components/event-card";
import { ArrowRightIcon } from "@/components/icons";
import { EVENTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Spor Zirvesi, turnuvalar, sektör etkinlikleri ve düzenli eğitimler. BVG'nin geçmiş etkinliklerine göz at.",
};

export default function EtkinliklerPage() {
  const [featured, ...rest] = [...EVENTS].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <>
      <PageHeader
        kicker="Etkinlikler"
        title="Bir dönem, dolu dolu"
        description="Zirvelerden turnuvalara, sektör buluşmalarından eğitimlere — kampüs hayatını renklendiren, üyelerini geliştiren etkinlikler."
      />

      <Container className="py-16 sm:py-20">
        {/* Öne çıkan etkinlik */}
        <Reveal>
          <FeaturedEventCard event={featured} />
        </Reveal>

        {/* Diğer etkinlikler */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((event, i) => (
            <Reveal key={event.slug} delay={i * 70}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-surface/40 px-6 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-xl text-cream">Bir sonrakini kaçırma</h3>
              <p className="mt-1 text-sm text-cream-dim">
                Aramıza katıl, tüm etkinliklerden ilk sen haberdar ol.
              </p>
            </div>
            <Button href="/uyelik">
              Aramıza Katıl
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
