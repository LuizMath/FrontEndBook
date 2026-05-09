"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookSchema, type BookFormValues } from "@/lib/schemas";
import { createBook, friendlyApiMessage } from "@/lib/api";

type Props = {
  userEmail: string;
};

export function BookForm({ userEmail }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { title: "", author: "", publishedYear: undefined },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createBook({ ...values, user: userEmail });
      toast.success("Livro cadastrado com sucesso");
      reset();
      startTransition(() => {
        router.push("/books");
        router.refresh();
      });
    } catch (err) {
      toast.error(friendlyApiMessage(err, "create-book"));
    }
  });

  const busy = isSubmitting || isPending;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" placeholder="Dom Casmurro" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          placeholder="Machado de Assis"
          {...register("author")}
        />
        {errors.author && (
          <p className="text-sm text-destructive">{errors.author.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedYear">Ano de publicação</Label>
        <Input
          id="publishedYear"
          type="number"
          inputMode="numeric"
          placeholder="1899"
          {...register("publishedYear")}
        />
        {errors.publishedYear && (
          <p className="text-sm text-destructive">
            {errors.publishedYear.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Salvando..." : "Cadastrar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/books")}
          disabled={busy}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
