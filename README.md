# Proyecto Backend de Talleres
## Objetivo

El objetivo del proyecto es unificar los talleres previos en un único backend que:
- Exporte todas las funciones implementadas en cada taller.
- Exponga endpoints `POST` para cada función.
- Permita ejecutar funciones dinámicamente sin crear endpoints manuales.
- Sea fácilmente ejecutable desde **Codespaces**, consola o navegador.

---

## Requisitos previos

- Tener instalado **Node.js 18+** (en Codespaces ya viene instalado).
- Tener acceso a un entorno de desarrollo (VSCode / Codespaces).
- Conexión a internet (para instalar dependencias).

---

## Instalación

**Clona** el repositorio o ábrelo en Codespaces:

```bash
git clone <URL-del-repo>
cd talleres-dllo-backend
```

**Instala las dependencias:**

```bash
npm install
```

**Copia el archivo de entorno y configúralo:**

```bash
cp .env.example .env
```

El archivo `.env` debe tener lo siguiente:

```
PORT=3000
HOST=0.0.0.0
API_PREFIX=/api
```

## Ejecución del servidor

### 🔧 Modo desarrollo (con reinicio automático)
```bash
npm run dev
```

### Modo normal
```bash
npm start
```

Verás algo como:
```
API lista en http://0.0.0.0:3000/api
```

En Codespaces:
1. Abre la pestaña **Ports** (abajo).  
2. Busca el puerto `3000` → cámbialo a **Public**.  
3. Haz clic en “Open in Browser”.  
4. Verás:  
   ```
   ok
   ```

### Salud (verifica que el servidor esté activo)
```
GET /api/health
→ ok
```

### Talleres
- `/api/taller1/...`
- `/api/taller2/...`
- `/api/taller3/...`

### Ruta dinámica
- `/api/run` (ejecutor universal)
- `/api/run/registry` (ver funciones disponibles)

---

## Uso por consola (curl)

> Todos los endpoints usan `POST` y reciben los parámetros en formato JSON (`-H "Content-Type: application/json"`).

---

### 🔎 Verificar que el servidor responde

```bash
curl http://localhost:3000/api/health
```

**Respuesta esperada:**
```
ok
```

---

## Taller 1 

### Convertir temperatura (°C → °F)
```bash
curl -X POST http://localhost:3000/api/taller1/convertir-temp   -H "Content-Type: application/json"   -d '{"c":10}'
```
**Respuesta:**
```json
{ "resultado": 50 }
```

---

### Resolver ecuación cuadrática
```bash
curl -X POST http://localhost:3000/api/taller1/resolvente   -H "Content-Type: application/json"   -d '{"a":1,"b":5,"c":4,"positivo":true}'
```
**Respuesta:**
```json
{ "resultado": -1 }
```

---

### Determinar paridad (mejor versión)
```bash
curl -X POST http://localhost:3000/api/taller1/mejor-paridad   -H "Content-Type: application/json"   -d '{"num":7}'
```
**Respuesta:**
```json
{ "resultado": "Impar" }
```

---

### Determinar paridad (peor versión)
```bash
curl -X POST http://localhost:3000/api/taller1/peor-paridad   -H "Content-Type: application/json"   -d '{"num":4}'
```
**Respuesta:**
```json
{ "resultado": "Par" }
```

---

## Taller 2 

### Número máximo
```bash
curl -X POST http://localhost:3000/api/taller2/find-max   -H "Content-Type: application/json"   -d '{"lista":[3,17,-1,4,-19]}'
```
**Respuesta:**
```json
{ "resultado": 17 }
```

---

### Buscar un número
```bash
curl -X POST http://localhost:3000/api/taller2/includes   -H "Content-Type: application/json"   -d '{"lista":[1,2,3,4],"numero":3}'
```
**Respuesta:**
```json
{ "resultado": true }
```

---

### Sumar elementos
```bash
curl -X POST http://localhost:3000/api/taller2/sum   -H "Content-Type: application/json"   -d '{"lista":[1,2,3,4]}'
```
**Respuesta:**
```json
{ "resultado": 10 }
```

---

### Números faltantes
```bash
curl -X POST http://localhost:3000/api/taller2/missing-numbers   -H "Content-Type: application/json"   -d '{"lista":[3,5,6,9]}'
```
**Respuesta:**
```json
{ "resultado": [4,7,8] }
```

---

## Taller 3

### Contar vocales o consonantes
```bash
curl -X POST http://localhost:3000/api/taller3/desglosar   -H "Content-Type: application/json"   -d '{"texto":"Hola Mundo","tipo":"vocales"}'
```
**Respuesta:**
```json
{ "resultado": 4 }
```

---

### Two Sum (índices que suman un valor)
```bash
curl -X POST http://localhost:3000/api/taller3/two-sum   -H "Content-Type: application/json"   -d '{"numeros":[2,7,11,15],"objetivo":9}'
```
**Respuesta:**
```json
{ "resultado": [0,1] }
```

---

### Conversión romano → número
```bash
curl -X POST http://localhost:3000/api/taller3/romano-a-int   -H "Content-Type: application/json"   -d '{"romano":"MCMXCVII"}'
```
**Respuesta:**
```json
{ "resultado": 1997 }
```

---

### Descomposición de palabra
```bash
curl -X POST http://localhost:3000/api/taller3/descomposicion   -H "Content-Type: application/json"   -d '{"entrada":"superhero,super,hero,man"}'
```
**Respuesta:**
```json
{ "resultado": ["super","hero"] }
```

---

## `/run`

Permite ejecutar cualquier función sin recordar la ruta exacta.

### Ver todas las funciones disponibles
```bash
curl http://localhost:3000/api/run/registry
```
**Respuesta:**
```json
{
  "taller1": ["convertir-temp","resolvente","mejor-paridad","peor-paridad"],
  "taller2": ["find-max","includes","sum","missing-numbers"],
  "taller3": ["desglosar","two-sum","romano-a-int","descomposicion"]
}
```

---

### Ejecutar una función con `args`
```bash
curl -X POST http://localhost:3000/api/run   -H "Content-Type: application/json"   -d '{"taller":"taller1","accion":"convertir-temp","args":[10]}'
```
**Respuesta:**
```json
{
  "ok": true,
  "taller": "taller1",
  "accion": "convertir-temp",
  "resultado": 50
}
```

---

### Ejecutar una función con `kwargs`
```bash
curl -X POST http://localhost:3000/api/run   -H "Content-Type: application/json"   -d '{
    "taller":"taller3",
    "accion":"two-sum",
    "kwargs": { "numeros":[2,7,11,15], "objetivo":9 }
  }'
```
**Respuesta:**
```json
{
  "ok": true,
  "taller": "taller3",
  "accion": "two-sum",
  "resultado": [0,1]
}
```

---

## En Codespaces

- Si `curl` falla con `localhost:3000`, usa tu URL pública:
  ```
  https://<tu-subdominio>-3000.app.github.dev
  ```
- No dejes espacios entre el dominio y `/api/...` (causa error `No host part in URL`).
- Puedes abrir la API desde navegador (por ejemplo `/api/health` o `/api/run/registry`).
