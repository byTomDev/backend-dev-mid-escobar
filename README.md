# Prueba Técnica - Software Engineer Semi Senior

Prueba técnica Backend Semi Senior. Desarrollo de funcionalidades escalables con principios SOLID y Clean Code, diseño de base de datos relacional, algoritmo de búsqueda eficiente y sistema de gestión de bibliotecas con pruebas automatizadas y documentación técnica.

## Descripción

Este repositorio contiene la solución a la prueba técnica para la vacante de **Software Engineer Semi Senior**. El proyecto sigue buenas prácticas de **Clean Code**, principios **SOLID**, documentación clara y pruebas mínimas para validar la funcionalidad.

**La prueba incluye los siguientes puntos a desarrollar:**

### Punto 1: Diseño de base de datos para plataforma de blogs

Diseñar un esquema de base de datos para una plataforma de blogs sencilla. La plataforma debe admitir:

- Usuarios
- Publicaciones de blog
- Comentarios
- Etiquetas

El objetivo es modelar correctamente las relaciones entre estas entidades y pensar en escalabilidad y buenas prácticas de diseño de base de datos.

### Punto 2: Función de suma de dos números

Escribir una función que tome:

- Una lista de enteros
- Un entero de destino

La función debe devolver los índices de los dos números que sumados den el valor del entero destino. Se espera que la solución sea eficiente y clara, considerando casos borde.

### Punto 3: Sistema de gestión de bibliotecas

Diseñar e implementar un sistema de gestión de bibliotecas sencillo con clases para:

- Libros
- Bibliotecas
- Miembros

El objetivo es modelar las relaciones entre estas clases, incluyendo operaciones básicas como agregar libros, prestar y devolver, de forma organizada y escalable.

## Flujo de desarrollo y control de versiones

Este repositorio sigue la **metodología GitFlow** para organizar el desarrollo y garantizar calidad en pruebas y producción:

- **Rama principal (`main`)**: Contiene el código estable y listo para probar.
- **Rama de desarrollo (`develop`)**: Integración de nuevas funcionalidades y cambios en curso.
- **Ramas de características (`feature/...`)**: Desarrollo de cada punto de la prueba (database, algorithms, library).
- **Ramas de corrección (`hotfix/...`)**: No aplica.
- **Ramas de release (`release/...`)**: No aplica.

## Estructura del repositorio

Este repositorio está organizado en carpetas separadas para cada punto de la prueba, permitiendo un desarrollo claro y modular:

Punto 1: esquema de base de datos para la plataforma de blogs.

- **database/**

Punto 2: función de suma de dos números con pruebas.

- **algorithms/**

Punto 3: sistema de gestión de bibliotecas.

- **library/**

Este archivo.

- **README.md**

Archivos ignorados según lenguaje.

- **.gitignore**

## Cómo probar o ejecutar lo desarrollado

Cada carpeta del proyecto incluye un archivo que contiene las instrucciones para ejecutar los desarrollos y las justificaciones técnicas, permitiendo probar cada módulo de forma independiente y comprender claramente las decisiones de diseño e implementación.
