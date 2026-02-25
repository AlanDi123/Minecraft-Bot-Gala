/**
 * Planificador Jerárquico HTN (Hierarchical Task Network)
 * Cerebro principal del bot - descompone objetivos en sub-tareas
 * @module ai/HierarchicalPlanner
 */

import structuredLogger from '../utils/logger.js';

const POSSIBLE_ACTIONS = [
    'GATHER_WOOD', 'MINE_STONE', 'CRAFT_PLANKS', 'CRAFT_STICKS', 'CRAFT_TABLE',
    'CRAFT_PICKAXE', 'CRAFT_SWORD', 'CRAFT_AXE', 'MINE_IRON', 'SMELT_IRON',
    'CRAFT_IRON_TOOLS', 'MINE_DIAMOND', 'CRAFT_DIAMOND_TOOLS', 'HUNT_FOOD',
    'SLEEP_SHELTER', 'EXPLORE', 'FLEE_DANGER', 'EAT', 'BUILD_SHELTER',
    'GO_NETHER', 'DEFEAT_ENDER_DRAGON'
];

const PROGRESSION_TREE = {
    BEAT_GAME: {
        subgoals: ['REACH_END'],
        phase: 5
    },
    REACH_END: {
        subgoals: ['DEFEAT_ENDER_DRAGON'],
        phase: 5
    },
    DEFEAT_ENDER_DRAGON: {
        subgoals: ['ENTER_END'],
        phase: 5
    },
    ENTER_END: {
        subgoals: ['GET_STRONGHOLD'],
        phase: 5
    },
    GET_STRONGHOLD: {
        subgoals: ['GET_EYES_OF_ENDER'],
        phase: 4
    },
    GET_EYES_OF_ENDER: {
        subgoals: ['KILL_BLAZES', 'GET_ENDER_PEARLS'],
        phase: 4
    },
    KILL_BLAZES: {
        subgoals: ['ENTER_NETHER', 'FIND_FORTRESS'],
        phase: 4
    },
    ENTER_NETHER: {
        subgoals: ['BUILD_PORTAL'],
        phase: 4
    },
    BUILD_PORTAL: {
        subgoals: ['GET_OBSIDIAN'],
        phase: 3,
        requires: { obsidian: 10 }
    },
    GET_OBSIDIAN: {
        subgoals: ['MINE_DIAMOND'],
        phase: 3
    },
    MINE_DIAMOND: {
        subgoals: ['CRAFT_IRON_TOOLS'],
        phase: 3,
        requires: { iron_pickaxe: 1 }
    },
    CRAFT_IRON_TOOLS: {
        subgoals: ['SMELT_IRON'],
        phase: 2,
        requires: { iron_ingot: 3, stick: 2 }
    },
    SMELT_IRON: {
        subgoals: ['MINE_IRON'],
        phase: 2,
        requires: { raw_iron: 3, coal: 1 }
    },
    MINE_IRON: {
        subgoals: ['CRAFT_STONE_TOOLS'],
        phase: 2,
        requires: { stone_pickaxe: 1 }
    },
    CRAFT_STONE_TOOLS: {
        subgoals: ['MINE_STONE'],
        phase: 2,
        requires: { cobblestone: 3, stick: 2 }
    },
    MINE_STONE: {
        subgoals: ['CRAFT_PICKAXE'],
        phase: 1,
        requires: { wooden_pickaxe: 1 }
    },
    CRAFT_PICKAXE: {
        subgoals: ['CRAFT_TABLE'],
        phase: 1,
        requires: { planks: 3, stick: 2 }
    },
    CRAFT_TABLE: {
        subgoals: ['CRAFT_PLANKS'],
        phase: 1,
        requires: { planks: 4 }
    },
    CRAFT_PLANKS: {
        subgoals: ['GATHER_WOOD'],
        phase: 1,
        requires: { oak_log: 1 }
    },
    GATHER_WOOD: {
        subgoals: [],
        phase: 1,
        action: 'GATHER_WOOD'
    }
};

export class HierarchicalPlanner {
    constructor(craftingKnowledge = {}) {
        this.craftingKnowledge = craftingKnowledge;
        this.currentGoal = 'BEAT_GAME';
        this.actionQueue = [];
    }

    _getInventoryCount(inventory, itemName) {
        if (!inventory) return 0;
        const woodTypes = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log', 'acacia_log', 'dark_oak_log'];
        if (itemName === 'oak_log') {
            return woodTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
        }
        const plankTypes = ['oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks', 'planks'];
        if (itemName === 'planks') {
            return plankTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
        }
        return inventory[itemName] || 0;
    }

    _hasRequirements(requires, inventory) {
        if (!requires) return true;
        for (const [item, count] of Object.entries(requires)) {
            if (this._getInventoryCount(inventory, item) < count) return false;
        }
        return true;
    }

    decomposeGoal(goal, botState) {
        const inventory = botState ? (botState.inventory || {}) : {};
        const node = PROGRESSION_TREE[goal];
        if (!node) return ['GATHER_WOOD'];
        if (node.action) return [node.action];
        if (!node.subgoals || node.subgoals.length === 0) return [goal];
        const actions = [];
        for (const subgoal of node.subgoals) {
            const subNode = PROGRESSION_TREE[subgoal];
            if (subNode) {
                if (subNode.requires && this._hasRequirements(subNode.requires, inventory)) {
                    if (subNode.action) actions.push(subNode.action);
                    else actions.push(...this.decomposeGoal(subgoal, botState));
                } else {
                    actions.push(...this.decomposeGoal(subgoal, botState));
                }
            }
        }
        return actions.length > 0 ? actions : ['GATHER_WOOD'];
    }

    _getCurrentPhaseAction(botState) {
        const inventory = botState.inventory || {};
        const logCount = this._getInventoryCount(inventory, 'oak_log');
        const plankCount = this._getInventoryCount(inventory, 'planks');
        const stickCount = inventory.stick || 0;
        const cobblestone = inventory.cobblestone || 0;
        const rawIron = (inventory.raw_iron || 0) + (inventory.iron_ore || 0);
        const ironIngot = inventory.iron_ingot || 0;
        const diamond = inventory.diamond || 0;
        const hasTable = (inventory.crafting_table || 0) > 0 ||
                         (botState.hasTable === true);
        const hasFurnace = (inventory.furnace || 0) > 0 ||
                           (botState.hasFurnace === true);
        const hasWoodPickaxe = botState.hasPickaxe || (inventory.wooden_pickaxe || 0) > 0;
        const hasStonePickaxe = (inventory.stone_pickaxe || 0) > 0;
        const hasIronPickaxe = (inventory.iron_pickaxe || 0) > 0;
        const hasDiamondPickaxe = (inventory.diamond_pickaxe || 0) > 0;
        const hasSword = botState.hasSword || (inventory.wooden_sword || 0) > 0 ||
                         (inventory.stone_sword || 0) > 0 || (inventory.iron_sword || 0) > 0;
        
        // Phase 1: Basic survival
        if (logCount < 5) return 'GATHER_WOOD';
        if (plankCount < 4) return 'CRAFT_PLANKS';
        if (!hasTable) return 'CRAFT_TABLE';
        if (stickCount < 4) return 'CRAFT_STICKS';
        if (!hasWoodPickaxe && !hasStonePickaxe && !hasIronPickaxe) return 'CRAFT_PICKAXE';
        if (!hasSword) return 'CRAFT_SWORD';
        if (cobblestone < 3) return 'MINE_STONE';
        
        // Phase 2: Mining
        if (!hasStonePickaxe && !hasIronPickaxe) return 'MINE_STONE';
        if (rawIron < 3 && ironIngot < 3) return 'MINE_IRON';
        if (ironIngot < 3 && !hasFurnace) return 'MINE_STONE';
        if (ironIngot < 3) return 'SMELT_IRON';
        if (!hasIronPickaxe) return 'CRAFT_IRON_TOOLS';
        
        // Phase 3: Diamond
        if (diamond < 3) return 'MINE_DIAMOND';
        if (!hasDiamondPickaxe) return 'CRAFT_DIAMOND_TOOLS';
        
        // Phase 4: Nether
        return 'GO_NETHER';
    }

    getNextAction(botState) {
        if (!botState) return 'GATHER_WOOD';
        
        // Survival first
        const health = botState.health || 20;
        const food = botState.food || 20;
        const nearbyHostiles = botState.nearbyHostiles || 0;
        
        if (health < 8) return 'FLEE_DANGER';
        if (food < 8) return 'EAT';
        if (nearbyHostiles > 2 && health < 14) return 'FLEE_DANGER';
        
        try {
            return this._getCurrentPhaseAction(botState);
        } catch (e) {
            structuredLogger.error(`Error en HierarchicalPlanner: ${e.message}`);
            return 'GATHER_WOOD';
        }
    }

    getPossibleActions() {
        return POSSIBLE_ACTIONS;
    }
}

export default HierarchicalPlanner;
