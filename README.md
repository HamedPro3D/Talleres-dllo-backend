
# Sistema de Gestión de Biblioteca – API REST (Node.js + Express + MongoDB)

Este proyecto implementa una API REST para la administración de una biblioteca. Incluye manejo de usuarios, libros y reservas, autenticación mediante JSON Web Tokens (JWT), control de permisos y eliminación lógica (“soft delete”).

El sistema permite:
- Registrar y autenticar usuarios.
- Administrar libros mediante operaciones CRUD.
- Realizar y gestionar reservas.
- Controlar permisos para operaciones restringidas.
- Ejecutar eliminaciones lógicas en usuarios y libros.
- Utilizar un sistema de filtros avanzados para búsquedas de libros.
- Probar todos los endpoints utilizando el archivo `test.http`.

---

## 1. Requisitos previos

Para ejecutar el proyecto localmente o en GitHub Codespaces se requiere:

- Node.js 16 o superior  
- npm 8 o superior  
- MongoDB (local o remoto). En GitHub Codespaces, MongoDB se ejecuta automáticamente dentro del entorno.  
- Visual Studio Code (opcional, recomendado)  
- Extensión **REST Client** (necesaria para usar `test.http`)

---

## 2. Instalación del proyecto

Clone el repositorio e instale las dependencias:

```bash
git clone https://github.com/HamedPro3D/Talleres-dllo-backend.git
cd Talleres-dllo-backend
npm install
````

---

## 3. Configuración de variables de entorno

Cree un archivo `.env` en la raíz del proyecto:

```
MONGO_URI=<cadena-de-conexión-mongodb>
JWT_SECRET=<clave-secreta>
PORT=3000
```

### Ejemplo para MongoDB Atlas

```
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/biblioteca
```

### Uso de MongoDB en GitHub Codespaces

Codespaces ejecuta automáticamente MongoDB dentro de un contenedor.
Generalmente, la conexión se realiza así:

```
MONGO_URI=mongodb://localhost:27017/biblioteca
```

Puede verificar el puerto desde la pestaña **Ports** de Codespaces.

---

## 4. Ejecutar el servidor

Para iniciar el servidor:

```bash
npm start
```

Por defecto, la API estará disponible en:

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
app.js
package.json
```

---

## 6. Autenticación y permisos

El sistema utiliza:

* Autenticación mediante JWT.
* Control de permisos basado en una lista asignada por usuario.

Permisos disponibles:

* CREATE_BOOKS
* UPDATE_BOOKS
* DISABLE_BOOKS
* UPDATE_USERS
* DISABLE_USERS

Los permisos pueden asignarse mediante el endpoint de actualización de usuario o directamente desde MongoDB.

---

## 7. Endpoints

### 7.1. Usuarios

| Método | Endpoint              | Descripción            | Autenticación | Permiso requerido                     |
| ------ | --------------------- | ---------------------- | ------------- | ------------------------------------- |
| POST   | `/api/users/register` | Registrar usuario      | No            | No                                    |
| POST   | `/api/users/login`    | Iniciar sesión         | No            | No                                    |
| GET    | `/api/users/me`       | Obtener usuario actual | Sí            | No                                    |
| PATCH  | `/api/users/:id`      | Actualizar usuario     | Sí            | UPDATE_USERS o ser el propio usuario  |
| DELETE | `/api/users/:id`      | Soft delete            | Sí            | DISABLE_USERS o ser el propio usuario |

---

### 7.2. Libros

| Método | Endpoint         | Descripción                 | Auth | Permiso       |
| ------ | ---------------- | --------------------------- | ---- | ------------- |
| POST   | `/api/books`     | Crear libro                 | Sí   | CREATE_BOOKS  |
| GET    | `/api/books`     | Listar libros (con filtros) | No   | No            |
| GET    | `/api/books/:id` | Obtener libro por ID        | No   | No            |
| PATCH  | `/api/books/:id` | Actualizar libro            | Sí   | UPDATE_BOOKS  |
| DELETE | `/api/books/:id` | Soft delete                 | Sí   | DISABLE_BOOKS |

#### Filtros disponibles:

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
GET /api/books?author=Gabriel&available=true&genre=Realismo
```

---

### 7.3. Reservas

| Método | Endpoint                        | Descripción                   | Auth |
| ------ | ------------------------------- | ----------------------------- | ---- |
| POST   | `/api/reservations`             | Crear reserva                 | Sí   |
| GET    | `/api/reservations/my`          | Obtener reservas propias      | Sí   |
| POST   | `/api/reservations/:id/deliver` | Marcar reserva como entregada | Sí   |
| DELETE | `/api/reservations/:id`         | Eliminar reserva              | Sí   |

Reglas:

* Un usuario no puede reservar el mismo libro más de una vez sin entregarlo.
* Cuando se reserva un libro, `available = false`.
* Al entregarlo, `available = true`.

---

## 8. Uso del archivo `test.http`

El archivo `test.http` permite ejecutar todas las rutas desde VSCode usando la extensión **REST Client**.

Ejemplo de uso:

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

### Guardar token
@token = <token>

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
```

El ejemplo mas claro esta en el test.html ya creado, es un paso a paso de como utilizarse.

---

## 9. Soft deletes

Los usuarios y los libros no se eliminan físicamente.
El campo que marca su estado es:

```
disabled: true
```

El sistema excluye automáticamente los elementos inhabilitados de los listados.

---

## 10. Uso en GitHub Codespaces

GitHub Codespaces crea automáticamente un contenedor donde se ejecuta:

* El servidor Node.js
* Una instancia de MongoDB expuesta en un puerto interno (por defecto 27017)

Pasos recomendados:

1. Abrir el Codespace desde GitHub.
2. Instalar dependencias con `npm install`.
3. Crear el archivo `.env`.
4. Verificar el puerto de MongoDB en la pestaña **Ports**.
5. Iniciar el servidor con `npm start`.
6. Probar los endpoints mediante `test.http`.

## 11. Ejecutar MongoDB con Docker (opcional)

Si no dispone de una instalación local de MongoDB, puede ejecutarlo mediante Docker:

docker run -d -p 27017:27017 --name mongo mongo

Una vez iniciado el contenedor, utilice la siguiente cadena en su archivo .env:

MONGO_URI=mongodb://localhost:27017/biblioteca


Para detener el contenedor:

docker stop mongo


Para volver a iniciarlo:

docker start mongo