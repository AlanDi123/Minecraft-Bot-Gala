/**
 * Wrapper para mineflayer-pvp
 * @module plugins/pvp
 */

import { plugin as pvpPlugin } from 'mineflayer-pvp';
import structuredLogger from '../utils/logger.js';

export class PVPWrapper {
    constructor() {
        this.bot = null;
        this.isFighting = false;
        this.currentTarget = null;
        this.weaponPriority = ['netherite_sword', 'diamond_sword', 'iron_sword', 'stone_sword', 'wooden_sword'];
        this.stats = {
            enemiesKilled: 0,
            combatsStarted: 0,
            combatsWon: 0,
            combatsFled: 0
        };
    }
    
    /**
     * Inicializar PVP
     */
    init(bot) {
        this.bot = bot;
        this.bot.loadPlugin(pvpPlugin);
        
        structuredLogger.info('PVP inicializado', {
            weaponPriority: this.weaponPriority
        });
        
        // Evento de muerte
        this.bot.on('death', () => {
            if (this.isFighting) {
                this.stop();
                this.stats.combatsFled++;
            }
        });
        
        return this;
    }
    
    /**
     * Atacar entidad
     * @param {Object} entity - Entidad objetivo
     * @param {Object} opts - Opciones
     * @returns {Promise<void>}
     */
    async attack(entity, opts = {}) {
        if (!this.bot) {
            throw new Error('PVP no inicializado');
        }
        
        if (!entity || !entity.position) {
            structuredLogger.warn('Entidad inválida para atacar');
            return;
        }
        
        this.isFighting = true;
        this.currentTarget = entity;
        this.stats.combatsStarted++;
        
        structuredLogger.info('Iniciando combate', {
            target: entity.name,
            health: entity.health,
            distance: this.bot.entity.position.distanceTo(entity.position).toFixed(1)
        });
        
        // Equipar mejor arma disponible
        await this.equipBestWeapon();
        
        // Iniciar combate
        try {
            this.bot.pvp.attack(entity);
            
            // Monitorear combate
            await this.monitorCombat(entity, opts);
            
        } catch (error) {
            structuredLogger.error('Error en combate', { error: error.message });
            this.stop();
            throw error;
        }
    }
    
    /**
     * Monitorear combate
     */
    async monitorCombat(entity, opts = {}) {
        const timeout = opts.timeout || 60000; // 1 minuto por defecto
        const checkInterval = 500;
        
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            
            const checkIntervalId = setInterval(() => {
                // Verificar timeout
                if (Date.now() - startTime > timeout) {
                    structuredLogger.warn('Timeout de combate', { 
                        target: entity.name,
                        duration: timeout 
                    });
                    this.stop();
                    reject(new Error('Timeout de combate'));
                    return;
                }
                
                // Verificar si entidad murió
                if (!entity.position || entity.health <= 0) {
                    this.stop();
                    this.stats.enemiesKilled++;
                    this.stats.combatsWon++;
                    structuredLogger.success('Enemigo derrotado', {
                        target: entity.name,
                        totalKills: this.stats.enemiesKilled
                    });
                    resolve();
                    return;
                }
                
                // Verificar si bot murió
                if (this.bot.health <= 0) {
                    this.stop();
                    reject(new Error('Bot murió en combate'));
                    return;
                }
                
                // Verificar si debe huir
                if (this.shouldFlee(opts)) {
                    this.stop();
                    structuredLogger.warn('Huyendo del combate', {
                        health: this.bot.health,
                        target: entity.name
                    });
                    resolve('fled');
                    return;
                }
                
            }, checkInterval);
            
            // Guardar interval ID para limpieza
            this.monitorInterval = checkIntervalId;
        });
    }
    
    /**
     * Verificar si debe huir
     */
    shouldFlee(opts = {}) {
        const health = this.bot.health || 20;
        const fleeThreshold = opts.fleeHealth || 6;
        
        return health <= fleeThreshold;
    }
    
    /**
     * Equipar mejor arma
     */
    async equipBestWeapon() {
        for (const weaponName of this.weaponPriority) {
            const weapon = this.bot.inventory.items().find(item => item.name === weaponName);
            if (weapon) {
                await this.bot.equip(weapon, 'hand');
                structuredLogger.debug(`Arma equipada: ${weaponName}`);
                return weapon;
            }
        }
        
        structuredLogger.warn('No se encontró arma en inventario');
        return null;
    }
    
    /**
     * Detener combate
     */
    stop() {
        if (this.bot) {
            this.bot.pvp.stop();
        }
        
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
        
        this.isFighting = false;
        this.currentTarget = null;
        
        structuredLogger.debug('Combate detenido');
    }
    
    /**
     * Establecer prioridad de armas
     */
    setWeaponPriority(priority) {
        this.weaponPriority = priority;
        structuredLogger.debug('Prioridad de armas actualizada', { priority });
    }
    
    /**
     * Obtener estadísticas
     */
    getStats() {
        return { ...this.stats };
    }
    
    /**
     * Verificar si está en combate
     */
    isInCombat() {
        return this.isFighting;
    }
    
    /**
     * Obtener objetivo actual
     */
    getCurrentTarget() {
        return this.currentTarget;
    }
}

export default PVPWrapper;
