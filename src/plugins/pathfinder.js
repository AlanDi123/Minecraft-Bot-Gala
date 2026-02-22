/**
 * Wrapper para mineflayer-pathfinder
 * @module plugins/pathfinder
 */

import { pathfinder as pathfinderPlugin, Movements, goals: Goals } from 'mineflayer-pathfinder';
import structuredLogger from '../utils/logger.js';

export class PathfinderWrapper {
    constructor() {
        this.bot = null;
        this.movements = null;
        this.mcData = null;
        this.defaultTimeout = 30000;
        this.cache = new Map();
        this.stats = {
            goalsReached: 0,
            goalsFailed: 0,
            pathsCalculated: 0
        };
    }
    
    /**
     * Inicializar pathfinder
     */
    init(bot, mcData) {
        this.bot = bot;
        this.mcData = mcData;
        
        // Cargar plugin
        this.bot.loadPlugin(pathfinderPlugin);
        
        // Configurar movimientos por defecto
        this.movements = new Movements(bot, mcData);
        this.movements.canDig = true;
        this.movements.canPlaceOn = true;
        this.movements.allow1by1towers = true;
        this.movements.allowFreeMotion = true;
        this.movements.maxDropDown = 4;
        this.movements.dontMineUnderFallingBlock = true;
        
        this.bot.pathfinder.setMovements(this.movements);
        
        structuredLogger.info('Pathfinder inicializado', {
            cacheSize: 2000,
            defaultTimeout: this.defaultTimeout
        });
        
        // Evento de goal alcanzado
        this.bot.pathfinder.on('goal_reached', () => {
            this.stats.goalsReached++;
            structuredLogger.debug('Goal alcanzado', { total: this.stats.goalsReached });
        });
        
        return this;
    }
    
    /**
     * Navegar a coordenadas específicas
     * @param {number} x - Coordenada X
     * @param {number} y - Coordenada Y
     * @param {number} z - Coordenada Z
     * @param {Object} opts - Opciones adicionales
     * @returns {Promise<Object>} Resultado de la navegación
     */
    async goTo(x, y, z, opts = {}) {
        if (!this.bot) {
            throw new Error('Pathfinder no inicializado');
        }
        
        const timeout = opts.timeout || this.defaultTimeout;
        const range = opts.range || 1;
        
        structuredLogger.debug('Navegando a coordenadas', { x, y, z, range });
        
        const goal = new Goals.GoalNear(x, y, z, range);
        
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                this.bot.pathfinder.stop();
                this.stats.goalsFailed++;
                structuredLogger.warn('Timeout de navegación', { x, y, z });
                reject(new Error(`Timeout: No se pudo llegar a ${x}, ${y}, ${z}`));
            }, timeout);
            
            this.bot.pathfinder.setGoal(goal)
                .then(result => {
                    clearTimeout(timeoutId);
                    this.stats.pathsCalculated++;
                    structuredLogger.debug('Navegación completada', { 
                        status: result.status,
                        timeMs: result.timeMs 
                    });
                    resolve(result);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    this.stats.goalsFailed++;
                    structuredLogger.error('Error de navegación', { error: error.message });
                    reject(error);
                });
        });
    }
    
    /**
     * Navegar cerca de coordenadas (rango amplio)
     * @param {number} x - Coordenada X
     * @param {number} y - Coordenada Y
     * @param {number} z - Coordenada Z
     * @param {number} range - Rango de aceptación
     * @param {Object} opts - Opciones
     * @returns {Promise<Object>} Resultado
     */
    async goToNear(x, y, z, range = 5, opts = {}) {
        return this.goTo(x, y, z, { ...opts, range });
    }
    
    /**
     * Seguir entidad
     * @param {Object} entity - Entidad a seguir
     * @param {Object} opts - Opciones
     * @returns {Promise<void>}
     */
    async follow(entity, opts = {}) {
        if (!this.bot) {
            throw new Error('Pathfinder no inicializado');
        }
        
        const distance = opts.distance || 3;
        const goal = new Goals.GoalFollow(entity, distance);
        
        structuredLogger.debug('Siguiendo entidad', { 
            entityId: entity.id, 
            name: entity.name,
            distance 
        });
        
        return this.bot.pathfinder.setGoal(goal);
    }
    
    /**
     * Detener navegación actual
     */
    stop() {
        if (this.bot) {
            this.bot.pathfinder.stop();
            structuredLogger.debug('Navegación detenida');
        }
    }
    
    /**
     * Calcular ruta sin ejecutar (para cache)
     * @param {number} x - X destino
     * @param {number} y - Y destino
     * @param {number} z - Z destino
     * @returns {Promise<Object|null>} Ruta calculada o null
     */
    async calculatePath(x, y, z) {
        const cacheKey = `${Math.round(this.bot.entity.position.x)},${Math.round(this.bot.entity.position.y)},${Math.round(this.bot.entity.position.z)}->${x},${y},${z}`;
        
        // Verificar cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < 300000) { // 5 min
                structuredLogger.debug('Ruta encontrada en cache', { key: cacheKey });
                return cached.path;
            }
            this.cache.delete(cacheKey);
        }
        
        // Calcular nueva ruta
        const goal = new Goals.GoalNear(x, y, z, 1);
        const result = await this.bot.pathfinder.getPathTo(goal, this.movements);
        
        if (result.path) {
            this.cache.set(cacheKey, {
                path: result.path,
                timestamp: Date.now()
            });
            
            // Limitar cache a 500 entradas
            if (this.cache.size > 500) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
        }
        
        return result.path;
    }
    
    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            ...this.stats,
            cacheSize: this.cache.size,
            cacheHitRate: this.calculateCacheHitRate()
        };
    }
    
    /**
     * Calcular cache hit rate
     */
    calculateCacheHitRate() {
        const total = this.stats.pathsCalculated + this.cache.size;
        if (total === 0) return 100;
        return ((this.cache.size / total) * 100).toFixed(1);
    }
    
    /**
     * Limpiar cache
     */
    clearCache() {
        this.cache.clear();
        structuredLogger.debug('Cache de pathfinding limpiada');
    }
}

export default PathfinderWrapper;
