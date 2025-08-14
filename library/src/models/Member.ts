import { Book } from "./Book";

/**
 * Representa un miembro registrado en la biblioteca.
 *
 * @property id - Identificador único (ej: cédula o ID generado).
 * @property name - Nombre completo del miembro.
 * @property borrowedBooks - Lista de libros actualmente prestados.
 */

export interface Member {
  id: string;
  name: string;
  borrowedBooks: Book[];
}
