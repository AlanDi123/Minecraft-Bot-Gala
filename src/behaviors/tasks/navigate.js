/**
 * Tarea: Navegar a coordenadas
 * @module behaviors/tasks/navigate
 */

import structuredLogger from '../../utils/logger.js';

/**
 * Navegar a coordenadas específicas
 * @param {Object} context - Contexto de ejecución
 * @returns {Promise<Object>} Resultado de la tarea
 */
export async function navigateTask(context) {
    const { bot, pathfinder, target, options = {} } = context;
    
    if (!target || !target.x || !target.y || !target.z) {
        structuredLogger.error('Navegación fallida: coordenadas inválidas');
        return { success: false, error: 'Coordenadas inválidas' };
    }
    
    structuredLogger.info('Navegando', {
        target: `${target.x}, ${target.y}, ${target.z}`,
        range: options.range || 1
    });
    
    try {
        const result = await pathfinder.goTo(
            target.x,
            target.y,
            target.z,
            {
                timeout: options.timeout || 60000,
                range: options.range || 1
            }
        );
        
        structuredLogger.success('Navegación completada', {
            status: result.status,
            timeMs: result.timeMs
        });
        
        return {
            success: true,
            result,
            task: 'navigate'
        };
        
    } catch (error) {
        structuredLogger.error('Navegación fallida', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'navigate'
        };
    }
}

/**
 * Navegar cerca de coordenadas
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function navigateNearTask(context) {
    const { bot, pathfinder, target, range = 5, options = {} } = context;
    
    return navigateTask({
        bot,
        pathfinder,
        target,
        options: { ...options, range }
    });
}

/**
 * Seguir entidad
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function followTask(context) {
    const { bot, pathfinder, entity, options = {} } = context;
    
    if (!entity) {
        structuredLogger.error('Seguimiento fallido: entidad inválida');
        return { success: false, error: 'Entidad inválida' };
    }
    
    structuredLogger.info('Siguiendo entidad', {
        entityId: entity.id,
        name: entity.name
    });
    
    try {
        await pathfinder.follow(entity, {
            distance: options.distance || 3,
            timeout: options.timeout || 30000
        });
        
        return { success: true, task: 'follow' };
        
    } catch (error) {
        structuredLogger.error('Seguimiento fallido', {
            error: error.message
        });
        
        return { success: false, error: error.message, task: 'follow' };
    }
}

export default { navigateTask, navigateNearTask, followTask };
