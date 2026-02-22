/**
 * Tarea: Combate
 * @module behaviors/tasks/combat
 */

import structuredLogger from '../../utils/logger.js';

/**
 * Atacar entidad hostil
 * @param {Object} context - Contexto de ejecución
 * @returns {Promise<Object>} Resultado de la tarea
 */
export async function attackEntityTask(context) {
    const { bot, pvp, target, options = {} } = context;
    
    if (!target || !target.position) {
        structuredLogger.error('Combate fallido: objetivo inválido');
        return { success: false, error: 'Objetivo inválido' };
    }
    
    const distance = bot.entity.position.distanceTo(target.position);
    
    structuredLogger.info('Iniciando combate', {
        target: target.name,
        health: target.health,
        distance: distance.toFixed(1)
    });
    
    try {
        await pvp.attack(target, {
            timeout: options.timeout || 60000,
            fleeHealth: options.fleeHealth || 6
        });
        
        structuredLogger.success('Enemigo derrotado', {
            target: target.name
        });
        
        return {
            success: true,
            target: target.name,
            task: 'attackEntity'
        };
        
    } catch (error) {
        structuredLogger.error('Combate fallido', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'attackEntity'
        };
    }
}

/**
 * Buscar y atacar enemigos cercanos
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function findAndAttackTask(context) {
    const { bot, pvp, options = {} } = context;
    
    const radius = options.searchRadius || 16;
    const hostiles = ['zombie', 'skeleton', 'creeper', 'spider', 'witch', 'blaze'];
    
    structuredLogger.debug('Buscando enemigos', {
        radius,
        hostiles
    });
    
    // Buscar enemigos
    const entities = Object.values(bot.entities);
    const enemy = entities.find(e => 
        hostiles.includes(e.name?.toLowerCase()) &&
        e.position &&
        bot.entity.position.distanceTo(e.position) <= radius
    );
    
    if (!enemy) {
        structuredLogger.debug('No hay enemigos en el área');
        return {
            success: false,
            error: 'No hay enemigos',
            task: 'findAndAttack'
        };
    }
    
    // Navegar hacia el enemigo
    if (options.navigate !== false) {
        const { pathfinder } = context;
        try {
            await pathfinder.goToNear(
                enemy.position.x,
                enemy.position.y,
                enemy.position.z,
                4,
                { timeout: 30000 }
            );
        } catch (navError) {
            structuredLogger.warn('No se pudo navegar al enemigo', {
                error: navError.message
            });
        }
    }
    
    // Atacar
    return await attackEntityTask({ ...context, target: enemy });
}

/**
 * Huir de amenaza
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Resultado
 */
export async function fleeTask(context) {
    const { bot, pathfinder, threat, options = {} } = context;
    
    if (!threat || !threat.position) {
        structuredLogger.warn('Amenaza inválida para huir');
        return { success: false, error: 'Amenaza inválida' };
    }
    
    const botPos = bot.entity.position;
    const threatPos = threat.position;
    
    // Calcular dirección opuesta
    const direction = botPos.minus(threatPos);
    direction.x = direction.x > 0 ? 1 : -1;
    direction.z = direction.z > 0 ? 1 : -1;
    direction.y = 0;
    
    // Posición de huida (30 bloques)
    const fleeDistance = options.distance || 30;
    const fleePos = botPos.plus(direction.scaled(fleeDistance));
    
    structuredLogger.warn('Huyendo', {
        threat: threat.name,
        fleePos: `${Math.round(fleePos.x)}, ${Math.round(fleePos.y)}, ${Math.round(fleePos.z)}`
    });
    
    try {
        await pathfinder.goTo(
            fleePos.x,
            fleePos.y,
            fleePos.z,
            {
                range: 5,
                timeout: options.timeout || 30000
            }
        );
        
        structuredLogger.success('Huida completada');
        
        return {
            success: true,
            task: 'flee'
        };
        
    } catch (error) {
        structuredLogger.error('Huida fallida', {
            error: error.message
        });
        
        return {
            success: false,
            error: error.message,
            task: 'flee'
        };
    }
}

/**
 * Evaluar si debe combatir o huir
 * @param {Object} context - Contexto
 * @returns {Promise<Object>} Decisión
 */
export async function evaluateCombatTask(context) {
    const { bot, target } = context;
    
    const botHealth = bot.health || 20;
    const botFood = bot.food || 20;
    const distance = bot.entity.position.distanceTo(target.position);
    
    // Contar enemigos cercanos
    const entities = Object.values(bot.entities);
    const hostiles = ['zombie', 'skeleton', 'creeper', 'spider', 'witch', 'blaze'];
    const nearbyEnemies = entities.filter(e => 
        hostiles.includes(e.name?.toLowerCase()) &&
        e.position &&
        bot.entity.position.distanceTo(e.position) <= 16
    ).length;
    
    // Decidir
    let shouldFight = true;
    let reason = 'can_fight';
    
    if (botHealth <= 6) {
        shouldFight = false;
        reason = 'health_critical';
    } else if (nearbyEnemies >= 4) {
        shouldFight = false;
        reason = 'too_many_enemies';
    } else if (target.name === 'creeper' && distance < 10) {
        shouldFight = false;
        reason = 'creeper_danger';
    }
    
    structuredLogger.debug('Evaluación de combate', {
        health: botHealth,
        food: botFood,
        enemies: nearbyEnemies,
        shouldFight,
        reason
    });
    
    return {
        success: true,
        shouldFight,
        reason,
        task: 'evaluateCombat'
    };
}

export default { attackEntityTask, findAndAttackTask, fleeTask, evaluateCombatTask };
