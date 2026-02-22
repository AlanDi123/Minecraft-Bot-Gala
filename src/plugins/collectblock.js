/**
 * Wrapper para mineflayer-collectblock
 * @module plugins/collectblock
 */

import { plugin as collectBlockPlugin } from 'mineflayer-collectblock';
import structuredLogger from '../utils/logger.js';

export class CollectBlockWrapper {
    constructor() {
        this.bot = null;
        this.isCollecting = false;
        this.currentTarget = null;
        this.stats = {
            blocksMined: 0,
            itemsCollected: 0,
            collectionsFailed: 0
        };
    }
    
    /**
     * Inicializar collectblock
     */
    init(bot) {
        this.bot = bot;
        this.bot.loadPlugin(collectBlockPlugin);
        
        structuredLogger.info('CollectBlock inicializado');
        
        return this;
    }
    
    /**
     * Minar bloque específico
     * @param {Object} targetBlock - Bloque objetivo
     * @param {Object} opts - Opciones
     * @returns {Promise<Object>} Resultado
     */
    async mineBlock(targetBlock, opts = {}) {
        if (!this.bot) {
            throw new Error('CollectBlock no inicializado');
        }
        
        if (!targetBlock || !targetBlock.position) {
            structuredLogger.warn('Bloque inválido para minar');
            this.stats.collectionsFailed++;
            return false;
        }
        
        this.isCollecting = true;
        this.currentTarget = targetBlock;
        
        const timeout = opts.timeout || 45000; // 45 segundos
        
        structuredLogger.info('Minando bloque', {
            name: targetBlock.name,
            position: `${targetBlock.position.x}, ${targetBlock.position.y}, ${targetBlock.position.z}`
        });
        
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                this.isCollecting = false;
                this.stats.collectionsFailed++;
                structuredLogger.warn('Timeout minando bloque', { 
                    name: targetBlock.name,
                    position: targetBlock.position 
                });
                reject(new Error(`Timeout minando ${targetBlock.name}`));
            }, timeout);
            
            // Usar collectBlock para minar y recoger
            this.bot.collectBlock.collect(targetBlock, {
                append: opts.append || false,
                ignoreNoPath: opts.ignoreNoPath || false
            })
            .then(() => {
                clearTimeout(timeoutId);
                this.isCollecting = false;
                this.stats.blocksMined++;
                structuredLogger.success('Bloque minado', {
                    name: targetBlock.name,
                    total: this.stats.blocksMined
                });
                resolve({ success: true, block: targetBlock.name });
            })
            .catch(error => {
                clearTimeout(timeoutId);
                this.isCollecting = false;
                this.stats.collectionsFailed++;
                structuredLogger.error('Error minando bloque', { 
                    error: error.message,
                    block: targetBlock.name 
                });
                reject(error);
            });
        });
    }
    
    /**
     * Recoger items cercanos
     * @param {Function} filter - Filtro de items
     * @param {Object} opts - Opciones
     * @returns {Promise<Array>} Items recogidos
     */
    async collectNearbyDrops(filter = null, opts = {}) {
        if (!this.bot) {
            throw new Error('CollectBlock no inicializado');
        }
        
        const radius = opts.radius || 8;
        const collected = [];
        
        structuredLogger.debug('Recogiendo items cercanos', { radius });
        
        // Encontrar items en el suelo
        const entities = Object.values(this.bot.entities);
        const items = entities.filter(e => 
            e.name === 'item' && 
            e.position &&
            this.bot.entity.position.distanceTo(e.position) <= radius
        );
        
        if (filter && typeof filter === 'function') {
            // Aplicar filtro
            const filteredItems = items.filter(item => filter(item));
            items.length = 0;
            items.push(...filteredItems);
        }
        
        structuredLogger.debug(`Items encontrados: ${items.length}`);
        
        // Recoger cada item
        for (const item of items) {
            try {
                await this.bot.collectBlock.collect(item);
                collected.push(item);
                this.stats.itemsCollected++;
            } catch (error) {
                structuredLogger.debug('No se pudo recoger item', { 
                    error: error.message 
                });
            }
        }
        
        if (collected.length > 0) {
            structuredLogger.success(`Items recogidos: ${collected.length}`);
        }
        
        return collected;
    }
    
    /**
     * Recoger todos los drops de un área
     * @param {number} x - X centro
     * @param {number} y - Y centro
     * @param {number} z - Z centro
     * @param {number} radius - Radio
     * @returns {Promise<Array>} Items recogidos
     */
    async collectAllDrops(x, y, z, radius = 8) {
        if (!this.bot) {
            throw new Error('CollectBlock no inicializado');
        }
        
        const center = this.bot.entity.position;
        
        // Si se proporcionan coordenadas, moverse allí primero
        if (x !== undefined && y !== undefined && z !== undefined) {
            const distance = Math.sqrt(
                Math.pow(x - center.x, 2) +
                Math.pow(y - center.y, 2) +
                Math.pow(z - center.z, 2)
            );
            
            if (distance > radius) {
                structuredLogger.debug('Moviendo al área de drops');
                // Aquí se integraría con pathfinder
            }
        }
        
        return this.collectNearbyDrops(null, { radius });
    }
    
    /**
     * Detener recolección actual
     */
    stop() {
        this.isCollecting = false;
        this.currentTarget = null;
        structuredLogger.debug('Recolección detenida');
    }
    
    /**
     * Obtener estadísticas
     */
    getStats() {
        return { ...this.stats };
    }
    
    /**
     * Verificar si está recolectando
     */
    isCollectingBlock() {
        return this.isCollecting;
    }
    
    /**
     * Obtener objetivo actual
     */
    getCurrentTarget() {
        return this.currentTarget;
    }
}

export default CollectBlockWrapper;
