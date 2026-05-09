import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

import { GoogleSignIn } from "@/components/google-sign-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Faça login com Google para acessar o catálogo Juridiq Books.",
  robots: { index: true, follow: true },
};

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="size-5" />
          </div>
          <CardTitle className="text-xl">Juridiq Books</CardTitle>
          <CardDescription>
            Faça login para gerenciar o catálogo de livros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignIn callbackUrl={callbackUrl} />
        </CardContent>
      </Card>
    </main>
  );
}
