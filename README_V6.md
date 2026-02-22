# 🤖 GALA AI V6.0 "OMEGA" - Minecraft Completista Bot

[![Version](https://img.shields.io/badge/version-6.0.0-blue.svg)](https://github.com/yourusername/gala-ai)
[![Minecraft](https://img.shields.io/badge/minecraft-1.20.1-green.svg)](https://www.minecraft.net/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-yellow.svg)](https://nodejs.org/)

## 🎯 OBJETIVO

Bot autónomo capaz de **completar Minecraft 100%** de forma autónoma, desde cero hasta conseguir:
- 🏆 Derrotar al Ender Dragon
- 🪽 Conseguir Elytra
- ⭐ Activar Beacon
- 📦 Todas las granjas automáticas
- 💎 Equipo perfecto encantado
- 🏛️ Explorar todas las estructuras

## 🚀 INSTALACIÓN RÁPIDA

```bash
# Instalar dependencias
npm install

# Iniciar bot (12GB RAM)
npm start

# Iniciar con debug (GC expuesto)
npm run start-debug

# Iniciar V5 (versión anterior)
npm run start-v5
```

## 📋 REQUERIMIENTOS

- **Node.js** >= 18.0.0
- **RAM** >= 12GB recomendados
- **Minecraft Server** 1.20.1 (LAN o remoto)
- **Conexión** estable a internet

## ⚙️ CONFIGURACIÓN

Edita `gala_ai_v6.js` para personalizar:

```javascript
const CONFIG = {
    server: {
        host: 'localhost',      // IP del servidor
        port: 51419,            // Puerto
        username: 'Gala_Bot',   // Nombre del bot
        version: '1.20.1',      // Versión Minecraft
        auth: 'offline'         // Autenticación
    },
    
    // ... más configuraciones
}
```

## 🎮 COMANDOS EN JUEGO

Usa `!` seguido del comando en el chat:

| Comando | Descripción |
|---------|-------------|
| `!help` | Muestra ayuda de comandos |
| `!status` | Muestra estado actual del bot |
| `!inventory` | Muestra inventario resumido |
| `!location` | Muestra posición actual |
| `!stop` | Detiene el bot |
| `!resume` | Reanuda el bot |

## 📊 ESTADOS DEL BOT

El bot sigue una máquina de estados finita (FSM) con progresión tipo humano:

### Niveles de Progresión

```
NIVEL 0 → SUPERVIVENCIA INMEDIATA
  ├─ Recolectar madera
  ├─ Craftear herramientas básicas
  ├─ Conseguir comida
  └─ Sobrevivir primera noche

NIVEL 1 → ESTABLECIMIENTO
  ├─ Herramientas de piedra
  ├─ Granja de comida
  ├─ Sistema de cofres
  └─ Armadura de hierro

NIVEL 2 → PROGRESIÓN
  ├─ Herramientas de hierro
  ├─ Horno y fundición
  ├─ Mina de recursos
  └─ Base principal

NIVEL 3 → TECNOLOGÍA
  ├─ Herramientas de diamante
  ├─ Mesa de encantamientos
  ├─ Trading con villagers
  └─ Granja de XP

NIVEL 4 → PREPARACIÓN NETHER
  ├─ 10+ diamantes
  ├─ Cubo de agua
  ├─ Arco y flechas
  └─ Pociones básicas

NIVEL 5 → NETHER
  ├─ Construir portal
  ├─ Explorar Nether
  ├─ Encontrar fortaleza
  ├─ Derrotar Blazes
  └─ Conseguir Ender Pearls

NIVEL 6 → BÚSQUEDA DEL END
  ├─ Craftear Ojos de Ender
  ├─ Triangular stronghold
  ├─ Excavar al stronghold
  └─ Activar portal del End

NIVEL 7 → DRAGON ENDER
  ├─ Equipamiento completo
  ├─ Pociones de combate
  ├─ Derrotar cristales
  ├─ Derrotar dragón
  └─ Recoger huevo

NIVEL 8 → POST-DRAGON
  ├─ End Gateway
  ├─ End Cities
  ├─ Conseguir Elytra
  └─ Shulker Boxes

NIVEL 9 → COMPLETISTA
  ├─ Beacon completo
  ├─ Todas las granjas
  ├─ Trading hall
  └─ Equipo perfecto
```

## 🔧 CARACTERÍSTICAS PRINCIPALES

### ✅ Sistemas Implementados

| Sistema | Descripción |
|---------|-------------|
| **Pathfinding** | Cache de 2000 entradas, evitación de peligros |
| **Combate** | Críticos, strafing, escudo, arco, pociones |
| **Inventario** | Gestión automática, ordenamiento, cofres |
| **Crafteo** | Todas las recetas del juego |
| **Construcción** | Refugios, granjas, portales, bases |
| **Navegación** | Overworld, Nether, End |
| **Granjas** | Comida, hierro, oro, XP |
| **Trading** | Villagers, cura, optimización |
| **Encantamientos** | Mesa, yunque, libros |
| **Brewing** | Pociones de combate y utilidad |
| **Minería** | Branch mining, cuevas |
| **Exploración** | Mapeo, waypoints, estructuras |
| **Día/Noche** | Rutinas automáticas, dormir |
| **Persistencia** | Guardado de estado, backups |
| **Telemetría** | Dashboard completo, métricas |
| **Auto-Repair** | Recuperación de errores |

## 📁 ARCHIVOS GENERADOS

| Archivo | Descripción |
|---------|-------------|
| `gala_v6_logs.txt` | Logs detallados de sesión |
| `gala_metrics_v6.json` | Métricas y estadísticas |
| `gala_knowledge_v6.json` | Base de conocimiento aprendida |
| `gala_state_v6.json` | Estado persistente del bot |

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot read properties of null (reading 'version')"
**Solución:** Asegúrate de usar `version: '1.20.1'` (exacta) en la configuración.

### Error: "Timeout de conexión"
**Solución:** Verifica que el servidor esté corriendo en el puerto especificado.

### Error: "Not enough space for bot"
**Solución:** Aumenta la RAM en `package.json`: `--max-old-space-size=12288`

### El bot no puede minar ciertos bloques
**Solución:** Verifica que tenga la herramienta adecuada equipada.

## 📈 MÉTRICAS DE RENDIMIENTO

- **Pathfinding Cache Hit Rate:** >90%
- **Blocks Mined por minuto:** ~15-20
- **Enemies Defeated:** Variable según equipamiento
- **Session Time:** Ilimitado (con GC automático)

## 🔮 PRÓXIMAS MEJORAS (Roadmap)

- [ ] Redstone automático
- [ ] Granjas más eficientes
- [ ] Combate con Wither
- [ ] Raid farms
- [ ] Guardian farms
- [ ] Iron farm optimizado
- [ ] Villager breeder
- [ ] Auto-smelting array

## 📄 LICENCIA

MIT License - Ver `LICENSE` para detalles.

## 👥 CRÉDITOS

Desarrollado por **Gala AI Development Team**

Inspirado en los proyectos:
- [Mineflayer](https://github.com/PrismarineJS/mineflayer)
- [mineflayer-pathfinder](https://github.com/PrismarineJS/mineflayer-pathfinder)
- [mineflayer-pvp](https://github.com/PrismarineJS/mineflayer-pvp)

## 🎉 PRIMEROS PASOS

1. Configura tu servidor Minecraft 1.20.1
2. Edita `gala_ai_v6.js` con la IP y puerto
3. Ejecuta `npm install`
4. Ejecuta `npm start`
5. ¡Observa como el bot completa el juego!

---

**¡Que disfrutes de GALA AI V6.0 "OMEGA"!** 🚀
