"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { BookGrid } from "@/components/book-grid";
import type { Book } from "@/types/book";

type Props = {
  books: Book[];
};

export function BookFilter({ books }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => b.title.toLowerCase().includes(q));
  }, [books, query]);

  const hasQuery = query.trim().length > 0;
  const emptyMessage =
    books.length === 0
      ? "Nenhum livro cadastrado ainda."
      : "Nenhum resultado para o filtro.";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Filtrar por título"
            placeholder="Filtrar por título..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {hasQuery && books.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {filtered.length} de {books.length}
          </p>
        )}
      </div>

      <BookGrid books={filtered} emptyMessage={emptyMessage} />
    </div>
  );
}
