/**
 * Sistema de Construcción Autónoma
 * @module ai/BuildingSystem
 */

import structuredLogger from '../utils/logger.js';

export class BuildingSystem {
    constructor() {
        this.blockPriority = ['planks', 'cobblestone', 'dirt', 'stone'];
    }

    async findFlatArea(bot, size = 5) {
        if (!bot || !bot.entity) return null;
        const pos = bot.entity.position;
        
        for (let radius = 5; radius <= 30; radius += 5) {
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                const testX = Math.round(pos.x + Math.cos(angle) * radius);
                const testZ = Math.round(pos.z + Math.sin(angle) * radius);
                
                let isFlat = true;
                const refY = Math.round(pos.y);
                
                for (let dx = 0; dx < size && isFlat; dx++) {
                    for (let dz = 0; dz < size && isFlat; dz++) {
                        try {
                            const { default: Vec3 } = await import('vec3');
                            const groundBlock = bot.blockAt(Vec3(testX + dx, refY - 1, testZ + dz));
                            const airBlock = bot.blockAt(Vec3(testX + dx, refY, testZ + dz));
                            const airBlock2 = bot.blockAt(Vec3(testX + dx, refY + 1, testZ + dz));
                            if (!groundBlock || groundBlock.name === 'air') isFlat = false;
                            if (!airBlock || airBlock.name !== 'air') isFlat = false;
                            if (!airBlock2 || airBlock2.name !== 'air') isFlat = false;
                        } catch (_) { isFlat = false; }
                    }
                }
                
                if (isFlat) return { x: testX, y: refY, z: testZ };
            }
        }
        return null;
    }

    async placeBlock(bot, position, blockName) {
        if (!bot) return false;
        try {
            const item = bot.inventory.items().find(i => i.name === blockName);
            if (!item) return false;
            await bot.equip(item, 'hand');
            const { default: Vec3 } = await import('vec3');
            const targetBlock = bot.blockAt(Vec3(position.x, position.y - 1, position.z));
            if (targetBlock) {
                await bot.placeBlock(targetBlock, Vec3(0, 1, 0));
                return true;
            }
        } catch (e) {
            structuredLogger.warn(`Error colocando bloque: ${e.message}`);
        }
        return false;
    }

    async buildBaseShelter(bot, pathfinder, inventory) {
        if (!bot || !bot.entity) return false;
        
        const flatArea = await this.findFlatArea(bot, 5);
        if (!flatArea) {
            structuredLogger.warn('No se encontró área plana para construir');
            return false;
        }
        
        let blockName = null;
        for (const name of this.blockPriority) {
            const types = name === 'planks'
                ? ['oak_planks', 'birch_planks', 'spruce_planks', 'planks']
                : [name];
            for (const type of types) {
                const item = bot.inventory.items().find(i => i.name === type && i.count >= 20);
                if (item) { blockName = type; break; }
            }
            if (blockName) break;
        }
        
        if (!blockName) {
            structuredLogger.warn('Sin bloques suficientes para construir refugio');
            return false;
        }
        
        const { x, y, z } = flatArea;
        const walls = [];
        
        // 5x5 perimeter (walls only)
        for (let i = 0; i < 5; i++) {
            walls.push({ x: x + i, y, z }); // south wall
            walls.push({ x: x + i, y, z: z + 4 }); // north wall
            if (i > 0 && i < 4) {
                walls.push({ x, y, z: z + i }); // west wall
                walls.push({ x: x + 4, y, z: z + i }); // east wall
            }
            // Second layer
            walls.push({ x: x + i, y: y + 1, z });
            walls.push({ x: x + i, y: y + 1, z: z + 4 });
            if (i > 0 && i < 4) {
                walls.push({ x, y: y + 1, z: z + i });
                walls.push({ x: x + 4, y: y + 1, z: z + i });
            }
        }
        
        // Roof
        for (let dx = 0; dx < 5; dx++) {
            for (let dz = 0; dz < 5; dz++) {
                walls.push({ x: x + dx, y: y + 2, z: z + dz });
            }
        }
        
        let placed = 0;
        for (const pos of walls) {
            const success = await this.placeBlock(bot, pos, blockName);
            if (success) placed++;
        }
        
        structuredLogger.info(`🏠 Refugio construido: ${placed} bloques colocados`);
        return placed > 10;
    }

    async buildCraftingStation(bot, pathfinder) {
        if (!bot || !bot.entity) return false;
        const pos = bot.entity.position;
        
        const tablePos = { x: Math.round(pos.x) + 2, y: Math.round(pos.y), z: Math.round(pos.z) };
        const furnacePos = { x: Math.round(pos.x) + 3, y: Math.round(pos.y), z: Math.round(pos.z) };
        
        const tableResult = await this.placeBlock(bot, tablePos, 'crafting_table');
        const furnaceResult = await this.placeBlock(bot, furnacePos, 'furnace');
        
        return tableResult || furnaceResult;
    }

    async lightArea(bot, pathfinder) {
        if (!bot || !bot.entity) return;
        const torches = bot.inventory.items().filter(i => i.name === 'torch');
        if (torches.length === 0) return;
        
        const pos = bot.entity.position;
        const torchPositions = [];
        for (let dx = -8; dx <= 8; dx += 8) {
            for (let dz = -8; dz <= 8; dz += 8) {
                torchPositions.push({ x: Math.round(pos.x + dx), y: Math.round(pos.y), z: Math.round(pos.z + dz) });
            }
        }
        
        for (const torchPos of torchPositions) {
            if (bot.inventory.items().find(i => i.name === 'torch')) {
                await this.placeBlock(bot, torchPos, 'torch');
            }
        }
    }
}

export default BuildingSystem;
