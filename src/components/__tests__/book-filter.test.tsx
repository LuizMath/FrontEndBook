import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BookFilter } from "@/components/book-filter";
import type { Book } from "@/types/book";

const books: Book[] = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    publishedYear: 1899,
  },
  {
    id: "2",
    title: "O Cortiço",
    author: "Aluísio Azevedo",
    publishedYear: 1890,
  },
  {
    id: "3",
    title: "Memórias Póstumas",
    author: "Machado de Assis",
    publishedYear: 1881,
  },
];

describe("BookFilter", () => {
  it("renders all books initially", () => {
    render(<BookFilter books={books} />);
    expect(screen.getByText("Dom Casmurro")).toBeInTheDocument();
    expect(screen.getByText("O Cortiço")).toBeInTheDocument();
    expect(screen.getByText("Memórias Póstumas")).toBeInTheDocument();
  });

  it("filters by title (case-insensitive)", async () => {
    const user = userEvent.setup();
    render(<BookFilter books={books} />);

    await user.type(screen.getByLabelText("Filtrar por título"), "casmurro");

    expect(screen.getByText("Dom Casmurro")).toBeInTheDocument();
    expect(screen.queryByText("O Cortiço")).not.toBeInTheDocument();
    expect(screen.queryByText("Memórias Póstumas")).not.toBeInTheDocument();
  });

  it("shows empty-state message when no result matches", async () => {
    const user = userEvent.setup();
    render(<BookFilter books={books} />);

    await user.type(screen.getByLabelText("Filtrar por título"), "inexistente");

    expect(
      screen.getByText("Nenhum resultado para o filtro."),
    ).toBeInTheDocument();
  });

  it("shows empty-state message when there are no books", () => {
    render(<BookFilter books={[]} />);
    expect(
      screen.getByText("Nenhum livro cadastrado ainda."),
    ).toBeInTheDocument();
  });
});
