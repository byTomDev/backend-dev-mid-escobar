# Justificación Técnica

La función `twoSum` está diseñada para encontrar los índices de **dos números en un array que suman un valor objetivo** (`targetNumber`) de manera eficiente y segura. La elección de la implementación y las estructuras de datos se realizó pensando en claridad, rendimiento y buenas prácticas profesionales.

## Principales decisiones técnicas

Se eligió **TypeScript** por su tipado estático, lo que permite detectar errores en tiempo de compilación y facilita la comprensión del código. Además, mejora la mantenibilidad y la documentación implícita de funciones y estructuras de datos, demostrando buenas prácticas en un entorno de desarrollo moderno.

- **Validación de entrada**: Se verifica que el array tenga al menos dos elementos, evitando errores lógicos y garantizando que la función siempre opere sobre datos válidos.
- **Uso de `Map`**: Se utiliza un `Map<number, number>` para almacenar cada número visitado y su índice. Esto permite:

  - Búsquedas rápidas con `has` (O(1) promedio) para determinar si ya hemos visto el complemento que sumaría el target.
  - Acceso directo al índice del número previamente visitado mediante `get`.
  - Inserciones eficientes con `set` mientras iteramos el array.

  La elección de `Map` en lugar de un objeto o `Record` se debe a que permite **usar números como claves directamente**, mantiene un código limpio y evita problemas de conversión implícita de tipos que ocurren con objetos.

- **Algoritmo de una pasada (O(n))**: La función recorre el array una sola vez, revisando si el complemento necesario ya existe en `Map`. Esto garantiza un **rendimiento óptimo** incluso con arrays grandes.

- **Retorno seguro y claro**: Devuelve una tupla con los índices `[i, j]` cuando se encuentra la pareja, o `null` si no existe. Esto hace explícito al consumidor de la función que no se encontró solución.

## Ventajas de esta implementación

- Eficiencia en tiempo y espacio (`O(n)` para ambos).
- Código limpio, legible y fácil de mantener.
- Manejo seguro de errores y entradas inválidas.
