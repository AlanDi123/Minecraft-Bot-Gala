/**
 * GALA AI V6.1 - Bot Autónomo Modular para Minecraft
 * 
 * @version 6.1.0
 * @author Gala AI Development Team
 * @license MIT
 */

// Imports principales
import structuredLogger from './utils/logger.js';
import StateManager from './utils/state-manager.js';
import createBot from './connect/createBot.js';
import CONFIG from './config/index.js';

// Plugin wrappers
import PathfinderWrapper from './plugins/pathfinder.js';
import PVPWrapper from './plugins/pvp.js';
import CollectBlockWrapper from './plugins/collectblock.js';
import AutoEatWrapper from './plugins/autoEat.js';

/**
 * Clase principal del bot
 */
class GalaBot {
    constructor() {
        this.bot = null;
        this.mcData = null;
        this.stateManager = null;
        this.pathfinder = null;
        this.pvp = null;
        this.collectBlock = null;
        this.autoEat = null;
        
        this.isRunning = false;
        this.isConnected = false;
    }
    
    /**
     * Inicializar todos los componentes
     */
    async initialize() {
        structuredLogger.info('╔════════════════════════════════════════════╗');
        structuredLogger.info('║   GALA AI V6.1 "MODULAR"                   ║');
        structuredLogger.info('║   Minecraft 1.20.1 Java Edition            ║');
        structuredLogger.info('╚════════════════════════════════════════════╝');
        
        // Inicializar state manager
        this.stateManager = new StateManager({
            stateFile: CONFIG.learning.stateFile,
            backupFile: CONFIG.learning.stateFile.replace('.json', '_backup.json'),
            saveInterval: CONFIG.memory.backupInterval
        });
        
        await this.stateManager.load();
        structuredLogger.success('State Manager inicializado');
        
        // Crear bot
        this.bot = await createBot();
        this.isConnected = true;
        
        // Cargar minecraft-data
        const minecraftData = await import('minecraft-data');
        this.mcData = minecraftData.default(this.bot.version);
        structuredLogger.success('Minecraft-data cargado', { version: this.bot.version });
        
        // Inicializar plugins
        this.initializePlugins();
        
        // Configurar eventos
        this.setupEvents();
        
        // Iniciar auto-guardado
        this.stateManager.startAutoSave();
        
        structuredLogger.success('╔════════════════════════════════════════╗');
        structuredLogger.success('║   SISTEMA COGNITIVO OPERACIONAL        ║');
        structuredLogger.success('╚════════════════════════════════════════╝');
        
        return this;
    }
    
    /**
     * Inicializar todos los plugins
     */
    initializePlugins() {
        // Pathfinder
        this.pathfinder = new PathfinderWrapper();
        this.pathfinder.init(this.bot, this.mcData);
        structuredLogger.success('Pathfinder inicializado');
        
        // PVP
        this.pvp = new PVPWrapper();
        this.pvp.init(this.bot);
        structuredLogger.success('PVP inicializado');
        
        // CollectBlock
        this.collectBlock = new CollectBlockWrapper();
        this.collectBlock.init(this.bot);
        structuredLogger.success('CollectBlock inicializado');
        
        // AutoEat
        this.autoEat = new AutoEatWrapper();
        this.autoEat.init(this.bot);
        this.autoEat.enable();
        structuredLogger.success('AutoEat inicializado y habilitado');
    }
    
    /**
     * Configurar eventos del bot
     */
    setupEvents() {
        // Evento: Salud
        this.bot.on('health', () => {
            this.stateManager.set('health', this.bot.health);
            
            if (this.bot.health < 10) {
                structuredLogger.warn('Salud crítica', { health: this.bot.health });
            }
        });
        
        // Evento: Comida
        this.bot.on('food', () => {
            this.stateManager.set('food', this.bot.food);
            
            if (this.bot.food < CONFIG.survival.foodCritical) {
                structuredLogger.warn('Hambre crítica', { food: this.bot.food });
                this.autoEat.eatIfNeeded();
            }
        });
        
        // Evento: Muerte
        this.bot.on('death', () => {
            structuredLogger.error('💀 BOT HA MUERTO');
            
            const pos = this.bot.entity?.position;
            if (pos) {
                this.stateManager.recordDeath(
                    { x: pos.x, y: pos.y, z: pos.z },
                    'unknown'
                );
            }
            
            this.pvp.stop();
            this.collectBlock.stop();
        });
        
        // Evento: Respawn
        this.bot.on('respawn', () => {
            structuredLogger.info('✨ Respawn completado');
            this.stateManager.reset();
        });
        
        // Evento: Desconexión
        this.bot.on('end', () => {
            structuredLogger.warn('Desconectado del servidor');
            this.isRunning = false;
            this.isConnected = false;
            this.stateManager.stopAutoSave();
            this.stateManager.save();
        });
        
        // Evento: Error
        this.bot.on('error', (err) => {
            structuredLogger.error('Error del bot', { error: err.message });
        });
        
        structuredLogger.success('Eventos configurados');
    }
    
    /**
     * Iniciar loop principal
     */
    async start() {
        this.isRunning = true;
        structuredLogger.info('Loop principal iniciado');
        
        // Loop de actualización (cada 100ms)
        const updateInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(updateInterval);
                return;
            }
            
            this.update();
        }, 100);
        
        // Loop de telemetría (cada 15s)
        const telemetryInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(telemetryInterval);
                return;
            }
            
            this.printTelemetry();
        }, CONFIG.optimization.telemetryInterval);
        
        // Loop de backup (cada 60s)
        const backupInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(backupInterval);
                return;
            }
            
            this.stateManager.save();
        }, CONFIG.memory.backupInterval);
        
        structuredLogger.success('Sistemas de loop iniciados');
        
        // Aquí iría la FSM principal
        // Por ahora, estado IDLE
        this.stateManager.set('currentTask', 'IDLE');
    }
    
    /**
     * Actualización periódica
     */
    update() {
        if (!this.isConnected || !this.bot.entity) return;
        
        // Actualizar posición
        const pos = this.bot.entity.position;
        this.stateManager.set('position', {
            x: pos.x,
            y: pos.y,
            z: pos.z
        });
        
        // Verificar auto-eat
        if (this.autoEat.isEnabled()) {
            this.autoEat.eatIfNeeded();
        }
    }
    
    /**
     * Imprimir telemetría
     */
    printTelemetry() {
        const sessionTime = this.stateManager.getFormattedSessionTime();
        const deaths = this.stateManager.get('deaths', 0);
        const pos = this.stateManager.get('position', { x: 0, y: 0, z: 0 });
        
        structuredLogger.info('╔════════════════════════════════════════╗');
        structuredLogger.info('║   📊 DASHBOARD DE TELEMETRÍA           ║');
        structuredLogger.info('╚════════════════════════════════════════╝');
        structuredLogger.info(`⏱️  Sesión: ${sessionTime}`);
        structuredLogger.info(`📍 Posición: ${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)}`);
        structuredLogger.info(`💀 Muertes: ${deaths}`);
        structuredLogger.info(`❤️  Salud: ${this.bot.health}/20`);
        structuredLogger.info(`🍖 Comida: ${this.bot.food}/20`);
        
        const pvpStats = this.pvp.getStats();
        structuredLogger.info(`⚔️  Enemigos derrotados: ${pvpStats.enemiesKilled || 0}`);
        
        const collectStats = this.collectBlock.getStats();
        structuredLogger.info(`⛏️  Bloques minados: ${collectStats.blocksMined || 0}`);
        
        const pathfinderStats = this.pathfinder.getStats();
        structuredLogger.info(`🗺️  Cache pathfinding: ${pathfinderStats.cacheHitRate}% hit rate`);
    }
    
    /**
     * Detener bot
     */
    async stop() {
        structuredLogger.info('Deteniendo bot...');
        
        this.isRunning = false;
        
        // Detener acciones
        this.pvp?.stop();
        this.collectBlock?.stop();
        this.pathfinder?.stop();
        
        // Detener auto-guardado
        this.stateManager?.stopAutoSave();
        
        // Guardar estado final
        await this.stateManager?.save();
        
        // Desconectar
        if (this.bot) {
            this.bot.quit();
        }
        
        structuredLogger.info('Bot detenido');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA
// ═══════════════════════════════════════════════════════════════════════════

const galaBot = new GalaBot();

// Manejo de señales
process.on('SIGINT', async () => {
    structuredLogger.info('Señal SIGINT recibida');
    await galaBot.stop();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    structuredLogger.info('Señal SIGTERM recibida');
    await galaBot.stop();
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    structuredLogger.fatal('Error no capturado', { error: err.message, stack: err.stack });
    galaBot.stop();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    structuredLogger.fatal('Promesa rechazada', { reason, promise });
    galaBot.stop();
    process.exit(1);
});

// Iniciar
(async () => {
    try {
        await galaBot.initialize();
        await galaBot.start();
    } catch (error) {
        structuredLogger.fatal('Error fatal al iniciar', { error: error.message, stack: error.stack });
        process.exit(1);
    }
})();

export default GalaBot;
