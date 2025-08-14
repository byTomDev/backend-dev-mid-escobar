import { LibraryService } from "./services/LibraryService";

const library = new LibraryService();

// Setup inicial
library.addBook({
  isbn: "001",
  title: "Clean Code",
  author: "Robert C. Martin",
});
library.registerMember({ id: "1", name: "Emma" });

// Demo
console.log("=== PRUEBA BÁSICA ===");
console.log("Resultado préstamo:", library.borrowBook("001", "1"));
