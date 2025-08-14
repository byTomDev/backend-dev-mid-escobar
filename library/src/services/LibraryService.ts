import { Book } from "../models/Book";
import { Member } from "../models/Member";

export class LibraryService {
  /**
   * Servicio principal para gestionar las operaciones de la biblioteca.
   * Controla el catálogo de libros, registro de miembros y préstamos.
   */
  private catalog: Book[] = [];
  private members: Member[] = [];

  /**
   * Añade un nuevo libro al catálogo.
   * @param book - Datos del libro (sin el campo 'available').
   */
  addBook(book: Omit<Book, "available">): void {
    this.catalog.push({ ...book, available: true });
  }

  /**
   * Registra un nuevo miembro en la biblioteca.
   * @param member - Datos básicos del miembro (sin libros prestados).
   */
  registerMember(member: Omit<Member, "borrowedBooks">): void {
    this.members.push({ ...member, borrowedBooks: [] });
  }

  /**
   * Gestiona el préstamo de un libro.
   * @param isbn - Identificador del libro.
   * @param memberId - Identificador del miembro.
   * @returns `true` si el préstamo fue exitoso, `false` si falló.
   */
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

  /**
   * Busca un libro por ISBN
   * @param isbn - Identificador del libro
   * @returns El libro encontrado o undefined
   */
  findBook(isbn: string): Book | undefined {
    return this.catalog.find((book) => book.isbn === isbn);
  }

  /**
   * Busca un miembro por ID
   * @param memberId - Identificador del miembro
   * @returns El miembro encontrado o undefined
   */
  findMember(memberId: string): Member | undefined {
    return this.members.find((member) => member.id === memberId);
  }
}
