# Changelog

Todos los cambios notables en GALA AI Bot se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [6.1.0] - 2026-02-22

### 🎉 Added

- **Arquitectura Modular** - Separación completa en módulos independientes
- **Logger Estructurado** - Integración de Pino para logs JSON
- **State Manager** - Gestión de estado persistente con auto-guardado
- **Plugin Wrappers** - Wrappers robustos para:
  - mineflayer-pathfinder (con cache de rutas)
  - mineflayer-pvp (con combate automático)
  - mineflayer-collectblock (con minería inteligente)
  - mineflayer-auto-eat (con alimentación automática)
- **Configuración Centralizada** - Todo el config en un solo lugar
- **Sistema de Reconexión** - Backoff exponencial con reintentos

### 🔧 Changed

- **Entry Point** - Ahora `src/index.js` en lugar de `gala_ai_v6.js`
- **Logging** - De console.log a logs JSON estructurados
- **Estado** - De guardado manual a auto-guardado cada 5s
- **Plugins** - De uso directo a wrappers con promesas y timeouts

### 📦 Deprecated

- `gala_ai_v6.js` - Mantenido como legacy, usar `src/index.js`

### 🐛 Fixed

- Manejo de errores mejorado en todos los módulos
- Timeout de navegación configurable
- Limpieza de cache de pathfinding

### 🔒 Security

- Audit completo en `audit-output/`
- 5 vulnerabilidades HIGH identificadas (dependencias transitivas)
- Recomendaciones en `audit-output/summary.md`

---

## [6.0.0] - 2026-02-21

### 🎉 Added

- Bot autónomo completista
- Sistema de crafteo con 50+ recetas
- Pathfinding con cache
- Combate avanzado
- Navegación Nether/End
- Portal del Nether automático
- Combate contra Ender Dragon
- Granjas automáticas
- Trading con villagers
- Encantamientos y brewing
- Persistencia de estado

### 📦 Changed

- Nombre: Gala_Bot
- RAM: 12GB asignados
- Minecraft: 1.20.1 Java Edition

---

## [5.0.0] - 2026-02-20

### 🎉 Added

- Versión inicial "Phoenix"
- Pathfinding optimizado
- Sistema de minado inteligente
- Recuperación post-muerte
- Combate inteligente
- Refugio automático nocturno

---

## Notas de Versión

### Versión 6.1.0 - Modular

Esta versión representa un cambio arquitectónico mayor. El bot ahora es:

- ✅ **Modular** - Cada responsabilidad en su módulo
- ✅ **Testeable** - Wrappers permiten testing unitario
- ✅ **Mantenible** - Fácil de entender y modificar
- ✅ **Robusto** - Manejo de errores mejorado
- ✅ **Observable** - Logs estructurados JSON

### Migración

Para migrar de v6.0 a v6.1:

1. Actualizar dependencias: `npm install`
2. Cambiar script: `npm start` (ahora usa src/index.js)
3. Verificar config en `src/config/index.js`
4. Los archivos de estado se mantienen compatibles

### Próximas Versiones

- **6.2.0** - Tests automatizados + CI/CD
- **6.3.0** - TypeScript migration plan
- **7.0.0** - Behaviors FSM completos
