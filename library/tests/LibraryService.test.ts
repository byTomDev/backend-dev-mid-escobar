import { LibraryService } from "@services/LibraryService";
import { Book } from "@models/Book";
import { Member } from "@models/Member";

/**
 * Suite de pruebas para el servicio principal de biblioteca.
 * Valida:
 * - Gestión de prestamos
 * - Restricciones de disponibilidad
 * - Limites operacionales
 */

describe("LibraryService", () => {
  let service: LibraryService;

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    service = new LibraryService();
    service.addBook({
      isbn: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
    });
    service.registerMember({
      id: "1",
      name: "Test User",
    });
  });

  test("Deberia prestar un libro disponible", () => {
    const result = service.borrowBook("1", "1");
    expect(result).toBe(true);
    expect(service.findMember("1")?.borrowedBooks.length).toBe(1);
  });

  test("Deberia fallar al prestar libro ya prestado", () => {
    // Primer prestamo exitoso
    service.borrowBook("1", "1");

    // Segundo intento
    const result = service.borrowBook("1", "1");
    expect(result).toBe(false);
    expect(service.findBook("1")?.available).toBe(false);
  });

  test("Deberia rechazar prestamo si miembro tiene 3 libros", () => {
    // Configuración adicional
    service.addBook({ isbn: "2", title: "Book 2", author: "Author NN" });
    service.addBook({ isbn: "3", title: "Book 3", author: "Author NN" });
    service.addBook({ isbn: "4", title: "Book 4", author: "Author NN" });

    // Prestamos iniciales
    service.borrowBook("1", "1");
    service.borrowBook("2", "1");
    service.borrowBook("3", "1");

    // Intento exceder limite
    const result = service.borrowBook("4", "1");
    expect(result).toBe(false);
  });

  test("Deberia fallar con ISBN o memberId inexistente", () => {
    expect(service.borrowBook("INVALID_ISBN", "1")).toBe(false);
    expect(service.borrowBook("1", "INVALID_ID")).toBe(false);
  });
});
