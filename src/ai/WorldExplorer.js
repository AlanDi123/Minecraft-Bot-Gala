/**
 * Explorador de Mundo Autónomo
 * @module ai/WorldExplorer
 */

import fs from 'fs/promises';
import path from 'path';
import structuredLogger from '../utils/logger.js';

const BIOME_RESOURCES = {
    plains: ['oak_log', 'cow', 'pig', 'sheep'],
    forest: ['oak_log', 'birch_log', 'wolf', 'mushroom'],
    desert: ['sand', 'cactus', 'dead_bush'],
    mountains: ['stone', 'coal_ore', 'iron_ore', 'goat'],
    jungle: ['jungle_log', 'vine', 'cocoa'],
    swamp: ['lily_pad', 'clay', 'slime'],
    taiga: ['spruce_log', 'wolf', 'fox']
};

export class WorldExplorer {
    constructor(options = {}) {
        this.exploredChunksFile = options.exploredChunksFile || './ml_data/explored_chunks.json';
        this.exploredChunks = new Set();
        this.spawnPoint = null;
        this.explorationAngle = 0;
        this.explorationRadius = 50;
    }

    async load() {
        try {
            const data = JSON.parse(await fs.readFile(this.exploredChunksFile, 'utf8'));
            this.exploredChunks = new Set(Array.isArray(data) ? data : []);
        } catch (_) { /* no file yet */ }
    }

    async save() {
        try {
            const dir = path.dirname(this.exploredChunksFile);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(
                this.exploredChunksFile,
                JSON.stringify([...this.exploredChunks], null, 2)
            );
        } catch (e) {
            structuredLogger.error(`Error guardando chunks explorados: ${e.message}`);
        }
    }

    rememberSpawnPoint(bot) {
        if (bot && bot.entity) {
            this.spawnPoint = {
                x: Math.round(bot.entity.position.x),
                y: Math.round(bot.entity.position.y),
                z: Math.round(bot.entity.position.z)
            };
            structuredLogger.info('📍 Spawn point guardado', this.spawnPoint);
        }
    }

    _chunkKey(x, z) {
        return `${Math.floor(x / 16)},${Math.floor(z / 16)}`;
    }

    markChunkExplored(x, z) {
        this.exploredChunks.add(this._chunkKey(x, z));
    }

    isChunkExplored(x, z) {
        return this.exploredChunks.has(this._chunkKey(x, z));
    }

    async exploreSmartly(bot, pathfinder, scanner) {
        if (!bot || !bot.entity) return;
        const pos = bot.entity.position;
        this.markChunkExplored(pos.x, pos.z);
        
        // Spiral exploration
        this.explorationAngle += Math.PI / 4; // 45 degrees
        if (this.explorationAngle >= Math.PI * 2) {
            this.explorationAngle = 0;
            this.explorationRadius += 32;
        }
        
        const targetX = Math.round(pos.x + Math.cos(this.explorationAngle) * this.explorationRadius);
        const targetZ = Math.round(pos.z + Math.sin(this.explorationAngle) * this.explorationRadius);
        
        if (!this.isChunkExplored(targetX, targetZ)) {
            try {
                await pathfinder.goTo(targetX, pos.y, targetZ, { timeout: 20000 });
                this.markChunkExplored(targetX, targetZ);
                structuredLogger.debug(`🗺️ Chunk explorado: ${this._chunkKey(targetX, targetZ)}`);
            } catch (e) {
                structuredLogger.warn(`Error explorando chunk: ${e.message}`);
            }
        }
    }

    findBiomeWithResource(resourceType) {
        for (const [biome, resources] of Object.entries(BIOME_RESOURCES)) {
            if (resources.includes(resourceType)) return biome;
        }
        return null;
    }

    async navigateToUnexplored(bot, pathfinder) {
        if (!bot || !bot.entity) return;
        const pos = bot.entity.position;
        
        // Find nearest unexplored chunk
        for (let r = 16; r <= 256; r += 16) {
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
                const testX = Math.round(pos.x + Math.cos(angle) * r);
                const testZ = Math.round(pos.z + Math.sin(angle) * r);
                if (!this.isChunkExplored(testX, testZ)) {
                    try {
                        await pathfinder.goTo(testX, pos.y, testZ, { timeout: 20000 });
                        this.markChunkExplored(testX, testZ);
                        return;
                    } catch (_) { /* try next */ }
                }
            }
        }
    }

    async findNearestVillage(bot) {
        if (!bot) return null;
        try {
            const hayBlock = bot.findBlock({
                matching: (b) => b && b.name === 'hay_block',
                maxDistance: 200
            });
            if (hayBlock) return hayBlock.position;
            const bellBlock = bot.findBlock({
                matching: (b) => b && b.name === 'bell',
                maxDistance: 200
            });
            if (bellBlock) return bellBlock.position;
        } catch (_) { /* no village found */ }
        return null;
    }
}

export default WorldExplorer;
