/**
 * Wrapper para mineflayer-auto-eat
 * @module plugins/autoEat
 */

import { plugin as autoEatPlugin } from 'mineflayer-auto-eat';
import structuredLogger from '../utils/logger.js';

export class AutoEatWrapper {
    constructor() {
        this.bot = null;
        this.enabled = false;
        this.config = {
            healthThreshold: 18,
            foodThreshold: 14,
            priorityFoods: ['golden_apple', 'enchanted_golden_apple', 'golden_carrot', 'cooked_beef', 'cooked_porkchop', 'bread'],
            forbiddenFoods: ['rotten_flesh', 'spider_eye', 'poisonous_potato', 'pufferfish']
        };
        this.stats = {
            foodsEaten: 0,
            timesHealed: 0,
            timesFed: 0
        };
    }
    
    /**
     * Inicializar auto-eat
     */
    init(bot) {
        this.bot = bot;
        this.bot.loadPlugin(autoEatPlugin);
        
        structuredLogger.info('AutoEat inicializado', {
            healthThreshold: this.config.healthThreshold,
            foodThreshold: this.config.foodThreshold
        });
        
        return this;
    }
    
    /**
     * Configurar auto-eat
     * @param {Object} config - Configuración
     */
    configure(config = {}) {
        this.config = { ...this.config, ...config };
        structuredLogger.debug('AutoEat configurado', this.config);
    }
    
    /**
     * Habilitar auto-eat
     */
    enable() {
        this.enabled = true;
        structuredLogger.info('AutoEat habilitado');
    }
    
    /**
     * Deshabilitar auto-eat
     */
    disable() {
        this.enabled = false;
        structuredLogger.info('AutoEat deshabilitado');
    }
    
    /**
     * Comer si es necesario
     * @returns {Promise<boolean>} Si comió
     */
    async eatIfNeeded() {
        if (!this.enabled || !this.bot) {
            return false;
        }
        
        const health = this.bot.health || 20;
        const food = this.bot.food || 20;
        
        // Verificar si necesita comer
        if (health < this.config.healthThreshold || food < this.config.foodThreshold) {
            return this.eat();
        }
        
        return false;
    }
    
    /**
     * Comer automáticamente
     * @returns {Promise<boolean>} Si comió exitosamente
     */
    async eat() {
        if (!this.bot) {
            return false;
        }
        
        try {
            // Buscar mejor comida disponible
            const foodItem = this.findBestFood();
            
            if (!foodItem) {
                structuredLogger.debug('No hay comida disponible');
                return false;
            }
            
            // Equipar y comer
            await this.bot.equip(foodItem, 'hand');
            await this.bot.consume();
            
            this.stats.foodsEaten++;
            structuredLogger.success('Comiendo', {
                food: foodItem.name,
                totalEaten: this.stats.foodsEaten
            });
            
            return true;
            
        } catch (error) {
            structuredLogger.error('Error comiendo', { error: error.message });
            return false;
        }
    }
    
    /**
     * Encontrar mejor comida disponible
     * @returns {Object|null} Item de comida o null
     */
    findBestFood() {
        const items = this.bot.inventory.items();
        
        // Buscar foods prioritarios
        for (const foodName of this.config.priorityFoods) {
            const food = items.find(item => item.name === foodName);
            if (food) {
                return food;
            }
        }
        
        // Buscar cualquier otra comida que no esté prohibida
        const foodItems = items.filter(item => 
            this.isEdible(item.name) && 
            !this.config.forbiddenFoods.includes(item.name)
        );
        
        // Ordenar por valor de restauración (aproximado)
        foodItems.sort((a, b) => {
            const foodPoints = {
                'golden_apple': 10,
                'enchanted_golden_apple': 10,
                'golden_carrot': 8,
                'cooked_beef': 8,
                'cooked_porkchop': 8,
                'cooked_mutton': 7,
                'cooked_chicken': 6,
                'bread': 5,
                'apple': 4,
                'carrot': 3,
                'potato': 1
            };
            return (foodPoints[b.name] || 0) - (foodPoints[a.name] || 0);
        });
        
        return foodItems[0] || null;
    }
    
    /**
     * Verificar si un item es comestible
     */
    isEdible(itemName) {
        const edibleItems = [
            'golden_apple', 'enchanted_golden_apple', 'golden_carrot',
            'cooked_beef', 'cooked_porkchop', 'cooked_mutton', 'cooked_chicken',
            'bread', 'apple', 'carrot', 'potato', 'baked_potato',
            'melon_slice', 'sweet_berries', 'glow_berries',
            'cookie', 'cake', 'pumpkin_pie',
            'dried_kelp', 'beetroot', 'beetroot_soup',
            'mushroom_stew', 'rabbit_stew', 'suspicious_stew',
            'cooked_cod', 'cooked_salmon', 'tropical_fish',
            'honey_bottle', 'milk_bucket'
        ];
        
        return edibleItems.includes(itemName);
    }
    
    /**
     * Forzar comer item específico
     * @param {string} itemName - Nombre del item
     * @returns {Promise<boolean>} Si comió
     */
    async forceEat(itemName) {
        if (!this.bot) {
            return false;
        }
        
        const item = this.bot.inventory.items().find(i => i.name === itemName);
        
        if (!item) {
            structuredLogger.warn(`Item no encontrado: ${itemName}`);
            return false;
        }
        
        try {
            await this.bot.equip(item, 'hand');
            await this.bot.consume();
            
            this.stats.foodsEaten++;
            structuredLogger.success(`Comiendo forzado: ${itemName}`);
            return true;
            
        } catch (error) {
            structuredLogger.error(`Error comiendo ${itemName}`, { error: error.message });
            return false;
        }
    }
    
    /**
     * Obtener estadísticas
     */
    getStats() {
        return { ...this.stats };
    }
    
    /**
     * Verificar si está habilitado
     */
    isEnabled() {
        return this.enabled;
    }
}

export default AutoEatWrapper;
