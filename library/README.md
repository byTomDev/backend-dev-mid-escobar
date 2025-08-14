# Informe Técnico - Sistema de Gestión de Biblioteca

## **1. Arquitectura del Proyecto**

Se implementó una estructura modular basada en **TypeScript**, separando:

- **`models/`**: Define las interfaces `Book` y `Member` para garantizar consistencia en los datos.
- **`services/`**: Contiene `LibraryService`, donde se implementa la lógica de préstamos y devoluciones.
- **`tests/`**: Pruebas unitarias con **Jest** para validar el comportamiento del sistema.

## 2. Justificación de Tecnologías

### TypeScript

Se eligió **TypeScript** por:

- **Tipado estático**: Reduce errores en tiempo de compilación.
- **Autocompletado y documentación implícita**: Mejora la productividad.
- **Compatibilidad con Jest**: Permite escribir pruebas con tipado seguro.

### **Jest (Testing)**

- **Integración con TypeScript** mediante `ts-jest`.
- **Mocks y aserciones claras**, útiles para validar flujos como préstamos y disponibilidad de libros.
- **Reportes de cobertura** (opcional con `--coverage`).

## **3. Decisiones de Implementación**

### **LibraryService**

- **Encapsulación**: Los arreglos `catalog` y `members` son privados para controlar modificaciones.
- **Métodos bien definidos**:
  - `borrowBook()` retorna `boolean` para indicar éxito/fallo.
  - `addBook()` asigna `available: true` por defecto.

### **Pruebas Unitarias**

- **Cubren casos clave**:
  - Préstamo exitoso.
  - Préstamo fallido (libro no disponible).
  - Límite de préstamos por miembro.

## **4. Guía de Ejecución**

Para probar el sistema:

### **Requisitos**

- Node.js (v18+).
- npm o yarn.

### **Pasos**

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Ejecutar la demo**:

   ```bash
   npm start
   ```

   Mostrará un ejemplo de préstamo en consola.

3. **Correr pruebas**:

   ```bash
   npm test
   ```

   Validará los casos de uso implementados.

4. **Compilar (opcional)**:
   ```bash
   npm run build  # Genera la versión JS en /dist
   ```

**Nota**: El repositorio excluye `node_modules` y `dist/` (vía `.gitignore`) para mantener solo código fuente y configuraciones.
