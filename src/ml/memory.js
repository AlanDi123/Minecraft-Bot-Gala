/**
 * Memoria Persistente del Bot
 * Guarda conocimiento del mundo, experiencias y progreso
 * @module ml/memory
 */

import fs from 'fs';
import path from 'path';
import structuredLogger from '../utils/logger.js';

/**
 * Sistema de memoria persistente para el bot
 * Almacena conocimiento del mundo y experiencias aprendidas
 */
export class BotMemory {
    constructor(options = {}) {
        this.saveFile = options.saveFile || './ml_data/memory.json';
        this.worldFile = options.worldFile || './ml_data/world_data.json';
        
        // Memoria a corto plazo
        this.shortTermMemory = {
            recentLocations: [],
            recentDangers: [],
            recentResources: [],
            recentActions: [],
            sessionStartTime: Date.now()
        };
        
        // Memoria a largo plazo (conocimiento aprendido)
        this.longTermMemory = {
            safeLocations: [],
            dangerZones: [],
            resourceLocations: {},
            shelterLocations: [],
            learnedBehaviors: {},
            worldSeed: null,
            spawnPoint: null
        };
        
        // Conocimiento del mundo
        this.worldKnowledge = {
            biomes: {},
            structures: [],
            caves: [],
            villages: [],
            dungeons: [],
            temples: []
        };
        
        // Progreso del bot
        this.progress = {
            totalPlayTime: 0,
            sessionsCompleted: 0,
            deaths: 0,
            achievements: [],
            skillsLearned: [],
            itemsCrafted: {},
            blocksMined: {},
            mobsKilled: {},
            lastPosition: null,
            lastInventory: null
        };
        
        // Cargar datos guardados
        this.load();
        
        structuredLogger.info('🧠 Memoria del bot inicializada');
    }
    
    /**
     * Registrar ubicación reciente
     */
    rememberLocation(position, type = 'unknown') {
        this.shortTermMemory.recentLocations.push({
            x: Math.round(position.x),
            y: Math.round(position.y),
            z: Math.round(position.z),
            type,
            timestamp: Date.now()
        });
        
        // Limitar tamaño
        if (this.shortTermMemory.recentLocations.length > 100) {
            this.shortTermMemory.recentLocations.shift();
        }
    }
    
    /**
     * Registrar zona peligrosa
     */
    rememberDanger(position, threatType, severity = 1) {
        const dangerZone = {
            x: Math.round(position.x),
            y: Math.round(position.y),
            z: Math.round(position.z),
            threatType,
            severity,
            timestamp: Date.now(),
            expiresAt: Date.now() + (3600000 * severity) // 1 hora * severidad
        };
        
        this.shortTermMemory.recentDangers.push(dangerZone);
        this.longTermMemory.dangerZones.push(dangerZone);
        
        // Limitar tamaño
        if (this.shortTermMemory.recentDangers.length > 50) {
            this.shortTermMemory.recentDangers.shift();
        }
    }
    
    /**
     * Registrar ubicación de recurso
     */
    rememberResource(resourceType, position, quantity = 1) {
        if (!this.longTermMemory.resourceLocations[resourceType]) {
            this.longTermMemory.resourceLocations[resourceType] = [];
        }
        
        // Verificar si ya existe cerca
        const existing = this.longTermMemory.resourceLocations[resourceType].find(r => {
            const dist = Math.sqrt(
                Math.pow(r.x - position.x, 2) +
                Math.pow(r.y - position.y, 2) +
                Math.pow(r.z - position.z, 2)
            );
            return dist < 10;
        });
        
        if (!existing) {
            this.longTermMemory.resourceLocations[resourceType].push({
                x: Math.round(position.x),
                y: Math.round(position.y),
                z: Math.round(position.z),
                quantity,
                discoveredAt: Date.now(),
                timesVisited: 1
            });
        } else {
            existing.timesVisited++;
            existing.quantity += quantity;
        }
        
        this.shortTermMemory.recentResources.push({
            resourceType,
            position: {
                x: Math.round(position.x),
                y: Math.round(position.y),
                z: Math.round(position.z)
            },
            timestamp: Date.now()
        });
    }
    
    /**
     * Registrar refugio seguro
     */
    rememberShelter(position, quality = 1) {
        this.longTermMemory.shelterLocations.push({
            x: Math.round(position.x),
            y: Math.round(position.y),
            z: Math.round(position.z),
            quality,
            discoveredAt: Date.now(),
            timesUsed: 1
        });
    }
    
    /**
     * Obtener zona segura más cercana
     */
    getNearestSafeLocation(position, radius = 100) {
        const safeLocations = [
            ...this.longTermMemory.safeLocations,
            ...this.longTermMemory.shelterLocations
        ];
        
        let nearest = null;
        let nearestDist = Infinity;
        
        for (const loc of safeLocations) {
            const dist = Math.sqrt(
                Math.pow(loc.x - position.x, 2) +
                Math.pow(loc.z - position.z, 2)
            );
            
            if (dist < nearestDist && dist <= radius) {
                nearestDist = dist;
                nearest = loc;
            }
        }
        
        return nearest;
    }
    
    /**
     * Obtener recurso más cercano
     */
    getNearestResource(position, resourceType, radius = 64) {
        const resources = this.longTermMemory.resourceLocations[resourceType] || [];
        
        let nearest = null;
        let nearestDist = Infinity;
        
        for (const res of resources) {
            const dist = Math.sqrt(
                Math.pow(res.x - position.x, 2) +
                Math.pow(res.z - position.z, 2)
            );
            
            if (dist < nearestDist && dist <= radius) {
                nearestDist = dist;
                nearest = res;
            }
        }
        
        return nearest;
    }
    
    /**
     * Verificar si zona es peligrosa
     */
    isDangerZone(position, radius = 20) {
        const now = Date.now();
        
        return this.longTermMemory.dangerZones.some(danger => {
            if (danger.expiresAt && danger.expiresAt < now) {
                return false; // Expirado
            }
            
            const dist = Math.sqrt(
                Math.pow(danger.x - position.x, 2) +
                Math.pow(danger.y - position.y, 2) +
                Math.pow(danger.z - position.z, 2)
            );
            
            return dist <= radius;
        });
    }
    
    /**
     * Registrar comportamiento aprendido
     */
    learnBehavior(stateKey, action, successRate) {
        this.longTermMemory.learnedBehaviors[stateKey] = {
            bestAction: action,
            successRate,
            learnedAt: Date.now(),
            timesTested: 1
        };
    }
    
    /**
     * Obtener mejor comportamiento para estado
     */
    getBestBehavior(stateKey) {
        return this.longTermMemory.learnedBehaviors[stateKey] || null;
    }
    
    /**
     * Registrar progreso
     */
    trackProgress(event, data = {}) {
        switch (event) {
            case 'death':
                this.progress.deaths++;
                break;
            case 'craft':
                const item = data.item || 'unknown';
                this.progress.itemsCrafted[item] = (this.progress.itemsCrafted[item] || 0) + 1;
                break;
            case 'mine':
                const block = data.block || 'unknown';
                this.progress.blocksMined[block] = (this.progress.blocksMined[block] || 0) + 1;
                break;
            case 'kill':
                const mob = data.mob || 'unknown';
                this.progress.mobsKilled[mob] = (this.progress.mobsKilled[mob] || 0) + 1;
                break;
            case 'achievement':
                if (!this.progress.achievements.includes(data.achievement)) {
                    this.progress.achievements.push(data.achievement);
                }
                break;
            case 'skill':
                if (!this.progress.skillsLearned.includes(data.skill)) {
                    this.progress.skillsLearned.push(data.skill);
                }
                break;
        }
    }
    
    /**
     * Actualizar posición e inventario
     */
    updateStatus(position, inventory) {
        this.progress.lastPosition = {
            x: Math.round(position.x),
            y: Math.round(position.y),
            z: Math.round(position.z),
            updatedAt: Date.now()
        };
        
        this.progress.lastInventory = {
            ...inventory,
            updatedAt: Date.now()
        };
    }
    
    /**
     * Guardar memoria
     */
    save() {
        try {
            // Crear directorio
            const dir = path.dirname(this.saveFile);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            // Actualizar tiempo de juego
            this.progress.totalPlayTime = Date.now() - this.shortTermMemory.sessionStartTime;
            
            // Guardar memoria
            fs.writeFileSync(this.saveFile, JSON.stringify({
                shortTermMemory: this.shortTermMemory,
                longTermMemory: this.longTermMemory,
                progress: this.progress,
                savedAt: Date.now()
            }, null, 2));
            
            // Guardar conocimiento del mundo
            fs.writeFileSync(this.worldFile, JSON.stringify({
                worldKnowledge: this.worldKnowledge,
                savedAt: Date.now()
            }, null, 2));
            
            structuredLogger.debug('💾 Memoria guardada', {
                locations: this.shortTermMemory.recentLocations.length,
                dangers: this.longTermMemory.dangerZones.length,
                resources: Object.keys(this.longTermMemory.resourceLocations).length
            });
        } catch (e) {
            structuredLogger.error(`Error guardando memoria: ${e.message}`);
        }
    }
    
    /**
     * Cargar memoria
     */
    load() {
        try {
            if (fs.existsSync(this.saveFile)) {
                const data = JSON.parse(fs.readFileSync(this.saveFile, 'utf8'));
                
                this.shortTermMemory = {
                    ...this.shortTermMemory,
                    ...data.shortTermMemory
                };
                
                this.longTermMemory = {
                    ...this.longTermMemory,
                    ...data.longTermMemory
                };
                
                this.progress = {
                    ...this.progress,
                    ...data.progress
                };
                
                structuredLogger.info('📂 Memoria cargada', {
                    sessions: this.progress.sessionsCompleted,
                    deaths: this.progress.deaths,
                    achievements: this.progress.achievements.length
                });
            }
            
            if (fs.existsSync(this.worldFile)) {
                const data = JSON.parse(fs.readFileSync(this.worldFile, 'utf8'));
                this.worldKnowledge = {
                    ...this.worldKnowledge,
                    ...data.worldKnowledge
                };
                
                structuredLogger.info('📂 Conocimiento del mundo cargado', {
                    biomes: Object.keys(this.worldKnowledge.biomes).length,
                    structures: this.worldKnowledge.structures.length
                });
            }
        } catch (e) {
            structuredLogger.error(`Error cargando memoria: ${e.message}`);
        }
    }
    
    /**
     * Obtener estadísticas de memoria
     */
    getStats() {
        return {
            sessionTime: Date.now() - this.shortTermMemory.sessionStartTime,
            totalPlayTime: this.progress.totalPlayTime,
            locationsRemembered: this.shortTermMemory.recentLocations.length,
            dangerZones: this.longTermMemory.dangerZones.length,
            resourceTypes: Object.keys(this.longTermMemory.resourceLocations).length,
            shelters: this.longTermMemory.shelterLocations.length,
            learnedBehaviors: Object.keys(this.longTermMemory.learnedBehaviors).length,
            deaths: this.progress.deaths,
            achievements: this.progress.achievements.length,
            itemsCrafted: Object.keys(this.progress.itemsCrafted).length,
            blocksMined: Object.keys(this.progress.blocksMined).length
        };
    }
    
    /**
     * Resetear memoria a corto plazo (nueva sesión)
     */
    resetShortTerm() {
        this.progress.sessionsCompleted++;
        this.shortTermMemory = {
            recentLocations: [],
            recentDangers: [],
            recentResources: [],
            recentActions: [],
            sessionStartTime: Date.now()
        };
        
        structuredLogger.info('🔄 Memoria a corto plazo reseteada');
    }
    
    /**
     * Exportar memoria para análisis
     */
    exportMemory() {
        return {
            shortTermMemory: this.shortTermMemory,
            longTermMemory: this.longTermMemory,
            worldKnowledge: this.worldKnowledge,
            progress: this.progress,
            stats: this.getStats()
        };
    }
}

export default BotMemory;
