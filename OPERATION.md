# 📖 OPERATION RUNBOOK - GALA AI V6.2

> Guía de operaciones, mantenimiento y troubleshooting para el bot GALA AI

---

## 📋 Índice

1. [Inicio Rápido](#inicio-rápido)
2. [Monitoreo](#monitoreo)
3. [Mantenimiento](#mantenimiento)
4. [Troubleshooting](#troubleshooting)
5. [Recovery](#recovery)
6. [Actualizaciones](#actualizaciones)
7. [Backup](#backup)
8. [Escalado](#escalado)

---

## 🚀 Inicio Rápido

### Producción

```bash
# 1. Verificar servidor Minecraft está corriendo
# 2. Verificar variables de entorno
export MC_HOST="localhost"
export MC_PORT="51419"
export BOT_NAME="Gala_Bot"

# 3. Iniciar bot
cd /path/to/Minecraft-Bot-Gala
npm start

# 4. Verificar logs
tail -f gala_v6_logs.txt

# 5. Verificar en Discord/Juego
# Bot debe aparecer como "Gala_Bot" en lista de jugadores
```

### Docker

```bash
# Iniciar
docker start gala-bot

# Ver logs
docker logs -f gala-bot

# Verificar health
docker inspect --format='{{.State.Health.Status}}' gala-bot
```

---

## 📊 Monitoreo

### Health Checks

El bot tiene health check automático que verifica:
- Estado del bot (running/not running)
- Archivo de estado actualizado (<5min)
- Conexión al servidor

### Métricas Clave

| Métrica | Normal | Alerta | Crítico |
|---------|--------|--------|---------|
| Salud del bot | 20 | <10 | <6 |
| Comida | 20 | <14 | <6 |
| Memoria RAM | <8GB | 8-10GB | >10GB |
| CPU | <50% | 50-80% | >80% |
| Estado archivo | <5min | 5-10min | >10min |

### Ver Estado

```bash
# En juego
!status

# Logs
tail -n 50 gala_v6_logs.txt | grep -E "(ERROR|WARN|SUCCESS)"

# Estado del bot
cat gala_state_v6.json | jq '.deaths, .position'
```

### Dashboard de Telemetría

El bot imprime dashboard cada 15 segundos:
```
╔════════════════════════════════════════╗
║   📊 DASHBOARD DE TELEMETRÍA           ║
╚════════════════════════════════════════╝
⏱️  Sesión: 1h 23m 45s
📍 Posición: 123, 64, -456
💀 Muertes: 2
❤️  Salud: 20/20
🍖 Comida: 18/20
⚔️  Enemigos derrotados: 15
⛏️  Bloques minados: 234
🗺️  Cache pathfinding: 85% hit rate
```

---

## 🔧 Mantenimiento

### Diario

```bash
# 1. Verificar logs de errores
grep "ERROR\|FATAL" gala_v6_logs.txt | tail -20

# 2. Verificar archivo de estado
cat gala_state_v6.json | jq '.position, .health, .food'

# 3. Verificar memoria (si hay problemas)
ps aux | grep node
```

### Semanal

```bash
# 1. Backup de archivos de estado
cp gala_state_v6.json backups/gala_state_$(date +%Y%m%d).json
cp gala_knowledge_v6.json backups/gala_knowledge_$(date +%Y%m%d).json

# 2. Limpiar logs antiguos (>7 días)
find . -name "*.log" -mtime +7 -delete

# 3. Actualizar dependencias (si hay security patches)
npm audit
npm audit fix
```

### Mensual

```bash
# 1. Revisar métricas de rendimiento
# 2. Actualizar Node.js si hay nueva LTS
# 3. Revisar y rotar credenciales si aplica
# 4. Testear recovery procedure
```

---

## 🚨 Troubleshooting

### Bot No Conecta

**Síntomas:**
- Bot no aparece en servidor
- Error: "Timeout de conexión"

**Solución:**
```bash
# 1. Verificar servidor está online
ping localhost
nc -zv localhost 51419

# 2. Verificar configuración
cat src/config/index.js | grep -A5 "server:"

# 3. Verificar firewall
# Windows: firewall.cpl
# Linux: sudo ufw status

# 4. Reiniciar bot
npm run clean
npm start
```

### Bot Se Traba

**Síntomas:**
- Bot no responde a comandos
- Última actualización de estado >5min
- CPU usage alto

**Solución:**
```bash
# 1. Verificar memoria
ps aux | grep node

# 2. Forzar GC (si está disponible)
kill -SIGUSR1 <pid>

# 3. Si no responde, matar y reiniciar
pkill -f "node.*src/index.js"
npm start

# 4. Si persiste, aumentar RAM
# Editar package.json: --max-old-space-size=16384
```

### Bot Muere Repetidamente

**Síntomas:**
- Bot muere cada pocos minutos
- Causa: "creeper", "lava", "fall"

**Solución:**
```bash
# 1. Verificar causa de muerte
cat gala_state_v6.json | jq '.lastDeathLocation'

# 2. Si es combate, ajustar configuración
# Editar src/config/index.js:
CONFIG.survival.fleeFromMultiple = true
CONFIG.survival.maxEnemiesToFight = 2

# 3. Si es caída, mejorar pathfinding
# Editar src/config/index.js:
CONFIG.optimization.maxPathLength = 500

# 4. Reiniciar bot
npm run clean
npm start
```

### Error de Crafteo

**Síntomas:**
- Bot no puede craftear items
- Error: "No hay recetas disponibles"

**Solución:**
```bash
# 1. Verificar tiene mesa de crafteo
# En juego: buscar bloque de crafting_table

# 2. Verificar materiales
!inventory

# 3. Si no tiene mesa, bot debe colocar una
# Esperar a que bot lo haga automáticamente

# 4. Si persiste, verificar logs
grep "craft" gala_v6_logs.txt | tail -20
```

### Error de Pathfinding

**Síntomas:**
- Bot no puede llegar a destino
- Error: "No path to goal"

**Solución:**
```bash
# 1. Verificar distancia
# Si >100 bloques, es normal que falle

# 2. Limpiar cache de pathfinding
# Se limpia automáticamente cada 5min

# 3. Si persiste, reiniciar bot
npm start

# 4. Ajustar configuración
CONFIG.optimization.maxPathLength = 1000
CONFIG.optimization.blockSearchRadius = 128
```

---

## 🔄 Recovery

### Recovery Automático

El bot tiene recovery automático para:
- Muerte: Recupera items de ubicación de muerte
- Desconexión: Reconecta con backoff exponencial
- Error: Reintenta operación con retry limit

### Recovery Manual

```bash
# 1. Detener bot
pkill -f "node.*src/index.js"

# 2. Verificar último estado
cat gala_state_v6.json | jq '.'

# 3. Si está corrupto, usar backup
cp gala_state_v6_backup.json gala_state_v6.json

# 4. Iniciar bot
npm start

# 5. Verificar recovery
# Bot debe imprimir: "Estado restaurado desde backup"
```

### Recovery de Desastre

```bash
# 1. Clonar repo desde cero
git clone https://github.com/AlanDi123/Minecraft-Bot-Gala.git
cd Minecraft-Bot-Gala

# 2. Instalar dependencias
npm install

# 3. Copiar backups de estado
cp backups/gala_state_latest.json gala_state_v6.json
cp backups/gala_knowledge_latest.json gala_knowledge_v6.json

# 4. Configurar variables
export MC_HOST="..."
export MC_PORT="..."

# 5. Iniciar
npm start
```

---

## 🆙 Actualizaciones

### Actualizar Versión

```bash
# 1. Backup
npm run clean-all

# 2. Pull cambios
git pull origin main

# 3. Instalar dependencias
npm install

# 4. Verificar cambios breaking
cat CHANGELOG.md | grep -A10 "## \["

# 5. Iniciar
npm start

# 6. Verificar funciona
!status
```

### Rollback

```bash
# 1. Detener bot
pkill -f "node.*src/index.js"

# 2. Checkout versión anterior
git checkout <commit-hash>

# 3. Reinstalar dependencias
npm install

# 4. Iniciar
npm start
```

---

## 💾 Backup

### Archivos a Respaldar

| Archivo | Frecuencia | Retención |
|---------|------------|-----------|
| `gala_state_v6.json` | Cada hora | 7 días |
| `gala_knowledge_v6.json` | Diario | 30 días |
| `gala_metrics_v6.json` | Diario | 30 días |
| `gala_v6_logs.txt` | Semanal | 90 días |

### Script de Backup

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="./backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Copiar archivos
cp gala_state_v6.json $BACKUP_DIR/
cp gala_knowledge_v6.json $BACKUP_DIR/
cp gala_metrics_v6.json $BACKUP_DIR/

# Comprimir
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR

# Limpiar backups antiguos (>30 días)
find ./backups -mtime +30 -delete

echo "Backup completado: $BACKUP_DIR"
```

### Automatizar Backup

```bash
# Cron job (Linux/Mac)
crontab -e

# Añadir línea (backup cada hora)
0 * * * * /path/to/backup.sh

# Windows Task Scheduler
# Crear tarea que ejecute backup.sh cada hora
```

---

## 📈 Escalado

### Escalado Vertical

```bash
# Aumentar RAM
# Editar package.json:
"start": "node --max-old-space-size=16384 src/index.js"

# Aumentar CPU priority (Linux)
nice -n -10 npm start

# Aumentar CPU priority (Windows)
# Task Manager -> Details -> node.exe -> Set Priority -> High
```

### Escalado Horizontal

```bash
# Múltiples bots en mismo servidor
# 1. Copiar directorio
cp -r Minecraft-Bot-Gala Minecraft-Bot-Gala-2

# 2. Cambiar nombre
# Editar .env: BOT_NAME=Gala_Bot_2

# 3. Iniciar
cd Minecraft-Bot-Gala-2
npm start
```

### Docker Compose (Multi-Bot)

```yaml
version: '3'
services:
  gala-bot-1:
    image: gala-bot:v6.2
    environment:
      - BOT_NAME=Gala_Bot_1
      - MC_HOST=minecraft-server
    restart: unless-stopped
  
  gala-bot-2:
    image: gala-bot:v6.2
    environment:
      - BOT_NAME=Gala_Bot_2
      - MC_HOST=minecraft-server
    restart: unless-stopped
```

---

## 📞 Soporte

### Contactar Soporte

1. **Issues:** https://github.com/AlanDi123/Minecraft-Bot-Gala/issues
2. **Discussions:** https://github.com/AlanDi123/Minecraft-Bot-Gala/discussions
3. **Email:** (tu-email@ejemplo.com)

### Información a Proveer

Al reportar un issue, incluir:
- Versión del bot (`npm list | grep gala`)
- Versión de Node (`node -v`)
- Versión de Minecraft (`1.20.1`)
- Logs relevantes (`tail -n 100 gala_v6_logs.txt`)
- Pasos para reproducir
- Comportamiento esperado vs real

---

**Última actualización:** 2026-02-22  
**Versión:** 6.2.0  
**Mantenido por:** Gala AI Development Team
