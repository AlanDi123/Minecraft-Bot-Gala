/**
 * Sistema de Combate Inteligente
 * @module ai/SmartCombat
 */

import structuredLogger from '../utils/logger.js';

const HOSTILE_DANGER = {
    creeper: 10, skeleton: 8, spider: 6, zombie: 5,
    enderman: 7, witch: 9, blaze: 9, ghast: 8,
    wither_skeleton: 10, guardian: 7, phantom: 7,
    pillager: 7, ravager: 9, vindicator: 8
};

export class SmartCombat {
    constructor() {
        this.fightHistory = [];
    }

    evaluateFightOrFlight(bot, entity, currentState) {
        if (!entity || !currentState) return 'flee';
        const health = currentState.health || 20;
        const hasSword = currentState.hasSword || false;
        const hasArmor = currentState.hasArmor || false;
        const danger = HOSTILE_DANGER[entity.name] || 5;
        
        let fightScore = 0;
        if (health > 15) fightScore += 3;
        else if (health > 10) fightScore += 1;
        else fightScore -= 5;
        if (hasSword) fightScore += 3;
        if (hasArmor) fightScore += 2;
        fightScore -= danger;
        
        if (entity.name === 'creeper') {
            // Always flee from creepers until high level
            if (!hasArmor || health < 15) return 'flee';
        }
        
        return fightScore > 0 ? 'fight' : 'flee';
    }

    async fightSmart(bot, pvp, entity) {
        if (!bot || !pvp || !entity) return false;
        try {
            await pvp.attack(entity);
            // Simple strafe - move perpendicular
            const botPos = bot.entity.position;
            const entityPos = entity.position;
            const dx = entityPos.x - botPos.x;
            const dz = entityPos.z - botPos.z;
            bot.lookAt(entity.position);
            return true;
        } catch (e) {
            structuredLogger.warn(`Error en combate: ${e.message}`);
            return false;
        }
    }

    async killForFood(bot, pvp, pathfinder) {
        if (!bot || !pvp) return false;
        const foodMobs = ['pig', 'cow', 'chicken', 'sheep'];
        for (const mobName of foodMobs) {
            const entity = Object.values(bot.entities).find(e => e && e.name === mobName);
            if (entity) {
                try {
                    await pvp.attack(entity);
                    return true;
                } catch (e) {
                    structuredLogger.warn(`Error cazando ${mobName}: ${e.message}`);
                }
            }
        }
        return false;
    }

    prioritizeTargets(nearbyHostiles) {
        if (!nearbyHostiles || nearbyHostiles.length === 0) return [];
        return [...nearbyHostiles].sort((a, b) => {
            const dangerA = HOSTILE_DANGER[a.entity && a.entity.name] || 5;
            const dangerB = HOSTILE_DANGER[b.entity && b.entity.name] || 5;
            if (a.entity && a.entity.name === 'creeper') return -1; // Flee first
            if (b.entity && b.entity.name === 'creeper') return 1;
            if (a.distance < 5) return -1; // Close enemies first
            return dangerB - dangerA;
        });
    }
}

export default SmartCombat;
