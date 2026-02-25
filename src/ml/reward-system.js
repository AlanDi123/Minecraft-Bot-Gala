/**
 * Sistema de Recompensas para Q-Learning
 * Define las recompensas/castigos por cada acción y resultado
 * @module ml/reward-system
 */

/**
 * Sistema de recompensas para aprendizaje por refuerzo
 */
export class RewardSystem {
    constructor() {
        // Recompensas base por acción
        this.actionRewards = {
            // Acciones de supervivencia
            EAT: 5,
            SLEEP: 3,
            FLEE: 2,
            
            // Acciones de recolección
            GATHER_WOOD: 2,
            GATHER_STONE: 2,
            GATHER_FOOD: 3,
            MINE_IRON: 4,
            MINE_DIAMOND: 6,
            
            // Acciones de crafteo
            CRAFT_PLANKS: 1,
            CRAFT_PICKAXE: 3,
            CRAFT_SWORD: 3,
            CRAFT_TABLE: 2,
            CRAFT_FURNACE: 2,
            
            // Acciones de progreso
            EXPLORE: 1,
            BUILD_SHELTER: 4,
            FIGHT: 2,
            
            // Inacción
            IDLE: -0.5 // Pequeño castigo por no hacer nada
        };
        
        // Multiplicadores por contexto
        this.contextMultipliers = {
            LOW_HEALTH: 2.0,
            LOW_FOOD: 1.5,
            NIGHT_TIME: 1.3,
            DANGER_NEARBY: 1.5,
            SUCCESSFUL_ACTION: 1.5,
            FAILED_ACTION: 0.5
        };
        
        // Castigos por eventos negativos
        this.penalties = {
            DAMAGE_TAKEN: -5,
            DEATH: -50,
            TOOL_BROKEN: -3,
            HUNGER_DAMAGE: -3,
            FALL_DAMAGE: -2,
            DROWN_DAMAGE: -4,
            BURN_DAMAGE: -4,
            WASTED_ACTION: -1
        };
        
        // Recompensas por logros
        this.achievements = {
            FIRST_WOOD: 10,
            FIRST_TOOL: 15,
            FIRST_IRON: 25,
            FIRST_DIAMOND: 50,
            SURVIVE_NIGHT: 20,
            KILL_ENEMY: 10,
            CRAFT_ARMOR: 15,
            BUILD_BASE: 30,
            SURVIVE_DAY: 5
        };
        
        // Extended rewards for full game progression
        this.extendedRewards = {
            DEFEAT_ENDER_DRAGON: 10000,
            ENTER_NETHER: 500,
            KILL_BLAZE: 100,
            FIND_STRONGHOLD: 1000,
            CRAFT_DIAMOND_TOOL: 200,
            CRAFT_IRON_TOOL: 100,
            FIRST_IRON_FOUND: 150,
            FIRST_DIAMOND_FOUND: 300,
            BUILD_SHELTER_NIGHT: 80,
            SURVIVED_NIGHT: 50,
            SURVIVED_CREEPER: 30,
            PHASE_1_COMPLETED: 500,
            PHASE_2_COMPLETED: 1000,
            PHASE_3_COMPLETED: 1500,
            PHASE_4_COMPLETED: 2000,
            PHASE_5_COMPLETED: 2500
        };
        
        // Extended penalties
        this.extendedPenalties = {
            DEATH: -300,
            STUCK_LOOP: -50,
            FELL_IN_LAVA: -400,
            CREEPER_EXPLOSION_NEAR: -20
        };
        
        // Shaping rewards (progressive)
        this.shapingRewards = {
            MINERALS_PER_10: 10,
            NEW_BIOME: 20
        };

        // Tracking de logros
        this.unlockedAchievements = new Set();
        
        // Historial de acciones recientes
        this.recentActions = [];
        this.maxRecentActions = 10;
    }
    
    /**
     * Calcular recompensa por una acción
     * @param {string} action - Acción realizada
     * @param {Object} context - Contexto del estado
     * @param {boolean} success - Si la acción tuvo éxito
     * @returns {number} Recompensa calculada
     */
    calculateReward(action, context = {}, success = true) {
        let reward = this.actionRewards[action] || 0;
        
        // Aplicar multiplicadores de contexto
        if (context.health < 10) {
            reward *= this.contextMultipliers.LOW_HEALTH;
        }
        
        if (context.food < 10) {
            reward *= this.contextMultipliers.LOW_FOOD;
        }
        
        if (context.isNight) {
            reward *= this.contextMultipliers.NIGHT_TIME;
        }
        
        if (context.nearbyHostiles > 0) {
            reward *= this.contextMultipliers.DANGER_NEARBY;
        }
        
        // Multiplicador por éxito/fracaso
        if (success) {
            reward *= this.contextMultipliers.SUCCESSFUL_ACTION;
        } else {
            reward *= this.contextMultipliers.FAILED_ACTION;
        }
        
        // Bonus por acción apropiada al contexto
        reward += this.contextualBonus(action, context);
        
        // Guardar acción reciente
        this.recentActions.push({ action, reward, timestamp: Date.now() });
        if (this.recentActions.length > this.maxRecentActions) {
            this.recentActions.shift();
        }
        
        return Math.round(reward * 10) / 10; // Redondear a 1 decimal
    }
    
    /**
     * Bonus por acción contextualmente apropiada
     */
    contextualBonus(action, context) {
        let bonus = 0;
        
        // Bonus por acción inteligente según contexto
        if (action === 'FLEE' && context.nearbyHostiles > 2) {
            bonus += 5; // Huir cuando hay muchos enemigos es inteligente
        }
        
        if (action === 'SLEEP' && context.isNight && !context.nearbyHostiles) {
            bonus += 3; // Dormir de noche sin peligros es bueno
        }
        
        if (action === 'EAT' && context.food < 10) {
            bonus += 4; // Comer cuando hay hambre es bueno
        }
        
        if (action === 'BUILD_SHELTER' && context.isNight && context.nearbyHostiles > 0) {
            bonus += 6; // Construir refugio de noche con enemigos es muy inteligente
        }
        
        if (action === 'FIGHT' && context.health > 15 && context.nearbyHostiles === 1) {
            bonus += 3; // Pelear con buena salud contra 1 enemigo es bueno
        }
        
        if (action === 'EXPLORE' && !context.nearbyHostiles && context.health > 15) {
            bonus += 2; // Explorar cuando es seguro es bueno
        }
        
        // Castigo por acción inapropiada
        if (action === 'EXPLORE' && context.nearbyHostiles > 0) {
            bonus -= 5; // Explorar con enemigos cerca es malo
        }
        
        if (action === 'IDLE' && context.nearbyHostiles > 0) {
            bonus -= 8; // No hacer nada con enemigos cerca es muy malo
        }
        
        return bonus;
    }
    
    /**
     * Calcular castigo por evento negativo
     * @param {string} eventType - Tipo de evento negativo
     * @param {number} severity - Severidad (0-1)
     * @returns {number} Castigo calculado
     */
    calculatePenalty(eventType, severity = 1) {
        const basePenalty = this.penalties[eventType] || -1;
        return Math.round(basePenalty * severity * 10) / 10;
    }
    
    /**
     * Calcular recompensa por logro
     * @param {string} achievement - Nombre del logro
     * @returns {number} Recompensa (0 si ya estaba desbloqueado)
     */
    calculateAchievementReward(achievement) {
        if (this.unlockedAchievements.has(achievement)) {
            return 0; // Ya desbloqueado
        }
        
        this.unlockedAchievements.add(achievement);
        return this.achievements[achievement] || 0;
    }
    
    /**
     * Verificar y otorgar logros
     * @param {Object} state - Estado actual
     * @param {Object} prevState - Estado anterior
     * @returns {Array} Lista de logros desbloqueados
     */
    checkAchievements(state, prevState) {
        const achievements = [];
        
        // Primer madera
        if ((state.logCount || 0) > 0 && (prevState.logCount || 0) === 0) {
            const reward = this.calculateAchievementReward('FIRST_WOOD');
            if (reward > 0) achievements.push({ name: 'FIRST_WOOD', reward });
        }
        
        // Primera herramienta
        if ((!prevState.hasPickaxe && state.hasPickaxe) ||
            (!prevState.hasSword && state.hasSword)) {
            const reward = this.calculateAchievementReward('FIRST_TOOL');
            if (reward > 0) achievements.push({ name: 'FIRST_TOOL', reward });
        }
        
        // Primer hierro
        if ((state.ironCount || 0) > 0 && (prevState.ironCount || 0) === 0) {
            const reward = this.calculateAchievementReward('FIRST_IRON');
            if (reward > 0) achievements.push({ name: 'FIRST_IRON', reward });
        }
        
        // Primer diamante
        if ((state.diamondCount || 0) > 0 && (prevState.diamondCount || 0) === 0) {
            const reward = this.calculateAchievementReward('FIRST_DIAMOND');
            if (reward > 0) achievements.push({ name: 'FIRST_DIAMOND', reward });
        }
        
        // Sobrevivir noche
        if (prevState.isNight && !state.isNight && state.health > 0) {
            const reward = this.calculateAchievementReward('SURVIVE_NIGHT');
            if (reward > 0) achievements.push({ name: 'SURVIVE_NIGHT', reward });
        }
        
        return achievements;
    }
    
    /**
     * Obtener recompensa total de acciones recientes
     * @returns {number} Recompensa total
     */
    getRecentRewardTotal() {
        return this.recentActions.reduce((sum, action) => sum + action.reward, 0);
    }
    
    /**
     * Obtener acciones recientes
     * @returns {Array} Acciones recientes
     */
    getRecentActions() {
        return [...this.recentActions];
    }
    
    /**
     * Resetear logros (para debugging)
     */
    resetAchievements() {
        this.unlockedAchievements.clear();
    }
    
    /**
     * Resetear historial
     */
    resetHistory() {
        this.recentActions = [];
    }
}

export default RewardSystem;
