import type { Metadata } from "next";
import { Container, Kicker } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IdeaForm } from "@/components/idea-form";

export const metadata: Metadata = {
  title: "BVG Girişim",
  description:
    "Girişimcilik ruhunu besliyoruz. Bir fikrin mi var? Bize ulaştır, birlikte nereye gidebileceğine bakalım.",
};

export default function GirisimPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(242,183,5,0.35), transparent 65%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <Reveal>
              <div>
                <Kicker>BVG Girişim</Kicker>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                  Girişimcilik ruhunu besliyoruz
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-cream-dim">
                  Henüz başındayız ve tam da bu yüzden heyecanlıyız. BVG
                  Girişim, bir fikri olan herkese ilk adımı atacağı ortamı
                  sunma vizyonuyla yola çıkıyor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <h2 className="text-2xl text-cream sm:text-3xl">
                  Bir fikrin mi var?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-cream-dim">
                  Olgun olması gerekmiyor. Fikrini aşağıya yaz, bize ulaşsın;
                  birlikte nereye gidebileceğine bakalım.
                </p>
                <div className="mt-6">
                  <IdeaForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="coin-edge" aria-hidden />
      </section>

      <Container className="py-10 sm:py-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-cream-dim">
              Bir sonraki büyük fikir, kampüsteki bir sohbette doğabilir.
              Amacımız o kıvılcımı görünür kılmak: doğru insanları bir araya
              getirip, denemekten korkmayan bir kültür inşa etmek.
            </p>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
