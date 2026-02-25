import { describe, it, expect, beforeEach } from '@jest/globals';
import { CraftingPlanner } from '../../src/ai/CraftingPlanner.js';

describe('CraftingPlanner', () => {
    let planner;

    beforeEach(() => {
        planner = new CraftingPlanner();
    });

    describe('resolveCraftingTree', () => {
        it('debe devolver árbol correcto para iron_pickaxe sin materiales', () => {
            const tree = planner.resolveCraftingTree('iron_pickaxe', 1, {});
            expect(tree.item).toBe('iron_pickaxe');
            expect(tree.canCraft).toBe(false);
            expect(tree.missing).toBeDefined();
        });

        it('debe indicar que puede craftear si tiene materiales', () => {
            const inventory = {
                iron_ingot: 3,
                stick: 2
            };
            const tree = planner.resolveCraftingTree('iron_pickaxe', 1, inventory);
            expect(tree.canCraft).toBe(true);
        });
    });

    describe('canCraftWithCurrentInventory', () => {
        it('debe devolver true para crafting_table con 1 oak_log', () => {
            const inventory = { oak_log: 1 };
            // oak_log -> planks (4), planks (4) -> crafting_table
            const result = planner.canCraftWithCurrentInventory('crafting_table', inventory);
            expect(result).toBe(true);
        });

        it('debe devolver false sin materiales', () => {
            const result = planner.canCraftWithCurrentInventory('iron_pickaxe', {});
            expect(result).toBe(false);
        });

        it('debe devolver true para stick con planks', () => {
            const inventory = { oak_planks: 4 };
            const result = planner.canCraftWithCurrentInventory('stick', inventory);
            expect(result).toBe(true);
        });
    });

    describe('getSmartestNextCraft', () => {
        it('debe devolver crafting_table cuando tiene planks', () => {
            const inventory = { oak_planks: 8 };
            const result = planner.getSmartestNextCraft(inventory, 1);
            expect(result).toBeTruthy();
        });

        it('debe devolver null cuando no puede craftear nada', () => {
            const result = planner.getSmartestNextCraft({}, 1);
            expect(result).toBeFalsy();
        });
    });
});
