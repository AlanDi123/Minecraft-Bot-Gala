/**
 * Gestor de Estado Persistente
 * @module utils/state-manager
 */

import fs from 'fs';
import structuredLogger from './logger.js';

export class StateManager {
    constructor(options = {}) {
        this.stateFile = options.stateFile || './gala_state_v6.json';
        this.backupFile = options.backupFile || './gala_state_v6_backup.json';
        this.saveInterval = options.saveInterval || 5000;
        
        this.state = {
            botId: null,
            position: { x: 0, y: 0, z: 0 },
            dimension: 'minecraft:overworld',
            currentTask: null,
            currentGoal: null,
            inventory: {},
            health: 20,
            food: 20,
            equipment: {},
            waypoints: [],
            completedPhases: [],
            deaths: 0,
            lastDeathLocation: null,
            sessionStartTime: Date.now(),
            lastSaveTime: Date.now()
        };
        
        this.saveTimer = null;
        this.autoSaveEnabled = true;
    }
    
    /**
     * Cargar estado desde archivo
     */
    async load() {
        try {
            if (fs.existsSync(this.stateFile)) {
                const data = fs.readFileSync(this.stateFile, 'utf8');
                const loaded = JSON.parse(data);
                this.state = { ...this.state, ...loaded };
                structuredLogger.info('Estado cargado desde archivo', { file: this.stateFile });
                return true;
            }
        } catch (error) {
            structuredLogger.error('Error cargando estado', { error: error.message });
            
            // Intentar cargar backup
            if (fs.existsSync(this.backupFile)) {
                try {
                    const data = fs.readFileSync(this.backupFile, 'utf8');
                    const loaded = JSON.parse(data);
                    this.state = { ...this.state, ...loaded };
                    structuredLogger.warn('Estado restaurado desde backup', { file: this.backupFile });
                    return true;
                } catch (backupError) {
                    structuredLogger.error('Backup también corrupto', { error: backupError.message });
                }
            }
        }
        return false;
    }
    
    /**
     * Guardar estado en archivo
     */
    async save() {
        try {
            this.state.lastSaveTime = Date.now();
            
            // Crear backup del archivo actual
            if (fs.existsSync(this.stateFile)) {
                fs.copyFileSync(this.stateFile, this.backupFile);
            }
            
            // Guardar nuevo estado
            fs.writeFileSync(this.stateFile, JSON.stringify(this.state, null, 2));
            structuredLogger.debug('Estado guardado', { file: this.stateFile });
            return true;
        } catch (error) {
            structuredLogger.error('Error guardando estado', { error: error.message });
            return false;
        }
    }
    
    /**
     * Iniciar auto-guardado periódico
     */
    startAutoSave() {
        if (this.autoSaveEnabled && !this.saveTimer) {
            this.saveTimer = setInterval(() => {
                this.save();
            }, this.saveInterval);
            structuredLogger.info('Auto-guardado iniciado', { interval: this.saveInterval });
        }
    }
    
    /**
     * Detener auto-guardado
     */
    stopAutoSave() {
        if (this.saveTimer) {
            clearInterval(this.saveTimer);
            this.saveTimer = null;
            structuredLogger.info('Auto-guardado detenido');
        }
    }
    
    /**
     * Actualizar valor específico
     */
    set(key, value) {
        const keys = key.split('.');
        let current = this.state;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        
        // Auto-guardar si está habilitado
        if (this.autoSaveEnabled) {
            this.save();
        }
    }
    
    /**
     * Obtener valor específico
     */
    get(key, defaultValue = null) {
        const keys = key.split('.');
        let current = this.state;
        
        for (const k of keys) {
            if (current && current[k] !== undefined) {
                current = current[k];
            } else {
                return defaultValue;
            }
        }
        
        return current;
    }
    
    /**
     * Obtener estado completo
     */
    getState() {
        return { ...this.state };
    }
    
    /**
     * Obtener resumen de inventario
     */
    getInventorySummary() {
        return this.state.inventory || {};
    }
    
    /**
     * Actualizar inventario
     */
    updateInventory(inventory) {
        this.state.inventory = inventory;
    }
    
    /**
     * Registrar muerte
     */
    recordDeath(location, cause = 'unknown') {
        this.state.deaths++;
        this.state.lastDeathLocation = {
            ...location,
            cause,
            timestamp: Date.now()
        };
        structuredLogger.warn('Muerte registrada', { 
            deaths: this.state.deaths, 
            location, 
            cause 
        });
    }
    
    /**
     * Añadir waypoint
     */
    addWaypoint(name, location, type = 'custom') {
        this.state.waypoints.push({
            name,
            ...location,
            type,
            timestamp: Date.now()
        });
        structuredLogger.info('Waypoint añadido', { name, type });
    }
    
    /**
     * Marcar fase como completada
     */
    markPhaseCompleted(phase) {
        if (!this.state.completedPhases.includes(phase)) {
            this.state.completedPhases.push(phase);
            structuredLogger.info('Fase completada', { phase });
        }
    }
    
    /**
     * Verificar si fase está completada
     */
    isPhaseCompleted(phase) {
        return this.state.completedPhases.includes(phase);
    }
    
    /**
     * Obtener tiempo de sesión
     */
    getSessionTime() {
        return Date.now() - this.state.sessionStartTime;
    }
    
    /**
     * Formatear tiempo de sesión
     */
    getFormattedSessionTime() {
        const totalSeconds = Math.floor(this.getSessionTime() / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    }
    
    /**
     * Limpiar estado
     */
    reset() {
        this.state = {
            ...this.state,
            currentTask: null,
            currentGoal: null,
            position: { x: 0, y: 0, z: 0 }
        };
        structuredLogger.info('Estado reseteado');
    }
}

export default StateManager;
