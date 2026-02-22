/**
 * Behaviors - Export principal
 * @module behaviors/index
 */

export { FiniteStateMachine, BotStates } from './fsm.js';
export { navigateTask, navigateNearTask, followTask } from './tasks/navigate.js';
export { mineBlockTask, collectDropsTask, findAndMineTask } from './tasks/mine.js';
export { attackEntityTask, findAndAttackTask, fleeTask, evaluateCombatTask } from './tasks/combat.js';

// Task registry
export const taskRegistry = {
    navigate: (await import('./tasks/navigate.js')).navigateTask,
    navigateNear: (await import('./tasks/navigate.js')).navigateNearTask,
    follow: (await import('./tasks/navigate.js')).followTask,
    mineBlock: (await import('./tasks/mine.js')).mineBlockTask,
    collectDrops: (await import('./tasks/mine.js')).collectDropsTask,
    findAndMine: (await import('./tasks/mine.js')).findAndMineTask,
    attackEntity: (await import('./tasks/combat.js')).attackEntityTask,
    findAndAttack: (await import('./tasks/combat.js')).findAndAttackTask,
    flee: (await import('./tasks/combat.js')).fleeTask,
    evaluateCombat: (await import('./tasks/combat.js')).evaluateCombatTask
};

export default {
    FiniteStateMachine,
    BotStates,
    taskRegistry
};
