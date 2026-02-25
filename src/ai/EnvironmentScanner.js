/**
 * Escáner de Entorno en Tiempo Real
 * @module ai/EnvironmentScanner
 */

import structuredLogger from '../utils/logger.js';

export class EnvironmentScanner {
    constructor() {
        this.lastScan = null;
        this.scanCache = {};
        this.cacheTimeout = 2000; // 2 seconds
    }

    scanNearbyResources(bot, radius = 32) {
        if (!bot || !bot.findBlocks) return {};
        const resourceTypes = [
            'oak_log', 'birch_log', 'spruce_log', 'jungle_log', 'acacia_log', 'dark_oak_log',
            'stone', 'cobblestone', 'coal_ore', 'deepslate_coal_ore',
            'iron_ore', 'deepslate_iron_ore',
            'gold_ore', 'deepslate_gold_ore',
            'diamond_ore', 'deepslate_diamond_ore',
            'water', 'lava'
        ];
        const result = {};
        for (const blockName of resourceTypes) {
            try {
                const positions = bot.findBlocks({
                    matching: (block) => block && block.name === blockName,
                    maxDistance: radius,
                    count: 10
                });
                if (positions && positions.length > 0) {
                    result[blockName] = positions.map(pos => ({
                        position: pos,
                        distance: bot.entity ? bot.entity.position.distanceTo(pos) : 0
                    }));
                }
            } catch (_) { /* block type may not exist */ }
        }
        return result;
    }

    scanNearbyEntities(bot) {
        if (!bot || !bot.entities) return { hostile: [], neutral: [], passive: [] };
        const hostileTypes = ['zombie', 'creeper', 'skeleton', 'spider', 'phantom', 'enderman',
            'witch', 'pillager', 'vindicator', 'ravager', 'blaze', 'wither_skeleton'];
        const neutralTypes = ['pig', 'cow', 'chicken', 'sheep', 'horse', 'llama', 'fox'];
        const hostile = [];
        const neutral = [];
        const passive = [];
        const botPos = bot.entity ? bot.entity.position : null;
        for (const entity of Object.values(bot.entities)) {
            if (!entity || !entity.position) continue;
            const distance = botPos ? botPos.distanceTo(entity.position) : 0;
            if (distance > 64) continue;
            const entityData = { entity, distance, position: entity.position };
            if (hostileTypes.includes(entity.name)) {
                hostile.push(entityData);
            } else if (neutralTypes.includes(entity.name)) {
                neutral.push(entityData);
            } else if (entity.type === 'mob') {
                passive.push(entityData);
            }
        }
        hostile.sort((a, b) => a.distance - b.distance);
        return { hostile, neutral, passive };
    }

    detectBiome(bot) {
        if (!bot || !bot.entity) return 'unknown';
        try {
            const pos = bot.entity.position;
            const block = bot.blockAt(pos);
            return block ? block.biome || 'unknown' : 'unknown';
        } catch (_) {
            return 'unknown';
        }
    }

    detectTimeOfDay(bot) {
        if (!bot || !bot.time) return 'day';
        const time = bot.time.timeOfDay;
        if (time < 1000 || time > 23000) return 'dawn';
        if (time < 6000) return 'day';
        if (time < 12000) return 'day';
        if (time < 13000) return 'dusk';
        if (time < 23000) return 'night';
        return 'dawn';
    }

    findNearestBlock(bot, blockName, maxDistance = 32) {
        if (!bot || !bot.findBlock) return null;
        try {
            return bot.findBlock({
                matching: (block) => block && block.name === blockName,
                maxDistance
            });
        } catch (_) {
            return null;
        }
    }

    detectNearbyStructures(bot) {
        if (!bot) return { villages: [], dungeons: [] };
        const structures = { villages: [], dungeons: [] };
        try {
            const crafTable = this.findNearestBlock(bot, 'crafting_table', 200);
            if (crafTable) structures.villages.push({ position: crafTable.position, type: 'village' });
            const mossyCobble = this.findNearestBlock(bot, 'mossy_cobblestone', 200);
            if (mossyCobble) structures.dungeons.push({ position: mossyCobble.position, type: 'dungeon' });
        } catch (_) { /* scanning failed */ }
        return structures;
    }

    scan(bot) {
        const now = Date.now();
        if (this.lastScan && now - this.lastScan < this.cacheTimeout) {
            return this.scanCache;
        }
        try {
            const resources = this.scanNearbyResources(bot);
            const entities = this.scanNearbyEntities(bot);
            const biome = this.detectBiome(bot);
            const timeOfDay = this.detectTimeOfDay(bot);
            this.scanCache = { resources, entities, biome, timeOfDay };
            this.lastScan = now;
        } catch (e) {
            structuredLogger.debug(`Error scanning environment: ${e.message}`);
        }
        return this.scanCache;
    }
}

export default EnvironmentScanner;
