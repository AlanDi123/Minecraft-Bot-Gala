import { describe, it, expect } from '@jest/globals';
import { HierarchicalPlanner } from '../../src/ai/HierarchicalPlanner.js';

describe('HierarchicalPlanner', () => {
    let planner;

    beforeEach(() => {
        planner = new HierarchicalPlanner();
    });

    describe('decomposeGoal', () => {
        it('debe devolver GATHER_WOOD cuando el inventario está vacío', () => {
            const result = planner.decomposeGoal('BEAT_GAME', { inventory: {} });
            expect(result).toContain('GATHER_WOOD');
        });

        it('debe devolver array de acciones', () => {
            const result = planner.decomposeGoal('BEAT_GAME', { inventory: {} });
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('getNextAction', () => {
        it('debe devolver FLEE_DANGER cuando health < 8', () => {
            const botState = { health: 5, food: 20, nearbyHostiles: 1, inventory: {} };
            const result = planner.getNextAction(botState);
            expect(result).toBe('FLEE_DANGER');
        });

        it('debe devolver EAT cuando food < 8', () => {
            const botState = { health: 20, food: 6, nearbyHostiles: 0, inventory: {} };
            const result = planner.getNextAction(botState);
            expect(result).toBe('EAT');
        });

        it('debe devolver GATHER_WOOD cuando el inventario está vacío', () => {
            const botState = { health: 20, food: 20, nearbyHostiles: 0, inventory: {} };
            const result = planner.getNextAction(botState);
            expect(result).toBe('GATHER_WOOD');
        });

        it('debe devolver acción de progresión cuando tiene madera', () => {
            const botState = {
                health: 20, food: 20, nearbyHostiles: 0,
                inventory: { oak_log: 10 }
            };
            const result = planner.getNextAction(botState);
            expect(['CRAFT_PLANKS', 'CRAFT_TABLE', 'CRAFT_PICKAXE', 'MINE_STONE']).toContain(result);
        });
    });

    describe('getPossibleActions', () => {
        it('debe devolver lista de acciones posibles', () => {
            const actions = planner.getPossibleActions();
            expect(Array.isArray(actions)).toBe(true);
            expect(actions).toContain('GATHER_WOOD');
            expect(actions).toContain('MINE_DIAMOND');
        });
    });
});
