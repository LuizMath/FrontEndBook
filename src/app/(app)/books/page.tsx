import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Search } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { BookFilter } from "@/components/book-filter";
import { listBooks } from "@/lib/api";
import type { Book } from "@/types/book";

export const metadata: Metadata = {
  title: "Livros",
  description:
    "Catálogo completo de livros cadastrados, com filtro por título.",
};

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login?callbackUrl=/books");
  }

  let books: Book[] = [];

  try {
    const all = await listBooks();
    books = all.filter((b) => b.userEmail === email);
  } catch {
    books = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Meus livros</h1>
          <p className="text-sm text-muted-foreground">
            {books.length === 0
              ? "Nenhum livro por aqui — comece adicionando o primeiro."
              : `${books.length} ${books.length === 1 ? "livro" : "livros"} na sua biblioteca`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:self-end">
          <Button asChild variant="outline">
            <Link href="/books/search">
              <Search />
              Pesquisar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/books/new">
              <Plus />
              Novo livro
            </Link>
          </Button>
        </div>
      </div>

      <BookFilter books={books} />
    </div>
  );
}
