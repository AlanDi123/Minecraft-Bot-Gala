/**
 * Logger Estructurado con Pino
 * @module utils/logger
 */

import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        level: (label) => ({ level: label.toUpperCase() })
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
        bot: process.env.BOT_NAME || 'Gala_Bot'
    }
});

// Wrapper para logs estructurados
export const structuredLogger = {
    info: (message, context = {}) => {
        logger.info({ event: 'info', ...context }, message);
    },
    
    success: (message, context = {}) => {
        logger.info({ event: 'success', ...context }, message);
    },
    
    warn: (message, context = {}) => {
        logger.warn({ event: 'warning', ...context }, message);
    },
    
    error: (message, context = {}) => {
        logger.error({ event: 'error', ...context }, message);
    },
    
    debug: (message, context = {}) => {
        logger.debug({ event: 'debug', ...context }, message);
    },
    
    fatal: (message, context = {}) => {
        logger.fatal({ event: 'fatal', ...context }, message);
    },
    
    // Logs específicos del bot
    state: (stateName, context = {}) => {
        logger.info({ event: 'state_change', state: stateName, ...context }, `STATE: ${stateName}`);
    },
    
    action: (actionType, result, context = {}) => {
        logger.info({ event: 'action', action: actionType, result, ...context }, `${actionType}: ${result}`);
    },
    
    metric: (name, value, context = {}) => {
        logger.info({ event: 'metric', metric: name, value, ...context }, `METRIC: ${name}=${value}`);
    }
};

export default structuredLogger;
