export type Book = {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  userEmail?: string;
};

export type CreateBookInput = {
  user: string;
  title: string;
  author: string;
  publishedYear: number;
};
