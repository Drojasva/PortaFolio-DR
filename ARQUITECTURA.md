# 🏗️ Arquitectura del Sistema - SID Cecinas v2.0

> **Sistema Integrado de Gestión para Planta Industrial**  
> Stack: Next.js 15 + Node.js + Express + PostgreSQL + Prisma ORM

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura de Alto Nivel](#arquitectura-de-alto-nivel)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Módulos Principales](#módulos-principales)
6. [Base de Datos](#base-de-datos)
7. [APIs y Endpoints](#apis-y-endpoints)
8. [Flujo de Datos](#flujo-de-datos)
9. [Autenticación y Seguridad](#autenticación-y-seguridad)
10. [Despliegue](#despliegue)

---

## 🎯 Visión General

### Propósito
Sistema web centralizado para la gestión operativa de una planta industrial, permitiendo:
- Monitoreo en tiempo real de KPIs
- Gestión de incidencias y mejora continua
- Control de asistencia y eventos de seguridad
- Seguimiento de acciones y proyectos

### Arquitectura
**Patrón:** Cliente-Servidor con API RESTful  
**Tipo:** Aplicación Web Full-Stack Monolítica  
**Renderizado:** Híbrido (SSR + CSR con Next.js App Router)

---

## 🏛️ Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                         CAPA DE PRESENTACIÓN                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Next.js 15 Frontend (Port 3000)                │  │
│  │                                                          │  │
│  │  • React 19 Components                                   │  │
│  │  • Material UI v6 (MUI)                                  │  │
│  │  • Apache ECharts / Recharts                             │  │
│  │  • App Router (SSR + CSR)                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                         CAPA DE NEGOCIO                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Node.js + Express Backend (Port 3001)            │  │
│  │                                                          │  │
│  │  • API RESTful                                           │  │
│  │  • Controllers (Lógica de negocio)                       │  │
│  │  • Middlewares (Auth, CORS, Logging)                     │  │
│  │  • Winston + Morgan (Logs)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ Prisma ORM
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE DATOS                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         PostgreSQL Database (Port 5432)                  │  │
│  │                                                          │  │
│  │  • 50+ Tablas                                            │  │
│  │  • Relaciones complejas                                  │  │
│  │  • Índices optimizados                                   │  │
│  │  • Backups automáticos                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Directorios

```
mi-proyecto/
│
├── 📂 frontend/                    # Aplicación Next.js
│   ├── 📂 app/                     # App Router (Next.js 15)
│   │   ├── 📂 gestion-diaria/      # Módulos GDA
│   │   │   ├── gda3/               # GDA III Cocido
│   │   │   ├── gda3-crudo/         # GDA III Crudo
│   │   │   ├── gda3-despacho/      # GDA III Despacho
│   │   │   ├── gda3-mpc/           # GDA III MPC
│   │   │   ├── gda4/               # GDA IV
│   │   │   ├── gdav/               # GDA V Gerencial
│   │   │   ├── vemag/              # Dashboard Vemag
│   │   │   └── formularios/        # Formularios de entrada
│   │   │
│   │   ├── 📂 portales/            # Portales de gestión
│   │   │   ├── acciones/           # Portal de Acciones
│   │   │   ├── 5w/                 # Análisis 5W
│   │   │   ├── mini-proyectos/     # Mini Proyectos
│   │   │   └── prioridades/        # Indicador de Prioridades
│   │   │
│   │   ├── 📂 admin/               # Administración
│   │   │   └── session-logs/       # Logs de sesiones
│   │   │
│   │   ├── 📂 golpes/              # Módulo de Golpes
│   │   │   └── dashboard/          # Dashboard de equipos
│   │   │
│   │   ├── hornos-vemag/           # Gestión de Hornos
│   │   ├── produccion-diaria/      # Producción diaria
│   │   ├── ver-sso/                # Reportes SSO
│   │   ├── login/                  # Autenticación
│   │   ├── layout.jsx              # Layout principal
│   │   └── page.jsx                # Página de inicio
│   │
│   ├── 📂 lib/                     # Utilidades
│   │   ├── config.jsx              # Configuración (API_URL)
│   │   └── utils.js                # Funciones auxiliares
│   │
│   ├── 📂 public/                  # Archivos estáticos
│   │   └── assets/                 # Imágenes, iconos
│   │
│   ├── .env.local                  # Variables de entorno (dev)
│   ├── .env.production             # Variables de entorno (prod)
│   ├── next.config.mjs             # Configuración Next.js
│   └── package.json                # Dependencias frontend
│
├── 📂 backend/                     # Servidor Node.js + Express
│   ├── 📂 src/
│   │   ├── 📂 controllers/         # Lógica de negocio
│   │   │   ├── analisis-5w.controller.js
│   │   │   ├── mini-proyectos.controller.js
│   │   │   ├── usuarios.controller.js
│   │   │   ├── gda3.controller.js
│   │   │   ├── gdav.controller.js
│   │   │   ├── despacho.controller.js
│   │   │   ├── oee.controller.js
│   │   │   ├── vemag.controller.js
│   │   │   └── ... (30+ controllers)
│   │   │
│   │   ├── 📂 routes/              # Definición de rutas
│   │   │   ├── analisis-5w.routes.js
│   │   │   ├── mini-proyectos.routes.js
│   │   │   ├── usuarios.routes.js
│   │   │   ├── tareas.api.js
│   │   │   ├── gda3.routes.js
│   │   │   └── ... (25+ route files)
│   │   │
│   │   ├── 📂 middlewares/         # Middlewares
│   │   │   ├── auth.middleware.js  # JWT Authentication
│   │   │   ├── cors.middleware.js  # CORS Config
│   │   │   └── logger.middleware.js # Winston Logger
│   │   │
│   │   ├── 📂 config/              # Configuración
│   │   │   ├── prisma.js           # Cliente Prisma
│   │   │   ├── logger.js           # Winston Config
│   │   │   └── database.js         # DB Config
│   │   │
│   │   └── 📂 utils/               # Utilidades
│   │       └── helpers.js
│   │
│   ├── 📂 prisma/                  # Prisma ORM
│   │   ├── schema.prisma           # Esquema de BD (50+ modelos)
│   │   └── migrations/             # Migraciones
│   │
│   ├── 📂 logs/                    # Logs de aplicación
│   │   ├── combined.log
│   │   ├── error.log
│   │   └── access.log
│   │
│   ├── .env                        # Variables de entorno
│   ├── server.js                   # Punto de entrada
│   └── package.json                # Dependencias backend
│
├── 📂 ops/                         # Scripts operacionales
│   ├── MENU.bat                    # Menú interactivo
│   ├── DEV.bat                     # Modo desarrollo
│   ├── start-frontend-dev.js       # Script dev frontend
│   └── inspect_excel.js            # Utilidades
│
├── 📂 backups/                     # Backups de BD
│   └── daily/                      # Backups diarios
│
├── 📂 docs/                        # Documentación
│   └── ... (manuales, guías)
│
├── 📂 datosx/                      # Datos externos
│   └── ... (archivos Excel, CSVs)
│
├── START.bat                       # Iniciar producción
├── STOP.bat                        # Detener servicios
├── STATUS.bat                      # Ver estado
├── ecosystem.config.cjs            # Configuración PM2
├── docker-compose.yml              # Docker config
├── .gitignore                      # Git ignore
├── README.md                       # Documentación principal
├── ARQUITECTURA.md                 # Este archivo
└── GUIA_USO_PRODUCCION.md         # Guía de producción
```

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 15.5.9 | Framework React con SSR/SSG |
| **React** | 19.x | Librería UI |
| **Material UI (MUI)** | 6.x | Componentes UI |
| **Apache ECharts** | 5.x | Gráficos complejos |
| **Recharts** | 2.x | Gráficos simples |
| **Axios** | 1.x | Cliente HTTP |
| **date-fns** | 3.x | Manejo de fechas |

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Node.js** | 20.x LTS | Runtime JavaScript |
| **Express** | 4.x | Framework web |
| **Prisma ORM** | 6.x | ORM para PostgreSQL |
| **bcrypt** | 5.x | Hash de contraseñas |
| **jsonwebtoken** | 9.x | Autenticación JWT |
| **Winston** | 3.x | Logging |
| **Morgan** | 1.x | HTTP request logger |
| **CORS** | 2.x | Cross-Origin Resource Sharing |

### Base de Datos
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **PostgreSQL** | 16.x | Base de datos relacional |

### DevOps & Deployment
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **PM2** | 5.x | Process Manager |
| **Git** | 2.x | Control de versiones |
| **Docker** | 24.x | Containerización (opcional) |

---

## 🧩 Módulos Principales

### 1. **Gestión Diaria (GDA)**
**Propósito:** Monitoreo diario de KPIs por área

#### GDA III - Cocido
- **Ruta:** `/gestion-diaria/gda3`
- **Componentes:**
  - Asistencia
  - Indicadores (Cumplimiento, OEE, Fill Rate)
  - Seguridad
  - Calidad
  - Top 3 Desviaciones
  - Plan de Acción
- **API:** `/api/gda3/*`

#### GDA III - Crudo
- **Ruta:** `/gestion-diaria/gda3-crudo`
- **Indicadores:** Cumplimiento, Tiempo Perdido, Merma, Decomiso, OEE, Disponibilidad, Rendimiento
- **API:** `/api/gda3-crudo/*`

#### GDA III - Despacho
- **Ruta:** `/gestion-diaria/gda3-despacho`
- **Indicadores:** Nivel Servicio, Diferencia Sucursales, Pallets Mal ID, etc.
- **API:** `/api/gda3-despacho/*`

#### GDA V - Gerencial
- **Ruta:** `/gestion-diaria/gdav`
- **Vista:** Consolidado de todas las áreas
- **API:** `/api/gdav/*`

### 2. **Portal de Acciones**
**Propósito:** Gestión tipo Kanban de tareas y acciones

- **Ruta:** `/portales/acciones`
- **Funcionalidades:**
  - Crear/Editar/Cerrar tareas
  - Filtros por área, bucket, estado
  - Métricas OTIF (On-Time In-Full)
  - Notificaciones de tareas atrasadas
  - Sincronización con módulo 5W
- **API:** `/api/tareas/*`
- **Tabla BD:** `sid_tareas`, `sid_tarea_notas`

### 3. **Análisis 5W (5 Whys)**
**Propósito:** Análisis de causa raíz de problemas

- **Ruta:** `/portales/5w`
- **Pasos:**
  1. Definición del Problema
  2. Análisis de Causas (9 niveles × 7 variantes)
  3. Causa Raíz y Categorización 4M
  4. Contramedidas (Acciones)
  5. Estandarización (Expansión)
- **Características:**
  - Generación automática de acciones en Portal de Tareas
  - Sincronización bidireccional con `sid_tareas`
  - Impresión en PDF
- **API:** `/api/analisis-5w/*`
- **Tablas BD:** `analisis_5w`, `analisis_5w_acciones`, `analisis_5w_expansion`

### 4. **Mini Proyectos**
**Propósito:** Gestión de proyectos de mejora continua

- **Ruta:** `/portales/mini-proyectos`
- **Fases:**
  - Definición del Problema
  - Análisis de Causa Raíz
  - Plan de Acción
  - Resultados y ROI
- **Características:**
  - Cálculo de ahorros generados
  - Ranking de colaboradores
  - Evidencias antes/después
- **API:** `/api/mini-proyectos/*`
- **Tablas BD:** `mini_proyectos`, `mini_proyecto_acciones`

### 5. **Hornos Vemag**
**Propósito:** Monitoreo de ciclos de cocción

- **Ruta:** `/hornos-vemag`
- **Funcionalidades:**
  - Registro de 8 hornos
  - Hasta 10 pasos por receta
  - Comparación con metas (targets)
  - Cálculo de cumplimiento por paso
  - Dashboard de tendencias
- **API:** `/api/vemag/*`
- **Tablas BD:** `vemag_production`, `vemag_targets`

### 6. **Golpes y Equipos Rodantes**
**Propósito:** Registro de incidentes con grúas/transpaletas

- **Ruta:** `/golpes`
- **Funcionalidades:**
  - Formulario de reporte
  - Captura de imágenes (Base64)
  - Dashboard con KPIs
  - Filtros por fecha, área, daños
- **API:** `/api/golpes-equipos/*`
- **Tabla BD:** `golpes_equipos`

### 7. **SSO (Seguridad y Salud Ocupacional)**
**Propósito:** Reportes de seguridad

- **Ruta:** `/ver-sso`
- **Tipos de Reporte:**
  - Eventos de seguridad
  - Auditorías SHE
  - Auditorías de Salud
- **API:** `/api/sso/*`
- **Tablas BD:** `sso_reportes`, `sso_eventos`, `sso_auditoria_she`, `sso_auditoria_salud`

---

## 🗄️ Base de Datos

### Esquema General
**Total de Tablas:** 50+  
**ORM:** Prisma  
**Archivo:** `backend/prisma/schema.prisma`

### Tablas Principales

#### Usuarios y Autenticación
```prisma
model usuarios {
  id              Int      @id @default(autoincrement())
  username        String   @unique
  email           String   @unique
  password_hash   String
  nombre_completo String?
  rol             String?  @default("usuario")
  activo          Int?     @default(1)
  created_at      DateTime @default(now())
  updated_at      DateTime @default(now())
}

model session_logs {
  id               Int      @id @default(autoincrement())
  user_id          Int
  username         String
  login_time       DateTime @default(now())
  logout_time      String?
  ip_address       String?
  user_agent       String?
  session_duration Int?
  status           String?  @default("active")
}
```

#### Portal de Acciones
```prisma
model sid_tareas {
  id              String    @id
  title           String
  description     String?
  bucket          String?
  progress        Int       @default(0)  // 0, 50, 100
  priority        String?
  assignee        String?
  email           String?
  area            String?
  tags            String?
  created_at      DateTime  @default(now())
  start_date      String?
  due_date        String?
  completed_at    DateTime?
  // ... más campos
}
```

#### Análisis 5W
```prisma
model analisis_5w {
  id                     Int       @id @default(autoincrement())
  titulo                 String
  problema_descripcion   String?
  
  // 9 niveles × 7 variantes = 63 campos por_que_X_vX
  por_que_1_v1           String?
  por_que_1_v2           String?
  // ... hasta por_que_9_v7
  
  causa_raiz             String?
  categoria_4m           String?
  estado                 String?   @default("abierto")
  
  acciones               analisis_5w_acciones[]
  expansion              analisis_5w_expansion[]
}

model analisis_5w_acciones {
  id                Int         @id @default(autoincrement())
  analisis_id       Int
  paso              Int         // 4 o 5
  tipo_accion       String?
  descripcion       String
  responsable       String?
  ecrs              String?
  fecha_inicio      String?
  fecha_estimada    String?
  fecha_cierre      String?
  estado            String?     @default("cerrada")
  comentario_cierre String?
}
```

#### Indicadores
```prisma
model gda3_indicadores {
  date         String   @id
  cumplimiento Float?
  oee          Float?
  fill_rate    Float?
  updated_at   DateTime? @default(now())
}

model indicador_produccion {
  id                 Int    @id @default(autoincrement())
  fecha              String @unique
  cumplimiento       Float  @default(0)
  oee                Float  @default(0)
  disponibilidad     Float  @default(0)
  // ... campos SOP
}
```

### Relaciones Clave

```
usuarios (1) ──────< (N) session_logs
analisis_5w (1) ───< (N) analisis_5w_acciones
analisis_5w (1) ───< (N) analisis_5w_expansion
mini_proyectos (1) ─< (N) mini_proyecto_acciones
sid_tareas (1) ────< (N) sid_tarea_notas
sso_reportes (1) ──< (N) sso_eventos
sso_reportes (1) ──< (N) sso_auditoria_she
```

### Índices Importantes
```prisma
@@index([fecha])           // Búsquedas por fecha
@@index([area])            // Filtros por área
@@index([username])        // Login rápido
@@index([email])           // Búsqueda de usuarios
@@index([analisis_id])     // Joins eficientes
@@index([due_date])        // Tareas por vencimiento
```

---

## 🌐 APIs y Endpoints

### Estructura de URL
```
http://localhost:3001/api/{módulo}/{recurso}/{acción}
```

### Endpoints Principales

#### Autenticación (`/api/auth`)
```http
POST   /api/auth/register          # Registrar usuario
POST   /api/auth/login             # Iniciar sesión
POST   /api/auth/logout            # Cerrar sesión
GET    /api/auth/me                # Usuario actual (protegido)
GET    /api/auth/list              # Lista usuarios básica
GET    /api/auth/users             # Lista completa (admin)
```

#### Tareas (`/api/tareas`)
```http
GET    /api/tareas                 # Listar tareas
POST   /api/tareas                 # Crear tarea
PATCH  /api/tareas/:id             # Actualizar tarea (con sync 5W)
GET    /api/tareas/:id             # Obtener tarea
POST   /api/tareas/:id/close       # Cerrar tarea
GET    /api/tareas/mias            # Mis tareas
GET    /api/tareas/metrics         # Métricas y dashboard
GET    /api/tareas/notificaciones  # Tareas atrasadas
GET    /api/tareas/ranking         # Ranking por completadas
GET    /api/tareas/:id/notas       # Notas de tarea
POST   /api/tareas/:id/notas       # Agregar nota
```

#### Análisis 5W (`/api/analisis-5w`)
```http
GET    /api/analisis-5w            # Listar análisis
POST   /api/analisis-5w            # Crear análisis
GET    /api/analisis-5w/:id        # Obtener análisis
PATCH  /api/analisis-5w/:id        # Actualizar análisis
DELETE /api/analisis-5w/:id        # Eliminar análisis

GET    /api/analisis-5w/:id/acciones           # Acciones del análisis
POST   /api/analisis-5w/:id/acciones           # Crear acción (sync con tareas)
PATCH  /api/analisis-5w/:id/acciones/:accionId # Actualizar acción (sync)
DELETE /api/analisis-5w/:id/acciones/:accionId # Eliminar acción (sync)

POST   /api/analisis-5w/:id/expansion          # Actualizar expansión
```

#### Mini Proyectos (`/api/mini-proyectos`)
```http
GET    /api/mini-proyectos         # Listar proyectos
POST   /api/mini-proyectos         # Crear proyecto
GET    /api/mini-proyectos/:id     # Obtener proyecto
PATCH  /api/mini-proyectos/:id     # Actualizar proyecto
DELETE /api/mini-proyectos/:id     # Eliminar proyecto
GET    /api/mini-proyectos/ranking # Ranking de colaboradores
```

#### GDA III (`/api/gda3`)
```http
GET    /api/gda3/indicadores       # Indicadores Cocido
POST   /api/gda3/indicadores       # Guardar indicadores
GET    /api/gda3/asistencia        # Asistencia
POST   /api/gda3/asistencia        # Registrar asistencia
GET    /api/gda3/temas             # Temas de la semana
POST   /api/gda3/temas             # Crear tema
```

#### Vemag (`/api/vemag`)
```http
GET    /api/vemag/dashboard        # Dashboard con métricas
GET    /api/vemag/production       # Datos de producción
POST   /api/vemag/production       # Registrar producción
GET    /api/vemag/targets          # Metas por receta
POST   /api/vemag/targets          # Actualizar metas
```

#### Golpes (`/api/golpes-equipos`)
```http
GET    /api/golpes-equipos         # Listar reportes
POST   /api/golpes-equipos         # Crear reporte
GET    /api/golpes-equipos/dashboard # Dashboard con KPIs
```

### Respuestas Estándar

#### Éxito
```json
{
  "ok": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

#### Error
```json
{
  "ok": false,
  "error": "Mensaje de error descriptivo"
}
```

---

## 🔄 Flujo de Datos

### 1. Flujo de Autenticación

```
Usuario ingresa credenciales
         ↓
Frontend → POST /api/auth/login
         ↓
Backend valida con bcrypt
         ↓
Genera JWT + Registra en session_logs
         ↓
Retorna token + cookie HTTP-only
         ↓
Frontend guarda en localStorage + cookie
         ↓
Requests subsecuentes incluyen token en header
```

### 2. Flujo de Creación de Acción 5W

```
Usuario completa Step 4 del 5W
         ↓
Frontend → POST /api/analisis-5w/:id/acciones
         ↓
Backend crea registro en analisis_5w_acciones
         ↓
Backend TAMBIÉN crea en sid_tareas con tag "5W-ACCION-{id}"
         ↓
Retorna éxito
         ↓
Frontend muestra acción en tabla
```

### 3. Flujo de Sincronización Bidireccional (5W ↔ Tareas)

#### Actualización desde Portal de Acciones
```
Usuario cierra tarea en /portales/acciones
         ↓
Frontend → PATCH /api/tareas/:id { progress: 100 }
         ↓
Backend actualiza sid_tareas
         ↓
Backend detecta tag "5W-ACCION-16"
         ↓
Backend extrae ID de acción (16)
         ↓
Backend mapea campos:
  - progress: 100 → estado: "cerrada"
  - completed_at → fecha_cierre
         ↓
Backend actualiza analisis_5w_acciones
         ↓
Retorna éxito
         ↓
Acción aparece cerrada en AMBOS módulos ✅
```

#### Actualización desde Módulo 5W
```
Usuario edita acción en /portales/5w/:id
         ↓
Frontend → PATCH /api/analisis-5w/:id/acciones/:accionId
         ↓
Backend actualiza analisis_5w_acciones
         ↓
Backend busca tarea con tag "5W-ACCION-{accionId}"
         ↓
Backend mapea campos:
  - estado: "cerrada" → progress: 100
  - fecha_cierre → completed_at
         ↓
Backend actualiza sid_tareas
         ↓
Retorna éxito
         ↓
Cambios reflejados en AMBOS módulos ✅
```

### 4. Flujo de Carga de Datos en Dashboard

```
Usuario accede a /gestion-diaria/gda3
         ↓
Next.js renderiza página (SSR)
         ↓
useEffect ejecuta en cliente
         ↓
Frontend → GET /api/gda3/indicadores?fecha=2026-01-13
         ↓
Backend consulta PostgreSQL vía Prisma
         ↓
Retorna JSON con datos
         ↓
Frontend actualiza estado React
         ↓
Componentes MUI + ECharts renderizan visualización
```

---

## 🔐 Autenticación y Seguridad

### Estrategia de Autenticación
**Método:** JWT (JSON Web Tokens)  
**Almacenamiento:** Cookie HTTP-only + localStorage (dual)

### Flujo de Seguridad

```javascript
// 1. Login
POST /api/auth/login
  ↓
bcrypt.compareSync(password, hash)
  ↓
jwt.sign({ id, username, email, rol }, SECRET, { expiresIn: '24h' })
  ↓
res.cookie('auth_token', token, { httpOnly: true, sameSite: 'lax' })
```

```javascript
// 2. Middleware de Autenticación
export function authenticateToken(req, res, next) {
  const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}
```

```javascript
// 3. Middleware de Autorización (Admin)
export function requireAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Requiere rol de administrador' });
  }
  next();
}
```

### Rutas Protegidas

```javascript
// Público
router.post('/login', usuariosController.login);
router.post('/register', usuariosController.register);

// Requiere autenticación
router.get('/me', authenticateToken, usuariosController.getCurrentUser);

// Requiere admin
router.get('/users', authenticateToken, requireAdmin, usuariosController.listUsers);
```

### Seguridad de Contraseñas

```javascript
// Hash con bcrypt (10 rounds)
const password_hash = bcrypt.hashSync(password, 10);

// Verificación
const isValid = bcrypt.compareSync(inputPassword, storedHash);
```

### CORS Configuration

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.132.109:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Logging de Sesiones

```javascript
// Registro en session_logs
await prisma.session_logs.create({
  data: {
    user_id: user.id,
    username: user.username,
    ip_address: req.ip,
    user_agent: req.headers['user-agent'],
    status: 'active'
  }
});

// Actualización al logout
await prisma.session_logs.update({
  where: { id: sessionLogId },
  data: {
    logout_time: new Date().toISOString(),
    session_duration: durationInSeconds,
    status: 'ended'
  }
});
```

---

## 🚀 Despliegue

### Arquitectura de Despliegue

```
┌─────────────────────────────────────────┐
│         Windows Server / PC             │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │          PM2 Process Manager      │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  sid-backend (cluster)      │ │ │
│  │  │  Port: 3001                 │ │ │
│  │  │  Instances: 1               │ │ │
│  │  └─────────────────────────────┘ │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  sid-frontend (cluster)     │ │ │
│  │  │  Port: 3000                 │ │ │
│  │  │  Instances: 1               │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │      PostgreSQL 16.x              │ │
│  │      Port: 5432                   │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Scripts de Despliegue

#### START.bat (Producción)
```batch
1. Verifica PostgreSQL
2. Verifica/Instala PM2
3. Inicia Backend con PM2
4. Construye Frontend (npm run build)
5. Inicia Frontend con PM2
6. Muestra URLs de acceso
```

#### STOP.bat
```batch
1. Detiene sid-backend
2. Detiene sid-frontend
3. Muestra confirmación
```

#### STATUS.bat
```batch
1. Muestra estado de PM2
2. Muestra logs recientes
3. Muestra uso de recursos
```

### Configuración PM2 (ecosystem.config.cjs)

```javascript
module.exports = {
  apps: [
    {
      name: 'sid-backend',
      script: './backend/server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      name: 'sid-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './frontend',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

### Variables de Entorno

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sid_db"
JWT_SECRET="tu-secret-key-super-segura"
PORT=3001
NODE_ENV=production
```

#### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=http://192.168.132.109:3001
```

### Acceso en Red Local

```
Local (misma PC):
  Frontend:  http://localhost:3000
  Backend:   http://localhost:3001

Red Local (otros dispositivos):
  Frontend:  http://192.168.132.109:3000
  Backend:   http://192.168.132.109:3001
```

### Backups Automáticos

```bash
# Backup diario de PostgreSQL
pg_dump -U postgres sid_db > backups/daily/sid_db_$(date +%Y%m%d).sql
```

---

## 📊 Métricas y Monitoreo

### Logging con Winston

```javascript
// backend/src/config/logger.js
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});
```

### HTTP Request Logging (Morgan)

```javascript
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
```

### Monitoreo PM2

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs

# Ver métricas
pm2 monit

# Ver dashboard web
pm2 web
```

---

## 🔧 Mantenimiento

### Comandos Útiles

```bash
# Reiniciar servicios
pm2 restart all

# Ver logs
pm2 logs sid-backend --lines 100
pm2 logs sid-frontend --lines 100

# Limpiar logs
pm2 flush

# Actualizar código
git pull origin backups/sid/respaldo-001
npm install  # Si hay nuevas dependencias
npm run build  # Frontend
pm2 restart all
```

### Migraciones de Base de Datos

```bash
# Crear migración
cd backend
npx prisma migrate dev --name nombre_migracion

# Aplicar en producción
npx prisma migrate deploy

# Regenerar cliente Prisma
npx prisma generate
```

---

## 📝 Convenciones de Código

### Nomenclatura

- **Archivos:** `kebab-case.js` (ej: `analisis-5w.controller.js`)
- **Componentes React:** `PascalCase.jsx` (ej: `Step4Countermeasures.jsx`)
- **Variables:** `camelCase` (ej: `userName`, `apiUrl`)
- **Constantes:** `UPPER_SNAKE_CASE` (ej: `API_URL`, `JWT_SECRET`)
- **Tablas BD:** `snake_case` (ej: `analisis_5w_acciones`)

### Estructura de Controladores

```javascript
// backend/src/controllers/ejemplo.controller.js
import prisma from '../config/prisma.js';

/**
 * Listar recursos
 */
export async function listar(req, res) {
  try {
    const { filtro } = req.query;
    const data = await prisma.tabla.findMany({ where: { filtro } });
    res.json({ ok: true, data });
  } catch (error) {
    console.error('[MODULO] Error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

/**
 * Crear recurso
 */
export async function crear(req, res) {
  try {
    const data = req.body;
    const result = await prisma.tabla.create({ data });
    res.status(201).json({ ok: true, id: result.id });
  } catch (error) {
    console.error('[MODULO] Error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
```

### Estructura de Componentes React

```jsx
// frontend/app/modulo/components/Componente.jsx
'use client';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

export default function Componente({ prop1, prop2 }) {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Lógica
  };

  return (
    <Box>
      {/* JSX */}
    </Box>
  );
}
```

---

## 🎯 Próximas Mejoras Sugeridas

### Funcionalidades
- [ ] Chat interno en tiempo real (Socket.io)
- [ ] Notificaciones push
- [ ] Dashboard ejecutivo con BI
- [ ] Exportación masiva a Excel/PDF
- [ ] Módulo de reportes personalizados
- [ ] Integración con ERP/SAP

### Técnicas
- [ ] Migrar a TypeScript
- [ ] Implementar tests (Jest + React Testing Library)
- [ ] Agregar Redis para caché
- [ ] Implementar GraphQL (opcional)
- [ ] Containerizar con Docker completo
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo con Grafana + Prometheus

### Seguridad
- [ ] Rate limiting
- [ ] Encriptación de datos sensibles
- [ ] Auditoría completa de acciones
- [ ] 2FA (autenticación de dos factores)
- [ ] Políticas de contraseñas más estrictas

---

## 📞 Contacto y Soporte

**Desarrollador:** Diego Rojas  
**Repositorio:** https://github.com/Drojasva/mi-proyecto  
**Rama Principal:** `backups/sid/respaldo-001`

---

**Última actualización:** 2026-01-13  
**Versión del Sistema:** 2.0  
**Versión de Arquitectura:** 1.0
