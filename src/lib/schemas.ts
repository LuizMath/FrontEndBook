import { z } from "zod";

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório")
    .max(200, "Título muito longo"),
  author: z
    .string()
    .trim()
    .min(1, "Autor é obrigatório")
    .max(120, "Nome de autor muito longo"),
  publishedYear: z.coerce
    .number({ invalid_type_error: "Informe um ano válido" })
    .int("Ano deve ser inteiro")
    .min(1, "Ano inválido")
    .max(currentYear, `Ano não pode ser maior que ${currentYear}`),
});

export type BookFormValues = z.infer<typeof bookSchema>;
