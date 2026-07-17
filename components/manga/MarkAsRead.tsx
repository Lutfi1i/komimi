"use client";

import { useEffect } from "react";
import { markChapterRead } from "@/lib/read-history";

interface MarkAsReadProps {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  chapterNumber: number;
  chapterSlug: string;
}

export function MarkAsRead({
  comicId,
  slug,
  title,
  coverUrl,
  type,
  chapterNumber,
  chapterSlug,
}: MarkAsReadProps) {
  useEffect(() => {
    markChapterRead({ comicId, slug, title, coverUrl, type, chapterNumber, chapterSlug });
  }, [comicId, slug, title, coverUrl, type, chapterNumber, chapterSlug]);

  return null;
}