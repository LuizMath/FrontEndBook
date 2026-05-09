import type { Book, CreateBookInput } from "@/types/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export type ApiContext =
  | "create-book"
  | "list-books"
  | "create-user"
  | "default";

const STATUS_MESSAGES: Partial<Record<number, string>> = {
  0: "Sem conexão com o servidor. Tente novamente.",
  401: "Você não tem permissão para essa ação. Faça login novamente.",
  403: "Você não tem permissão para essa ação. Faça login novamente.",
  404: "Recurso não encontrado.",
  400: "Dados inválidos. Confira os campos e tente de novo.",
  422: "Dados inválidos. Confira os campos e tente de novo.",
};

const CONTEXT_MESSAGES: Record<ApiContext, string> = {
  "create-book": "Não foi possível cadastrar o livro. Tente novamente.",
  "list-books": "Não foi possível carregar os livros.",
  "create-user": "Não foi possível concluir o cadastro.",
  default: "Algo deu errado. Tente novamente.",
};

const CONTEXT_STATUS_MESSAGES = new Map<string, string>([
  ["409:create-book", "Esse livro já está cadastrado."],
]);

export class ApiError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message ?? `Request failed with ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...init?.headers,
      },
      cache: "no-store",
    });
  } catch {
    throw new ApiError(0, "network");
  }

  if (!res.ok) {
    throw new ApiError(res.status);
  }

  return res.json() as Promise<T>;
}

export function friendlyApiMessage(
  err: unknown,
  context: ApiContext = "default",
): string {
  if (!(err instanceof ApiError)) return CONTEXT_MESSAGES[context];

  if (err.status >= 500)
    return "O servidor está com problemas. Tente novamente em instantes.";

  return (
    CONTEXT_STATUS_MESSAGES.get(`${err.status}:${context}`) ??
    STATUS_MESSAGES[err.status] ??
    CONTEXT_MESSAGES[context]
  );
}

export function createBook(input: CreateBookInput): Promise<Book> {
  return request<Book>("/book/create", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
