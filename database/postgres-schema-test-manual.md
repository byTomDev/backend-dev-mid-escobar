# Manual Técnico

## Prueba de un Esquema SQL en PostgreSQL usando Docker

Este documento es una guía para validar un esquema de base de datos SQL en un entorno controlado, empleando tecnologías como Docker y PostgreSQL. El objetivo es aplicar un archivo .sql que contiene la definición de un esquema y verificar su funcionamiento dentro de un contenedor PostgreSQL.

## Pasos para ejecutar y probar el esquema

### 1. Iniciar un contenedor PostgreSQL con Docker

```bash
docker run --name test-postgres \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  -d postgres
```

Este comando descargará la imagen oficial de PostgreSQL si no está disponible localmente, y levantará un contenedor con la base de datos lista para usar.

### 2. Verificar que el contenedor esté corriendo

```bash
docker ps
```

Confirma que el contenedor `test-postgres` esté activo.

### 3. Copiar el archivo `schema.sql` al contenedor

Ubica el archivo SQL con tu esquema en el mismo directorio desde el cual estás ejecutando Docker, y ejecuta:

```bash
docker cp schema.sql test-postgres:/schema.sql
```

### 4. Acceder al contenedor

```bash
docker exec -it test-postgres bash
```

Esto abrirá una terminal dentro del contenedor.

### 5. Ejecutar el archivo SQL dentro de PostgreSQL

Dentro del contenedor, ejecuta:

```bash
psql -U postgres -f /schema.sql
```

Esto aplicará todo el contenido del archivo al esquema de la base de datos.

### 6. Verificar la creación de las tablas

Accede al cliente de PostgreSQL:

```bash
psql -U postgres
```

Y dentro del cliente:

```sql
\dt
```

Esto mostrará todas las tablas creadas. Para inspeccionar una tabla en particular, puedes usar:

```sql
\d nombre_tabla
```

### 7. Insertar datos de prueba (opcional)

Ejemplo básico:

```sql
INSERT INTO users (username, email, password_hash)
VALUES ('admin', 'admin@example.com', 'hashedpass');

INSERT INTO posts (author_id, title, content)
VALUES (1, 'Post de prueba', 'Este es un contenido de ejemplo');
```

### 8. Finalizar y limpiar (opcional)

Para detener y eliminar el contenedor:

```bash
docker stop test-postgres
docker rm test-postgres
```
