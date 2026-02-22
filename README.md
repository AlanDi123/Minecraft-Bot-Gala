# 🤖 GALA AI V6.2 "OMEGA" - Bot Autónomo para Minecraft

[![CI/CD](https://github.com/AlanDi123/Minecraft-Bot-Gala/actions/workflows/ci.yml/badge.svg)](https://github.com/AlanDi123/Minecraft-Bot-Gala/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Minecraft](https://img.shields.io/badge/minecraft-1.20.1-brightgreen.svg)](https://www.minecraft.net/)

> **Bot autónomo completista capaz de pasarse Minecraft 100% solo**

---

## 📋 Índice

- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Configuración](#-configuración)
- [Comandos](#-comandos)
- [Arquitectura](#-arquitectura)
- [Desarrollo](#-desarrollo)
- [Docker](#-docker)
- [Troubleshooting](#-troubleshooting)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎯 Completista
- ✅ Recolección automática de recursos
- ✅ Crafteo de 50+ recetas
- ✅ Construcción de portal del Nether
- ✅ Navegación Nether/End
- ✅ Combate contra Ender Dragon
- ✅ Búsqueda de Elytra

### 🧠 Inteligente
- ✅ Pathfinding con cache de rutas
- ✅ Sistema de combate automático
- ✅ Evasión de peligros
- ✅ Gestión de herramientas con durabilidad
- ✅ Alimentación automática
- ✅ Sueño nocturno automático

### 🏗️ Arquitectura
- ✅ Código modular (17 módulos)
- ✅ Logger estructurado JSON
- ✅ Estado persistente con backup
- ✅ Wrappers para todos los plugins
- ✅ FSM para comportamientos
- ✅ Tests automatizados

### 🛡️ Producción
- ✅ CI/CD con GitHub Actions
- ✅ Docker container
- ✅ Health checks
- ✅ Métricas y telemetría
- ✅ Recovery automático

---

## 📦 Requisitos

### Obligatorios
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Minecraft Server** 1.20.1 (Java Edition)

### Opcionales
- **Docker** >= 20.10.0 (para containerización)
- **Git** (para desarrollo)

### Recursos Recomendados
- **RAM:** 12GB para el bot
- **CPU:** 2+ cores
- **Disco:** 1GB libre

---

## 🚀 Instalación

### Opción 1: Desde GitHub (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/AlanDi123/Minecraft-Bot-Gala.git
cd Minecraft-Bot-Gala

# Instalar dependencias
npm install

# Verificar instalación
npm run lint:check
```

### Opción 2: Docker

```bash
# Pull imagen
docker pull ghcr.io/alandi123/minecraft-bot-gala:latest

# O construir localmente
docker build -t gala-bot:v6.2 .
```

---

## 📖 Uso

### Inicio Rápido

```bash
# Configurar variables de entorno (opcional)
export BOT_NAME="Gala_Bot"
export MC_HOST="localhost"
export MC_PORT="51419"

# Iniciar bot
npm start
```

### Comandos Disponibles

```bash
# Producción
npm start                    # Iniciar bot
npm run start-debug          # Iniciar con debug (GC expuesto)

# Legacy
npm run start-legacy         # Usar versión monolítica v6.0

# Desarrollo
npm run lint                 # Lint con auto-fix
npm run lint:check           # Solo verificar lint
npm run format               # Formatear con Prettier
npm test                     # Ejecutar tests
npm run test:coverage        # Tests con coverage

# Docker
npm run docker:build         # Construir imagen
npm run docker:run           # Ejecutar container
npm run docker:stop          # Detener container

# Mantenimiento
npm run audit                # Generar reporte de seguridad
npm run clean                # Limpiar archivos temporales
```

---

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `BOT_NAME` | Nombre del bot | `Gala_Bot` |
| `MC_HOST` | Host del servidor | `localhost` |
| `MC_PORT` | Puerto del servidor | `51419` |
| `MC_VERSION` | Versión de Minecraft | `1.20.1` |
| `MC_AUTH` | Autenticación | `offline` |
| `LOG_LEVEL` | Nivel de log | `info` |

### Archivo .env (Opcional)

```bash
# .env
BOT_NAME=Gala_Bot
MC_HOST=localhost
MC_PORT=51419
MC_VERSION=1.20.1
MC_AUTH=offline
LOG_LEVEL=info
```

### Configuración Avanzada

Editar `src/config/index.js`:

```javascript
export const CONFIG = {
    server: {
        host: 'localhost',
        port: 51419,
        // ... más opciones
    },
    survival: {
        healthMin: 14,
        foodMin: 14,
        // ... más opciones
    }
    // ... más configuraciones
};
```

---

## 🎮 Comandos en Juego

El bot responde a comandos en el chat:

| Comando | Descripción |
|---------|-------------|
| `!help` | Muestra ayuda |
| `!status` | Estado actual del bot |
| `!inventory` | Inventario resumido |
| `!location` | Posición actual |
| `!stop` | Detener bot |
| `!resume` | Reanudar bot |

---

## 🏛️ Arquitectura

### Estructura del Proyecto

```
src/
├── index.js                    # Bootstrap principal
├── config/
│   └── index.js                # Configuración centralizada
├── connect/
│   └── createBot.js            # Creación y reconexión
├── plugins/
│   ├── pathfinder.js           # Wrapper pathfinding
│   ├── pvp.js                  # Wrapper combate
│   ├── collectblock.js         # Wrapper minería
│   └── autoEat.js              # Wrapper alimentación
├── behaviors/
│   ├── fsm.js                  # FSM completa
│   └── tasks/
│       ├── navigate.js         # Tareas navegación
│       ├── mine.js             # Tareas minería
│       └── combat.js           # Tareas combate
└── utils/
    ├── logger.js               # Logger Pino JSON
    └── state-manager.js        # Estado persistente
```

### Flujo de Ejecución

```
1. src/index.js bootstrap
2. Crea bot con createBot()
3. Inicializa plugins (pathfinder, pvp, etc.)
4. Configura eventos (health, food, death)
5. Inicia FSM con comportamientos
6. Loop principal (update cada 100ms)
7. Auto-guardado estado (cada 5s)
```

---

## 👨‍💻 Desarrollo

### Setup de Desarrollo

```bash
# Clonar repo
git clone https://github.com/AlanDi123/Minecraft-Bot-Gala.git
cd Minecraft-Bot-Gala

# Instalar dependencias
npm install

# Inicializar husky (pre-commit hooks)
npm run prepare
```

### Crear Nueva Feature

```bash
# Crear rama
git checkout -b feature/my-feature

# Hacer cambios...

# Testear
npm run lint
npm test

# Commit (husky ejecuta lint-staged automáticamente)
git add .
git commit -m "feat: añadir mi feature"

# Push
git push origin feature/my-feature
```

### Convenciones de Código

- **ESLint:** Airbnb Base + custom rules
- **Prettier:** 100 chars, single quote
- **Commits:** Conventional Commits
- **Ramas:** `feature/*`, `fix/*`, `improvement/*`

---

## 🐳 Docker

### Construir Imagen

```bash
docker build -t gala-bot:v6.2 .
```

### Ejecutar Container

```bash
docker run -d \
  --name gala-bot \
  -e BOT_NAME="Gala_Bot" \
  -e MC_HOST="localhost" \
  -e MC_PORT="51419" \
  -e LOG_LEVEL="info" \
  -v $(pwd)/data:/app/data \
  gala-bot:v6.2
```

### Ver Logs

```bash
docker logs -f gala-bot
```

### Health Check

```bash
docker inspect --format='{{.State.Health.Status}}' gala-bot
```

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Timeout de conexión"
- Verificar servidor está corriendo
- Verificar puerto correcto
- Verificar firewall

#### Error: "Cannot read properties of null"
- Verificar versión de Minecraft (1.20.1)
- Verificar autenticación (offline/online)

#### Bot no craftea
- Verificar tiene mesa de crafteo cerca
- Verificar tiene materiales suficientes
- Checkear logs con `LOG_LEVEL=debug`

### Ver Logs Detallados

```bash
# Terminal
export LOG_LEVEL=debug
npm start

# O ver archivo de logs
tail -f gala_v6_logs.txt
```

### Resetear Estado

```bash
# Limpiar archivos de estado
npm run clean

# O manual
rm gala_state_v6.json gala_knowledge_v6.json
```

---

## 📊 Métricas y Monitoreo

### Telemetría

El bot imprime dashboard cada 15s:
- Tiempo de sesión
- Posición actual
- Salud y comida
- Enemigos derrotados
- Bloques minados
- Cache pathfinding hit rate

### Logs

- **Archivo:** `gala_v6_logs.txt`
- **Formato:** JSON (Pino)
- **Niveles:** debug, info, warn, error, fatal

### Estado

- **Archivo:** `gala_state_v6.json`
- **Backup:** `gala_state_v6_backup.json`
- **Auto-guardado:** Cada 5 segundos

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

---

## 🙏 Agradecimientos

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - Framework principal
- [PrismarineJS](https://github.com/PrismarineJS) - Plugins y herramientas
- [Pino](https://github.com/pinojs/pino) - Logger de alto rendimiento

---

## 📞 Soporte

- **Issues:** https://github.com/AlanDi123/Minecraft-Bot-Gala/issues
- **Discussions:** https://github.com/AlanDi123/Minecraft-Bot-Gala/discussions
- **Email:** (tu-email@ejemplo.com)

---

## 🗺️ Roadmap

### v6.2 (Actual)
- ✅ Arquitectura modular
- ✅ Tests automatizados
- ✅ CI/CD pipeline
- ✅ Docker container

### v6.3 (Próximo)
- [ ] TypeScript migration
- [ ] WebSocket API
- [ ] Dashboard web
- [ ] Multi-bot support

### v7.0 (Futuro)
- [ ] Plugin system
- [ ] Marketplace de behaviors
- [ ] Cloud deployment
- [ ] ML para decisiones

---

**Hecho con ❤️ por Gala AI Development Team**
