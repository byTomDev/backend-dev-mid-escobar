import { LibraryService } from "@services/LibraryService";
import { Book } from "@models/Book";
import { Member } from "@models/Member";

describe("LibraryService", () => {
  let service: LibraryService;

  beforeEach(() => {
    service = new LibraryService();
    service.addBook({ isbn: "001", title: "Test Book", author: "Author" });
    service.registerMember({ id: "1", name: "Test Member" });
  });

  test("Debería prestar un libro disponible", () => {
    expect(service.borrowBook("001", "1")).toBe(true);
  });

  test("No debería prestar un libro ya prestado", () => {
    service.borrowBook("001", "1");
    expect(service.borrowBook("001", "1")).toBe(false);
  });
});
