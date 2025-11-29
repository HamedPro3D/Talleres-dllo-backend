---

# Sistema de Gestión de Biblioteca – API REST (Node.js + Express + MongoDB)

Este proyecto implementa una API REST para la gestión básica de una biblioteca. Incluye manejo de usuarios, libros y reservas, con autenticación mediante JWT, control de permisos y “soft deletes” para mayor seguridad.

El sistema permite:

* Registrar y autenticar usuarios.
* Administrar libros con CRUD completo.
* Realizar y gestionar reservas de libros.
* Controlar permisos para operaciones sensibles.
* Realizar soft deletes en usuarios y libros.
* Usar filtros avanzados para la búsqueda de libros.
* Probar toda la API desde VSCode mediante un archivo `test.http`.

---

## 1. Requisitos previos

Antes de instalar el proyecto, asegúrese de tener:

* Node.js 16+
* npm 8+
* MongoDB Atlas o MongoDB local
* Visual Studio Code (opcional, recomendado)
* Extensión “REST Client” (si desea ejecutar `test.http`)

---

## 2. Instalación del proyecto

Clone el repositorio e instale dependencias:

```bash
git clone <url-del-repo>
cd biblioteca-api
npm install
```

---

## 3. Configuración de variables de entorno

Cree un archivo `.env` en la raíz del proyecto:

```
MONGO_URI=<cadena-de-conexión-mongodb>
JWT_SECRET=<clave-secreta>
PORT=3000
```

Un ejemplo de `MONGO_URI` usando MongoDB Atlas:

```
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/biblioteca
```

---

## 4. Ejecutar el servidor

Para iniciar el servidor:

```bash
npm start
```

El servidor se iniciará por defecto en:

```
http://localhost:3000
```

---

## 5. Estructura del proyecto

```
/controllers
    user.controller.js
    book.controller.js
    reservation.controller.js
/middleware
    auth.js
/models
    user.model.js
    book.model.js
    reservation.model.js
/routes
    user.routes.js
    book.routes.js
    reservation.routes.js
test.http
server.js
.env
package.json
```

---

## 6. Autenticación y permisos

El sistema utiliza:

* **JWT** para autenticar usuarios
* **roles basados en permisos**

Ejemplos de permisos:

* `CREATE_BOOKS`
* `UPDATE_BOOKS`
* `DISABLE_BOOKS`
* `UPDATE_USERS`
* `DISABLE_USERS`

Los permisos deben asignarse manualmente en MongoDB o mediante un endpoint de actualización de usuario.

---

## 7. Endpoints disponibles

### 7.1. Usuarios

| Método | Endpoint              | Descripción            | Requiere Auth | Requiere Permiso                     |
| ------ | --------------------- | ---------------------- | ------------- | ------------------------------------ |
| POST   | `/api/users/register` | Registrar usuario      | No            | No                                   |
| POST   | `/api/users/login`    | Autenticarse           | No            | No                                   |
| GET    | `/api/users/me`       | Obtener usuario actual | Sí            | No                                   |
| PATCH  | `/api/users/:id`      | Actualizar usuario     | Sí            | UPDATE_USERS o ser el mismo usuario  |
| DELETE | `/api/users/:id`      | Soft delete            | Sí            | DISABLE_USERS o ser el mismo usuario |

---

### 7.2. Libros

| Método | Endpoint         | Descripción                         | Auth | Permiso       |
| ------ | ---------------- | ----------------------------------- | ---- | ------------- |
| POST   | `/api/books`     | Crear libro                         | Sí   | CREATE_BOOKS  |
| GET    | `/api/books`     | Obtener lista de libros con filtros | No   | No            |
| GET    | `/api/books/:id` | Obtener un libro                    | No   | No            |
| PATCH  | `/api/books/:id` | Actualizar libro                    | Sí   | UPDATE_BOOKS  |
| DELETE | `/api/books/:id` | Soft delete de libro                | Sí   | DISABLE_BOOKS |

**Filtros disponibles:**

* `genre`
* `author`
* `publisher`
* `title`
* `available`
* `fromDate`
* `toDate`
* `page`
* `limit`

Ejemplo:

```
GET /api/books?author=Gabriel&available=true&genre=realismo
```

---

### 7.3. Reservas

| Método | Endpoint                        | Descripción                  | Auth |
| ------ | ------------------------------- | ---------------------------- | ---- |
| POST   | `/api/reservations`             | Crear reserva                | Sí   |
| GET    | `/api/reservations/my`          | Obtener reservas del usuario | Sí   |
| POST   | `/api/reservations/:id/deliver` | Marcar libro como entregado  | Sí   |
| DELETE | `/api/reservations/:id`         | Eliminar reserva             | Sí   |

Reglas:

* Un usuario **no puede reservar el mismo libro dos veces** sin entregarlo.
* Cuando se reserva un libro, `available = false`.
* Cuando se entrega, `available = true`.

---

## 8. Archivo `test.http`

Este archivo permite ejecutar todas las rutas desde VSCode usando la extensión **REST Client**.

Cree un archivo llamado `test.http` con el siguiente contenido de ejemplo:

```http
### Registrar usuario
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "name": "admin",
  "email": "admin@example.com",
  "password": "123456"
}

### Login
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "123456"
}

###

# Copiar aquí el token
@token = <token>

### Obtener usuario actual
GET http://localhost:3000/api/users/me
Authorization: Bearer {{token}}

### Crear libro
POST http://localhost:3000/api/books
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Cien años de soledad",
  "genre": "Realismo mágico",
  "author": "Gabriel García Márquez",
  "publisher": "Sudamericana",
  "publicationDate": "1967-05-30"
}

### Obtener libros con filtros
GET http://localhost:3000/api/books?author=Gabriel

### Crear reserva
POST http://localhost:3000/api/reservations
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "bookId": "<ID_DEL_LIBRO>"
}

### Entregar reserva
POST http://localhost:3000/api/reservations/<id-reserva>/deliver
Authorization: Bearer {{token}}
```

---

## 9. Soft deletes

Tanto usuarios como libros se eliminan de forma lógica:

```
disabled: true
```

Nunca se elimina un documento definitivamente.

---

## 10. Ejecución en GitHub Codespaces

Si se usa Codespaces:

1. Abrir el espacio.
2. Instalar dependencias:
   `npm install`
3. Crear `.env`
4. Iniciar servidor:
   `npm start`
5. Probar rutas desde `test.http`
6. Usar la URL pública de Codespaces si se desea consumir desde fuera.

---

## 11. Comentarios finales

Este proyecto está diseñado para cumplir una rúbrica académica que exige:

* Autenticación segura
* Control de permisos
* CRUD completo
* Soft deletes
* Filtros avanzados
* Buenas prácticas REST
* Pruebas mediante archivo `test.http`

