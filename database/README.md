# Justificación Técnica

Este diseño de base de datos para una plataforma de blogs está pensado para garantizar **escalabilidad, integridad de datos y facilidad de mantenimiento**. Utilicé **PostgreSQL** por su robustez en manejo de relaciones complejas, soporte para transacciones ACID y capacidad de optimización mediante índices.

A continuación, detallo las decisiones técnicas clave para cada tabla, asegurando que el sistema cumpla con:

- **Registro seguro de usuarios y contenido**.
- **Relaciones claras entre entidades** (usuarios, posts, comentarios y etiquetas).
- **Eficiencia en consultas** mediante índices estratégicos.
- **Preservación de datos históricos** mediante _soft-delete_ (campo `active`).

### Estrategia de Persistencia de Datos

He implementado un sistema de **desactivación lógica** (soft-delete) mediante el campo `active` en todas las entidades clave, en lugar de eliminar registros permanentemente. Esto garantiza:

- **Historial completo**: Los datos nunca se pierden, incluso si un usuario, post o comentario se "elimina".
- **Posibilidad de auditoría**: Permite rastrear cambios, actividad pasada y métricas históricas.
- **Recuperación ante errores**: Contenido desactivado puede restaurarse fácilmente si fue borrado por accidente.
- **Análisis de datos**: Facilita reportes y toma de decisiones basada en información acumulada (ej: tendencias de participación, usuarios inactivos con contenido relevante).

**Beneficio clave**:  
La plataforma no solo opera en tiempo real, sino que **preserva su valor como fuente de información histórica**, útil para mejorar el producto y entender el comportamiento de los usuarios a largo plazo.

## Tabla `users` - Decisiones técnicas

1. **Claves y unicidad**:

   - `id SERIAL`: Clave primaria autoincremental para identificación única.
   - `username` y `email` con `UNIQUE`: Evitan duplicados y garantizan consistencia.

2. **Seguridad**:

   - `password_hash`: Almacena contraseñas hasheadas (nunca en texto plano).

3. **Metadatos útiles**:
   - `active`: Permite desactivar usuarios sin borrar registros (_soft-delete_).
   - `created_at`/`updated_at`: Facilitan auditoría y análisis de actividad.
   - `signup_source`: Útil para métricas de adquisición de usuarios.

## Tabla `posts` - Decisiones técnicas

1. **Relaciones y restricciones**:

   - `author_id` con `ON DELETE RESTRICT`: Impide borrar usuarios con posts activos, manteniendo la integridad referencial.

2. **Rendimiento**:

   - Índices en `author_id`, `published` y `active`: Aceleran búsquedas frecuentes (ej: "posts públicos de un autor").
   - `views_count`/`likes_count`: Almacenan métricas en la tabla para evitar cálculos costosos.

3. **Flexibilidad**:
   - `published` y `active`: Permiten diferenciar entre borradores (`published = false`), posts públicos (`published = true`) y contenido oculto (`active = false`).

## Tabla `comments` - Decisiones técnicas

1. **Manejo de borrados**:

   - `ON DELETE RESTRICT` para `post_id`: Evita perder comentarios si se intenta borrar un post.
   - `ON DELETE SET NULL` para `author_id`: Conserva comentarios aunque el usuario se elimine (pero desvincula su autoría).

2. **Optimización**:
   - Índice en `post_id` y `active`: Acelera consultas como **mostrar comentarios activos de un post**.

## Tabla `tags` y `post_tags` - Decisiones técnicas

1. **Relación muchos-a-muchos**:

   - Tabla `post_tags` con clave primaria compuesta (`post_id`, `tag_id`): Permite múltiples etiquetas por post y múltiples posts por etiqueta, sin duplicados.

2. **Consistencia**:
   - `ON DELETE RESTRICT` en ambas FK: Evita borrar tags o posts con relaciones activas.

## Resumen y buenas prácticas

Este esquema de base de datos ha sido diseñado para mantener la integridad de los datos, permitir auditoría y análisis, y facilitar la escalabilidad del esquema. Se priorizó el uso de soft delete (active) en lugar de eliminar registros, garantizando la preservación de la información histórica y métricas de interacción.

Las relaciones entre tablas y las restricciones (RESTRICT, claves primarias y únicas) aseguran consistencia y evitan pérdida accidental de datos. Este diseño también facilita consultas eficientes y permite extender el esquema sin comprometer la coherencia de la información.
