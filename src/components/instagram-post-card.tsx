import { Photo } from "@/components/photo";
import { ArrowRightIcon } from "@/components/icons";
import type { InstagramPost } from "@/lib/site";

export function InstagramPostCard({ post }: { post: InstagramPost }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-colors duration-300 hover:border-amber/50">
      <Photo
        src={post.image}
        alt={post.caption}
        ratio="aspect-square"
        className="rounded-b-none border-0"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-cream-dim">
          {post.caption}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {post.date ? (
            <span className="text-xs text-cream-dim">{post.date}</span>
          ) : (
            <span />
          )}
          {post.permalink ? (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold transition-colors hover:text-amber"
            >
              Gönderiyi gör
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
