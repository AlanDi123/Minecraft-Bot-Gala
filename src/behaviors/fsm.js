/**
 * Máquina de Estados Finita (FSM) para comportamientos del bot
 * @module behaviors/fsm
 */

import structuredLogger from '../utils/logger.js';

/**
 * Estados posibles del bot
 */
export const BotStates = {
    IDLE: 'IDLE',
    INIT: 'INIT',
    ASSESS: 'ASSESS',
    EMERGENCY: 'EMERGENCY',
    RECOVERY: 'RECOVERY',
    
    // Recolección
    GATHER_WOOD: 'GATHER_WOOD',
    GATHER_STONE: 'GATHER_STONE',
    GATHER_COAL: 'GATHER_COAL',
    GATHER_FOOD: 'GATHER_FOOD',
    
    // Crafteo
    CRAFT_BASIC: 'CRAFT_BASIC',
    CRAFT_TOOLS: 'CRAFT_TOOLS',
    CRAFT_ARMOR: 'CRAFT_ARMOR',
    
    // Minería
    MINE_IRON: 'MINE_IRON',
    MINE_DIAMOND: 'MINE_DIAMOND',
    MINE_OBSIDIAN: 'MINE_OBSIDIAN',
    
    // Supervivencia
    EAT: 'EAT',
    SLEEP: 'SLEEP',
    FLEE: 'FLEE',
    
    // Combate
    COMBAT: 'COMBAT',
    
    // Construcción
    BUILD_PORTAL: 'BUILD_PORTAL',
    BUILD_SHELTER: 'BUILD_SHELTER',
    BUILD_BASE: 'BUILD_BASE',
    
    // Exploración
    EXPLORE: 'EXPLORE',
    EXPLORE_CAVE: 'EXPLORE_CAVE',
    
    // Progresión
    NETHER: 'NETHER',
    END: 'END',
    FIGHT_DRAGON: 'FIGHT_DRAGON',
    
    // Actividades
    FARM: 'FARM',
    TRADE: 'TRADE',
    ENCHANT: 'ENCHANT',
    BREW: 'BREW',
    
    // Final
    VICTORY: 'VICTORY'
};

/**
 * Prioridades de estados (mayor número = más prioritario)
 */
const STATE_PRIORITY = {
    [BotStates.EMERGENCY]: 100,
    [BotStates.RECOVERY]: 90,
    [BotStates.FLEE]: 85,
    [BotStates.COMBAT]: 80,
    [BotStates.EAT]: 70,
    [BotStates.SLEEP]: 60,
    [BotStates.IDLE]: 1,
    [BotStates.INIT]: 1
};

/**
 * Clase principal de FSM
 */
export class FiniteStateMachine {
    constructor(options = {}) {
        this.currentState = options.initialState || BotStates.IDLE;
        this.previousState = null;
        this.stateHistory = [];
        this.context = options.context || {};
        this.taskStack = [];
        this.listeners = new Map();
        this.maxHistorySize = options.maxHistorySize || 100;
        
        structuredLogger.debug('FSM inicializada', { 
            initialState: this.currentState 
        });
    }
    
    /**
     * Transicionar a nuevo estado
     * @param {string} newState - Nuevo estado
     * @param {Object} context - Contexto adicional
     * @returns {boolean} Si la transición fue exitosa
     */
    async transition(newState, context = {}) {
        // Validar estado
        if (!Object.values(BotStates).includes(newState)) {
            structuredLogger.error('Estado inválido', { state: newState });
            return false;
        }
        
        // Guardar estado anterior
        this.previousState = this.currentState;
        
        // Actualizar estado
        this.currentState = newState;
        this.context = { ...this.context, ...context };
        
        // Registrar en historial
        this.stateHistory.push({
            state: newState,
            timestamp: Date.now(),
            context
        });
        
        // Limitar historial
        if (this.stateHistory.length > this.maxHistorySize) {
            this.stateHistory.shift();
        }
        
        // Emitir evento
        this.emit('stateChange', {
            from: this.previousState,
            to: newState,
            context
        });
        
        structuredLogger.state(newState, {
            from: this.previousState,
            ...context
        });
        
        return true;
    }
    
    /**
     * Empujar tarea a stack
     * @param {Object} task - Tarea a ejecutar
     */
    pushTask(task) {
        this.taskStack.push({
            ...task,
            addedAt: Date.now(),
            status: 'pending'
        });
        
        structuredLogger.debug('Tarea añadida al stack', {
            task: task.name,
            stackSize: this.taskStack.length
        });
    }
    
    /**
     * Pop tarea del stack
     * @returns {Object|null} Tarea o null
     */
    popTask() {
        if (this.taskStack.length === 0) {
            return null;
        }
        
        const task = this.taskStack.pop();
        structuredLogger.debug('Tarea removida del stack', {
            task: task.name
        });
        
        return task;
    }
    
    /**
     * Obtener tarea actual
     * @returns {Object|null}
     */
    getCurrentTask() {
        return this.taskStack[this.taskStack.length - 1] || null;
    }
    
    /**
     * Marcar tarea como completada
     * @param {string} taskName - Nombre de la tarea
     */
    completeTask(taskName) {
        const task = this.taskStack.find(t => t.name === taskName);
        if (task) {
            task.status = 'completed';
            task.completedAt = Date.now();
            
            structuredLogger.info('Tarea completada', {
                task: taskName,
                duration: task.completedAt - task.addedAt
            });
        }
    }
    
    /**
     * Marcar tarea como fallida
     * @param {string} taskName - Nombre de la tarea
     * @param {string} reason - Razón del fallo
     */
    failTask(taskName, reason = 'unknown') {
        const task = this.taskStack.find(t => t.name === taskName);
        if (task) {
            task.status = 'failed';
            task.failedAt = Date.now();
            task.failReason = reason;
            
            structuredLogger.warn('Tarea fallida', {
                task: taskName,
                reason
            });
        }
    }
    
    /**
     * Obtener estado actual
     * @returns {string}
     */
    getState() {
        return this.currentState;
    }
    
    /**
     * Obtener estado anterior
     * @returns {string}
     */
    getPreviousState() {
        return this.previousState;
    }
    
    /**
     * Obtener historial de estados
     * @param {number} limit - Límite de entradas
     * @returns {Array}
     */
    getHistory(limit = 10) {
        return this.stateHistory.slice(-limit);
    }
    
    /**
     * Obtener contexto actual
     * @returns {Object}
     */
    getContext() {
        return { ...this.context };
    }
    
    /**
     * Suscribirse a eventos
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Callback
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        
        this.listeners.get(event).push(callback);
    }
    
    /**
     * Desuscribirse de eventos
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Callback
     */
    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    /**
     * Emitir evento
     * @param {string} event - Nombre del evento
     * @param {Object} data - Datos del evento
     */
    emit(event, data = {}) {
        if (this.listeners.has(event)) {
            for (const callback of this.listeners.get(event)) {
                try {
                    callback(data);
                } catch (error) {
                    structuredLogger.error('Error en listener', {
                        event,
                        error: error.message
                    });
                }
            }
        }
    }
    
    /**
     * Obtener prioridad de estado
     * @param {string} state - Estado
     * @returns {number}
     */
    getPriority(state) {
        return STATE_PRIORITY[state] || 0;
    }
    
    /**
     * Verificar si estado es de alta prioridad
     * @param {string} state - Estado
     * @returns {boolean}
     */
    isHighPriority(state) {
        return this.getPriority(state) >= 80;
    }
    
    /**
     * Resetear FSM
     */
    reset() {
        this.currentState = BotStates.IDLE;
        this.previousState = null;
        this.context = {};
        this.taskStack = [];
        
        structuredLogger.info('FSM reseteada');
    }
    
    /**
     * Obtener estadísticas
     * @returns {Object}
     */
    getStats() {
        const stateCounts = {};
        for (const entry of this.stateHistory) {
            stateCounts[entry.state] = (stateCounts[entry.state] || 0) + 1;
        }
        
        return {
            currentState: this.currentState,
            previousState: this.previousState,
            totalTransitions: this.stateHistory.length,
            pendingTasks: this.taskStack.filter(t => t.status === 'pending').length,
            completedTasks: this.taskStack.filter(t => t.status === 'completed').length,
            failedTasks: this.taskStack.filter(t => t.status === 'failed').length,
            stateDistribution: stateCounts
        };
    }
}

export default FiniteStateMachine;
