/**
 * Representa un libro en el sistema de biblioteca.
 *
 * @property isbn - Identificador único del libro (ISBN-13 o ISBN-10).
 * @property title - Título completo del libro.
 * @property author - Autor(es) del libro.
 * @property available - Estado de disponibilidad para préstamo.
 */
export interface Book {
  isbn: string;
  title: string;
  author: string;
  available: boolean;
}
