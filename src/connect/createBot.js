/**
 * Creador de Bot Mineflayer
 * @module connect/createBot
 */

import mineflayer from 'mineflayer';
import structuredLogger from '../utils/logger.js';
import CONFIG from '../config/index.js';

/**
 * Crear instancia del bot Mineflayer
 * @param {Object} options - Opciones de configuración
 * @returns {Promise<Object>} Instancia del bot
 */
export async function createBot(options = {}) {
    const botConfig = {
        host: options.host || CONFIG.server.host,
        port: options.port || CONFIG.server.port,
        username: options.username || CONFIG.server.username,
        version: options.version || CONFIG.server.version,
        auth: options.auth || CONFIG.server.auth,
        hideErrors: false,
        checkTimeoutInterval: 30000,
        connectTimeout: 30000
    };
    
    structuredLogger.info('Creando bot Mineflayer', { 
        host: botConfig.host, 
        port: botConfig.port,
        username: botConfig.username 
    });
    
    return new Promise((resolve, reject) => {
        try {
            const bot = mineflayer.createBot(botConfig);
            
            // Evento de spawn
            bot.once('spawn', () => {
                structuredLogger.success('Bot spawneado', {
                    position: bot.entity?.position,
                    health: bot.health,
                    food: bot.food
                });
                resolve(bot);
            });
            
            // Evento de error
            bot.once('error', (err) => {
                structuredLogger.error('Error de conexión', { error: err.message });
                reject(err);
            });
            
            // Evento de kick
            bot.once('kicked', (reason) => {
                structuredLogger.error('Expulsado del servidor', { reason });
                reject(new Error(reason));
            });
            
            // Timeout de conexión
            setTimeout(() => {
                if (!bot.entity) {
                    const error = new Error('Timeout de conexión (30s)');
                    structuredLogger.error('Timeout de conexión');
                    reject(error);
                }
            }, 30000);
            
        } catch (error) {
            structuredLogger.error('Error creando bot', { error: error.message });
            reject(error);
        }
    });
}

/**
 * Reconectar bot con backoff exponencial
 * @param {Function} createBotFn - Función para crear bot
 * @param {Object} options - Opciones
 * @param {number} maxRetries - Máximo de reintentos
 * @returns {Promise<Object>} Instancia del bot
 */
export async function reconnectWithBackoff(createBotFn, options = {}, maxRetries = 10) {
    let attempt = 0;
    let delay = 5000; // 5 seconds base
    
    while (attempt < maxRetries) {
        try {
            structuredLogger.info('Intentando conexión', { attempt: attempt + 1, max: maxRetries });
            const bot = await createBotFn(options);
            structuredLogger.success('Conexión exitosa', { attempt: attempt + 1 });
            return bot;
        } catch (error) {
            attempt++;
            
            if (attempt >= maxRetries) {
                structuredLogger.error('Máximo de reintentos alcanzado', { 
                    attempts: attempt,
                    error: error.message 
                });
                throw error;
            }
            
            structuredLogger.warn('Reintentando en', { delay: delay / 1000, attempt });
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Backoff exponencial con máximo de 120 segundos
            delay = Math.min(delay * 2, 120000);
        }
    }
}

export default createBot;
