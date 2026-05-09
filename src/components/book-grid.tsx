import { BookOpen, Calendar, User } from "lucide-react";

import type { Book } from "@/types/book";

type Props = {
  books: Book[];
  emptyMessage: string;
};

function hueFromString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

export function BookGrid({ books, emptyMessage }: Props) {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <BookOpen className="mx-auto size-8 text-muted-foreground/60" />
        <p className="mt-3 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => {
        const hue = hueFromString(book.title);
        const initial = book.title.trim().charAt(0).toUpperCase() || "?";
        return (
          <li
            key={book.id}
            className="group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              aria-hidden
              className="relative flex h-28 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 40) % 360} 70% 40%))`,
              }}
            >
              <span className="text-4xl font-bold text-white/90 drop-shadow-sm">
                {initial}
              </span>
              <BookOpen className="absolute right-3 top-3 size-4 text-white/70" />
            </div>
            <div className="space-y-2 p-4">
              <h3
                className="line-clamp-2 font-semibold leading-snug"
                title={book.title}
              >
                {book.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="size-3.5 shrink-0" />
                <span className="truncate" title={book.author}>
                  {book.author}
                </span>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 rounded-full border bg-secondary/60 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  <Calendar className="size-3" />
                  {book.publishedYear}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
