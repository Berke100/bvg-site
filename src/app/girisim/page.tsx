import type { Metadata } from "next";
import { Button, Card, Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "BVG Girişim",
  description:
    "Girişimcilik ruhunu besliyoruz: mentorluk, network ve destek. BVG Girişim vizyonu.",
};

const PILLARS = [
  {
    title: "Mentorluk",
    text: "Deneyimli isimlerle bir araya gel; fikrini doğru sorularla olgunlaştır, yol haritanı birlikte çiz.",
  },
  {
    title: "Network",
    text: "Kampüsün en geniş ağı senin arkanda. Kurucu adaylarından potansiyel ortaklara doğru bağlantıları kur.",
  },
  {
    title: "Destek",
    text: "Fikirden ilk adıma uzanan yolda kaynak, motivasyon ve topluluk desteğiyle yalnız değilsin.",
  },
];

export default function GirisimPage() {
  return (
    <>
      <PageHeader
        kicker="BVG Girişim"
        title="Girişimcilik ruhunu besliyoruz"
        description="Henüz başındayız ve tam da bu yüzden heyecanlıyız. BVG Girişim, bir fikri olan herkese ilk adımı atacağı ortamı sunma vizyonuyla yola çıkıyor."
      />

      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-cream-dim">
              Bir sonraki büyük fikir, kampüsteki bir sohbette doğabilir.
              Amacımız o kıvılcımı görünür kılmak: doğru insanları bir araya
              getirip, denemekten korkmayan bir kültür inşa etmek.
            </p>
          </div>
        </Reveal>

        {/* Üç sütun */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 90}>
              <Card className="h-full">
                <div className="font-display text-sm font-bold uppercase tracking-widest text-amber">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-2xl text-cream">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {pillar.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Vizyon şeridi */}
        <Reveal>
          <div className="mt-16 overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 sm:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl text-cream sm:text-3xl">
                  Bir fikrin mi var?
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-cream-dim">
                  Olgun olması gerekmiyor. Aramıza katıl, fikrini masaya koy;
                  birlikte nereye gidebileceğine bakalım.
                </p>
              </div>
              <Button href="/iletisim#katil">
                Fikrini paylaş
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
