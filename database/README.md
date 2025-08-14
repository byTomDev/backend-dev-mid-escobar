# Esquema de Base de Datos para Plataforma de Blogs

Este archivo contiene la explicación del esquema completo de la base de datos para una plataforma de blogs sencilla, junto con las decisiones técnicas de cada tabla. El diseño busca mantener la integridad de los datos, permitir controlar el estado de los registros (soft delete) y facilitar el análisis y la escalabilidad. Cada tabla incluye campos para seguimiento de actividad, estado lógico y métricas de interacción.

## Propósito y Retención de Datos

La base de datos que he diseñado tiene como objetivo principal soportar una plataforma de blogs sencilla pero escalable, donde se pueda gestionar de manera eficiente la información de usuarios, publicaciones, comentarios y etiquetas. Para esto he elegido **PostgreSQL** como motor de base de datos, ya que ofrece características avanzadas como tipos de datos robustos, índices especializados y soporte sólido para integridad referencial, lo que nos permite aplicar decisiones técnicas como el uso de SERIAL para claves primarias, índices para consultas rápidas y relaciones seguras entre tablas. Cada tabla y relación ha sido pensada para mantener la integridad de los datos, facilitar consultas eficientes y asegurar que el sistema pueda crecer sin comprometer la consistencia.

Además, he tomado la decisión consciente de no eliminar registros de forma permanente. En lugar de eso, cada entidad cuenta con un campo de estado lógico (active) que permite desactivar elementos sin perder su historial. **Esta estrategia protege la información valiosa para análisis futuros, reportes o auditorías, y garantiza que podamos obtener valor de los datos incluso después de que un usuario, post o comentario deje de estar activo.** Así, la plataforma que use este esquema, no solo funciona como sistema operativo, sino que también se convierte en una fuente de información histórica que puede ser aprovechada para mejorar el producto y tomar **decisiones basadas en datos**.

## Detalle de Tablas y Campos

Los nombres de tablas y campos están en inglés siguiendo un estándar internacional de desarrollo de software. Esto facilita la comprensión y colaboración con otros desarrolladores, permite integrar librerías y frameworks sin conflictos de idioma, y mantiene consistencia con la mayoría de la documentación técnica y ejemplos en la industria.

A continuación se presenta un desglose completo de cada tabla incluida en la base de datos. Para cada entidad explicamos los campos más importantes, sus tipos, restricciones y la justificación técnica de por qué existen y cómo se relacionan con otras tablas.

### Tabla: users

La tabla **users** almacena toda la información de los usuarios de la plataforma, incluyendo credenciales, perfil y seguimiento de actividad. Se diseñó pensando en mantener la integridad de los datos, permitir auditoría y análisis, y habilitar un control de estado lógico para evitar la pérdida de información importante.

- `id` (SERIAL PRIMARY KEY): Identificador único de cada usuario. Es la clave primaria y se utiliza para referenciar usuarios en otras tablas como `posts` o `comments`.
- `username` (VARCHAR(50) NOT NULL UNIQUE): Nombre de usuario, único para iniciar sesión y referenciarlo en otras tablas. Facilita búsquedas y garantiza unicidad.
- `email` (VARCHAR(255) NOT NULL UNIQUE): Correo electrónico del usuario, único para identificación, notificaciones y recuperación de contraseña.
- `password_hash` (VARCHAR(255) NOT NULL): Guarda la contraseña en forma de hash para garantizar la seguridad del acceso.
- `display_name` (VARCHAR(100)): Nombre visible del usuario en posts y comentarios, mejora la experiencia del usuario.
- `bio` (TEXT): Información adicional del usuario que puede ser usada en perfiles y análisis de engagement.
- `active` (BOOLEAN DEFAULT true): Control de estado lógico (soft delete) que permite desactivar usuarios sin eliminar sus registros, preservando la historia de la plataforma y datos para análisis futuros.
- `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha de creación del registro, útil para auditoría, métricas de usuario y análisis de comportamiento.
- `updated_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha de última actualización, mantiene un historial de cambios para control de modificaciones y análisis de evolución de los usuarios.

**Decisiones técnicas clave:**

- Se utiliza `active` en lugar de eliminar usuarios para preservar información histórica y permitir análisis posteriores.
- `username` y `email` son únicos para evitar conflictos y facilitar la integridad referencial en otras tablas.
- Los campos `created_at` y `updated_at` permiten medir actividad y mantener registros completos de auditoría.

### Tabla: posts

La tabla **posts** almacena toda la información relativa a las publicaciones de blog creadas por los usuarios. Incluye datos de contenido, métricas de interacción y seguimiento de estado. El diseño garantiza integridad referencial, control de estado lógico y capacidad de análisis sobre la actividad y popularidad de cada post.

- `id` (SERIAL PRIMARY KEY): Identificador único de cada publicación. Se utiliza para referenciar posts en otras tablas como `comments` o `post_tags`.
- `author_id` (INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT): Identifica al autor del post y establece la relación con la tabla `users`. Se usa `RESTRICT` para evitar eliminar un usuario mientras tenga posts activos, preservando la integridad histórica.
- `title` (VARCHAR(255) NOT NULL): Título de la publicación, utilizado para mostrar y buscar posts en la plataforma.
- `content` (TEXT NOT NULL): Contenido completo del post, la información principal que se mostrará a los lectores.
- `excerpt` (VARCHAR(512)): Resumen o extracto del post, útil para listados y previews sin cargar el contenido completo.
- `published` (BOOLEAN DEFAULT false): Indica si el post está publicado o en borrador, controlando su visibilidad pública.
- `active` (BOOLEAN DEFAULT true): Campo de soft delete, permite desactivar posts sin eliminarlos, preservando la historia y las métricas asociadas.
- `views_count` (INTEGER DEFAULT 0): Contador de visualizaciones, útil para métricas y análisis de engagement.
- `likes_count` (INTEGER DEFAULT 0): Contador de "me gusta", permite medir la popularidad del contenido sin necesidad de consultas complejas.
- `language` (VARCHAR(10)): Idioma del post, útil para filtrar contenido multilingüe o análisis lingüísticos.
- `published_at` (TIMESTAMP WITH TIME ZONE): Fecha y hora de publicación del post, para ordenamiento, métricas de tiempo y auditoría.
- `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha de creación del registro, útil para seguimiento histórico.
- `updated_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha de última actualización, permite controlar modificaciones y mantener un historial preciso.

**Decisiones técnicas clave:**

- Se usa `active` en lugar de eliminar posts para preservar métricas, comentarios y tags relacionados.
- `RESTRICT` en `author_id` asegura que un usuario no pueda eliminarse mientras tenga posts, evitando inconsistencias.
- Los contadores `views_count` y `likes_count` están dentro de la tabla para consultas rápidas, evitando joins costosos en métricas frecuentes.

### Tabla: comments

La tabla **comments** almacena todos los comentarios que los usuarios dejan en las publicaciones. Cada comentario está vinculado a un post y opcionalmente a un usuario, permitiendo mantener un historial completo de interacciones y medir la participación de la comunidad. El diseño incluye control de estado lógico para preservar la información y facilitar análisis posteriores.

- `id` (SERIAL PRIMARY KEY): Identificador único de cada comentario. Se utiliza para referenciar comentarios en otras operaciones, aunque en este esquema no hay comentarios anidados.
- `post_id` (INTEGER NOT NULL REFERENCES posts(id) ON DELETE RESTRICT): Relación con la publicación a la que pertenece el comentario. Se usa `RESTRICT` para evitar eliminar un post que tenga comentarios activos, asegurando integridad histórica.
- `author_id` (INTEGER REFERENCES users(id) ON DELETE SET NULL): Relación con el usuario que hizo el comentario. Si el usuario se desactiva, el comentario permanece, pero `author_id` se vuelve `NULL`, preservando el contenido sin perder coherencia.
- `body` (TEXT NOT NULL): Contenido del comentario, la información principal que el usuario comparte.
- `active` (BOOLEAN DEFAULT true): Campo de soft delete, permite desactivar comentarios sin eliminarlos, manteniendo la trazabilidad histórica y las métricas de interacción.
- `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha y hora de creación del comentario, útil para auditoría, métricas y análisis de participación.
- `updated_at` (TIMESTAMP WITH TIME ZONE DEFAULT now()): Fecha y hora de la última modificación del comentario, para seguimiento de cambios y control de historial.

**Decisiones técnicas clave:**

- `active` permite desactivar comentarios sin eliminarlos, manteniendo la integridad del historial y las métricas.
- `ON DELETE RESTRICT` en `post_id` asegura que no se borre un post mientras tenga comentarios activos.
- `ON DELETE SET NULL` en `author_id` preserva el comentario incluso si el usuario deja de estar activo, garantizando consistencia del contenido.

### Tabla: tags

La tabla **tags** almacena las etiquetas que se pueden asociar a los posts para categorizar el contenido y facilitar búsquedas y filtrados. Cada etiqueta tiene un identificador único y un nombre legible, garantizando consistencia en toda la plataforma.

- `id` (SERIAL PRIMARY KEY): Identificador único de la etiqueta, usado para referenciarla en la tabla intermedia `post_tags`.
- `name` (VARCHAR(50) NOT NULL UNIQUE): Nombre visible de la etiqueta, único para evitar duplicados y confusión en la categorización.
- `active` (BOOLEAN DEFAULT true): Campo de soft delete, permite desactivar etiquetas sin eliminarlas, preservando la relación histórica con posts y evitando pérdida de datos valiosos.

**Decisiones técnicas clave:**

- `name` es único para asegurar que cada etiqueta represente un concepto distinto y se pueda utilizar de forma consistente.
- `active` permite inhabilitar etiquetas sin perder la relación con posts antiguos, manteniendo integridad histórica y métricas.
- La tabla está diseñada para trabajar junto a `post_tags`, facilitando consultas de posts por etiquetas y análisis de tendencias de contenido.

### Tabla: post_tags

La tabla **post_tags** permite asociar múltiples etiquetas a un mismo post y viceversa, facilitando la categorización flexible del contenido y consultas eficientes sobre posts por etiquetas. Esta tabla es clave para mantener integridad y escalabilidad en la plataforma.

- `post_id` (INTEGER NOT NULL REFERENCES posts(id) ON DELETE RESTRICT): Identificador del post. Se utiliza `RESTRICT` para evitar eliminar un post mientras tenga etiquetas asociadas activas.
- `tag_id` (INTEGER NOT NULL REFERENCES tags(id) ON DELETE RESTRICT): Identificador de la etiqueta asociada. `RESTRICT` evita eliminar una etiqueta mientras esté en uso, asegurando integridad histórica.
- `PRIMARY KEY (post_id, tag_id)`: Clave primaria compuesta que garantiza que no se repita la misma combinación post-etiqueta, evitando duplicados.

**Decisiones técnicas clave:**

- La tabla permite modelar correctamente la relación muchos a muchos entre posts y tags, fundamental para búsquedas, filtrado y análisis de tendencias.
- `ON DELETE RESTRICT` asegura que la eliminación de un post o tag no rompa la integridad de los datos relacionados.
- Al mantener `active` en posts y tags, podemos filtrar únicamente los elementos activos sin perder la historia completa de las relaciones pasadas.

## Resumen y buenas prácticas

Este esquema de base de datos ha sido diseñado para mantener la integridad de los datos, permitir auditoría y análisis, y facilitar la escalabilidad del esquema. Se priorizó el uso de soft delete (active) en lugar de eliminar registros, garantizando la preservación de la información histórica y métricas de interacción.

Las relaciones entre tablas y las restricciones (RESTRICT, claves primarias y únicas) aseguran consistencia y evitan pérdida accidental de datos. Este diseño también facilita consultas eficientes y permite extender el esquema sin comprometer la coherencia de la información.
