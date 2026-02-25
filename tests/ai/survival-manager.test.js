import { describe, it, expect, beforeEach } from '@jest/globals';
import { SurvivalManager } from '../../src/ai/SurvivalManager.js';

describe('SurvivalManager', () => {
    let manager;

    beforeEach(() => {
        manager = new SurvivalManager();
    });

    describe('assessThreatLevel', () => {
        it('debe devolver critical cuando health=4', () => {
            const botState = { health: 4, food: 20, isNight: false };
            const result = manager.assessThreatLevel(botState, { hostile: [] });
            expect(result).toBe('critical');
        });

        it('debe devolver safe cuando health=20, sin hostiles, de día', () => {
            const botState = { health: 20, food: 20, isNight: false };
            const result = manager.assessThreatLevel(botState, { hostile: [] });
            expect(result).toBe('safe');
        });

        it('debe devolver danger cuando hay 3+ hostiles', () => {
            const botState = { health: 20, food: 20, isNight: false };
            const hostile = [
                { entity: { name: 'zombie' }, distance: 5 },
                { entity: { name: 'skeleton' }, distance: 8 },
                { entity: { name: 'spider' }, distance: 10 }
            ];
            const result = manager.assessThreatLevel(botState, { hostile });
            expect(result).toBe('danger');
        });

        it('debe devolver critical cuando health<=8 y hay hostiles', () => {
            const botState = { health: 8, food: 20, isNight: false };
            const hostile = [{ entity: { name: 'zombie' }, distance: 5 }];
            const result = manager.assessThreatLevel(botState, { hostile });
            expect(result).toBe('critical');
        });

        it('debe devolver caution de noche con hostiles', () => {
            const botState = { health: 20, food: 20, isNight: true };
            const hostile = [{ entity: { name: 'zombie' }, distance: 15 }];
            const result = manager.assessThreatLevel(botState, { hostile });
            expect(result).toBe('caution');
        });
    });

    describe('decideSurvivalAction', () => {
        it('debe devolver flee en threat=critical con health bajo', () => {
            const botState = { health: 4, food: 20, foodItems: 0 };
            const result = manager.decideSurvivalAction('critical', botState, {});
            expect(['flee', 'eat']).toContain(result);
        });

        it('debe devolver proceed cuando está safe', () => {
            const botState = { health: 20, food: 20, foodItems: 5 };
            const result = manager.decideSurvivalAction('safe', botState, {});
            expect(result).toBe('proceed');
        });
    });
});
