/**
 * Sistema de Supervivencia Autónoma
 * @module ai/SurvivalManager
 */

import structuredLogger from '../utils/logger.js';

export class SurvivalManager {
    constructor(config = {}) {
        this.fleeHealthThreshold = config.fleeHealthThreshold || 8;
        this.dangerousHostiles = ['creeper', 'skeleton', 'zombie', 'spider', 'phantom',
            'enderman', 'witch', 'pillager'];
    }

    assessThreatLevel(botState, nearbyEntities = {}) {
        const health = botState ? (botState.health || 20) : 20;
        const food = botState ? (botState.food || 20) : 20;
        const hostile = nearbyEntities.hostile || [];
        const isNight = botState ? (botState.isNight || false) : false;

        if (health <= 4) return 'critical';
        if (health <= 8 && hostile.length > 0) return 'critical';
        if (health <= 8) return 'danger';
        if (hostile.length >= 3) return 'danger';
        if (hostile.length >= 1 && health <= 12) return 'danger';
        if (hostile.length >= 1 && isNight) return 'caution';
        if (food < 6) return 'caution';
        if (isNight && hostile.length > 0) return 'caution';
        return 'safe';
    }

    decideSurvivalAction(threatLevel, botState, environmentData = {}) {
        const health = botState ? (botState.health || 20) : 20;
        const food = botState ? (botState.food || 20) : 20;
        const hostile = (environmentData.entities && environmentData.entities.hostile) || [];

        if (threatLevel === 'critical') {
            if (health <= 6) return 'flee';
            if (food < 4 && (botState.foodItems || 0) > 0) return 'eat';
            return 'flee';
        }

        if (threatLevel === 'danger') {
            if (food < 8 && (botState.foodItems || 0) > 0) return 'eat';
            if (hostile.length >= 2) return 'flee';
            if (hostile.length === 1 && (botState.hasSword || botState.hasPickaxe)) return 'fight';
            return 'flee';
        }

        if (threatLevel === 'caution') {
            if (food < 12 && (botState.foodItems || 0) > 0) return 'eat';
            if (health < 16) return 'regen';
            return 'proceed';
        }

        return 'proceed';
    }

    async buildEmergencyShelter(bot, pathfinder) {
        if (!bot || !bot.entity) return false;
        try {
            const pos = bot.entity.position.clone();
            const blocks = ['dirt', 'cobblestone', 'oak_planks', 'stone'];
            let blockItem = null;
            for (const blockName of blocks) {
                const item = bot.inventory.items().find(i => i.name === blockName);
                if (item && item.count >= 8) {
                    blockItem = item;
                    break;
                }
            }
            if (!blockItem) {
                structuredLogger.warn('Sin bloques para refugio de emergencia');
                return false;
            }
            await bot.equip(blockItem, 'hand');
            const buildPositions = [
                { x: pos.x + 1, y: pos.y, z: pos.z },
                { x: pos.x - 1, y: pos.y, z: pos.z },
                { x: pos.x, y: pos.y, z: pos.z + 1 },
                { x: pos.x, y: pos.y, z: pos.z - 1 },
                { x: pos.x + 1, y: pos.y + 1, z: pos.z },
                { x: pos.x - 1, y: pos.y + 1, z: pos.z },
                { x: pos.x, y: pos.y + 1, z: pos.z + 1 },
                { x: pos.x, y: pos.y + 1, z: pos.z - 1 }
            ];
            for (const buildPos of buildPositions) {
                try {
                    const vec3 = (await import('vec3')).default;
                    const targetBlock = bot.blockAt(vec3(buildPos));
                    if (targetBlock && targetBlock.name === 'air') {
                        await bot.placeBlock(targetBlock, vec3(0, 1, 0));
                    }
                } catch (_) { /* continue */ }
            }
            structuredLogger.info('🏠 Refugio de emergencia construido');
            return true;
        } catch (e) {
            structuredLogger.error(`Error construyendo refugio: ${e.message}`);
            return false;
        }
    }

    async fleeFromDanger(bot, pathfinder, dangerPosition) {
        if (!bot || !bot.entity || !pathfinder) return;
        try {
            const pos = bot.entity.position;
            const dx = pos.x - dangerPosition.x;
            const dz = pos.z - dangerPosition.z;
            const length = Math.sqrt(dx * dx + dz * dz) || 1;
            const fleeX = Math.round(pos.x + (dx / length) * 30);
            const fleeZ = Math.round(pos.z + (dz / length) * 30);
            const fleeY = Math.round(pos.y);
            structuredLogger.info(`🏃 Huyendo hacia ${fleeX},${fleeY},${fleeZ}`);
            await pathfinder.goTo(fleeX, fleeY, fleeZ, { timeout: 10000 });
        } catch (e) {
            structuredLogger.warn(`Error huyendo: ${e.message}`);
        }
    }
}

export default SurvivalManager;
