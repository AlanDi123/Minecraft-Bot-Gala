/**
 * Sistema de Planificación de Crafteo
 * @module ai/CraftingPlanner
 */

import structuredLogger from '../utils/logger.js';

const CRAFTING_TREE = {
    iron_pickaxe: { requires: { iron_ingot: 3, stick: 2 }, needsTable: true },
    iron_sword: { requires: { iron_ingot: 2, stick: 1 }, needsTable: true },
    iron_axe: { requires: { iron_ingot: 3, stick: 2 }, needsTable: true },
    iron_shovel: { requires: { iron_ingot: 1, stick: 2 }, needsTable: true },
    stone_pickaxe: { requires: { cobblestone: 3, stick: 2 }, needsTable: true },
    stone_sword: { requires: { cobblestone: 2, stick: 1 }, needsTable: true },
    stone_axe: { requires: { cobblestone: 3, stick: 2 }, needsTable: true },
    wooden_pickaxe: { requires: { planks: 3, stick: 2 }, needsTable: true },
    wooden_sword: { requires: { planks: 2, stick: 1 }, needsTable: true },
    wooden_axe: { requires: { planks: 3, stick: 2 }, needsTable: true },
    diamond_pickaxe: { requires: { diamond: 3, stick: 2 }, needsTable: true },
    diamond_sword: { requires: { diamond: 2, stick: 1 }, needsTable: true },
    diamond_axe: { requires: { diamond: 3, stick: 2 }, needsTable: true },
    crafting_table: { requires: { planks: 4 }, needsTable: false },
    furnace: { requires: { cobblestone: 8 }, needsTable: true },
    stick: { requires: { planks: 2 }, needsTable: false, yields: 4 },
    planks: { requires: { oak_log: 1 }, needsTable: false, yields: 4 },
    torch: { requires: { coal: 1, stick: 1 }, needsTable: false, yields: 4 },
    chest: { requires: { planks: 8 }, needsTable: true }
};

const WOOD_TYPES = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log', 'acacia_log', 'dark_oak_log'];
const PLANK_TYPES = ['oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks', 'acacia_planks'];

export class CraftingPlanner {
    constructor(craftingKnowledge = {}) {
        this.craftingKnowledge = craftingKnowledge;
    }

    _getItemCount(inventory, itemName) {
        if (!inventory) return 0;
        if (itemName === 'oak_log') {
            return WOOD_TYPES.reduce((s, t) => s + (inventory[t] || 0), 0);
        }
        if (itemName === 'planks') {
            return PLANK_TYPES.reduce((s, t) => s + (inventory[t] || 0), 0) + (inventory.planks || 0);
        }
        return inventory[itemName] || 0;
    }

    resolveCraftingTree(itemName, quantity, currentInventory) {
        const recipe = CRAFTING_TREE[itemName];
        if (!recipe) {
            return {
                item: itemName,
                quantity,
                canCraft: false,
                missing: { [itemName]: quantity },
                subTrees: []
            };
        }
        const missing = {};
        const subTrees = [];
        for (const [ingredient, needed] of Object.entries(recipe.requires)) {
            const totalNeeded = needed * quantity;
            const have = this._getItemCount(currentInventory, ingredient);
            if (have < totalNeeded) {
                const deficit = totalNeeded - have;
                missing[ingredient] = deficit;
                const subTree = this.resolveCraftingTree(ingredient, deficit, currentInventory);
                subTrees.push(subTree);
            }
        }
        return {
            item: itemName,
            quantity,
            canCraft: Object.keys(missing).length === 0,
            missing,
            subTrees,
            needsTable: recipe.needsTable || false
        };
    }

    canCraftWithCurrentInventory(itemName, inventory) {
        const recipe = CRAFTING_TREE[itemName];
        if (!recipe) return false;
        for (const [ingredient, needed] of Object.entries(recipe.requires)) {
            if (this._getItemCount(inventory, ingredient) < needed) {
                // Check if we can craft the ingredient from what we have
                const subRecipe = CRAFTING_TREE[ingredient];
                if (subRecipe) {
                    if (!this.canCraftWithCurrentInventory(ingredient, inventory)) return false;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    getSmartestNextCraft(currentInventory, currentPhase = 1) {
        const candidates = Object.keys(CRAFTING_TREE);
        const craftable = candidates.filter(item => this.canCraftWithCurrentInventory(item, currentInventory));
        const priority = {
            crafting_table: 100,
            wooden_pickaxe: 90,
            wooden_sword: 85,
            wooden_axe: 80,
            furnace: 70,
            stone_pickaxe: 95,
            stone_sword: 88,
            iron_pickaxe: 99,
            iron_sword: 92,
            diamond_pickaxe: 98,
            diamond_sword: 96
        };
        let best = null;
        let bestScore = -1;
        for (const item of craftable) {
            const score = priority[item] || 10;
            if (score > bestScore) {
                bestScore = score;
                best = item;
            }
        }
        return best;
    }

    prioritizeCraftingQueue(inventory, goals) {
        if (!goals || goals.length === 0) return [];
        return goals.map(goal => ({
            goal,
            tree: this.resolveCraftingTree(goal, 1, inventory),
            priority: this._getCraftingPriority(goal)
        })).sort((a, b) => b.priority - a.priority);
    }

    _getCraftingPriority(itemName) {
        const priorities = {
            crafting_table: 10, wooden_pickaxe: 9, wooden_sword: 8,
            stone_pickaxe: 9, iron_pickaxe: 10, iron_sword: 9,
            diamond_pickaxe: 10, diamond_sword: 9, furnace: 7,
            stick: 5, planks: 4, torch: 3
        };
        return priorities[itemName] || 1;
    }
}

export default CraftingPlanner;
