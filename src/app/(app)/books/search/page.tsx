import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookGrid } from "@/components/book-grid";
import { friendlyApiMessage, listBooks } from "@/lib/api";
import type { Book } from "@/types/book";

export const metadata: Metadata = {
  title: "Pesquisar livros",
  description: "Pesquise livros pelo título consultando a API.",
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ title?: string }>;

export default async function SearchBooksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login?callbackUrl=/books/search");
  }

  const { title } = await searchParams;
  const query = (title ?? "").trim();

  let books: Book[] = [];
  let error: string | null = null;
  const searched = query.length > 0;

  if (searched) {
    try {
      const all = await listBooks({ title: query });
      books = all.filter((b) => b.userEmail === email);
    } catch (err) {
      error = friendlyApiMessage(err, "list-books");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/books"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          Voltar para meus livros
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          Pesquisar livros
        </h1>
        <p className="text-sm text-muted-foreground">
          A busca consulta a API pelo título informado.
        </p>
      </div>

      <form
        method="GET"
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="title"
            defaultValue={query}
            placeholder="Digite o título do livro..."
            className="pl-9"
            aria-label="Título do livro"
          />
        </div>
        <Button type="submit">
          <Search />
          Pesquisar
        </Button>
      </form>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="text-sm font-medium text-destructive">{error}</p>
        </div>
      ) : !searched ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <Search className="mx-auto size-8 text-muted-foreground/60" />
          <p className="mt-3 text-sm font-medium">
            Digite um título e clique em Pesquisar.
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            {books.length} {books.length === 1 ? "resultado" : "resultados"}{" "}
            para{" "}
            <span className="font-medium text-foreground">
              &quot;{query}&quot;
            </span>
          </p>
          <BookGrid
            books={books}
            emptyMessage={`Nenhum livro encontrado com "${query}".`}
          />
        </>
      )}
    </div>
  );
}
