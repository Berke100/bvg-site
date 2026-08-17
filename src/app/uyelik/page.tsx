import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { MembershipEmbed } from "@/components/membership-embed";

export const metadata: Metadata = {
  title: "Üyelik Başvurusu",
  description:
    "BVG'ye üye ol. Formu doldur, gerisini biz halledelim. Bölüm fark etmez, aramıza katıl.",
};

export default function UyelikPage() {
  return (
    <>
      <PageHeader
        kicker="Üyelik"
        title="Aramıza katıl"
        description="Bir formu doldurman yeterli. Bölüm fark etmez — kapımız herkese açık."
      />

      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <MembershipEmbed />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
