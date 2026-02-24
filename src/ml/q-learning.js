/**
 * Sistema de Q-Learning para toma de decisiones autónoma
 * @module ml/q-learning
 */

import fs from 'fs';
import path from 'path';
import structuredLogger from '../utils/logger.js';

/**
 * Clase principal de Q-Learning
 * Implementa aprendizaje por refuerzo para que el bot aprenda
 * qué acciones tomar en cada estado del juego
 */
export class QLearning {
    constructor(options = {}) {
        // Hiperparámetros
        this.learningRate = options.learningRate || 0.1; // Alpha
        this.discountFactor = options.discountFactor || 0.95; // Gamma
        this.explorationRate = options.explorationRate || 0.3; // Epsilon
        this.explorationDecay = options.explorationDecay || 0.995;
        this.minExploration = options.minExploration || 0.01;
        
        // Tabla Q: estado -> acción -> valor
        this.qTable = {};
        
        // Archivo de persistencia
        this.saveFile = options.saveFile || './ml_data/q_table.json';
        this.experienceFile = options.experienceFile || './ml_data/experiences.json';
        
        // Experiencias almacenadas
        this.experiences = [];
        this.maxExperiences = options.maxExperiences || 10000;
        
        // Estadísticas
        this.stats = {
            totalDecisions: 0,
            explorations: 0,
            exploitations: 0,
            totalReward: 0,
            episodesCompleted: 0
        };
        
        // Cargar datos guardados
        this.load();
        
        structuredLogger.info('🧠 Q-Learning inicializado', {
            learningRate: this.learningRate,
            discountFactor: this.discountFactor,
            explorationRate: this.explorationRate
        });
    }
    
    /**
     * Convertir estado del juego a string para la tabla Q
     * @param {Object} state - Estado actual del bot
     * @returns {string} Estado serializado
     */
    serializeState(state) {
        // Discretizar estado para reducir espacio de estados
        const discretized = {
            health: Math.floor(state.health / 5) * 5, // Grupos de 5
            food: Math.floor(state.food / 5) * 5,
            hasPickaxe: state.hasPickaxe ? 1 : 0,
            hasSword: state.hasSword ? 1 : 0,
            hasAxe: state.hasAxe ? 1 : 0,
            hasShield: state.hasShield ? 1 : 0,
            plankCount: Math.min(Math.floor(state.plankCount / 10) * 10, 100),
            logCount: Math.min(Math.floor(state.logCount / 5) * 5, 50),
            hasTable: state.hasTable ? 1 : 0,
            hasFurnace: state.hasFurnace ? 1 : 0,
            nearbyHostiles: Math.min(state.nearbyHostiles || 0, 5),
            isNight: state.isNight ? 1 : 0,
            biome: state.biome || 'unknown',
            hasArmor: state.hasArmor ? 1 : 0,
            hasFood: (state.foodItems || 0) > 0 ? 1 : 0
        };
        
        return JSON.stringify(discretized);
    }
    
    /**
     * Acciones posibles que el bot puede tomar
     */
    getActions() {
        return [
            'GATHER_WOOD',
            'GATHER_STONE',
            'GATHER_FOOD',
            'CRAFT_PLANKS',
            'CRAFT_PICKAXE',
            'CRAFT_SWORD',
            'CRAFT_TABLE',
            'CRAFT_FURNACE',
            'MINE_IRON',
            'MINE_DIAMOND',
            'EXPLORE',
            'FLEE',
            'FIGHT',
            'EAT',
            'SLEEP',
            'BUILD_SHELTER',
            'IDLE'
        ];
    }
    
    /**
     * Obtener valores Q para un estado
     * @param {string} stateKey - Estado serializado
     * @returns {Object} Valores Q para cada acción
     */
    getQValues(stateKey) {
        if (!this.qTable[stateKey]) {
            // Inicializar con valores pequeños aleatorios para exploración
            const actions = this.getActions();
            this.qTable[stateKey] = {};
            for (const action of actions) {
                this.qTable[stateKey][action] = 0.01 * Math.random();
            }
        }
        return this.qTable[stateKey];
    }
    
    /**
     * Seleccionar acción usando política epsilon-greedy
     * @param {Object} state - Estado actual
     * @returns {string} Acción seleccionada
     */
    selectAction(state) {
        this.stats.totalDecisions++;
        
        const stateKey = this.serializeState(state);
        const qValues = this.getQValues(stateKey);
        
        // Epsilon-greedy
        if (Math.random() < this.explorationRate) {
            // Exploración: acción aleatoria
            this.stats.explorations++;
            const actions = this.getActions();
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            return randomAction;
        } else {
            // Explotación: mejor acción según Q-values
            this.stats.exploitations++;
            let bestAction = null;
            let bestValue = -Infinity;
            
            for (const [action, value] of Object.entries(qValues)) {
                if (value > bestValue) {
                    bestValue = value;
                    bestAction = action;
                }
            }
            
            return bestAction;
        }
    }
    
    /**
     * Actualizar Q-value usando Q-Learning update rule
     * Q(s,a) = Q(s,a) + α * (r + γ * max(Q(s',a')) - Q(s,a))
     * @param {string} state - Estado anterior
     * @param {string} action - Acción tomada
     * @param {number} reward - Recompensa recibida
     * @param {Object} nextState - Estado siguiente
     */
    update(state, action, reward, nextState) {
        const stateKey = this.serializeState(state);
        const nextStateKey = this.serializeState(nextState);
        
        const qValues = this.getQValues(stateKey);
        const nextQValues = this.getQValues(nextStateKey);
        
        // Max Q-value del siguiente estado
        let maxNextQ = -Infinity;
        for (const value of Object.values(nextQValues)) {
            if (value > maxNextQ) {
                maxNextQ = value;
            }
        }
        
        // Q-Learning update
        const currentQ = qValues[action];
        const newQ = currentQ + this.learningRate * (
            reward + this.discountFactor * maxNextQ - currentQ
        );
        
        qValues[action] = newQ;
        this.qTable[stateKey] = qValues;
        
        // Actualizar estadísticas
        this.stats.totalReward += reward;
        
        // Guardar experiencia
        this.storeExperience({ state, action, reward, nextState, timestamp: Date.now() });
    }
    
    /**
     * Almacenar experiencia para aprendizaje offline
     * @param {Object} experience - Experiencia almacenada
     */
    storeExperience(experience) {
        this.experiences.push(experience);
        
        // Limitar tamaño
        if (this.experiences.length > this.maxExperiences) {
            this.experiences.shift();
        }
    }
    
    /**
     * Aprendizaje offline usando batch de experiencias
     * @param {number} batchSize - Tamaño del batch
     */
    learnFromExperiences(batchSize = 32) {
        if (this.experiences.length < batchSize) return;
        
        // Muestrear batch aleatorio
        const batch = [];
        for (let i = 0; i < batchSize; i++) {
            const randomIndex = Math.floor(Math.random() * this.experiences.length);
            batch.push(this.experiences[randomIndex]);
        }
        
        // Aprender de cada experiencia
        for (const exp of batch) {
            this.update(exp.state, exp.action, exp.reward, exp.nextState);
        }
    }
    
    /**
     * Decaer exploración rate
     */
    decayExploration() {
        this.explorationRate = Math.max(
            this.minExploration,
            this.explorationRate * this.explorationDecay
        );
    }
    
    /**
     * Guardar modelo y experiencias
     */
    save() {
        try {
            // Crear directorio si no existe
            const dir = path.dirname(this.saveFile);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            // Guardar Q-Table
            fs.writeFileSync(this.saveFile, JSON.stringify({
                qTable: this.qTable,
                stats: this.stats,
                explorationRate: this.explorationRate,
                savedAt: Date.now()
            }, null, 2));
            
            // Guardar experiencias
            fs.writeFileSync(this.experienceFile, JSON.stringify({
                experiences: this.experiences,
                count: this.experiences.length
            }, null, 2));
            
            structuredLogger.debug('💾 Q-Learning guardado', {
                states: Object.keys(this.qTable).length,
                experiences: this.experiences.length
            });
        } catch (e) {
            structuredLogger.error(`Error guardando Q-Learning: ${e.message}`);
        }
    }
    
    /**
     * Cargar modelo y experiencias
     */
    load() {
        try {
            // Cargar Q-Table
            if (fs.existsSync(this.saveFile)) {
                const data = JSON.parse(fs.readFileSync(this.saveFile, 'utf8'));
                this.qTable = data.qTable || {};
                this.stats = data.stats || this.stats;
                this.explorationRate = data.explorationRate || this.explorationRate;
                
                structuredLogger.info('📂 Q-Table cargada', {
                    states: Object.keys(this.qTable).length,
                    totalDecisions: this.stats.totalDecisions
                });
            }
            
            // Cargar experiencias
            if (fs.existsSync(this.experienceFile)) {
                const data = JSON.parse(fs.readFileSync(this.experienceFile, 'utf8'));
                this.experiences = data.experiences || [];
                
                structuredLogger.info('📂 Experiencias cargadas', {
                    count: this.experiences.length
                });
            }
        } catch (e) {
            structuredLogger.error(`Error cargando Q-Learning: ${e.message}`);
        }
    }
    
    /**
     * Obtener estadísticas de aprendizaje
     */
    getStats() {
        return {
            ...this.stats,
            explorationRate: this.explorationRate,
            qTableSize: Object.keys(this.qTable).length,
            experienceCount: this.experiences.length,
            avgReward: this.stats.totalDecisions > 0 
                ? (this.stats.totalReward / this.stats.totalDecisions).toFixed(3) 
                : 0
        };
    }
    
    /**
     * Resetear aprendizaje (para debugging)
     */
    reset() {
        this.qTable = {};
        this.experiences = [];
        this.stats = {
            totalDecisions: 0,
            explorations: 0,
            exploitations: 0,
            totalReward: 0,
            episodesCompleted: 0
        };
        this.explorationRate = 0.3;
        structuredLogger.info('🔄 Q-Learning reseteado');
    }
}

export default QLearning;
