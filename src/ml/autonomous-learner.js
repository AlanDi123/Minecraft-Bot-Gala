/**
 * Sistema de Machine Learning Autónomo
 * Integra Q-Learning, Recompensas y Memoria
 * @module ml/autonomous-learner
 */

import QLearning from './q-learning.js';
import RewardSystem from './reward-system.js';
import BotMemory from './memory.js';
import structuredLogger from '../utils/logger.js';

/**
 * Clase principal de aprendizaje autónomo
 * Coordina todos los componentes de ML para que el bot aprenda solo
 */
export class AutonomousLearner {
    constructor(options = {}) {
        // Componentes de ML
        this.qLearning = new QLearning({
            saveFile: './ml_data/q_table.json',
            experienceFile: './ml_data/experiences.json',
            learningRate: options.learningRate || 0.15,
            explorationRate: options.explorationRate || 0.4
        });
        
        this.rewardSystem = new RewardSystem();
        this.memory = new BotMemory({
            saveFile: './ml_data/memory.json',
            worldFile: './ml_data/world_data.json'
        });
        
        // Estado anterior para calcular recompensas
        this.previousState = null;
        this.previousAction = null;
        
        // Configuración de auto-guardado
        this.autoSaveInterval = options.autoSaveInterval || 60000; // 1 minuto
        this.lastSaveTime = Date.now();
        
        // Modo entrenamiento
        this.trainingMode = options.trainingMode !== false;
        
        // Callbacks para acciones
        this.actionCallbacks = {};
        
        structuredLogger.info('🧠 Sistema de ML Autónomo inicializado', {
            trainingMode: this.trainingMode,
            autoSaveInterval: this.autoSaveInterval
        });
    }
    
    /**
     * Convertir estado del bot a formato ML
     */
    getMLState(botState) {
        return {
            health: botState.health || 20,
            food: botState.food || 20,
            hasPickaxe: botState.hasPickaxe || false,
            hasSword: botState.hasSword || false,
            hasAxe: botState.hasAxe || false,
            hasShield: botState.hasShield || false,
            hasArmor: botState.hasArmor || false,
            plankCount: botState.plankCount || 0,
            logCount: botState.logCount || 0,
            stoneCount: botState.stoneCount || 0,
            ironCount: botState.ironCount || 0,
            diamondCount: botState.diamondCount || 0,
            foodItems: botState.foodItems || 0,
            hasTable: botState.hasTable || false,
            hasFurnace: botState.hasFurnace || false,
            nearbyHostiles: botState.nearbyHostiles || 0,
            isNight: botState.isNight || false,
            biome: botState.biome || 'plains',
            position: botState.position || { x: 0, y: 0, z: 0 },
            inventory: botState.inventory || {}
        };
    }
    
    /**
     * Seleccionar acción usando Q-Learning
     */
    selectAction(botState) {
        const state = this.getMLState(botState);
        
        // Registrar ubicación
        this.memory.rememberLocation(state.position, state.biome);
        
        // Verificar zona peligrosa
        if (this.memory.isDangerZone(state.position)) {
            state.nearbyHostiles = Math.max(state.nearbyHostiles, 2);
        }
        
        // Seleccionar acción
        const action = this.qLearning.selectAction(state);
        
        structuredLogger.debug(`🤖 ML seleccionó: ${action}`, {
            exploration: this.qLearning.explorationRate,
            state: this.qLearning.serializeState(state)
        });
        
        return action;
    }
    
    /**
     * Registrar resultado de acción y aprender
     */
    learnFromAction(action, success, botState, prevBotState = null) {
        const state = prevBotState ? this.getMLState(prevBotState) : this.previousState;
        const nextState = this.getMLState(botState);
        
        if (!state || !action) return;
        
        // Calcular recompensa
        let reward = this.rewardSystem.calculateReward(action, state, success);
        
        // Verificar logros
        const achievements = this.rewardSystem.checkAchievements(nextState, state);
        for (const achievement of achievements) {
            reward += achievement.reward;
            structuredLogger.info(`🏆 Logro: ${achievement.name} (+${achievement.reward})`);
            this.memory.trackProgress('achievement', { achievement: achievement.name });
        }
        
        // Actualizar Q-Table
        this.qLearning.update(state, action, reward, nextState);
        
        // Registrar en memoria
        this.memory.shortTermMemory.recentActions.push({
            action,
            success,
            reward,
            timestamp: Date.now()
        });
        
        if (this.memory.shortTermMemory.recentActions.length > 100) {
            this.memory.shortTermMemory.recentActions.shift();
        }
        
        // Actualizar estado
        this.previousState = nextState;
        this.previousAction = action;
        
        // Aprendizaje offline periódico
        if (this.qLearning.stats.totalDecisions % 10 === 0) {
            this.qLearning.learnFromExperiences(32);
        }
        
        // Decaer exploración
        this.qLearning.decayExploration();
        
        structuredLogger.debug(`📚 ML aprendió: ${action} = ${reward > 0 ? '+' : ''}${reward}`, {
            success,
            totalReward: this.qLearning.stats.totalReward
        });
    }
    
    /**
     * Registrar evento negativo (muerte, daño, etc.)
     */
    onNegativeEvent(eventType, botState, severity = 1) {
        const state = this.getMLState(botState);
        
        // Castigo por evento negativo
        const penalty = this.rewardSystem.calculatePenalty(eventType, severity);
        
        if (this.previousAction && this.previousState) {
            // Actualizar Q-Table con castigo
            this.qLearning.update(
                this.previousState,
                this.previousAction,
                penalty,
                state
            );
        }
        
        // Registrar en memoria
        if (eventType === 'DEATH') {
            this.memory.trackProgress('death');
            this.memory.rememberDanger(state.position, 'death_location', 3);
        }
        
        structuredLogger.warn(`⚠️ Evento negativo: ${eventType} (${penalty})`);
    }
    
    /**
     * Registrar acción exitosa
     */
    onActionSuccess(action, botState, details = {}) {
        const state = this.getMLState(botState);
        
        // Recompensa base
        let reward = this.rewardSystem.calculateReward(action, state, true);
        
        // Bonus por detalles
        if (details.critical) {
            reward *= 2;
        }
        
        // Registrar progreso
        if (details.type === 'craft') {
            this.memory.trackProgress('craft', { item: details.item });
        } else if (details.type === 'mine') {
            this.memory.trackProgress('mine', { block: details.block });
            this.memory.rememberResource(details.block, state.position, details.quantity);
        } else if (details.type === 'kill') {
            this.memory.trackProgress('kill', { mob: details.mob });
        }
        
        structuredLogger.debug(`✅ Acción exitosa: ${action} (+${reward})`);
        
        return reward;
    }
    
    /**
     * Obtener recomendación de acción basada en memoria
     */
    getRecommendation(botState) {
        const state = this.getMLState(botState);
        
        // Verificar si hay refugio cercano
        if (state.isNight && state.nearbyHostiles > 0) {
            const shelter = this.memory.getNearestSafeLocation(state.position);
            if (shelter) {
                return {
                    action: 'GO_TO_SHELTER',
                    target: shelter,
                    reason: 'Noche con enemigos, refugio cercano disponible'
                };
            }
        }
        
        // Verificar si hay recursos cercanos
        const neededResources = ['oak_log', 'cobblestone', 'iron_ore'];
        for (const resource of neededResources) {
            const location = this.memory.getNearestResource(state.position, resource);
            if (location) {
                return {
                    action: 'GATHER_RESOURCE',
                    target: location,
                    resource,
                    reason: `Recurso ${resource} disponible cerca`
                };
            }
        }
        
        return null;
    }
    
    /**
     * Auto-guardado periódico
     */
    checkAutoSave() {
        const now = Date.now();
        if (now - this.lastSaveTime >= this.autoSaveInterval) {
            this.save();
            this.lastSaveTime = now;
        }
    }
    
    /**
     * Guardar todo el progreso de ML
     */
    save() {
        this.qLearning.save();
        this.memory.save();
        structuredLogger.info('💾 ML guardado automáticamente');
    }
    
    /**
     * Obtener estadísticas de aprendizaje
     */
    getStats() {
        return {
            qLearning: this.qLearning.getStats(),
            memory: this.memory.getStats(),
            trainingMode: this.trainingMode,
            explorationRate: this.qLearning.explorationRate
        };
    }
    
    /**
     * Exportar modelo para análisis
     */
    exportModel() {
        return {
            qTable: this.qLearning.qTable,
            memory: this.memory.exportMemory(),
            stats: this.getStats(),
            exportedAt: Date.now()
        };
    }
    
    /**
     * Resetear aprendizaje (para debugging)
     */
    reset() {
        this.qLearning.reset();
        this.memory.resetShortTerm();
        this.previousState = null;
        this.previousAction = null;
        structuredLogger.info('🔄 ML reseteado');
    }
}

export default AutonomousLearner;
