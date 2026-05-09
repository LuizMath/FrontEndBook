import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe ou foi removido.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <BookX className="size-8" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Erro 404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Página não encontrada
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          O endereço acessado não existe ou foi removido.
        </p>
      </div>

      <Button asChild>
        <Link href="/books">Voltar para o catálogo</Link>
      </Button>
    </main>
  );
}
