import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { BookForm } from "@/components/book-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Novo livro",
  description: "Cadastre um novo livro no catálogo Juridiq Books.",
};

export default async function NewBookPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login?callbackUrl=/books/new");
  }

  return (
    <div className="flex min-h-[calc(100dvh-12rem)] items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Cadastrar livro</CardTitle>
          <CardDescription>
            Preencha os dados do livro para adicioná-lo ao catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookForm userEmail={email} />
        </CardContent>
      </Card>
    </div>
  );
}
