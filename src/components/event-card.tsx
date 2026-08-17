import Link from "next/link";
import { Photo } from "@/components/photo";
import { ExpandIcon } from "@/components/icons";
import type { EventItem } from "@/lib/site";

function GalleryHint() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 bg-bg/70 text-cream sm:h-11 sm:w-11">
        <ExpandIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </span>
  );
}

/** Öne çıkan etkinlik kartı — Etkinlikler sayfasının üstündeki büyük kart. */
export function FeaturedEventCard({ event }: { event: EventItem }) {
  const href = `/etkinlikler/${event.slug}`;

  return (
    <article className="grid gap-8 overflow-hidden rounded-3xl border border-amber/30 bg-surface/40 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
      <div>
        <Link href={href} className="group relative block">
          <Photo
            src={event.image}
            alt={event.title}
            label={event.title}
            ratio="aspect-[16/10]"
            priority
          />
          <GalleryHint />
        </Link>
      </div>
      <div>
        <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          {event.tag}
        </span>
        <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
          <Link href={href} className="transition-colors hover:text-gold">
            {event.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm font-medium text-amber">{event.meta}</p>
        <p className="mt-4 text-base leading-relaxed text-cream-dim">
          {event.description}
        </p>
      </div>
    </article>
  );
}

/** Etkinlikler ızgarasındaki standart kart. */
export function EventCard({ event }: { event: EventItem }) {
  const href = `/etkinlikler/${event.slug}`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-colors duration-300 hover:border-amber/50">
      <div className="border-b border-line">
        <Link href={href} className="group relative block">
          <Photo
            src={event.image}
            alt={event.title}
            label={event.title}
            ratio="aspect-[16/9]"
            className="rounded-b-none border-0"
          />
          <GalleryHint />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber">
          {event.tag}
        </span>
        <h3 className="mt-2 text-xl text-cream">
          <Link href={href} className="transition-colors hover:text-gold">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-cream-dim">{event.meta}</p>
        <p className="mt-3 text-sm leading-relaxed text-cream-dim">
          {event.description}
        </p>
      </div>
    </div>
  );
}
