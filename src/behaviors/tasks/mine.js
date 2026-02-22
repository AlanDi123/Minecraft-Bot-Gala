/**
 * Tarea: Minar bloque
 * @module behaviors/tasks/mine
 */

import structuredLogger from '../../utils/logger.js';

/**
 * Minar un bloque específico
 * @param {Object} context - Contexto de ejecución
 * @returns {Promise<Object>} Resultado de la tarea
 */
export async function mineBlockTask(context) {
    const { bot, collectBlock, targetBlock, options = {} } = context;
    
    if (!targetBlock || !targetBlock.position) {
        structuredLogger.error('Minado fallido: bloque inválido');
        return { success: false, error: 'Bloque inválido' };
    }
    
    structuredLogger.info('Minando bloque', {
        name: targetBlock.name,
        position: `${targetBlock.position.x}, ${targetBlock.position.y}, ${targetBlock.position.z}`
    });
    
    try {
        await collectBlock.mineBlock(targetBlock, {
            timeout: options.timeout || 45000,
            append: options.append || false
        });
        
        structuredLogger.success('Bloque minado', {
            name: targetBlock.name
        });
        
        return {
            success: true,
            block: targetBlock.name,
            task: 'mineBlock'
        };
        
    } catch (error) {
        structuredLogger.error('Minado fallido', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'mineBlock'
        };
    }
}

/**
 * Recoger items cercanos
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function collectDropsTask(context) {
    const { bot, collectBlock, filter = null, options = {} } = context;
    
    structuredLogger.debug('Recogiendo items', {
        radius: options.radius || 8
    });
    
    try {
        const collected = await collectBlock.collectNearbyDrops(filter, {
            radius: options.radius || 8
        });
        
        structuredLogger.success('Items recogidos', {
            count: collected.length
        });
        
        return {
            success: true,
            collected: collected.length,
            items: collected.map(i => i.name),
            task: 'collectDrops'
        };
        
    } catch (error) {
        structuredLogger.error('Recolección fallida', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'collectDrops'
        };
    }
}

/**
 * Buscar y minar bloque más cercano
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function findAndMineTask(context) {
    const { bot, collectBlock, blockType, options = {} } = context;
    
    const radius = options.searchRadius || 64;
    
    structuredLogger.info('Buscando bloque', {
        type: blockType,
        radius
    });
    
    try {
        const block = bot.findBlock({
            matching: bot.registry.blocksByName[blockType]?.id,
            maxDistance: radius
        });
        
        if (!block) {
            structuredLogger.warn('Bloque no encontrado', {
                type: blockType
            });
            
            return {
                success: false,
                error: 'Bloque no encontrado',
                task: 'findAndMine'
            };
        }
        
        // Navegar al bloque
        if (options.navigate !== false) {
            const { pathfinder } = context;
            await pathfinder.goTo(
                block.position.x,
                block.position.y,
                block.position.z,
                { range: 1, timeout: 30000 }
            );
        }
        
        // Minar bloque
        return await mineBlockTask({ ...context, targetBlock: block });
        
    } catch (error) {
        structuredLogger.error('Búsqueda y minado fallido', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'findAndMine'
        };
    }
}

export default { mineBlockTask, collectDropsTask, findAndMineTask };
