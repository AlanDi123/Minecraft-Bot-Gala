/**
 * Motor de Comportamiento Adaptativo
 * Orquesta todos los sistemas de IA del bot
 * @module ai/AdaptiveBehaviorEngine
 */

import structuredLogger from '../utils/logger.js';

const TICK_INTERVAL = 500;

export class AdaptiveBehaviorEngine {
    constructor(modules = {}) {
        this.bot = modules.bot;
        this.mlLearner = modules.mlLearner;
        this.planner = modules.planner;
        this.scanner = modules.scanner;
        this.survivalManager = modules.survivalManager;
        this.craftingPlanner = modules.craftingPlanner;
        this.memorySystem = modules.memorySystem;
        this.worldExplorer = modules.worldExplorer;
        this.pathfinder = modules.pathfinder;
        this.pvp = modules.pvp;
        this.collectBlock = modules.collectBlock;
        this.stateManager = modules.stateManager;
        this.getBotState = modules.getBotState;

        this.isRunning = false;
        this.tickTimer = null;
        this.consecutiveFailures = {};
        this.maxConsecutiveFailures = 3;
        this.lastAction = null;
        this.actionHistory = [];
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        structuredLogger.info('🚀 AdaptiveBehaviorEngine iniciado');
        this._scheduleTick();
    }

    stop() {
        this.isRunning = false;
        if (this.tickTimer) {
            clearTimeout(this.tickTimer);
            this.tickTimer = null;
        }
        structuredLogger.info('⏹️ AdaptiveBehaviorEngine detenido');
    }

    _scheduleTick() {
        if (!this.isRunning) return;
        this.tickTimer = setTimeout(async () => {
            try {
                await this.tick();
            } catch (e) {
                structuredLogger.error(`Error en tick: ${e.message}`);
            }
            this._scheduleTick();
        }, TICK_INTERVAL);
    }

    async tick() {
        if (!this.bot || !this.bot.entity) return;
        
        // 1. Get environment context
        const environmentData = this.scanner ? this.scanner.scan(this.bot) : {};
        
        // 2. Get bot state
        const botState = this.getBotState ? this.getBotState() : {};
        
        // 3. Survival check (overrides everything)
        const threatLevel = this.survivalManager
            ? this.survivalManager.assessThreatLevel(botState, environmentData.entities || {})
            : 'safe';
        
        if (threatLevel === 'critical' || threatLevel === 'danger') {
            const survivalAction = this.survivalManager.decideSurvivalAction(
                threatLevel, botState, environmentData
            );
            await this._executeSurvivalAction(survivalAction, botState, environmentData);
            return;
        }
        
        // 4. Get planned action from hierarchy
        let action = this.planner ? this.planner.getNextAction(botState) : 'GATHER_WOOD';
        
        // 5. Check memory - avoid historically bad actions
        if (this.memorySystem && this.memorySystem.shouldAvoidAction(action, botState)) {
            const alternatives = this.planner ? this.planner.getPossibleActions() : [];
            const alternative = alternatives.find(a => 
                a !== action && !this.memorySystem.shouldAvoidAction(a, botState)
            );
            if (alternative) {
                structuredLogger.debug(`Evitando acción peligrosa ${action}, usando ${alternative}`);
                action = alternative;
            }
        }
        
        // 6. ML desempate
        if (this.mlLearner) {
            const mlAction = this.mlLearner.selectAction(botState);
            // Use ML action if planner action has been failing
            const failures = this.consecutiveFailures[action] || 0;
            if (failures >= this.maxConsecutiveFailures) {
                action = mlAction;
                this.consecutiveFailures[action] = 0;
            }
        }
        
        // 7. Execute action
        const prevState = { ...botState };
        let success = false;
        try {
            success = await this.executeAction(action, botState, environmentData);
        } catch (e) {
            await this.handleActionFailure(action, e, botState);
            return;
        }
        
        // 8. Learn from result
        if (this.mlLearner) {
            const newState = this.getBotState ? this.getBotState() : {};
            this.mlLearner.learnFromAction(action, success, newState, prevState);
        }
        
        // 9. Record success/failure
        if (success) {
            this.consecutiveFailures[action] = 0;
            if (this.memorySystem) {
                this.memorySystem.recordSuccess(action, botState, 1, 1);
            }
        } else {
            this.consecutiveFailures[action] = (this.consecutiveFailures[action] || 0) + 1;
        }
        
        this.lastAction = action;
        this.actionHistory.push({ action, success, timestamp: Date.now() });
        if (this.actionHistory.length > 50) this.actionHistory.shift();
    }

    async _executeSurvivalAction(survivalAction, botState, environmentData) {
        const hostile = (environmentData.entities && environmentData.entities.hostile) || [];
        switch (survivalAction) {
            case 'flee':
                if (hostile.length > 0 && this.survivalManager && this.pathfinder) {
                    await this.survivalManager.fleeFromDanger(
                        this.bot, this.pathfinder, hostile[0].position
                    );
                }
                break;
            case 'eat':
                await this._tryEat();
                break;
            case 'hide':
                if (this.survivalManager && this.pathfinder) {
                    await this.survivalManager.buildEmergencyShelter(this.bot, this.pathfinder);
                }
                break;
            default:
                break;
        }
    }

    async _tryEat() {
        if (!this.bot) return;
        try {
            const foodItems = ['cooked_beef', 'cooked_porkchop', 'cooked_chicken',
                'bread', 'apple', 'carrot', 'cooked_fish'];
            for (const foodName of foodItems) {
                const item = this.bot.inventory.items().find(i => i.name === foodName);
                if (item) {
                    await this.bot.equip(item, 'hand');
                    await this.bot.consume();
                    return true;
                }
            }
        } catch (e) {
            structuredLogger.warn(`Error comiendo: ${e.message}`);
        }
        return false;
    }

    async executeAction(actionName, botState, environmentData) {
        structuredLogger.debug(`⚡ Ejecutando: ${actionName}`);
        try {
            switch (actionName) {
                case 'GATHER_WOOD':
                    return await this._gatherWood();
                case 'MINE_STONE':
                    return await this._mineBlock('stone');
                case 'CRAFT_PLANKS':
                    return await this._craftItem('planks');
                case 'CRAFT_STICKS':
                    return await this._craftItem('stick');
                case 'CRAFT_TABLE':
                    return await this._craftItem('crafting_table');
                case 'CRAFT_PICKAXE':
                    return await this._craftPickaxe();
                case 'CRAFT_SWORD':
                    return await this._craftSword();
                case 'CRAFT_AXE':
                    return await this._craftAxe();
                case 'MINE_IRON':
                    return await this._mineBlock('iron_ore', 'deepslate_iron_ore');
                case 'SMELT_IRON':
                    return await this._smeltItems();
                case 'CRAFT_IRON_TOOLS':
                    return await this._craftIronTools();
                case 'MINE_DIAMOND':
                    return await this._mineBlock('diamond_ore', 'deepslate_diamond_ore');
                case 'CRAFT_DIAMOND_TOOLS':
                    return await this._craftDiamondTools();
                case 'HUNT_FOOD':
                    return await this._huntFood();
                case 'EAT':
                    return await this._tryEat();
                case 'EXPLORE':
                    return await this._explore();
                case 'FLEE_DANGER':
                    return await this._flee(environmentData);
                case 'BUILD_SHELTER':
                    return await this._buildShelter();
                case 'GO_NETHER':
                    return false; // Complex, skip for now
                case 'DEFEAT_ENDER_DRAGON':
                    return false; // Complex, skip for now
                default:
                    return await this._explore();
            }
        } catch (e) {
            structuredLogger.warn(`Error en ${actionName}: ${e.message}`);
            return false;
        }
    }

    async _gatherWood() {
        if (!this.bot || !this.collectBlock) return false;
        const woodNames = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log', 'acacia_log'];
        for (const woodName of woodNames) {
            const block = this.bot.findBlock({
                matching: (b) => b && b.name === woodName,
                maxDistance: 32
            });
            if (block) {
                try {
                    await this.collectBlock.collect(block);
                    return true;
                } catch (e) {
                    structuredLogger.warn(`Error recolectando ${woodName}: ${e.message}`);
                }
            }
        }
        return false;
    }

    async _mineBlock(blockName, fallbackName = null) {
        if (!this.bot || !this.collectBlock) return false;
        const block = this.bot.findBlock({
            matching: (b) => b && (b.name === blockName || (fallbackName && b.name === fallbackName)),
            maxDistance: 32
        });
        if (!block) return false;
        try {
            await this.collectBlock.collect(block);
            return true;
        } catch (e) {
            structuredLogger.warn(`Error minando ${blockName}: ${e.message}`);
            return false;
        }
    }

    async _craftItem(itemName) {
        if (!this.bot) return false;
        try {
            const mcData = (await import('minecraft-data')).default(this.bot.version);
            const item = mcData.itemsByName[itemName];
            if (!item) return false;
            const recipe = this.bot.recipesFor(item.id, null, 1, null)[0];
            if (!recipe) return false;
            await this.bot.craft(recipe, 1, null);
            structuredLogger.info(`✅ Crafteado: ${itemName}`);
            return true;
        } catch (e) {
            structuredLogger.warn(`Error crafteando ${itemName}: ${e.message}`);
            return false;
        }
    }

    async _craftPickaxe() {
        const result = await this._craftWithTable('wooden_pickaxe') ||
                       await this._craftWithTable('stone_pickaxe') ||
                       await this._craftWithTable('iron_pickaxe');
        return result;
    }

    async _craftSword() {
        return await this._craftWithTable('wooden_sword') ||
               await this._craftWithTable('stone_sword') ||
               await this._craftWithTable('iron_sword');
    }

    async _craftAxe() {
        return await this._craftWithTable('wooden_axe') ||
               await this._craftWithTable('stone_axe') ||
               await this._craftWithTable('iron_axe');
    }

    async _craftIronTools() {
        return await this._craftWithTable('iron_pickaxe') ||
               await this._craftWithTable('iron_sword');
    }

    async _craftDiamondTools() {
        return await this._craftWithTable('diamond_pickaxe') ||
               await this._craftWithTable('diamond_sword');
    }

    async _craftWithTable(itemName) {
        if (!this.bot) return false;
        try {
            const mcData = (await import('minecraft-data')).default(this.bot.version);
            const item = mcData.itemsByName[itemName];
            if (!item) return false;
            const table = this.bot.findBlock({
                matching: (b) => b && b.name === 'crafting_table',
                maxDistance: 8
            });
            const recipe = this.bot.recipesFor(item.id, null, 1, table)[0];
            if (!recipe) return false;
            await this.bot.craft(recipe, 1, table);
            structuredLogger.info(`✅ Crafteado con mesa: ${itemName}`);
            return true;
        } catch (e) {
            structuredLogger.warn(`Error crafteando con mesa ${itemName}: ${e.message}`);
            return false;
        }
    }

    async _smeltItems() {
        // Smelting requires furnace management - simplified version
        structuredLogger.debug('SMELT_IRON: función de fundición pendiente');
        return false;
    }

    async _huntFood() {
        if (!this.bot || !this.pvp) return false;
        const foodMobs = ['pig', 'cow', 'chicken', 'sheep'];
        for (const mobName of foodMobs) {
            const entity = Object.values(this.bot.entities).find(
                e => e && e.name === mobName
            );
            if (entity) {
                try {
                    await this.pvp.attack(entity);
                    return true;
                } catch (e) {
                    structuredLogger.warn(`Error cazando ${mobName}: ${e.message}`);
                }
            }
        }
        return false;
    }

    async _explore() {
        if (!this.bot || !this.pathfinder) return false;
        try {
            const pos = this.bot.entity.position;
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            const targetX = Math.round(pos.x + Math.cos(angle) * distance);
            const targetZ = Math.round(pos.z + Math.sin(angle) * distance);
            await this.pathfinder.goTo(targetX, pos.y, targetZ, { timeout: 15000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async _flee(environmentData) {
        const hostile = (environmentData && environmentData.entities && environmentData.entities.hostile) || [];
        if (hostile.length > 0 && this.survivalManager && this.pathfinder) {
            await this.survivalManager.fleeFromDanger(
                this.bot, this.pathfinder, hostile[0].position
            );
            return true;
        }
        return false;
    }

    async _buildShelter() {
        if (!this.survivalManager || !this.pathfinder) return false;
        return await this.survivalManager.buildEmergencyShelter(this.bot, this.pathfinder);
    }

    async handleActionFailure(action, error, context) {
        structuredLogger.warn(`❌ Fallo en ${action}: ${error.message}`);
        this.consecutiveFailures[action] = (this.consecutiveFailures[action] || 0) + 1;
        if (this.mlLearner) {
            const state = this.getBotState ? this.getBotState() : {};
            this.mlLearner.learnFromAction(action, false, state, context);
        }
        if (this.memorySystem) {
            this.memorySystem.deathMemories.push({
                lastAction: action,
                cause: error.message,
                timestamp: Date.now()
            });
        }
    }

    async handleDeath() {
        structuredLogger.warn('💀 Manejando muerte del bot');
        if (this.memorySystem) {
            const botState = this.getBotState ? this.getBotState() : {};
            this.memorySystem.recordDeath({
                lastAction: this.lastAction,
                cause: 'death',
                botState_at_death: botState,
                timestamp: Date.now()
            });
            await this.memorySystem.save();
        }
        if (this.mlLearner) {
            const botState = this.getBotState ? this.getBotState() : {};
            this.mlLearner.onNegativeEvent('DEATH', botState);
        }
        // Wait a moment before resuming
        await new Promise(resolve => setTimeout(resolve, 2000));
        structuredLogger.info('♻️ Retomando progresión tras muerte');
    }
}

export default AdaptiveBehaviorEngine;
