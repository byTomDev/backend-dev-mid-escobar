import { LibraryService } from "./services/LibraryService";

/**
 * Demo del sistema de gestion de biblioteca.
 *
 * 1. Crea una instancia de LibraryService
 * 2. Registra datos de prueba (libros y miembros)
 * 3. Ejecuta operaciones de prestamo
 */
function runLibraryDemo() {
  // Inicializacion del servicio
  const library = new LibraryService();

  // Registro de libros en el catálogo
  library.addBook({
    isbn: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
  });

  library.addBook({
    isbn: "2",
    title: "Design Patterns",
    author: "Gamma et al.",
  });

  // Registro de miembros
  library.registerMember({ id: "1", name: "Eli" });
  library.registerMember({ id: "2", name: "Tom" });

  // Registro de operaciones
  console.log("DEMO SISTEMA BIBLIOTECA");

  // Prestamo exitoso
  const loanResult1 = library.borrowBook("1", "1");
  console.log("Prestamo 1 a Eli:", loanResult1 ? "Exito" : "Fallo");

  // Intento de prestamo no disponible
  const loanResult2 = library.borrowBook("1", "2");
  console.log(
    "Prestamo 1 a Tom (libro ya prestado):",
    loanResult2 ? "Exito" : "Fallo"
  );

  // Prestamo de otro libro disponible
  const loanResult3 = library.borrowBook("2", "2");
  console.log("Prestamo 2 a Tom:", loanResult3 ? "Exito" : "Fallo");

  // Intento excediendo limite (simulacion)
  library.borrowBook("2", "1"); // Prestamo 1
  library.borrowBook("2", "1"); // Prestamo 2 (simulando prestamos previos)
  const loanResult4 = library.borrowBook("2", "1"); // Intento 3 (limite)
  console.log(
    "Prestamo 2 a Eli (limite excedido):",
    loanResult4 ? "Exito" : "Fallo"
  );
}

// Ejecutar demo
runLibraryDemo();
