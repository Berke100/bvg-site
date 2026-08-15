import type { Metadata } from "next";
import { Button, Card, Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRightIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BVG, bölüm fark etmeksizin herkese açık bir öğrenci topluluğu. Network, etkinlik, eğitim ve fırsatlarla üyelerine değer katıyoruz.",
};

const VALUES = [
  {
    title: "Kapsayıcıyız",
    text: "Hangi bölümde olursan ol, kapımız açık. Farklı disiplinlerin buluştuğu yerde daha güçlüyüz.",
  },
  {
    title: "Bağlantı kurarız",
    text: "Üyelerimizi birbirleriyle, büyük isimlerle ve sektörle buluşturuyoruz.",
  },
  {
    title: "Geliştiririz",
    text: "Eğitimler, geziler ve etkinliklerle her üyeye somut bir değer katmayı hedefliyoruz.",
  },
  {
    title: "Fırsat yaratırız",
    text: "Staj olanaklarından kariyer kapılarına, mezun olmadan sahayla tanışma imkânı sunuyoruz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        kicker="Hakkımızda"
        title="Kampüsün en güçlü network'ü"
        description={`${SITE.university} çatısı altında, bölüm fark etmeksizin herkese açık bir öğrenci topluluğuyuz.`}
      />

      <Container className="py-16 sm:py-20">
        {/* Vizyon metni */}
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-cream-dim">
            <p>
              BVG&apos;yi tek bir başlığa sığdırmak zor — çünkü amacımız
              üyelerimize <span className="text-cream">her anlamda</span> değer
              katmak. Kampüse yeni adım atan biri için burası tanıdık bir yüz,
              yeni bir çevre ve fırsat kapısı demek.
            </p>
            <p>
              Yıl boyunca çok sayıda etkinlik ve gezi düzenliyor, üyelerimizi
              alanında güçlü isimlerle buluşturuyoruz. Düzenli eğitimlerle
              beceri kazandırıyor, sektör bağlantılarımızla staj olanakları
              açıyoruz. Kısacası, tek başına yürünen bir yolu birlikte
              koşulan bir maceraya çeviriyoruz.
            </p>
            <p className="text-cream">
              Bölüm fark etmez. Merakın ve emeğin varsa, geri kalanını birlikte
              inşa ederiz.
            </p>
          </div>
        </Reveal>

        {/* Değerler */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 80}>
              <Card className="h-full">
                <h3 className="text-xl text-cream">{value.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream-dim">
                  {value.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-5 rounded-3xl border border-line bg-gradient-to-br from-surface-2/50 via-surface to-bg px-6 py-14 text-center">
            <h2 className="max-w-2xl text-3xl text-cream sm:text-4xl">
              Hikâyenin bir parçası ol
            </h2>
            <p className="max-w-lg text-base text-cream-dim">
              Aramıza katıl; kampüsteki en güçlü network&apos;ün bir parçası ol.
            </p>
            <Button href="/iletisim#katil">
              Aramıza Katıl
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
