/**
 * Sistema de Memoria Episódica a Largo Plazo
 * @module ai/LearningMemorySystem
 */

import fs from 'fs/promises';
import path from 'path';
import structuredLogger from '../utils/logger.js';

export class LearningMemorySystem {
    constructor(options = {}) {
        this.episodicFile = options.episodicFile || './ml_data/episodic_memory.json';
        this.resourceMapFile = options.resourceMapFile || './ml_data/resource_map.json';
        
        this.deathMemories = [];
        this.successMemories = [];
        this.resourceMaps = {};
        this.dangerZones = [];
        this.tacticalPatterns = [];
    }

    async load() {
        try {
            const data = JSON.parse(await fs.readFile(this.episodicFile, 'utf8'));
            this.deathMemories = data.deathMemories || [];
            this.successMemories = data.successMemories || [];
            this.resourceMaps = data.resourceMaps || {};
            this.dangerZones = data.dangerZones || [];
            this.tacticalPatterns = data.tacticalPatterns || [];
            structuredLogger.info('📂 Memoria episódica cargada', { deaths: this.deathMemories.length });
        } catch (e) {
            structuredLogger.warn('Memoria episódica no encontrada, iniciando limpia');
        }
        try {
            const data = JSON.parse(await fs.readFile(this.resourceMapFile, 'utf8'));
            this.resourceMaps = { ...this.resourceMaps, ...data };
        } catch (_) { /* no resource map yet */ }
    }

    async save() {
        try {
            const dir = path.dirname(this.episodicFile);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(this.episodicFile, JSON.stringify({
                deathMemories: this.deathMemories,
                successMemories: this.successMemories,
                resourceMaps: this.resourceMaps,
                dangerZones: this.dangerZones,
                tacticalPatterns: this.tacticalPatterns,
                savedAt: Date.now()
            }, null, 2));
            await fs.writeFile(this.resourceMapFile, JSON.stringify(this.resourceMaps, null, 2));
        } catch (e) {
            structuredLogger.error(`Error guardando memoria episódica: ${e.message}`);
        }
    }

    recordDeath(deathData) {
        const lesson = this._extractLesson(deathData);
        this.deathMemories.push({
            ...deathData,
            lesson,
            timestamp: Date.now()
        });
        if (this.deathMemories.length > 100) this.deathMemories.shift();
        structuredLogger.warn(`💀 Muerte registrada. Lección: ${lesson}`);
    }

    _extractLesson(deathData) {
        const { cause, botState_at_death } = deathData;
        if (!botState_at_death) return 'Tener cuidado';
        if (botState_at_death.health < 8 && botState_at_death.nearbyHostiles > 0) {
            return 'Huir cuando health < 8 con enemigos cercanos';
        }
        if (cause && cause.includes('lava')) return 'Evitar lava sin agua cerca';
        if (cause && cause.includes('fall')) return 'Cuidado con caídas altas';
        if (botState_at_death.food < 6) return 'Comer antes de aventurarse';
        return `Evitar situación: ${cause || 'desconocida'}`;
    }

    getLessonsForContext(currentContext) {
        const relevantDeaths = this.deathMemories.filter(death => {
            if (!death.botState_at_death) return false;
            const stateSimilar = Math.abs((death.botState_at_death.health || 20) - (currentContext.health || 20)) < 5;
            return stateSimilar;
        });
        return relevantDeaths.map(d => d.lesson).filter(Boolean);
    }

    recordResourceCluster(blockType, position, quantity) {
        if (!this.resourceMaps[blockType]) this.resourceMaps[blockType] = [];
        const existing = this.resourceMaps[blockType].find(r => {
            const dist = Math.sqrt(
                Math.pow(r.x - position.x, 2) + Math.pow(r.z - position.z, 2)
            );
            return dist < 16;
        });
        if (existing) {
            existing.quantity = Math.max(existing.quantity, quantity);
            existing.lastSeen = Date.now();
        } else {
            this.resourceMaps[blockType].push({
                x: Math.round(position.x),
                y: Math.round(position.y),
                z: Math.round(position.z),
                quantity,
                lastSeen: Date.now()
            });
        }
    }

    getNearestKnownResource(blockType, currentPosition) {
        const locations = this.resourceMaps[blockType] || [];
        let nearest = null;
        let nearestDist = Infinity;
        for (const loc of locations) {
            const dist = Math.sqrt(
                Math.pow(loc.x - currentPosition.x, 2) + Math.pow(loc.z - currentPosition.z, 2)
            );
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = loc;
            }
        }
        return nearest;
    }

    analyzePastMistakes() {
        if (this.deathMemories.length === 0) return [];
        const recent = this.deathMemories.slice(-10);
        const patterns = {};
        for (const death of recent) {
            const key = death.lesson || 'unknown';
            patterns[key] = (patterns[key] || 0) + 1;
        }
        return Object.entries(patterns)
            .filter(([, count]) => count >= 2)
            .map(([pattern, count]) => ({ pattern, count }));
    }

    shouldAvoidAction(action, currentContext) {
        const recentFailedActions = this.deathMemories
            .slice(-5)
            .filter(d => d.lastAction === action);
        if (recentFailedActions.length >= 3) return true;
        const lessons = this.getLessonsForContext(currentContext);
        if (action === 'MINE_DIAMOND' && lessons.some(l => l.includes('lava'))) return true;
        return false;
    }

    recordSuccess(action, context, reward, phase) {
        this.successMemories.push({
            action, context, reward, phase,
            timestamp: Date.now()
        });
        if (this.successMemories.length > 200) this.successMemories.shift();
    }
}

export default LearningMemorySystem;
