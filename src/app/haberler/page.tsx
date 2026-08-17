import type { Metadata } from "next";
import { Button, Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { InstagramPostCard } from "@/components/instagram-post-card";
import { ArrowRightIcon, InstagramIcon } from "@/components/icons";
import { INSTAGRAM_POSTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Haberler",
  description:
    "BVG'den son paylaşımlar ve duyurular. En taze haberler için Instagram'ı takip et.",
};

export default function HaberlerPage() {
  return (
    <>
      <PageHeader
        kicker="Haberler"
        title="Perde arkasından son gelişmeler"
        description="Duyuruları ve son paylaşımları burada topluyoruz. En taze haberler için Instagram'ı takip etmeyi unutma."
      />

      <Container className="py-16 sm:py-20">
        {INSTAGRAM_POSTS.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INSTAGRAM_POSTS.map((post, i) => (
              <Reveal key={post.image} delay={i * 70}>
                <InstagramPostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mx-auto max-w-md rounded-3xl border border-line bg-surface/40 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-bg text-gold">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl text-cream">Yakında burada</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                Paylaşımlarımızı buraya taşıyoruz. O ana kadar en taze
                haberler için Instagram&apos;dan bizi takip edebilirsin.
              </p>
              <div className="mt-6">
                <Button href={SITE.instagram} variant="outline">
                  Instagram&apos;da takip et
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </>
  );
}
