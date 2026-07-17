import Link from "next/link";
import type { Manga } from "@/types/manga";
import { MangaBadge } from "@/components/ui/MangaBadge";
import { getAbstractCover } from "@/components/manga/MangaCard";

interface RecommendedComicsProps {
  title: string;
  items: Manga[];
}

export function RecommendedComics({ title, items }: RecommendedComicsProps) {
  return (
    <section className="max-w-5xl mx-auto w-full px-4 pb-16">
      <h2 className="text-sm font-bold uppercase tracking-wide text-white/80 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {items.map((m) => (
          <Link
            key={`${m.slug}-${m.id}`}
            href={`/comic/${m.slug ?? m.id}`}
            className="group flex flex-col gap-2"
          >
            <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border border-white/10 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
              <MangaBadge type={m.badge} />

              {m.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.coverUrl}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                getAbstractCover(m.id, m.title, m.genre)
              )}

              {/* bottom gradient biar title overlay kebaca kalau nempel di cover */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
            </div>

            {/* Info */}
            <div>
              <p className="text-[0.78rem] font-semibold text-white leading-tight line-clamp-2">
                {m.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[0.7rem] text-white/50">
                {m.type && (
                  <span className="text-[9px] font-bold bg-gold/15 text-gold px-1.5 py-0.2 rounded-sm select-none shrink-0 font-mono">
                    {m.type.toUpperCase()}
                  </span>
                )}
                {m.chapter > 0 && (
                  <span className="font-semibold shrink-0">Ch. {m.chapter}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}