import { Book } from "../models/Book";
import { Member } from "../models/Member";

export class LibraryService {
  private catalog: Book[] = [];
  private members: Member[] = [];

  addBook(book: Omit<Book, "available">): void {
    this.catalog.push({ ...book, available: true });
  }

  registerMember(member: Omit<Member, "borrowedBooks">): void {
    this.members.push({ ...member, borrowedBooks: [] });
  }

  borrowBook(isbn: string, memberId: string): boolean {
    const book = this.catalog.find((b) => b.isbn === isbn && b.available);
    const member = this.members.find((m) => m.id === memberId);

    if (!book || !member || member.borrowedBooks.length >= 3) {
      return false;
    }

    book.available = false;
    member.borrowedBooks.push(book);
    return true;
  }
}
