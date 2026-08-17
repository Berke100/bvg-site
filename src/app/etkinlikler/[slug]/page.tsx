import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Kicker } from "@/components/ui";
import { GalleryViewer } from "@/components/gallery-viewer";
import { ArrowLeftIcon } from "@/components/icons";
import { EVENTS } from "@/lib/site";

export async function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata(
  props: PageProps<"/etkinlikler/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage(
  props: PageProps<"/etkinlikler/[slug]">,
) {
  const { slug } = await props.params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  const media =
    event.gallery && event.gallery.length > 0
      ? event.gallery
      : event.image
        ? [event.image]
        : [];

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/etkinlikler"
        className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-gold"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Etkinliklere dön
      </Link>

      <div className="mt-6 max-w-2xl">
        <Kicker>{event.tag}</Kicker>
        <h1 className="mt-3 text-3xl text-cream sm:text-4xl">
          {event.title}
        </h1>
        <p className="mt-2 text-sm font-medium text-amber">{event.meta}</p>
        <p className="mt-4 text-base leading-relaxed text-cream-dim">
          {event.description}
        </p>
      </div>

      <div className="mt-10">
        <GalleryViewer items={media} title={event.title} />
      </div>
    </Container>
  );
}
