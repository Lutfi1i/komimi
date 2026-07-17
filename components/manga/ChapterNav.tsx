import Link from "next/link";
import type { ChapterInfo } from "@/types/manga";

interface ChapterNavProps {
  id: string;
  prevChapter: ChapterInfo | null;
  nextChapter: ChapterInfo | null;
}

export function ChapterNav({ id, prevChapter, nextChapter }: ChapterNavProps) {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-4 border-t border-white/10 mt-4">
      <div className="flex items-center justify-between gap-3">
        {/* Prev / Next pill group */}
        <div className="flex items-center gap-1 rounded-full bg-neutral-900 border border-white/10 p-1">
          {prevChapter ? (
            <Link
              href={`/comic/${id}/${prevChapter.slug}`}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 transition-colors"
            >
              <i className="ti ti-arrow-left text-base" />
              Prev
              <span className="text-xs font-normal text-white/40">
                Ch.{prevChapter.chapterNumber}
              </span>
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white/25 cursor-not-allowed">
              <i className="ti ti-arrow-left text-base" />
              Prev
            </span>
          )}

          {nextChapter ? (
            <Link
              href={`/comic/${id}/${nextChapter.slug}`}
              className="flex items-center gap-1.5 rounded-full bg-violet-500 hover:bg-violet-400 px-4 py-2 text-sm font-semibold text-white transition-colors"
            >
              Next
              <span className="text-xs font-normal text-white/70">
                Ch.{nextChapter.chapterNumber}
              </span>
              <i className="ti ti-arrow-right text-base" />
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/25 cursor-not-allowed">
              Next
              <i className="ti ti-arrow-right text-base" />
            </span>
          )}
        </div>

        {/* Daftar Chapter / Bookmark */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href={`/comic/${id}`}
            className="flex items-center gap-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 px-4 py-2 text-sm font-semibold text-white/80 transition-colors"
          >
            <i className="ti ti-list text-base" />
            Daftar Chapter
          </Link>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 px-4 py-2 text-sm font-semibold text-white/80 transition-colors"
          >
            <i className="ti ti-bookmark text-base" />
            Bookmark
          </button>
        </div>
      </div>

      {/* Mobile: Daftar Chapter / Bookmark full width row */}
      <div className="flex sm:hidden items-center gap-2 mt-3">
        <Link
          href={`/comic/${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 px-4 py-2 text-sm font-semibold text-white/80 transition-colors"
        >
          <i className="ti ti-list text-base" />
          Daftar Chapter
        </Link>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 px-4 py-2 text-sm font-semibold text-white/80 transition-colors"
        >
          <i className="ti ti-bookmark text-base" />
          Bookmark
        </button>
      </div>
    </div>
  );
}