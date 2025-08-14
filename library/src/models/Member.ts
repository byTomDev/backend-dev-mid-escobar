import { Book } from "./Book";

export interface Member {
  id: string;
  name: string;
  borrowedBooks: Book[];
}
