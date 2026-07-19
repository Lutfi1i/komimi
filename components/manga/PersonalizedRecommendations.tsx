"use client";

import { useEffect, useState } from "react";
import { MangaGrid } from "./MangaGrid";
import type { Manga } from "@/types/manga";
import { getAllReadHistory } from "@/lib/read-history";
import { getAllBookmarks } from "@/lib/bookmarks";
import { fetchGenreManga } from "@/lib/api";

interface PersonalizedRecommendationsProps {
  fallbackMangas: Manga[];
}

export function PersonalizedRecommendations({ fallbackMangas }: PersonalizedRecommendationsProps) {
  const [recommended, setRecommended] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        // 1. Gather all history and bookmarks
        const history = getAllReadHistory();
        const bookmarks = getAllBookmarks();

        // 2. Extract genres
        const genreCounts: Record<string, number> = {};

        history.forEach((h) => {
          if (h.genres) {
            h.genres.forEach((g) => {
              const cleanGenre = g.trim();
              if (cleanGenre) {
                genreCounts[cleanGenre] = (genreCounts[cleanGenre] || 0) + 2; // Read history has higher weight
              }
            });
          }
        });

        bookmarks.forEach((b) => {
          if (b.genres) {
            b.genres.forEach((g) => {
              const cleanGenre = g.trim();
              if (cleanGenre) {
                genreCounts[cleanGenre] = (genreCounts[cleanGenre] || 0) + 1; // Bookmarks have weight 1
              }
            });
          } else if (b.genre) {
            const cleanGenre = b.genre.trim();
            if (cleanGenre) {
              genreCounts[cleanGenre] = (genreCounts[cleanGenre] || 0) + 1;
            }
          }
        });

        // 3. Find favorite genres
        const sortedGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([genre]) => genre);

        if (sortedGenres.length === 0) {
          // No history/bookmarks yet, use default server recommendations
          setRecommended(fallbackMangas);
          setLoading(false);
          return;
        }

        // 4. Fetch comics from the top favorite genres
        // To keep it fast, we take the top 2 genres and fetch their lists
        const topGenres = sortedGenres.slice(0, 2);
        const fetches = topGenres.map((g) => fetchGenreManga(g.toLowerCase()).catch(() => []));

        const results = await Promise.all(fetches);
        const combined = results.flat();

        // 5. Filter out duplicates and exclude comics already in history/bookmarks
        const seenIds = new Set<string>();
        history.forEach((h) => seenIds.add(String(h.comicId)));
        bookmarks.forEach((b) => seenIds.add(String(b.comicId)));

        const filtered: Manga[] = [];
        combined.forEach((m) => {
          const mId = String(m.slug ?? m.id);
          if (!seenIds.has(mId)) {
            seenIds.add(mId);
            filtered.push(m);
          }
        });

        // If we don't have enough recommendations, fill with fallbackMangas
        if (filtered.length < 14) {
          fallbackMangas.forEach((m) => {
            const mId = String(m.slug ?? m.id);
            if (!seenIds.has(mId) && filtered.length < 14) {
              seenIds.add(mId);
              filtered.push(m);
            }
          });
        }

        // Limit to 14 items
        setRecommended(filtered.slice(0, 14));
      } catch (err) {
        console.error("Failed to load personalized recommendations:", err);
        setRecommended(fallbackMangas);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, [fallbackMangas]);

  return <MangaGrid title="Rekomendasi Untukmu" mangas={recommended} loading={loading} />;
}
