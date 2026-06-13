# Banco XYZ — Aplicación Bancaria Web

Banco XYZ es una Single Page Application (SPA) bancaria desarrollada con React y TypeScript. Permite a los usuarios autenticarse, consultar su saldo, realizar transferencias nacionales e internacionales y revisar el historial completo de movimientos. El frontend consume microservicios desplegados en AWS Lambda a través de un sistema de proxy de desarrollo.

---

## Tabla de contenido

1. [Stack tecnológico](#stack-tecnológico)
2. [Arquitectura del proyecto](#arquitectura-del-proyecto)
3. [Variables de entorno](#variables-de-entorno)
4. [Instalación y ejecución local](#instalación-y-ejecución-local)
5. [Scripts disponibles](#scripts-disponibles)
6. [API y configuración del proxy](#api-y-configuración-del-proxy)
7. [Estrategia de ramas (Gitflow)](#estrategia-de-ramas-gitflow)
8. [Pruebas](#pruebas)
9. [Vistas principales](#vistas-principales)

---

## Stack tecnológico

### Dependencias de producción

| Librería | Versión | Uso |
|---|---|---|
| `react` | ^19.2.7 | Framework principal |
| `react-dom` | ^19.2.7 | Renderizado en el DOM |
| `react-router-dom` | ^7.17.0 | Enrutamiento SPA |
| `typescript` | ^4.9.5 | Tipado estático |
| `axios` | ^1.17.0 | Cliente HTTP |
| `react-hot-toast` | ^2.6.0 | Notificaciones toast |
| `lucide-react` | ^1.17.0 | Íconos SVG |
| `react-icons` | ^5.6.0 | Íconos adicionales |
| `react-scripts` | 5.0.1 | Toolchain (CRA) |
| `http-proxy-middleware` | ^2.0.6 | Proxy de desarrollo |
| `web-vitals` | ^2.1.4 | Métricas de rendimiento |

### Dependencias de desarrollo

| Librería | Versión | Uso |
|---|---|---|
| `tailwindcss` | ^3.4.19 | Utilidades CSS |
| `postcss` | ^8.5.15 | Procesamiento CSS |
| `autoprefixer` | ^10.5.0 | Compatibilidad CSS cross-browser |
| `@testing-library/react` | ^16.3.2 | Pruebas de componentes |
| `@testing-library/jest-dom` | ^6.9.1 | Matchers de DOM para Jest |
| `@testing-library/user-event` | ^13.5.0 | Simulación de eventos de usuario |
| `@types/jest` | ^27.5.2 | Tipado de Jest |

---

## Arquitectura del proyecto

La aplicación sigue una arquitectura en capas donde cada capa tiene una responsabilidad única:

```
Componente / Página
      ↓
 Custom Hook          ← gestiona estado local (loading, error) y orquesta llamadas
      ↓
   Servicio           ← lógica de negocio, transformación de datos
      ↓
  Endpoint (API)      ← instancias de Axios, definición de rutas HTTP
      ↓
  Backend (Lambda)    ← microservicios AWS
```

### Estructura de carpetas

```
src/
├── api/
│   ├── axiosConfig.ts        # Instancias de Axios con interceptores
│   ├── endpoint.ts           # Definición de endpoints por dominio
│   └── currency.ts           # Catálogo estático de monedas
│
├── context/
│   ├── AuthUserContext.tsx   # Estado global de autenticación
│   └── ProductContext.tsx    # Estado global de saldo/balance
│
├── hooks/
│   ├── auth/useUserAuth.ts   # Hook de login con manejo de estado
│   └── product/useProduct.ts # Hook de operaciones financieras
│
├── services/
│   ├── auth/service-auth.ts        # Lógica de autenticación
│   └── product/service-product.ts  # Lógica de productos y transferencias
│
├── models/
│   └── models.ts             # Interfaces TypeScript globales
│
├── pages/
│   ├── Onboarding/           # Pantalla de bienvenida pública
│   ├── Login/                # Formulario de inicio de sesión
│   ├── balance/              # Dashboard de saldo (protegida)
│   ├── transfers/            # Formulario de nueva transferencia (protegida)
│   └── ListTransfers/        # Historial de transferencias (protegida)
│
├── layouts/
│   ├── PublicLayout/         # Envuelve rutas públicas
│   └── PrivateLayout/        # Envuelve rutas autenticadas con sidebar
│
├── routes/
│   ├── AppRoutes.tsx         # Definición central de rutas
│   └── ProtectedRoutes.tsx   # Guard de autenticación
│
├── components/               # Componentes reutilizables globales
│   ├── HeaderModules/
│   ├── Sidebar/
│   ├── loading/
│   └── ...
│
└── utils/
    └── numberUtil.ts         # Helpers para validación de números
```

### Gestión de estado

El proyecto utiliza únicamente **React Context API** sin Redux ni Zustand.

| Context | Clave en localStorage | Responsabilidad |
|---|---|---|
| `AuthUserContext` | `bancoxyz_user`, `bancoxyz_token` | Usuario autenticado, `isAuthenticated`, `login()`, `logout()` |
| `ProductContext` | `bancoxyz_balance` | Saldo actual, `saveBalance()`, `clearBalance()` |

Ambos contextos persisten su estado en `localStorage` para sobrevivir a recargas de página.

### Axios e interceptores

`src/api/axiosConfig.ts` crea una instancia de Axios independiente por backend:

| Instancia | Variable de entorno |
|---|---|
| `axiosAuth` | `REACT_APP_API_URL` |
| `axiosBalance` | `REACT_APP_BALANCE_URL` |
| `axiosTransfer` | `REACT_APP_TRANSFER_URL` |
| `axiosTransferList` | `REACT_APP_TRANSFER_LIST_URL` |

**Interceptor de request:** agrega el header `Authorization: Bearer {token}` en todas las peticiones excepto `/login` y `/register`.

**Interceptor de response:** ante un error 401, elimina automáticamente `bancoxyz_user` y `bancoxyz_token` de `localStorage`.

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
REACT_APP_API_URL=<url-base-del-servicio-de-autenticación>
REACT_APP_BALANCE_URL=<url-base-del-servicio-de-saldo>
REACT_APP_TRANSFER_URL=<url-base-del-servicio-de-transferencias>
REACT_APP_TRANSFER_LIST_URL=<url-base-del-servicio-de-historial>
```

> En desarrollo local, el proxy de `setupProxy.js` redirige las peticiones al endpoint correcto de AWS independientemente del valor de estas variables.

---

## Instalación y ejecución local

### Requisitos previos

- Node.js >= 16
- npm >= 8

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/andresmel/bancoyxz.git
cd bancoyxz

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env   # editar con los valores reales

# 4. Iniciar el servidor de desarrollo
npm start
```

La aplicación quedará disponible en [http://localhost:3000](http://localhost:3000).

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo en el puerto 3000 con hot-reload |
| `npm run build` | Genera el bundle de producción optimizado en la carpeta `build/` |
| `npm test` | Ejecuta Jest en modo watch interactivo |
| `npm run eject` | Expone la configuración interna de CRA (operación irreversible) |

---

## API y configuración del proxy

Durante el desarrollo, `src/setupProxy.js` intercepta las peticiones salientes y las redirige a los microservicios AWS Lambda para evitar problemas de CORS.

| Ruta local | Lambda destino | Método |
|---|---|---|
| `POST /login` | `qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login` | Autenticación |
| `GET /balance` | `2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance` | Consulta de saldo |
| `POST /transfer` | `ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer` | Nueva transferencia |
| `GET /transferList` | `n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList` | Historial de transferencias |

### Modelos de datos

```typescript
// Autenticación
interface LoginRequest  { email: string; password: string }
interface LoginResponse { token: string; user: User }

// Usuario
interface User { id: number; name: string; email: string }

// Saldo
interface BalanceResponse { currency: string; accountBalance: number }

// Transferencia
interface TransferRequest {
  value: number;
  currency: string;       // USD | EUR | JPY | GBP | AUD | CAD | CHF
  payeerDocument: string;
  transferDate: string;   // ISO date
}
interface TransferResponse { status: "success" | "error" }

// Historial
interface TransferHistoryResponse {
  message: string;
  transfers: TransferItem[];
}
interface TransferItem {
  value: number;
  date: string;
  currency: string;
  payeer: { document: string; name: string };
}
```

### Monedas soportadas

USD, EUR, JPY, GBP, AUD, CAD, CHF

---

## Estrategia de ramas (Gitflow)

El proyecto sigue una adaptación de Gitflow con las siguientes ramas permanentes y temporales:

```
main          ← código en producción, solo recibe merges desde staging
staging       ← entorno de pre-producción y QA
develop       ← integración continua de features

Ramas temporales (se crean desde develop y se mergean de vuelta):
  feature/*   ← nuevas funcionalidades
  task/*      ← tareas técnicas o de refactor
  bugfix/*    ← corrección de errores encontrados en develop/staging
  hotfix/*    ← correcciones urgentes que se aplican directamente sobre main
```

**Flujo estándar de trabajo:**

```
develop → feature/mi-feature → PR → develop
develop → staging → PR → main
main    ← hotfix/mi-hotfix (en caso de emergencia)
```

Todos los merges a `staging` y `main` se realizan a través de **Pull Requests** con revisión de código.

---

## Pruebas

El proyecto utiliza **Jest** (incluido en `react-scripts`) junto con **React Testing Library**.

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar un archivo específico

```bash
npm test -- --testPathPattern="src/pages/ListTransfers" --watchAll=false
```

### Ejecutar todas las pruebas sin modo watch

```bash
npm test -- --watchAll=false
```

### Cobertura de pruebas por módulo

| Módulo | Archivo de test | Casos cubiertos |
|---|---|---|
| `AuthUserContext` | `context/AuthUserContext.test.tsx` | Login, logout, persistencia en localStorage |
| `ProductContext` | `context/ProductContext.test.tsx` | saveBalance, clearBalance, datos corruptos |
| `useUserAuth` | `hooks/auth/useUserAuth.test.tsx` | Flujo de login, errores, loading |
| `useProduct` | `hooks/product/useProduct.test.ts` | setTransfer, getCurrency, getListTransfers, token 401 |
| `service-auth` | `services/auth/service-auth.test.ts` | Llamada HTTP de autenticación |
| `service-product` | `services/product/service-product.test.ts` | getBalance, setTransfer, getCurrency, getListTransfers |
| `endpoint` | `api/endpoint.test.ts` | getTransferList, validación de token, errores de red |
| `ListTransfersPage` | `pages/ListTransfers/index.test.tsx` | Renderizado, título de sección |
| `FilterTable` | `pages/ListTransfers/ui/FilterTable/index.test.tsx` | Búsqueda por texto y fecha, limpieza mutua de inputs, mensaje sin resultados |
| `TransferListTable` | `pages/ListTransfers/ui/TranSferlISTTable/index.test.tsx` | Renderizado, loading, errores, filtrado, onNoResults, recarga de página |
| `FormLogin` | `pages/Login/ui/FormLogin/index.test.tsx` | Validación de formulario, submit |
| `TransfersPage` | `pages/transfers/index.test.tsx` | Renderizado del formulario de transferencia |

### Configuración de Jest

Las siguientes entradas en `package.json` resuelven la compatibilidad con React Router v7:

```json
"jest": {
  "moduleNameMapper": {
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/dist/index.js",
    "^react-router$": "<rootDir>/node_modules/react-router/dist/development/index.js",
    "^react-router/dom$": "<rootDir>/node_modules/react-router/dist/development/dom-export.js"
  }
}
```

---

## Vistas principales

### 1. Onboarding (`/` y `/onboarding`)

Pantalla pública de bienvenida. Muestra una imagen hero a pantalla completa en el lado izquierdo y en el panel derecho el mensaje de bienvenida de Banco XYZ, una descripción institucional, un marquee animado con los productos bancarios disponibles y los íconos de redes sociales. Punto de entrada a la aplicación para usuarios no autenticados.

---

### 2. Login (`/login`)

Formulario de inicio de sesión con:

- Campo de **correo electrónico** con validación de formato en tiempo real.
- Campo de **contraseña** con mínimo 3 caracteres.
- El botón **Ingresar** permanece deshabilitado hasta que ambos campos sean válidos.
- Indicador de carga (`Loading`) durante la petición al backend.
- Mensajes de error inline si las credenciales son incorrectas.
- Link «¿Olvidó su contraseña?» y opción «Recordarme».

Tras una autenticación exitosa, el token y el objeto de usuario se guardan en `localStorage` y el usuario es redirigido a `/dashboard`.

---

### 3. Dashboard — Mis Productos (`/dashboard` y `/dashboard/balance`)

Vista principal del área autenticada. Compuesta por:

- **Header** con título «Mis Productos».
- **BalanceCarousel** — carrusel de productos o cuentas asociadas al usuario.
- **TitleBalance** — sección de título del saldo disponible.
- **BalanceCard** — tarjeta que muestra el saldo actual en la moneda de la cuenta, cargado desde el endpoint `/balance`.

---

### 4. Nueva Transferencia (`/dashboard/transfers`)

Formulario protegido para realizar transferencias. Campos:

| Campo | Tipo | Validación |
|---|---|---|
| Valor | Numérico | Mayor a 0, no puede superar el saldo disponible |
| Moneda | Selector | USD, EUR, JPY, GBP, AUD, CAD, CHF |
| Documento del destinatario | Texto (solo números) | Obligatorio |
| Programar transferencia | Checkbox opcional | Si se activa, habilita selector de fecha ≥ hoy |

- Si el checkbox «Programar transferencia» está inactivo, se usa la fecha actual.
- El botón **Transferir** se deshabilita durante la carga o si el formulario es inválido.
- Los errores y el mensaje de éxito se muestran con `react-hot-toast` y también inline bajo el formulario durante 2 segundos.
- Tras una transferencia exitosa, el formulario se limpia automáticamente.

---

### 5. Historial de Transferencias (`/dashboard/list-transfers`)

Tabla completa de movimientos del usuario con capacidad de búsqueda y filtrado en tiempo real.

**Controles de búsqueda:**

- **Campo de texto** — filtra por nombre del destinatario, valor o fecha (texto libre).
- **Selector de fecha** — filtra exactamente por fecha de transferencia. Al activar uno, el otro se limpia automáticamente.
- Mensaje «No se encontraron transferencias.» cuando ningún registro coincide con los filtros.

**Tabla de resultados — columnas:**

| Columna | Descripción |
|---|---|
| Valor | Monto de la transferencia con moneda |
| Moneda | Código de divisa |
| Fecha | Fecha de ejecución |
| Documento | Número de documento del destinatario |
| Destinatario | Nombre del destinatario |
| Status | Badge «Completada» |

Los datos se cargan automáticamente al montar el componente desde el endpoint `/transferList`. Muestra el componente `Loading` durante la carga y un mensaje de error en rojo si la petición falla (incluyendo errores de token expirado).
