# Gestión de Productos

Este proyecto es una API para gestión de productos con sus categorías, hecha con Node.js, Express, Sequelize y PostgreSQL, con tests unitarios usando Jest, tests E2E con Cypress y análisis estático usando ESLint.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados:

- Node.js v18.16 LTS
- npm
- PostgreSQL v14 o superior

## Instalación

1. Clona el repositorio y cámbiate a la rama pipeline:

```bash
git clone https://github.com/Julianaramirez939/PROYECTO-PRUEBAS.git
cd gestion-productos
```

2. Instala las dependencias:

```bash
npm ci
```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=gestionproductos
DB_PORT=5432
NODE_ENV=development
```

- Asegúrate de que la base de datos `gestionproductos` exista en PostgreSQL antes de ejecutar el proyecto.

## Ejecución del proyecto

Levanta el servidor en modo desarrollo:

```bash
npm run dev
```

El backend estará disponible en:

```
http://localhost:3000
```

## Ejecución de pruebas

### Pruebas unitarias e integración

```bash
npm test
```

### Análisis estático con ESLint

```bash
npm run lint
```

Para corregir automáticamente problemas de estilo:

```bash
npm run lint:fix
```

### Pruebas E2E con Cypress

1. Levanta el backend en otra terminal:

```bash
npm start
```

2. Ejecuta Cypress en modo interactivo:

```bash
npx cypress open
```

## Configuración de la base de datos

- Se utiliza PostgreSQL con Sequelize.
- Asegúrate de crear la base de datos `gestionproductos`.

## CI/CD con GitHub Actions

El proyecto incluye un pipeline que:

1. Levanta un contenedor PostgreSQL para tests.
2. Ejecuta ESLint, tests unitarios/integración y E2E con Cypress.
3. Usa Node.js v18.16 para compatibilidad con Cypress + TypeScript.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize + PostgreSQL
- Jest (unit/integration tests)
- Cypress (E2E tests)
- ESLint

## Ejecución rápida (Copy & Paste)

```bash
git clone https://github.com/Julianaramirez939/PROYECTO-PRUEBAS.git
cd gestion-productos
npm ci
# Asegúrate de crear la DB en PostgreSQL
npm run dev  # levanta backend
# En otra terminal
npm test      # tests unitarios e integración
npx cypress run
```
