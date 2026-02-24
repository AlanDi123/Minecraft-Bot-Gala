/**
 * Módulo de Conocimiento de Minecraft 1.20.1
 * 
 * Proporciona todo el conocimiento necesario sobre crafteos, 
 * progresión y dependencias para el bot.
 * 
 * @module knowledge
 */

export {
    RAW_MATERIALS,
    CRAFTING_RECIPES,
    PROGRESSION_HIERARCHY,
    CRAFTING_DEPENDENCIES,
    getRecipeForItem,
    getRecipesByCategory,
    getRecipesByPriority,
    canCraft,
    getNextCraftingGoal,
    getRequiredItemsForGoal
} from './crafting-recipes.js';

// Importar todo por defecto
import craftingKnowledge from './crafting-recipes.js';
export default craftingKnowledge;
