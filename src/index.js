/**
 * GALA AI V6.3 - Bot Autónomo con Machine Learning
 *
 * @version 6.3.0
 * @author Gala AI Development Team
 * @license MIT
 */

// Imports principales
import structuredLogger from './utils/logger.js';
import StateManager from './utils/state-manager.js';
import { reconnectWithBackoff, createBot } from './connect/createBot.js';
import CONFIG from './config/index.js';

// Plugin wrappers
import PathfinderWrapper from './plugins/pathfinder.js';
import PVPWrapper from './plugins/pvp.js';
import CollectBlockWrapper from './plugins/collectblock.js';
import AutoEatWrapper from './plugins/autoEat.js';
import InventoryCraftingWrapper from './plugins/inventory-crafting.js';

// Machine Learning
import { AutonomousLearner } from './ml/autonomous-learner.js';

// 🤖 AI Systems
import HierarchicalPlanner from './ai/HierarchicalPlanner.js';
import EnvironmentScanner from './ai/EnvironmentScanner.js';
import SurvivalManager from './ai/SurvivalManager.js';
import CraftingPlanner from './ai/CraftingPlanner.js';
import LearningMemorySystem from './ai/LearningMemorySystem.js';
import AdaptiveBehaviorEngine from './ai/AdaptiveBehaviorEngine.js';
import WorldExplorer from './ai/WorldExplorer.js';

// 🧠 Conocimiento de Minecraft (TODOS los crafteos 1.20.1)
import { 
    CRAFTING_RECIPES, 
    PROGRESSION_HIERARCHY, 
    CRAFTING_DEPENDENCIES,
    getRecipeForItem,
    canCraft,
    getNextCraftingGoal,
    getRequiredItemsForGoal
} from './knowledge/index.js';

/**
 * Clase principal del bot
 */
class GalaBot {
    constructor() {
        this.bot = null;
        this.mcData = null;
        this.stateManager = null;
        this.pathfinder = null;
        this.pvp = null;
        this.collectBlock = null;
        this.autoEat = null;
        this.mlLearner = null; // 🧠 Sistema de ML
        this.craftingKnowledge = null; // 🧠 Base de conocimiento de crafteos
        
        // 🤖 AI Systems
        this.planner = null;
        this.scanner = null;
        this.survivalAI = null;
        this.craftingAI = null;
        this.memorySystem = null;
        this.adaptiveBehavior = null;
        this.worldExplorer = null;

        this.isRunning = false;
        this.isConnected = false;
        this.previousBotState = null;
        this.currentPhase = 1; // Fase de progresión actual
    }
    
    /**
     * Inicializar todos los componentes
     */
    async initialize() {
        structuredLogger.info('╔════════════════════════════════════════════╗');
        structuredLogger.info('║   GALA AI V6.1 "MODULAR"                   ║');
        structuredLogger.info('║   Minecraft 1.20.1 Java Edition            ║');
        structuredLogger.info('╚════════════════════════════════════════════╝');

        // 🧠 Cargar base de conocimiento de crafteos
        this.craftingKnowledge = {
            recipes: CRAFTING_RECIPES,
            hierarchy: PROGRESSION_HIERARCHY,
            dependencies: CRAFTING_DEPENDENCIES
        };
        structuredLogger.success('🧠 Base de conocimiento de crafteos cargada', {
            totalRecipes: Object.keys(CRAFTING_RECIPES).length,
            phases: PROGRESSION_HIERARCHY.length
        });

        // Inicializar state manager
        this.stateManager = new StateManager({
            stateFile: CONFIG.learning.stateFile,
            backupFile: CONFIG.learning.stateFile.replace('.json', '_backup.json'),
            saveInterval: CONFIG.memory.backupInterval
        });

        await this.stateManager.load();
        structuredLogger.success('State Manager inicializado');

        // Crear bot
        this.bot = await reconnectWithBackoff(createBot, {
            host: CONFIG.server.host,
            port: CONFIG.server.port,
            username: CONFIG.server.username,
            version: CONFIG.server.version,
            auth: CONFIG.server.auth
        });
        this.isConnected = true;

        // Cargar minecraft-data
        const minecraftData = await import('minecraft-data');
        this.mcData = minecraftData.default(this.bot.version);
        structuredLogger.success('Minecraft-data cargado', { version: this.bot.version });

        // Inicializar plugins
        this.initializePlugins();

        // Configurar eventos
        this.setupEvents();

        // Iniciar auto-guardado
        this.stateManager.startAutoSave();

        structuredLogger.success('╔════════════════════════════════════════╗');
        structuredLogger.success('║   SISTEMA COGNITIVO OPERACIONAL        ║');
        structuredLogger.success('╚════════════════════════════════════════╝');

        return this;
    }
    
    /**
     * Inicializar todos los plugins
     */
    initializePlugins() {
        // Pathfinder
        this.pathfinder = new PathfinderWrapper();
        this.pathfinder.init(this.bot, this.mcData);
        structuredLogger.success('Pathfinder inicializado');

        // PVP
        this.pvp = new PVPWrapper();
        this.pvp.init(this.bot);
        structuredLogger.success('PVP inicializado');

        // CollectBlock
        this.collectBlock = new CollectBlockWrapper();
        this.collectBlock.init(this.bot);
        structuredLogger.success('CollectBlock inicializado');

        // AutoEat
        this.autoEat = new AutoEatWrapper();
        this.autoEat.init(this.bot);
        this.autoEat.enable();
        structuredLogger.success('AutoEat inicializado y habilitado');

        // 🔌 Inventory Crafting (Crafteo 2x2 en inventario)
        this.inventoryCrafting = new InventoryCraftingWrapper(this.bot);
        structuredLogger.success('🔌 InventoryCrafting inicializado');

        // 🧠 Sistema de Machine Learning
        this.mlLearner = new AutonomousLearner({
            learningRate: 0.15,
            explorationRate: 0.4,
            autoSaveInterval: 30000,
            trainingMode: true
        });
        structuredLogger.success('🧠 Sistema de ML inicializado');

        // 🤖 Inicializar sistemas de IA
        this.memorySystem = new LearningMemorySystem({
            episodicFile: CONFIG.learning.episodicMemoryFile,
            resourceMapFile: CONFIG.learning.resourceMapFile
        });
        this.planner = new HierarchicalPlanner(this.craftingKnowledge);
        this.scanner = new EnvironmentScanner();
        this.survivalAI = new SurvivalManager({ fleeHealthThreshold: CONFIG.survival.fleeHealthThreshold });
        this.craftingAI = new CraftingPlanner(this.craftingKnowledge);
        this.worldExplorer = new WorldExplorer({ exploredChunksFile: CONFIG.learning.exploredChunksFile });
        this.adaptiveBehavior = new AdaptiveBehaviorEngine({
            bot: this.bot,
            mlLearner: this.mlLearner,
            planner: this.planner,
            scanner: this.scanner,
            survivalManager: this.survivalAI,
            craftingPlanner: this.craftingAI,
            memorySystem: this.memorySystem,
            worldExplorer: this.worldExplorer,
            pathfinder: this.pathfinder,
            pvp: this.pvp,
            collectBlock: this.collectBlock,
            stateManager: this.stateManager,
            getBotState: () => this.getBotState()
        });
        await this.memorySystem.load();
        await this.worldExplorer.load();
        structuredLogger.success('🤖 Sistemas de IA inicializados');
    
    /**
     * Configurar eventos del bot
     */
    setupEvents() {
        // Evento: Salud
        this.bot.on('health', () => {
            this.stateManager.set('health', this.bot.health);
            
            if (this.bot.health < 10) {
                structuredLogger.warn('Salud crítica', { health: this.bot.health });
            }
        });
        
        // Evento: Comida
        this.bot.on('food', () => {
            this.stateManager.set('food', this.bot.food);
            
            if (this.bot.food < CONFIG.survival.foodCritical) {
                structuredLogger.warn('Hambre crítica', { food: this.bot.food });
                this.autoEat.eatIfNeeded();
            }
        });
        
        // Evento: Muerte
        this.bot.on('death', () => {
            structuredLogger.error('💀 BOT HA MUERTO');
            
            // 🧠 ML: Registrar muerte como evento negativo
            if (this.mlLearner && this.previousBotState) {
                const currentState = this.getBotState();
                this.mlLearner.onNegativeEvent('DEATH', currentState, 3);
                this.stateManager.recordDeath(
                    this.bot.entity?.position || { x: 0, y: 0, z: 0 },
                    'unknown'
                );
            }
            
            // 🤖 AI: Manejar muerte
            if (this.adaptiveBehavior) {
                this.adaptiveBehavior.stop();
                this.adaptiveBehavior.handleDeath().catch(() => {});
            }
            
            this.pvp.stop();
            this.collectBlock.stop();
        });
        
        // Evento: Respawn
        this.bot.on('respawn', () => {
            structuredLogger.info('✨ Respawn completado');
            this.stateManager.reset();
            // 🤖 AI: Reanudar tras respawn
            if (this.adaptiveBehavior) {
                this.adaptiveBehavior.start().catch(() => {});
            }
        });
        
        // Evento: Desconexión
        this.bot.on('end', () => {
            structuredLogger.warn('Desconectado del servidor');
            this.isRunning = false;
            this.isConnected = false;
            this.stateManager.stopAutoSave();
            this.stateManager.save();
        });
        
        // Evento: Expulsado (kicked)
        this.bot.on('kicked', async (reason) => {
            structuredLogger.warn('Bot expulsado del servidor', { reason });
            this.isConnected = false;
            await this.stop();
            await new Promise(r => setTimeout(r, 5000)); // Esperar 5s
            try {
                this.bot = await reconnectWithBackoff(createBot, {
                    host: CONFIG.server.host,
                    port: CONFIG.server.port,
                    username: CONFIG.server.username,
                    version: CONFIG.server.version,
                    auth: CONFIG.server.auth
                });
                this.isConnected = true;
                this.initializePlugins();
                this.setupEvents();
            } catch (err) {
                structuredLogger.error('No se pudo reconectar tras expulsión', { error: err.message });
            }
        });
        
        // Evento: Error
        this.bot.on('error', (err) => {
            structuredLogger.error('Error del bot', { error: err.message });
        });
        
        structuredLogger.success('Eventos configurados');
    }
    
    /**
     * Iniciar loop principal
     */
    async start() {
        this.isRunning = true;
        structuredLogger.info('Loop principal iniciado');
        
        // Loop de actualización (cada 100ms)
        const updateInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(updateInterval);
                return;
            }
            
            this.update();
        }, 100);
        
        // Loop de telemetría (cada 15s)
        const telemetryInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(telemetryInterval);
                return;
            }
            
            this.printTelemetry();
        }, CONFIG.optimization.telemetryInterval);
        
        // Loop de backup (cada 60s)
        const backupInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(backupInterval);
                return;
            }
            
            this.stateManager.save();
        }, CONFIG.memory.backupInterval);
        
        structuredLogger.success('Sistemas de loop iniciados');

        // 🤖 AI: Iniciar motor de comportamiento adaptativo
        if (this.adaptiveBehavior) {
            await this.adaptiveBehavior.start();
            structuredLogger.success('🤖 AdaptiveBehaviorEngine iniciado');
        }

        // Iniciar FSM con comportamientos autónomos
        this.startFSM();
    }

    /**
     * Iniciar Máquina de Estados Finita con ML
     */
    async startFSM() {
        structuredLogger.info('🤖🧠 FSM + ML Controller iniciado');

        // Estado inicial
        let currentState = 'ASSESS';
        let lastStateChange = Date.now();
        let consecutiveFailures = 0;
        let emergencyFailures = 0; // 🆕 Contador de fallos en emergencia
        const MAX_FAILURES = 3;
        const MAX_EMERGENCY_FAILURES = 5; // 🆕 Límite de fallos en emergencia

        // Loop de FSM
        const fsmInterval = setInterval(async () => {
            if (!this.isRunning || !this.isConnected) {
                clearInterval(fsmInterval);
                return;
            }

            const now = Date.now();
            const health = this.bot.health || 20;
            const food = this.bot.food || 20;
            const botState = this.getBotState();

            // 🚨 DETECCIÓN TEMPRANA DE EMERGENCIA (antes de que sea tarde)
            if (health < 5 && currentState !== 'EMERGENCY') {
                structuredLogger.error(`🚨 SALUD CRÍTICA: ${health}/20 - Forzando EMERGENCY`);
                currentState = 'EMERGENCY';
                lastStateChange = now;
            }

            // 🧠 ML: Seleccionar acción usando Q-Learning
            let mlAction = null;
            if (this.mlLearner && this.mlLearner.qLearning.explorationRate > 0.1) {
                mlAction = this.mlLearner.selectAction(botState);

                // 🛡️ Validar si la acción es posible
                if (mlAction && !this.canExecuteAction(mlAction, botState)) {
                    structuredLogger.debug(`❌ ML sugirió ${mlAction} pero no es posible`);
                    mlAction = null; // No usar esta acción
                }

                if (mlAction) {
                    structuredLogger.info(`🧠 ML sugiere: ${mlAction}`);
                }
            }

            // Verificar emergencias (prioridad sobre ML)
            if (health < 10) {
                currentState = 'EMERGENCY';
            } else if (food < 6) {
                currentState = 'EAT';
            } else if (now - lastStateChange < 5000) {
                return;
            } else if (mlAction && this.mlLearner.qLearning.explorationRate > 0.2) {
                // Usar acción del ML durante exploración (solo si es válida)
                currentState = mlAction;
                structuredLogger.info(`✅ Ejecutando: ${mlAction}`);
            }

            // Ejecutar estado actual
            switch (currentState) {
                case 'EMERGENCY':
                    structuredLogger.error('🚨 EMERGENCIA: Salud crítica');
                    const emergencyPrevState = this.getBotState();

                    // 🆕 Si hay muchos fallos consecutivos, esperar y recuperar naturalmente
                    if (emergencyFailures >= MAX_EMERGENCY_FAILURES) {
                        structuredLogger.warn('⚠️  Demasiados fallos en emergencia, esperando recuperación natural...');
                        
                        // Si tiene suficiente comida, puede recuperar salud naturalmente
                        if (food >= 18) {
                            structuredLogger.info('🍖 Esperando recuperación natural (food >= 18)');
                            await new Promise(resolve => setTimeout(resolve, 5000));
                            emergencyFailures = 0; // Resetear contador
                            currentState = 'ASSESS';
                            lastStateChange = now;
                            break;
                        }
                        
                        // 🆕 Si no tiene comida suficiente, NO intentar gatherFood (falla por pathfinding)
                        // En su lugar, esperar y verificar si hay comida cerca para recoger
                        structuredLogger.info('🍖 Verificando comida cercana...');
                        const nearbyFood = this.bot.findBlock({
                            matching: ['wheat', 'carrots', 'potatoes', 'beetroots', 'apple', 'bread', 'cooked_beef']
                                .map(name => this.bot.registry.blocksByName[name]?.id)
                                .filter(id => id !== undefined),
                            maxDistance: 5
                        });
                        
                        if (nearbyFood) {
                            structuredLogger.info(`🍖 Comida encontrada: ${nearbyFood.name}, intentando recoger...`);
                            try {
                                await this.collectBlock.mineBlock(nearbyFood);
                                emergencyFailures = 0;
                            } catch (e) {
                                structuredLogger.warn('⚠️  No se pudo recoger comida cercana');
                            }
                        } else {
                            structuredLogger.warn('⚠️  No hay comida cercana visible');
                        }
                        
                        // 🆕 Estrategia de emergencia: Si el bot está atascado, intentar saltar o moverse
                        const botPos = this.bot.entity.position;
                        const blockBelow = this.bot.blockAt(botPos.offset(0, -1, 0));
                        const blockInFluid = this.bot.entity.isInWater || this.bot.entity.isInLava;
                        
                        if (blockInFluid) {
                            structuredLogger.info('🌊 Bot en fluido, intentando nadar y saltar...');
                            // Intentar saltar repetidamente para salir
                            for (let i = 0; i < 5; i++) {
                                this.bot.setControlState('jump', true);
                                await new Promise(resolve => setTimeout(resolve, 200));
                                this.bot.setControlState('jump', false);
                                await new Promise(resolve => setTimeout(resolve, 300));
                            }
                        } else if (blockBelow && blockBelow.name === 'air') {
                            structuredLogger.warn('⚠️  Bot cayendo o en borde, intentando estabilizar...');
                            // Intentar moverse hacia adelante para estabilizarse
                            this.bot.setControlState('forward', true);
                            await new Promise(resolve => setTimeout(resolve, 500));
                            this.bot.setControlState('forward', false);
                        }
                        
                        // Esperar un poco antes de continuar
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        emergencyFailures = 0; // Resetear para permitir nuevo ciclo
                        currentState = 'ASSESS';
                        lastStateChange = now;
                        break;
                    }

                    // Prioridad 1: Comer si hay comida en inventario
                    if (emergencyPrevState.foodItems > 0) {
                        structuredLogger.info('🍖 Emergencia: Intentando comer...');
                        const ate = await this.autoEat.eatIfNeeded();
                        if (ate) {
                            structuredLogger.success('✅ Emergencia: Comida consumida');
                            if (this.mlLearner) {
                                this.mlLearner.learnFromAction('EMERGENCY_EAT', true, this.getBotState(), emergencyPrevState);
                            }
                            emergencyFailures = 0; // Resetear contador de fallos
                            currentState = 'ASSESS';
                            lastStateChange = now;
                            break;
                        } else {
                            emergencyFailures++;
                            structuredLogger.warn(`⚠️  Fallo al comer (${emergencyFailures}/${MAX_EMERGENCY_FAILURES})`);
                            // Continuar a siguiente prioridad
                        }
                    }

                    // Prioridad 2: Huir si hay enemigos
                    if (emergencyPrevState.nearbyHostiles > 0) {
                        structuredLogger.info('🏃 Emergencia: Huyendo de enemigos...');
                        try {
                            await this.fleeToSafety();
                            if (this.mlLearner) {
                                this.mlLearner.learnFromAction('EMERGENCY_FLEE', true, this.getBotState(), emergencyPrevState);
                            }
                            emergencyFailures = 0;
                            currentState = 'ASSESS';
                            lastStateChange = now;
                            break;
                        } catch (e) {
                            emergencyFailures++;
                            structuredLogger.warn(`⚠️  Fallo al huir (${emergencyFailures}/${MAX_EMERGENCY_FAILURES})`);
                            // Continuar a siguiente prioridad
                        }
                    }

                    // Prioridad 3: Buscar lugar seguro (lejos de peligros)
                    // 🆕 Solo intentar si no hay enemigos cercanos (ya se intentó huir)
                    if (emergencyPrevState.nearbyHostiles === 0) {
                        structuredLogger.warn('🚨 Emergencia: Buscando lugar seguro...');
                        try {
                            await this.findSafeLocation();
                            emergencyFailures = 0;
                            if (this.mlLearner) {
                                this.mlLearner.learnFromAction('EMERGENCY_FLEE', true, this.getBotState(), emergencyPrevState);
                            }
                            currentState = 'ASSESS';
                            lastStateChange = now;
                            break;
                        } catch (e) {
                            emergencyFailures++;
                            structuredLogger.warn(`⚠️  Fallo al buscar lugar seguro (${emergencyFailures}/${MAX_EMERGENCY_FAILURES})`);
                            
                            // 🆕 Si falla, intentar movimiento aleatorio pero NO resetear contador
                            structuredLogger.info('🗺️  Intentando movimiento aleatorio...');
                            try {
                                await this.explore();
                                // No resetear emergencyFailures aquí - explorar puede fallar también
                            } catch (exploreError) {
                                structuredLogger.warn('⚠️  También falló exploración');
                            }
                            // Continuar el loop para que eventualmente active recuperación natural
                            currentState = 'ASSESS';
                            lastStateChange = now;
                            break;
                        }
                    }
                    
                    // Si llegó aquí, no se ejecutó ninguna acción válida
                    emergencyFailures++;
                    structuredLogger.warn(`⚠️  Ninguna acción de emergencia disponible (${emergencyFailures}/${MAX_EMERGENCY_FAILURES})`);
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'EAT':
                    structuredLogger.info('🍖 Buscando comida...');
                    const ate = await this.autoEat.eatIfNeeded();
                    if (!ate) {
                        structuredLogger.warn('No hay comida, buscando...');
                        await this.gatherFood();
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'ASSESS':
                    // 🧠 Usar conocimiento de crafteos para tomar decisiones inteligentes
                    const inventory = this.getInventorySummary();
                    structuredLogger.info('📦 Evaluando inventario...');
                    structuredLogger.info(`Inventario: ${JSON.stringify(inventory)}`);
                    
                    // 🧠 Verificar objetivos de progresión
                    const craftingGoal = this.getNextCraftingGoal();
                    if (craftingGoal) {
                        structuredLogger.info(`🎯 Objetivo de crafteo: ${craftingGoal.item} (Fase ${craftingGoal.phaseNumber}: ${craftingGoal.phase})`);
                    }
                    
                    // 🧠 Verificar items crafteables disponibles
                    const craftableItems = this.getCraftableItems();
                    if (craftableItems.length > 0) {
                        const topCraftable = craftableItems.slice(0, 5);
                        structuredLogger.info(`📋 Items crafteables disponibles: ${topCraftable.map(i => i.item).join(', ')}`);
                    }

                    // Contar recursos
                    const hasPickaxe = (inventory['wooden_pickaxe'] || 0) > 0 || (inventory['stone_pickaxe'] || 0) > 0 || (inventory['iron_pickaxe'] || 0) > 0;
                    const hasAxe = (inventory['wooden_axe'] || 0) > 0 || (inventory['stone_axe'] || 0) > 0 || (inventory['iron_axe'] || 0) > 0;
                    const hasLogs = (inventory['oak_log'] || 0) + (inventory['birch_log'] || 0) + (inventory['spruce_log'] || 0) + (inventory['jungle_log'] || 0) > 0;
                    const logCount = (inventory['oak_log'] || 0) + (inventory['birch_log'] || 0) + (inventory['spruce_log'] || 0) + (inventory['jungle_log'] || 0);
                    const hasPlanks = (inventory['oak_planks'] || 0) + (inventory['birch_planks'] || 0) + (inventory['spruce_planks'] || 0) + (inventory['jungle_planks'] || 0) > 0;
                    const plankCount = (inventory['oak_planks'] || 0) + (inventory['birch_planks'] || 0) + (inventory['spruce_planks'] || 0) + (inventory['jungle_planks'] || 0);
                    const hasSticks = (inventory['stick'] || 0) > 0;
                    const stickCount = inventory['stick'] || 0;
                    const hasTable = (inventory['crafting_table'] || 0) > 0;

                    structuredLogger.info(`📊 Recursos: logs=${logCount}, planks=${plankCount}, sticks=${stickCount}, hasTable=${hasTable}, hasPickaxe=${hasPickaxe}`);

                    // 🎯 FLUJO LÓGICO DE PROGRESO
                    // Paso 1: Si no tiene planks pero tiene logs -> hacer planks PRIMERO
                    if (hasLogs && !hasPlanks) {
                        structuredLogger.info('🪵 Tiene logs pero no planks -> CRAFT_PLANKS');
                        currentState = 'CRAFT_PLANKS';
                        lastStateChange = now;
                        break;
                    }

                    // Paso 2: Si tiene logs adicionales -> convertirlos a planks (prioridad alta)
                    if (hasLogs && plankCount < 20) {
                        structuredLogger.info('🪵 Convirtiendo logs adicionales a planks -> CRAFT_PLANKS');
                        currentState = 'CRAFT_PLANKS';
                        lastStateChange = now;
                        break;
                    }

                    // Paso 3: Si no tiene mesa de crafteo -> hacer mesa (prioridad MÁXIMA con 4+ planks)
                    if (!hasTable && plankCount >= 4) {
                        structuredLogger.info('🔨 No tiene mesa, crafteando crafting_table -> CRAFT_TABLE');
                        currentState = 'CRAFT_TABLE';
                        lastStateChange = now;
                        break;
                    }

                    // Paso 4: Si tiene pocos planks (< 12) y no tiene mesa -> conseguir más madera
                    if (plankCount < 12 && !hasTable) {
                        structuredLogger.info('🪵 Pocos planks para mesa, buscando más madera -> GATHER_WOOD');
                        currentState = 'GATHER_WOOD';
                        lastStateChange = now;
                        break;
                    }

                    // Paso 5: Si no tiene pico -> hacer pico de madera (necesita 3 planks + 2 sticks)
                    if (!hasPickaxe) {
                        // Verificar si tiene suficientes materiales
                        if (!hasTable) {
                            structuredLogger.warn('⚠️  Necesita mesa para craftear pico -> CRAFT_TABLE');
                            currentState = 'CRAFT_TABLE';
                        } else if (plankCount < 3) {
                            structuredLogger.warn('⚠️  No hay suficientes planks para pico -> GATHER_WOOD');
                            currentState = 'GATHER_WOOD';
                        } else if (!hasSticks && plankCount < 5) {
                            // Necesita 2 planks para hacer 4 sticks + 3 planks para el pico = 5 planks total
                            structuredLogger.warn('⚠️  No hay sticks, consiguiendo más planks -> GATHER_WOOD');
                            currentState = 'GATHER_WOOD';
                        } else {
                            structuredLogger.info('⛏️  Crafteando wooden_pickaxe -> CRAFT_PICKAXE');
                            currentState = 'CRAFT_PICKAXE';
                        }
                        lastStateChange = now;
                        break;
                    }

                    // Paso 6: Si no tiene hacha -> hacer hacha de madera (opcional pero útil)
                    if (!hasAxe && hasTable && plankCount >= 5) {
                        structuredLogger.info('🪓 Crafteando wooden_axe -> CRAFT_AXE');
                        currentState = 'CRAFT_AXE';
                        lastStateChange = now;
                        break;
                    }

                    // Tiene todo lo básico -> explorar y progresar
                    structuredLogger.info('✅ Tiene herramientas básicas, explorando...');
                    currentState = 'EXPLORE';
                    consecutiveFailures = 0;
                    lastStateChange = now;
                    break;

                case 'CRAFT_PLANKS':
                    structuredLogger.info('🪵 Crafteando planks...');
                    const planksPrevState = this.getBotState();
                    await this.craftPlanks();
                    const planksNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('CRAFT_PLANKS', planksNewState.plankCount > planksPrevState.plankCount, planksNewState, planksPrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'GATHER_WOOD':
                    structuredLogger.info('🪵 Recolectando madera...');
                    const prevState = this.getBotState();
                    await this.gatherWood();
                    const newState = this.getBotState();
                    
                    // 🧠 ML: Registrar acción exitosa
                    if (this.mlLearner && newState.logCount > prevState.logCount) {
                        this.mlLearner.onActionSuccess('GATHER_WOOD', newState, {
                            type: 'mine',
                            block: 'oak_log',
                            quantity: newState.logCount - prevState.logCount
                        });
                        this.mlLearner.learnFromAction('GATHER_WOOD', true, newState, prevState);
                    }
                    
                    // 🔄 Después de recoger madera, ir directamente a craftear planks
                    if (newState.logCount > prevState.logCount) {
                        structuredLogger.info('🪵 Madera obtenida, convirtiendo a planks...');
                        currentState = 'CRAFT_PLANKS';
                    } else {
                        structuredLogger.warn('⚠️  No se obtuvo madera, evaluando...');
                        currentState = 'ASSESS';
                    }
                    lastStateChange = now;
                    break;

                case 'CRAFT_PICKAXE':
                    structuredLogger.info('⛏️  Crafteando pico...');
                    const craftPickaxePrevState = this.getBotState();
                    
                    // 🛡️ Validar materiales ANTES de intentar
                    if (craftPickaxePrevState.plankCount < 3) {
                        structuredLogger.warn(`❌ No hay planks suficientes: ${craftPickaxePrevState.plankCount}/3`);
                        // Redirigir a conseguir más madera
                        currentState = 'GATHER_WOOD';
                        lastStateChange = now;
                        break;
                    }
                    
                    const craftPickaxeSuccess = await this.craftPickaxe();
                    const craftPickaxeNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('CRAFT_PICKAXE', craftPickaxeSuccess, craftPickaxeNewState, craftPickaxePrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'CRAFT_TABLE':
                    structuredLogger.info('🔨 Crafteando mesa de crafteo...');
                    const craftTablePrevState = this.getBotState();

                    // 🛡️ Validar materiales ANTES de intentar
                    if (craftTablePrevState.plankCount < 4) {
                        structuredLogger.warn(`❌ No hay planks suficientes: ${craftTablePrevState.plankCount}/4`);
                        // Redirigir a conseguir más madera
                        currentState = 'GATHER_WOOD';
                        lastStateChange = now;
                        break;
                    }

                    const crafted = await this.craftCraftingTable();
                    const craftTableNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('CRAFT_TABLE', crafted, craftTableNewState, craftTablePrevState);
                    }
                    if (crafted) {
                        consecutiveFailures = 0;
                    } else {
                        consecutiveFailures++;
                        if (consecutiveFailures >= MAX_FAILURES) {
                            structuredLogger.warn('Demasiados fallos crafteando mesa, explorando...');
                            currentState = 'EXPLORE';
                        }
                    }
                    lastStateChange = now;
                    break;

                case 'CRAFT_AXE':
                    structuredLogger.info('🪓 Crafteando hacha de madera...');
                    const craftAxePrevState = this.getBotState();

                    // 🛡️ Validar materiales ANTES de intentar
                    if (craftAxePrevState.plankCount < 5) {
                        structuredLogger.warn(`❌ No hay planks suficientes: ${craftAxePrevState.plankCount}/5`);
                        currentState = 'GATHER_WOOD';
                        lastStateChange = now;
                        break;
                    }

                    const axeCrafted = await this.craftAxe();
                    const craftAxeNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('CRAFT_AXE', axeCrafted, craftAxeNewState, craftAxePrevState);
                    }
                    if (axeCrafted) {
                        structuredLogger.success('✅ Hacha crafteada exitosamente');
                        consecutiveFailures = 0;
                    } else {
                        consecutiveFailures++;
                        if (consecutiveFailures >= MAX_FAILURES) {
                            structuredLogger.warn('Demasiados fallos crafteando hacha...');
                        }
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'EXPLORE':
                    structuredLogger.info('🗺️  Explorando...');
                    const explorePrevState = this.getBotState();
                    await this.explore();
                    const exploreNewState = this.getBotState();
                    // 🧠 ML: Registrar exploración
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('EXPLORE', true, exploreNewState, explorePrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'SLEEP':
                    structuredLogger.info('😴 Durmiendo...');
                    const sleepPrevState = this.getBotState();
                    // Esperar a que pase la noche
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    const sleepNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('SLEEP', !sleepNewState.isNight, sleepNewState, sleepPrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'FLEE':
                    structuredLogger.info('🏃 Huyendo...');
                    const fleePrevState = this.getBotState();
                    await this.fleeToSafety();
                    const fleeNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        const success = fleeNewState.nearbyHostiles < fleePrevState.nearbyHostiles;
                        this.mlLearner.learnFromAction('FLEE', success, fleeNewState, fleePrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'FIGHT':
                    structuredLogger.info('⚔️  Combatiendo...');
                    const fightPrevState = this.getBotState();
                    await this.engageCombat();
                    const fightNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        const success = fightNewState.nearbyHostiles < fightPrevState.nearbyHostiles;
                        this.mlLearner.learnFromAction('FIGHT', success, fightNewState, fightPrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'BUILD_SHELTER':
                    structuredLogger.info('🏠 Construyendo refugio...');
                    const shelterPrevState = this.getBotState();
                    await this.buildShelter();
                    const shelterNewState = this.getBotState();
                    // 🧠 ML: Registrar resultado
                    if (this.mlLearner) {
                        this.mlLearner.learnFromAction('BUILD_SHELTER', true, shelterNewState, shelterPrevState);
                    }
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                case 'IDLE':
                    // No hacer nada, esperar
                    structuredLogger.debug('⏸️  En espera...');
                    currentState = 'ASSESS';
                    lastStateChange = now;
                    break;

                default:
                    currentState = 'ASSESS';
                    lastStateChange = now;
            }

            this.stateManager.set('currentTask', currentState);
        }, 1000); // Check cada segundo
    }

    async fleeToSafety() {
        // Buscar posición segura y navegar
        const hostiles = this.getNearbyHostiles(16);
        if (hostiles.length > 0) {
            const threat = hostiles[0];
            const fleePos = this.bot.entity.position.minus(threat.position).normalize().scaled(30);
            const targetX = this.bot.entity.position.x + fleePos.x;
            const targetZ = this.bot.entity.position.z + fleePos.z;
            
            structuredLogger.info(`🏃 Huyendo a: ${Math.round(targetX)}, ${Math.round(targetZ)}`);
            
            await this.pathfinder.goTo(
                targetX,
                this.bot.entity.position.y,
                targetZ,
                { timeout: 30000 }
            );
        }
    }

    async findSafeLocation() {
        // Buscar ubicación segura aleatoria lejos de peligros
        const hostiles = this.getNearbyHostiles(32);
        const currentPos = this.bot.entity.position;

        // Calcular dirección opuesta a los enemigos
        let safeX = currentPos.x;
        let safeZ = currentPos.z;

        if (hostiles.length > 0) {
            // Promediar posición de enemigos
            let avgEnemyX = 0, avgEnemyZ = 0;
            for (const enemy of hostiles) {
                avgEnemyX += enemy.position.x;
                avgEnemyZ += enemy.position.z;
            }
            avgEnemyX /= hostiles.length;
            avgEnemyZ /= hostiles.length;

            // Moverse en dirección opuesta (50 bloques)
            const direction = currentPos.minus({ x: avgEnemyX, y: 0, z: avgEnemyZ }).normalize();
            safeX = currentPos.x + direction.x * 50;
            safeZ = currentPos.z + direction.z * 50;
        } else {
            // Si no hay enemigos, moverse aleatoriamente 30 bloques
            const angle = Math.random() * Math.PI * 2;
            safeX = currentPos.x + Math.cos(angle) * 30;
            safeZ = currentPos.z + Math.sin(angle) * 30;
        }

        structuredLogger.info(`🗺️  Yendo a lugar seguro: ${Math.round(safeX)}, ${Math.round(safeZ)}`);

        // 🆕 Intentar con diferentes rangos y timeouts
        const ranges = [5, 10, 20];
        const timeouts = [30000, 20000, 10000];
        
        for (let i = 0; i < ranges.length; i++) {
            try {
                await this.pathfinder.goTo(safeX, currentPos.y, safeZ, {
                    timeout: timeouts[i],
                    range: ranges[i]
                });
                structuredLogger.success('✅ Lugar seguro alcanzado');
                return true;
            } catch (e) {
                structuredLogger.warn(`⚠️  Fallo con range=${ranges[i]}, intentando siguiente...`);
                if (i === ranges.length - 1) {
                    throw e; // Relanzar último error
                }
            }
        }
        
        return false;
    }

    async gatherFood() {
        // 1. Buscar animales para cazar (vaca, cerdo, pollo, oveja)
        const meatAnimals = ['cow', 'pig', 'chicken', 'sheep'];
        for (const mobName of meatAnimals) {
            const mob = this.bot.nearestEntity(e => e.name === mobName &&
                e.position.distanceTo(this.bot.entity.position) < 32);
            if (mob) {
                structuredLogger.info(`🥩 Cazando ${mobName} para comida`);
                try {
                    await this.pathfinder.goTo(
                        mob.position.x,
                        mob.position.y,
                        mob.position.z,
                        { timeout: 15000, range: 3 }
                    );
                    if (this.pvp) {
                        await this.pvp.engageCombat(mob);
                    }
                    return;
                } catch (err) {
                    structuredLogger.warn(`No se pudo cazar ${mobName}`, { error: err.message });
                }
            }
        }

        // 2. Buscar bloques de comida (cultivos)
        const foodBlocks = ['wheat', 'carrots', 'potatoes', 'beetroots'];
        for (const food of foodBlocks) {
            const block = this.bot.findBlock({
                matching: this.bot.registry.blocksByName[food]?.id,
                maxDistance: 32
            });
            if (block) {
                await this.collectBlock.mineBlock(block);
                return;
            }
        }
    }

    async engageCombat() {
        // Buscar enemigo más cercano y atacar
        const hostiles = this.getNearbyHostiles(32);
        if (hostiles.length > 0) {
            const target = hostiles[0];
            structuredLogger.info(`⚔️  Atacando a ${target.name}`);
            
            // Navegar hacia el enemigo
            await this.pathfinder.goTo(
                target.position.x,
                target.position.y,
                target.position.z,
                { timeout: 30000, range: 3 }
            );
            
            // Atacar
            if (this.pvp) {
                await this.pvp.engageCombat(target);
            }
        }
    }

    async buildShelter() {
        // Construir refugio básico de 3x3x3
        structuredLogger.info('🏠 Construyendo refugio básico...');
        
        const pos = this.bot.entity.position;
        const baseX = Math.floor(pos.x);
        const baseY = Math.floor(pos.y);
        const baseZ = Math.floor(pos.z);
        
        // Usar bloques disponibles (tierra, piedra, madera)
        const blocks = ['dirt', 'cobblestone', 'oak_planks', 'oak_log'];
        let blockType = null;
        
        for (const block of blocks) {
            if ((this.getInventorySummary()[block] || 0) > 0) {
                blockType = block;
                break;
            }
        }
        
        if (!blockType) {
            structuredLogger.warn('No hay bloques para refugio');
            return false;
        }
        
        structuredLogger.info(`Usando ${blockType} para refugio`);
        // Nota: La construcción completa requiere implementación más compleja
        // Por ahora, solo registrar la intención
        return true;
    }

    getInventorySummary() {
        const summary = {};
        for (const item of this.bot.inventory.items()) {
            if (item) {
                summary[item.name] = (summary[item.name] || 0) + item.count;
            }
        }
        return summary;
    }

    /**
     * 🧠 Verificar qué items puede craftear el bot con su inventario actual
     * Usa la base de conocimiento de crafteos
     * @returns {Array} Lista de items crafteables con sus recetas
     */
    getCraftableItems() {
        const inventory = this.getInventorySummary();
        const craftable = [];
        
        if (!this.craftingKnowledge || !this.craftingKnowledge.recipes) {
            return craftable;
        }
        
        for (const [itemName, recipe] of Object.entries(this.craftingKnowledge.recipes)) {
            if (this.canCraftRecipe(recipe, inventory)) {
                craftable.push({
                    item: itemName,
                    recipe: recipe,
                    priority: recipe.priority,
                    output: recipe.output
                });
            }
        }
        
        // Ordenar por prioridad (menor es más prioritario)
        craftable.sort((a, b) => a.priority - b.priority);
        
        return craftable;
    }

    /**
     * 🧠 Verificar si se puede craftear una receta con el inventario dado
     * @param {Object} recipe - Receta de crafteo
     * @param {Object} inventory - Inventario del bot
     * @returns {boolean} True si se puede craftear
     */
    canCraftRecipe(recipe, inventory) {
        if (!recipe || !recipe.ingredients) return false;
        
        for (const [ingredient, requiredCount] of Object.entries(recipe.ingredients)) {
            const availableCount = this.getIngredientCount(ingredient, inventory);
            if (availableCount < requiredCount) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * 🧠 Obtener cantidad de un ingrediente en el inventario
     * Maneja ingredientes especiales como 'any_planks', 'any_log', etc.
     * @param {string} ingredient - Nombre del ingrediente
     * @param {Object} inventory - Inventario del bot
     * @returns {number} Cantidad disponible
     */
    getIngredientCount(ingredient, inventory) {
        // Ingredientes comodín
        if (ingredient === 'any_planks') {
            const plankTypes = [
                'oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks',
                'acacia_planks', 'dark_oak_planks', 'mangrove_planks', 'cherry_planks',
                'bamboo_planks', 'crimson_planks', 'warped_planks'
            ];
            return plankTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
        }
        
        if (ingredient === 'any_log') {
            const logTypes = [
                'oak_log', 'birch_log', 'spruce_log', 'jungle_log',
                'acacia_log', 'dark_oak_log', 'mangrove_log', 'cherry_log',
                'crimson_stem', 'warped_stem'
            ];
            return logTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
        }
        
        if (ingredient === 'any_wool') {
            const woolColors = [
                'white_wool', 'orange_wool', 'magenta_wool', 'light_blue_wool',
                'yellow_wool', 'lime_wool', 'pink_wool', 'gray_wool',
                'light_gray_wool', 'cyan_wool', 'purple_wool', 'blue_wool',
                'brown_wool', 'green_wool', 'red_wool', 'black_wool'
            ];
            return woolColors.reduce((sum, color) => sum + (inventory[color] || 0), 0);
        }
        
        if (ingredient === 'any_slab') {
            // Contar todas las losas
            return Object.entries(inventory)
                .filter(([key]) => key.includes('_slab'))
                .reduce((sum, [_, count]) => sum + count, 0);
        }
        
        return inventory[ingredient] || 0;
    }

    /**
     * 🧠 Obtener el siguiente objetivo de crafteo basado en la fase de progresión
     * @returns {Object|null} Item objetivo con su receta
     */
    getNextCraftingGoal() {
        if (!this.craftingKnowledge || !this.craftingKnowledge.hierarchy) {
            return null;
        }
        
        const inventory = this.getInventorySummary();
        const phase = this.craftingKnowledge.hierarchy[this.currentPhase - 1];
        
        if (!phase) {
            structuredLogger.info('✅ ¡Todas las fases de progresión completadas!');
            return null;
        }
        
        for (const itemName of phase.items) {
            const recipe = this.craftingKnowledge.recipes[itemName];
            if (recipe && this.canCraftRecipe(recipe, inventory)) {
                structuredLogger.info(`🎯 Objetivo de fase ${phase.phase}: ${itemName}`);
                return {
                    item: itemName,
                    recipe: recipe,
                    phase: phase.name,
                    phaseNumber: phase.phase
                };
            }
        }
        
        // Si no puede craftear nada de esta fase, verificar si necesita materiales
        structuredLogger.info(`⏳ Fase ${phase.phase} (${phase.name}): Esperando materiales...`);
        return null;
    }

    /**
     * 🧠 Obtener todos los materiales necesarios para un item objetivo
     * @param {string} targetItem - Item objetivo
     * @returns {Array} Lista de materiales necesarios
     */
    getRequiredMaterials(targetItem) {
        const materials = [];
        const visited = new Set();
        
        const traverse = (item) => {
            if (visited.has(item)) return;
            visited.add(item);
            
            const recipe = this.craftingKnowledge?.recipes?.[item];
            if (recipe && recipe.dependencies) {
                for (const dep of recipe.dependencies) {
                    if (!materials.includes(dep)) {
                        materials.push(dep);
                    }
                    traverse(dep);
                }
            }
        };
        
        traverse(targetItem);
        return materials;
    }

    async craftPlanks() {
        // 🪵 Convertir TODOS los logs en inventario a planks
        const logTypes = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log'];
        let totalPlanksCrafted = 0;
        
        for (const logType of logTypes) {
            const logs = this.bot.inventory.items().filter(i => i.name === logType);
            const totalLogs = logs.reduce((sum, log) => sum + log.count, 0);
            
            if (totalLogs > 0) {
                try {
                    const plankName = logType.replace('_log', '_planks');
                    const plankId = this.bot.registry.itemsByName[plankName]?.id;
                    if (!plankId) continue;

                    // Cada log da 4 planks
                    const totalPlanksToCraft = totalLogs * 4;
                    
                    // Craftear de a 1 plank por vez (receta base)
                    for (let i = 0; i < totalLogs; i++) {
                        const plankRecipe = this.bot.recipesFor(plankId, null, 1, null);
                        if (plankRecipe && plankRecipe.length > 0) {
                            await this.bot.craft(plankRecipe[0], 1, null);
                            totalPlanksCrafted += 4;
                            structuredLogger.debug(`+4 ${plankName} (${totalPlanksCrafted} total)`);
                        }
                    }
                    
                    structuredLogger.success(`✓ ${totalPlanksCrafted} planks crafteados desde ${logType}`);
                } catch (e) {
                    structuredLogger.warn(`Error crafteando planks de ${logType}: ${e.message}`);
                }
            }
        }
        
        if (totalPlanksCrafted === 0) {
            structuredLogger.warn('⚠️  No hay logs para craftear planks');
        } else {
            structuredLogger.success(`✅ Total: ${totalPlanksCrafted} planks crafteados`);
        }
    }

    async gatherWood() {
        const logTypes = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log'];
        for (const logType of logTypes) {
            const block = this.bot.findBlock({
                matching: this.bot.registry.blocksByName[logType]?.id,
                maxDistance: 64
            });
            if (block) {
                await this.collectBlock.mineBlock(block);
                return;
            }
        }
        // Si no hay árboles, explorar
        await this.explore();
    }

    async craftPickaxe() {
        // 🛠️ Craftear pico de madera usando mesa de crafteo
        const planks = this.bot.inventory.items().find(i => i.name.includes('planks'));
        if (!planks || planks.count < 3) {
            structuredLogger.warn('❌ No hay suficientes planks (necesita 3)');
            return false;
        }

        let tablePos = null;

        try {
            // 1. Craftear sticks si no tiene (2 planks = 4 sticks)
            const sticks = this.bot.inventory.items().find(i => i.name === 'stick');
            if (!sticks || sticks.count < 2) {
                structuredLogger.info('🥢 Crafteando sticks...');

                // Intentar con receta primero
                const stickRecipe = this.bot.recipesFor(
                    this.bot.registry.itemsByName.stick.id,
                    null,
                    1,
                    null
                );

                if (stickRecipe && stickRecipe.length > 0) {
                    await this.bot.craft(stickRecipe[0], 1, null);
                    structuredLogger.success('✓ Sticks crafteados (receta)');
                } else {
                    // Usar método manual 2x2
                    const stickSuccess = await this.craftSticks();
                    if (!stickSuccess) {
                        structuredLogger.error('❌ No se pudieron craftear sticks');
                        return false;
                    }
                }
            }

            // 2. Verificar sticks nuevamente
            const sticksAfter = this.bot.inventory.items().find(i => i.name === 'stick');
            if (!sticksAfter || sticksAfter.count < 2) {
                structuredLogger.error('❌ No se pudieron craftear sticks');
                return false;
            }

            // 3. Verificar si ya hay crafting table COLOCADA (no en inventario)
            structuredLogger.info('🔍 Buscando crafting table colocada...');
            tablePos = this.findPlacedCraftingTable();

            if (tablePos) {
                structuredLogger.success(`✅ Crafting table encontrada en ${Math.round(tablePos.x)}, ${Math.round(tablePos.y)}, ${Math.round(tablePos.z)}`);
            } else {
                // 4. Buscar espacio abierto si es necesario
                structuredLogger.info('🌲 Verificando espacio para colocar la mesa...');
                const openSpace = await this.findOpenSpace();
                
                if (!openSpace) {
                    structuredLogger.warn('⚠️  No se encontró espacio abierto, intentando colocar donde está...');
                }
                
                // 5. Colocar crafting table
                structuredLogger.info('🪵 Colocando crafting table...');
                tablePos = await this.placeCraftingTable();
                
                if (!tablePos) {
                    structuredLogger.error('❌ No se pudo colocar la crafting table');
                    return false;
                }
                
                // Esperar un momento para que el servidor registre el bloque
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // 6. Verificar que la mesa esté colocada
            const tableBlock = this.bot.blockAt(tablePos);
            if (!tableBlock || tableBlock.name !== 'crafting_table') {
                structuredLogger.error(`❌ La mesa no está correctamente colocada (bloque: ${tableBlock?.name || 'null'})`);
                return false;
            }

            // 7. Craftear pico de madera usando la mesa
            structuredLogger.info('⛏️  Crafteando wooden_pickaxe...');
            const success = await this.craftWithTable(
                this.bot.registry.itemsByName.wooden_pickaxe.id,
                1,
                tablePos
            );

            if (!success) {
                structuredLogger.error('❌ No se pudo craftear el pico');
                return false;
            }

            // 8. Recuperar crafting table
            structuredLogger.info('♻️  Recuperando crafting table...');
            if (tablePos) {
                await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa
                const retrieved = await this.retrieveCraftingTable(tablePos);
                
                if (retrieved) {
                    structuredLogger.success('✅ Mesa recuperada exitosamente');
                } else {
                    structuredLogger.warn('⚠️  No se pudo recuperar la mesa (ya no estaba o error)');
                }
            }

            structuredLogger.success('✅ wooden_pickaxe crafteado y mesa recuperada');
            return true;

        } catch (e) {
            structuredLogger.error(`❌ Error crafteando pico: ${e.message}`);
            structuredLogger.debug(e.stack);
            
            // Intentar recuperar la mesa en caso de error
            if (tablePos) {
                try {
                    await this.retrieveCraftingTable(tablePos);
                } catch (retrieveErr) {
                    structuredLogger.warn('⚠️  No se pudo recuperar la crafting table');
                }
            }
            
            return false;
        }
    }

    /**
     * 🔨 Método manual para crafteo 2x2 (inventario)
     * Usa el plugin InventoryCrafting para craftear sin receta
     * @param {string} itemName - Nombre del item a craftear
     * @param {number} count - Cantidad a craftear
     * @returns {boolean} True si tuvo éxito
     */
    async craftInGrid(itemName, count = 1) {
        try {
            structuredLogger.debug(`🔨 Crafteo en grilla 2x2: ${itemName} x${count}`);
            
            const item = this.bot.registry.itemsByName[itemName];
            if (!item) {
                structuredLogger.error(`❌ Item ${itemName} no encontrado en registry`);
                return false;
            }
            
            // Usar el plugin InventoryCrafting
            const success = await this.inventoryCrafting.craftInInventory(item.id, count);
            
            if (success) {
                structuredLogger.success(`✅ ${itemName} crafteado en grilla 2x2`);
                return true;
            }
            
            return false;
            
        } catch (e) {
            structuredLogger.debug(`❌ Crafteo 2x2 falló: ${e.message}`);
            return false;
        }
    }

    /**
     * Limpiar la grilla de crafteo 2x2
     */
    async clearCraftingGrid() {
        try {
            const craftingSlots = [1, 2, 3, 4];
            for (const slot of craftingSlots) {
                const item = this.bot.inventory.slots[slot];
                if (item) {
                    // Devolver item al inventario
                    await this.bot.putAway(slot);
                }
            }
        } catch (e) {
            // Ignorar errores al limpiar
        }
    }

    /**
     * 🌲 Buscar y moverse a un espacio abierto cercano
     * @returns {Object|null} Posición encontrada o null
     */
    async findOpenSpace() {
        try {
            const botPos = this.bot.entity.position;
            const searchRadius = 8;
            const positionsToCheck = [];

            // Generar posiciones a verificar en espiral desde el bot
            for (let r = 1; r <= searchRadius; r++) {
                for (let x = -r; x <= r; x++) {
                    for (let z = -r; z <= r; z++) {
                        if (Math.abs(x) === r || Math.abs(z) === r) {
                            positionsToCheck.push({ x, z });
                        }
                    }
                }
            }

            // Verificar cada posición
            for (const offset of positionsToCheck) {
                const checkPos = botPos.offset(offset.x, 0, offset.z);
                const blockAtPos = this.bot.blockAt(checkPos);
                const blockBelow = this.bot.blockAt(checkPos.offset(0, -1, 0));
                const blockAbove = this.bot.blockAt(checkPos.offset(0, 1, 0));
                const blockAbove2 = this.bot.blockAt(checkPos.offset(0, 2, 0));

                // Verificar que haya espacio suficiente (2 bloques de altura mínimo)
                const hasSpaceAbove = (!blockAbove || blockAbove.name === 'air') && 
                                     (!blockAbove2 || blockAbove2.name === 'air');
                
                // Verificar que el suelo sea sólido
                const hasSolidGround = blockBelow && !blockBelow.diggable;
                
                // Verificar que la posición esté libre
                const isPositionFree = blockAtPos && blockAtPos.name === 'air';

                if (hasSpaceAbove && hasSolidGround && isPositionFree) {
                    structuredLogger.info(`🌲 Espacio abierto encontrado en ${Math.floor(checkPos.x)}, ${Math.floor(checkPos.y)}, ${Math.floor(checkPos.z)}`);
                    
                    // Navegar hacia la posición
                    await this.pathfinder.goTo(checkPos.x, checkPos.y, checkPos.z, {
                        timeout: 10000,
                        range: 1
                    });
                    
                    structuredLogger.success('✅ Bot movido a espacio abierto');
                    return checkPos;
                }
            }

            structuredLogger.warn('⚠️  No se encontró espacio abierto cercano');
            return null;

        } catch (e) {
            structuredLogger.error(`❌ Error buscando espacio abierto: ${e.message}`);
            structuredLogger.debug(e.stack);
            return null;
        }
    }

    /**
     * 🪵 Colocar crafting table en el mundo
     * @returns {Object|null} Posición colocada o null si falló
     */
    async placeCraftingTable() {
        try {
            // Verificar si tiene crafting table en inventario
            const craftingTableItem = this.bot.inventory.items().find(i => i.name === 'crafting_table');
            if (!craftingTableItem || craftingTableItem.count < 1) {
                structuredLogger.warn('❌ No tiene crafting table en inventario');
                return null;
            }

            const botPos = this.bot.entity.position;
            
            // Buscar posición para colocar - intentar en horizontal primero
            const directions = [
                { x: 1, y: 0, z: 0, name: 'este' },
                { x: -1, y: 0, z: 0, name: 'oeste' },
                { x: 0, y: 0, z: 1, name: 'sur' },
                { x: 0, y: 0, z: -1, name: 'norte' }
            ];

            for (const dir of directions) {
                const placePos = botPos.offset(dir.x, 0, dir.z);
                const blockAtPlace = this.bot.blockAt(placePos);
                
                // Verificar que la posición esté libre (aire)
                if (!blockAtPlace || blockAtPlace.name !== 'air') continue;
                
                // Verificar que haya un bloque sólido abajo
                const blockBelow = this.bot.blockAt(placePos.offset(0, -1, 0));
                if (!blockBelow || blockBelow.diggable) continue;
                
                structuredLogger.info(`🪵 Colocando crafting table al ${dir.name}...`);
                
                // Colocar el bloque
                await this.bot.placeBlock(blockBelow, {
                    x: 0,
                    y: 1,
                    z: 0
                });
                
                structuredLogger.success(`✅ Crafting table colocada en ${Math.round(placePos.x)}, ${Math.round(placePos.y)}, ${Math.round(placePos.z)}`);
                return placePos;
            }

            structuredLogger.warn('⚠️  No se encontró posición válida para colocar la mesa');
            return null;

        } catch (e) {
            structuredLogger.error(`❌ Error colocando crafting table: ${e.message}`);
            structuredLogger.debug(e.stack);
            return null;
        }
    }

    /**
     * 🔨 Craftear usando crafting table colocada
     * @param {number} itemId - ID del item a craftear
     * @param {number} count - Cantidad
     * @param {Object} tablePos - Posición de la crafting table
     * @returns {boolean} True si tuvo éxito
     */
    async craftWithTable(itemId, count = 1, tablePos = null) {
        try {
            const registry = this.bot.registry;
            const itemName = registry.items[itemId]?.name || 'unknown';
            
            structuredLogger.info(`🔨 Usando crafting table para craftear ${itemName}...`);
            
            // Si no tiene posición, buscar crafting table cercana
            if (!tablePos) {
                const tableBlock = this.bot.findBlock({
                    matching: registry.blocksByName.crafting_table.id,
                    maxDistance: 4
                });
                
                if (!tableBlock) {
                    structuredLogger.warn('⚠️  No hay crafting table colocada cerca');
                    return false;
                }
                tablePos = tableBlock.position;
            }

            // Esperar un momento para que el servidor registre el bloque
            await new Promise(resolve => setTimeout(resolve, 200));

            // Obtener el bloque de la crafting table
            const tableBlock = this.bot.blockAt(tablePos);
            
            if (!tableBlock) {
                structuredLogger.error('❌ No se encontró el bloque de crafting table');
                return false;
            }

            if (tableBlock.name !== 'crafting_table') {
                structuredLogger.error(`❌ El bloque en esa posición es ${tableBlock.name}, no crafting_table`);
                return false;
            }

            // Abrir la crafting table
            const craftingTable = await this.bot.openContainer(tableBlock);
            
            if (!craftingTable) {
                structuredLogger.error('❌ No se pudo abrir la crafting table');
                return false;
            }

            try {
                // Obtener receta para este item
                const recipes = this.bot.recipesFor(itemId, null, count, tableBlock);
                
                if (!recipes || recipes.length === 0) {
                    structuredLogger.error(`❌ No se encontró receta para ${itemName}`);
                    return false;
                }

                // Ejecutar crafteo
                await this.bot.craft(recipes[0], count, tableBlock);
                
                structuredLogger.success(`✅ ${itemName} crafteado exitosamente`);
                return true;

            } finally {
                // Cerrar ventana siempre
                try {
                    await this.bot.closeWindow(craftingTable);
                } catch (closeErr) {
                    structuredLogger.debug('Error cerrando ventana (ignorado)');
                }
            }

        } catch (e) {
            structuredLogger.error(`❌ Error crafteando con mesa: ${e.message}`);
            structuredLogger.debug(e.stack);
            return false;
        }
    }

    /**
     * ⛏️ Romper y recuperar crafting table
     * @param {Object} tablePos - Posición de la crafting table
     * @returns {boolean} True si tuvo éxito
     */
    async retrieveCraftingTable(tablePos) {
        try {
            if (!tablePos) {
                structuredLogger.warn('⚠️  No hay posición de crafting table para recuperar');
                return false;
            }

            // Esperar un momento
            await new Promise(resolve => setTimeout(resolve, 300));

            const tableBlock = this.bot.blockAt(tablePos);
            
            if (!tableBlock || tableBlock.name !== 'crafting_table') {
                structuredLogger.warn('⚠️  La crafting table ya no está en esa posición');
                return false;
            }

            structuredLogger.info(`⛏️  Rompiendo crafting table en ${Math.round(tablePos.x)}, ${Math.round(tablePos.y)}, ${Math.round(tablePos.z)}`);
            
            // Navegar cerca de la mesa si está lejos
            const dist = this.bot.entity.position.distanceTo(tablePos);
            if (dist > 4) {
                await this.pathfinder.goTo(
                    tablePos.x + 0.5,
                    tablePos.y,
                    tablePos.z + 0.5,
                    { timeout: 5000, range: 3 }
                );
            }

            // Romper la mesa
            await this.bot.dig(tableBlock);
            
            structuredLogger.success('✅ Crafting table recuperada');
            return true;

        } catch (e) {
            structuredLogger.error(`❌ Error recuperando crafting table: ${e.message}`);
            structuredLogger.debug(e.stack);
            return false;
        }
    }

    /**
     * 🪵 Verificar si hay crafting table colocada cerca
     * @returns {Object|null} Posición de la mesa o null
     */
    findPlacedCraftingTable() {
        const tableBlock = this.bot.findBlock({
            matching: this.bot.registry.blocksByName.crafting_table.id,
            maxDistance: 4
        });
        
        if (tableBlock) {
            return tableBlock.position;
        }
        return null;
    }

    async craftCraftingTable() {
        // 🔨 Craftear mesa de crafteo (4 planks en cuadrícula 2x2 del inventario)
        try {
            // Verificar planks suficientes
            const planks = this.bot.inventory.items().find(i => i.name.includes('planks'));
            if (!planks || planks.count < 4) {
                structuredLogger.warn('❌ No hay suficientes planks (necesita 4)');
                return false;
            }

            const tableId = this.bot.registry.blocksByName.crafting_table.id;
            const plankId = this.bot.registry.itemsByName[planks.name]?.id;

            structuredLogger.info(`📋 Buscando receta: tableId=${tableId}, plankId=${plankId}`);

            // Método 1: Usar recipesFor con el ID de planks específico
            let tableRecipe = this.bot.recipesFor(tableId, [plankId], 1, null);

            // Método 2: Usar recipesFor sin filtro de ingredientes
            if (!tableRecipe || tableRecipe.length === 0) {
                tableRecipe = this.bot.recipesFor(tableId, null, 1, null);
                structuredLogger.info(`📋 recipesFor sin filtro: ${tableRecipe?.length || 0} recetas`);
            }

            // Método 3: Probar con todos los tipos de planks disponibles
            if (!tableRecipe || tableRecipe.length === 0) {
                const allPlankTypes = ['oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks',
                                       'acacia_planks', 'dark_oak_planks', 'mangrove_planks',
                                       'cherry_planks', 'bamboo_planks', 'crimson_planks', 'warped_planks'];

                for (const plankType of allPlankTypes) {
                    const pid = this.bot.registry.itemsByName[plankType]?.id;
                    if (pid && pid !== plankId) {
                        const recipe = this.bot.recipesFor(tableId, [pid], 1, null);
                        if (recipe && recipe.length > 0) {
                            structuredLogger.info(`✅ Receta encontrada usando ${plankType} (ID: ${pid})`);
                            tableRecipe = recipe;
                            break;
                        }
                    }
                }
            }

            structuredLogger.info(`📋 Recetas encontradas: ${tableRecipe?.length || 0}`);

            if (tableRecipe && tableRecipe.length > 0) {
                const recipe = Array.isArray(tableRecipe) ? tableRecipe[0] : tableRecipe;
                await this.bot.craft(recipe, 1, null);
                structuredLogger.success('✅ crafting_table crafteado');
                return true;
            } else {
                // 🆕 Método 4: Crafteo directo en grilla 2x2 del inventario
                structuredLogger.info('🔨 Intentando crafteo directo en grilla 2x2...');
                
                const success = await this.craftInGrid('crafting_table', 1);
                
                if (success) {
                    structuredLogger.success('✅ crafting_table crafteado (grilla 2x2)');
                    return true;
                }
                
                structuredLogger.error('❌ No se pudo craftear crafting_table con ningún método');
                structuredLogger.debug(`Planks en inventario: ${planks.name} x${planks.count}`);
                return false;
            }
        } catch (e) {
            structuredLogger.error(`❌ Error crafteando mesa: ${e.message}`);
            structuredLogger.debug(e.stack);
            return false;
        }
    }

    /**
     * 🥢 Craftear sticks directamente en grilla 2x2
     * @returns {boolean} True si tuvo éxito
     */
    async craftSticks() {
        try {
            const planks = this.bot.inventory.items().find(i => i.name.includes('planks'));
            if (!planks || planks.count < 2) {
                structuredLogger.warn('❌ No hay suficientes planks para sticks (necesita 2)');
                return false;
            }

            // Método 1: Usar recipesFor
            let stickRecipe = this.bot.recipesFor(this.bot.registry.itemsByName.stick.id, null, 1, null);

            if (stickRecipe && stickRecipe.length > 0) {
                await this.bot.craft(stickRecipe[0], 1, null);
                structuredLogger.success('✅ Sticks crafteados (receta)');
                return true;
            }

            // Método 2: Crafteo directo en grilla 2x2
            structuredLogger.info('🔨 Intentando crafteo directo de sticks...');
            
            const success = await this.craftInGrid('stick', 1);
            
            if (success) {
                structuredLogger.success('✅ Sticks crafteados (grilla 2x2)');
                return true;
            }
            
            return false;
        } catch (e) {
            structuredLogger.error(`❌ Error crafteando sticks: ${e.message}`);
            return false;
        }
    }

    async craftAxe() {
        // 🪓 Craftear hacha de madera usando mesa de crafteo
        const planks = this.bot.inventory.items().find(i => i.name.includes('planks'));
        if (!planks || planks.count < 5) {
            structuredLogger.warn('❌ No hay suficientes planks (necesita 5)');
            return false;
        }

        let tablePos = null;

        try {
            // 1. Craftear sticks si no tiene
            const sticks = this.bot.inventory.items().find(i => i.name === 'stick');
            if (!sticks || sticks.count < 2) {
                structuredLogger.info('🥢 Crafteando sticks...');
                const stickRecipe = this.bot.recipesFor(
                    this.bot.registry.itemsByName.stick.id,
                    null,
                    1,
                    null
                );
                if (stickRecipe && stickRecipe.length > 0) {
                    await this.bot.craft(stickRecipe[0], 1, null);
                    structuredLogger.success('✓ Sticks crafteados');
                }
            }

            // 2. Verificar sticks nuevamente
            const sticksAfter = this.bot.inventory.items().find(i => i.name === 'stick');
            if (!sticksAfter || sticksAfter.count < 2) {
                structuredLogger.error('❌ No se pudieron craftear sticks');
                return false;
            }

            // 3. Verificar si ya hay crafting table colocada
            const existingTable = this.bot.findBlock({
                matching: this.bot.registry.blocksByName.crafting_table.id,
                maxDistance: 4
            });

            if (existingTable) {
                structuredLogger.info('🪵 Usando crafting table existente...');
                tablePos = existingTable.position;
            } else {
                // 4. Colocar crafting table si no hay
                structuredLogger.info('🪵 Colocando crafting table...');
                tablePos = await this.placeCraftingTable();
                
                if (!tablePos) {
                    structuredLogger.error('❌ No se pudo colocar la crafting table');
                    return false;
                }
            }

            // 5. Craftear hacha de madera usando la mesa
            structuredLogger.info('🪓 Crafteando wooden_axe...');
            const success = await this.craftWithTable(
                this.bot.registry.itemsByName.wooden_axe.id,
                1,
                tablePos
            );

            if (!success) {
                structuredLogger.error('❌ No se pudo craftear el hacha');
                return false;
            }

            // 6. Recuperar crafting table
            if (tablePos) {
                await new Promise(resolve => setTimeout(resolve, 500));
                await this.retrieveCraftingTable(tablePos);
            }

            structuredLogger.success('✅ wooden_axe crafteado y mesa recuperada');
            return true;

        } catch (e) {
            structuredLogger.error(`❌ Error crafteando hacha: ${e.message}`);
            structuredLogger.debug(e.stack);
            
            // Intentar recuperar la mesa en caso de error
            if (tablePos) {
                try {
                    await this.retrieveCraftingTable(tablePos);
                } catch (retrieveErr) {
                    structuredLogger.warn('⚠️  No se pudo recuperar la crafting table');
                }
            }
            
            return false;
        }
    }

    async explore() {
        // Explorar en dirección aleatoria
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 20;
        const targetX = this.bot.entity.position.x + Math.cos(angle) * distance;
        const targetZ = this.bot.entity.position.z + Math.sin(angle) * distance;

        try {
            await this.pathfinder.goTo(targetX, this.bot.entity.position.y, targetZ, {
                timeout: 30000,
                range: 5
            });
        } catch (e) {
            structuredLogger.debug('Exploración interrumpida');
        }
    }

    getNearbyHostiles(radius) {
        const hostiles = ['zombie', 'skeleton', 'creeper', 'spider', 'witch', 'blaze'];
        return Object.values(this.bot.entities).filter(e => {
            // 🛡️ PRIORIDAD 2: Validaciones estrictas para evitar falsos positivos
            if (!e || !e.name || !e.position) return false;
            if (!hostiles.includes(e.name?.toLowerCase())) return false;
            
            const distance = this.bot.entity.position.distanceTo(e.position);
            if (distance > radius) return false;
            
            // Solo considerar entidades vivas (con health)
            if (e.health !== undefined && e.health <= 0) return false;
            
            return true;
        });
    }
    
    /**
     * Validar si una acción es ejecutable
     * 🛡️ PRIORIDAD 3: Evitar acciones imposibles
     */
    canExecuteAction(action, state) {
        switch(action) {
            case 'MINE_DIAMOND':
                return state.hasPickaxe && state.diamondCount === 0;
            case 'MINE_IRON':
                return state.hasPickaxe;
            case 'CRAFT_TABLE':
                return state.plankCount >= 4 && !state.hasTable;
            case 'CRAFT_PICKAXE':
                return state.plankCount >= 3 && !state.hasPickaxe;
            case 'CRAFT_PLANKS':
                return state.logCount > 0;
            case 'CRAFT_SWORD':
                return state.plankCount >= 2 && !state.hasSword;
            case 'FIGHT':
                return state.nearbyHostiles > 0 && (state.hasSword || state.health > 15);
            case 'FLEE':
                return state.nearbyHostiles > 0 && state.health > 6;
            case 'BUILD_SHELTER':
                return state.isNight && (state.plankCount > 10 || state.stoneCount > 20);
            case 'GATHER_WOOD':
                return state.logCount < 20;
            case 'GATHER_STONE':
                return state.stoneCount < 50 && state.hasPickaxe;
            case 'GATHER_FOOD':
                return state.foodItems < 20;
            case 'EAT':
                return state.food < 18;
            case 'SLEEP':
                return state.isNight && state.nearbyHostiles === 0;
            default:
                return true; // Acciones desconocidas siempre son válidas
        }
    }

    /**
     * Obtener nombre del bioma actual
     */
    getBiomeName() {
        try {
            const pos = this.bot.entity.position;
            const chunk = this.bot.world.getColumn(
                Math.floor(pos.x / 16),
                Math.floor(pos.z / 16)
            );
            if (chunk) {
                const biomeId = chunk.getBiome(
                    Math.floor(pos.x) & 0xf,
                    Math.floor(pos.y),
                    Math.floor(pos.z) & 0xf
                );
                const biome = this.mcData?.biomes?.[biomeId];
                return biome?.name || 'unknown';
            }
        } catch (_err) {
            // Fallback silencioso
        }
        return 'unknown';
    }

    /**
     * Obtener estado actual del bot para ML
     */
    getBotState() {
        const inventory = this.getInventorySummary();
        const position = this.bot.entity?.position || { x: 0, y: 0, z: 0 };
        const time = this.bot.time?.timeOfDay || 0;

        return {
            health: this.bot.health || 20,
            food: this.bot.food || 20,
            hasPickaxe: (inventory['wooden_pickaxe'] || 0) > 0 ||
                       (inventory['stone_pickaxe'] || 0) > 0 ||
                       (inventory['iron_pickaxe'] || 0) > 0,
            hasSword: (inventory['wooden_sword'] || 0) > 0 ||
                     (inventory['stone_sword'] || 0) > 0 ||
                     (inventory['iron_sword'] || 0) > 0,
            hasAxe: (inventory['wooden_axe'] || 0) > 0 ||
                   (inventory['stone_axe'] || 0) > 0 ||
                   (inventory['iron_axe'] || 0) > 0,
            hasShield: (inventory['shield'] || 0) > 0,
            hasArmor: (inventory['iron_helmet'] || 0) > 0 ||
                     (inventory['iron_chestplate'] || 0) > 0,
            plankCount: (inventory['oak_planks'] || 0) +
                       (inventory['birch_planks'] || 0) +
                       (inventory['spruce_planks'] || 0) +
                       (inventory['jungle_planks'] || 0),
            logCount: (inventory['oak_log'] || 0) +
                     (inventory['birch_log'] || 0) +
                     (inventory['spruce_log'] || 0) +
                     (inventory['jungle_log'] || 0),
            stickCount: inventory['stick'] || 0,
            stoneCount: inventory['cobblestone'] || 0,
            ironCount: inventory['iron_ingot'] || 0,
            diamondCount: inventory['diamond'] || 0,
            foodItems: (inventory['bread'] || 0) +
                      (inventory['cooked_beef'] || 0) +
                      (inventory['apple'] || 0),
            hasTable: (inventory['crafting_table'] || 0) > 0,
            hasFurnace: (inventory['furnace'] || 0) > 0,
            nearbyHostiles: this.getNearbyHostiles(16).length,
            isNight: time >= 13000 || time <= 1000,
            biome: this.getBiomeName(),
            position,
            inventory
        };
    }
    
    /**
     * Actualización periódica
     */
    update() {
        if (!this.isConnected || !this.bot.entity) return;

        // Guardar estado anterior para ML
        const previousState = this.previousBotState;
        this.previousBotState = this.getBotState();
        
        // Actualizar posición
        const pos = this.bot.entity.position;
        this.stateManager.set('position', {
            x: pos.x,
            y: pos.y,
            z: pos.z
        });
        
        // Actualizar salud, comida e inventario en el estado
        this.stateManager.set('health', this.bot.health);
        this.stateManager.set('food', this.bot.food);
        this.stateManager.updateInventory(this.getInventorySummary());
        
        // 🧠 ML: Auto-guardado periódico
        if (this.mlLearner) {
            this.mlLearner.checkAutoSave();
            
            // Actualizar memoria del ML
            this.mlLearner.memory.updateStatus(pos, this.previousBotState.inventory);
        }

        // Verificar auto-eat
        if (this.autoEat.isEnabled()) {
            this.autoEat.eatIfNeeded();
        }
    }
    
    /**
     * Imprimir telemetría con ML
     */
    printTelemetry() {
        const sessionTime = this.stateManager.getFormattedSessionTime();
        const deaths = this.stateManager.get('deaths', 0);
        const pos = this.stateManager.get('position', { x: 0, y: 0, z: 0 });
        const inventory = this.getInventorySummary();
        const currentTask = this.stateManager.get('currentTask', 'unknown');

        // ═══════════════════════════════════════════════════════════════
        // 📊 DASHBOARD MEJORADO CON INFORMACIÓN DE PROGRESO
        // ═══════════════════════════════════════════════════════════════
        
        structuredLogger.info('╔════════════════════════════════════════════════════════════╗');
        structuredLogger.info('║           📊 DASHBOARD DE TELEMETRÍA v6.3                  ║');
        structuredLogger.info('╠════════════════════════════════════════════════════════════╣');
        
        // Información básica
        structuredLogger.info(`║ ⏱️  Sesión: ${sessionTime.padEnd(12)} │ 🎯 Tarea: ${currentTask.padEnd(15)}          ║`);
        structuredLogger.info(`║ 📍 Posición: ${Math.round(pos.x).toString().padEnd(4)}, ${Math.round(pos.y).toString().padEnd(4)}, ${Math.round(pos.z).toString().padEnd(4)} │ 🧠 Fase: ${this.currentPhase}/10                  ║`);
        structuredLogger.info(`║ ❤️  Salud: ${this.bot.health.toFixed(1).padEnd(5)}/20     │ 💀 Muertes: ${deaths.toString().padEnd(2)}                        ║`);
        structuredLogger.info(`║ 🍖 Comida: ${this.bot.food.toString().padEnd(5)}/20     │ 🎒 Items: ${Object.keys(inventory).length.toString().padEnd(2)}                   ║`);
        
        // Inventario resumido con íconos
        const invSummary = [];
        if ((inventory['oak_log'] || 0) > 0) invSummary.push(`🪵${inventory['oak_log']}`);
        if ((inventory['oak_planks'] || 0) > 0) invSummary.push(`📋${inventory['oak_planks']}`);
        if ((inventory['stick'] || 0) > 0) invSummary.push(`🥢${inventory['stick']}`);
        if ((inventory['crafting_table'] || 0) > 0) invSummary.push(`🔨${inventory['crafting_table']}`);
        if ((inventory['wooden_pickaxe'] || 0) > 0) invSummary.push(`⛏️${inventory['wooden_pickaxe']}`);
        if ((inventory['stone_pickaxe'] || 0) > 0) invSummary.push(`⛏️${inventory['stone_pickaxe']}`);
        if ((inventory['iron_pickaxe'] || 0) > 0) invSummary.push(`⛏️${inventory['iron_pickaxe']}`);
        if ((inventory['diamond_pickaxe'] || 0) > 0) invSummary.push(`💎⛏️${inventory['diamond_pickaxe']}`);
        if ((inventory['wooden_sword'] || 0) > 0) invSummary.push(`🗡️${inventory['wooden_sword']}`);
        if ((inventory['stone_sword'] || 0) > 0) invSummary.push(`🗡️${inventory['stone_sword']}`);
        if ((inventory['iron_sword'] || 0) > 0) invSummary.push(`🗡️${inventory['iron_sword']}`);
        if ((inventory['diamond_sword'] || 0) > 0) invSummary.push(`💎🗡️${inventory['diamond_sword']}`);
        if ((inventory['bow'] || 0) > 0) invSummary.push(`🏹${inventory['bow']}`);
        if ((inventory['arrow'] || 0) > 0) invSummary.push(`➹${inventory['arrow']}`);
        if ((inventory['coal'] || 0) > 0) invSummary.push(`⚫${inventory['coal']}`);
        if ((inventory['iron_ingot'] || 0) > 0) invSummary.push(`ite${inventory['iron_ingot']}`);
        if ((inventory['gold_ingot'] || 0) > 0) invSummary.push(`✨${inventory['gold_ingot']}`);
        if ((inventory['diamond'] || 0) > 0) invSummary.push(`💎${inventory['diamond']}`);
        if ((inventory['emerald'] || 0) > 0) invSummary.push(`💚${inventory['emerald']}`);
        if ((inventory['bread'] || 0) > 0) invSummary.push(`🍞${inventory['bread']}`);
        
        const invStr = invSummary.slice(0, 6).join(' ') || '🈳';
        structuredLogger.info(`║ 🎒 Inventario: ${invStr.padEnd(35)} ║`);
        
        structuredLogger.info('╠════════════════════════════════════════════════════════════╣');
        
        // Estadísticas de combate y minería
        const pvpStats = this.pvp.getStats();
        const collectStats = this.collectBlock.getStats();
        const pathfinderStats = this.pathfinder.getStats();
        
        structuredLogger.info(`║ ⚔️  Enemigos derrotados: ${pvpStats.enemiesKilled || 0}${' '.repeat(28)} ║`);
        structuredLogger.info(`║ ⛏️  Bloques minados: ${collectStats.blocksMined || 0}${' '.repeat(31)} ║`);
        structuredLogger.info(`║ 🗺️  Pathfinding: ${pathfinderStats.cacheHitRate}% hit rate${' '.repeat(28)} ║`);
        
        structuredLogger.info('╠════════════════════════════════════════════════════════════╣');
        
        // 🧠 ML Stats mejorados
        if (this.mlLearner) {
            const mlStats = this.mlLearner.getStats();
            const explorationPct = (mlStats.qLearning.explorationRate * 100).toFixed(1);
            const avgReward = typeof mlStats.qLearning.avgReward === 'number' ? mlStats.qLearning.avgReward.toFixed(3) : mlStats.qLearning.avgReward;
            const qTableSize = mlStats.qLearning.qTableSize;
            const totalDecisions = mlStats.qLearning.totalDecisions;
            const successRate = mlStats.qLearning.successRate ? (mlStats.qLearning.successRate * 100).toFixed(1) : 'N/A';
            
            structuredLogger.info('║ 🧠 MACHINE LEARNING - Q-LEARNING                         ║');
            structuredLogger.info(`║ ├─ Decisiones: ${totalDecisions.toString().padEnd(8)} │ Q-Table: ${qTableSize.toString().padEnd(6)} estados           ║`);
            structuredLogger.info(`║ ├─ Exploración: ${explorationPct.padEnd(6)}%    │ Recompensa: ${avgReward.padEnd(6)}                   ║`);
            structuredLogger.info(`║ ├─ Éxito: ${successRate.padEnd(3)}%       │ Memoria: ${mlStats.memory.sessions || 0} sesiones               ║`);
            
            // Barra de progreso de aprendizaje (visual)
            const learningProgress = Math.min(100, Math.floor((1 - mlStats.qLearning.explorationRate) * 100));
            const barLength = 20;
            const filledLength = Math.floor((learningProgress / 100) * barLength);
            const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
            structuredLogger.info(`║ └─ Progreso ML: [${bar}] ${learningProgress}%`);
        }
        
        // 🎯 Objetivo actual
        if (this.craftingKnowledge && this.craftingKnowledge.hierarchy) {
            const phase = this.craftingKnowledge.hierarchy[this.currentPhase - 1];
            if (phase) {
                structuredLogger.info('╠════════════════════════════════════════════════════════════╣');
                structuredLogger.info(`║ 🎯 FASE ${this.currentPhase}: ${phase.name.padEnd(33)} ║`);
                structuredLogger.info(`║ └─ Items: ${phase.items.slice(0, 5).join(', ').padEnd(38)} ║`);
            }
        }
        
        structuredLogger.info('╚════════════════════════════════════════════════════════════╝');
    }
    
    /**
     * Detener bot
     */
    async stop() {
        structuredLogger.info('Deteniendo bot...');

        this.isRunning = false;

        // Detener acciones
        this.pvp?.stop();
        this.collectBlock?.stop();
        this.pathfinder?.stop();
        this.adaptiveBehavior?.stop();

        // 🧠 ML: Guardar progreso de aprendizaje
        if (this.mlLearner) {
            this.mlLearner.save();
            structuredLogger.info('🧠 ML guardado');
            
            // Imprimir estadísticas de aprendizaje
            const stats = this.mlLearner.getStats();
            structuredLogger.info('📊 Estadísticas de ML:', stats);
        }

        // Detener auto-guardado
        this.stateManager?.stopAutoSave();

        // Guardar estado final
        await this.stateManager?.save();

        // Desconectar
        if (this.bot) {
            this.bot.quit();
        }

        structuredLogger.info('Bot detenido');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA
// ═══════════════════════════════════════════════════════════════════════════

const galaBot = new GalaBot();

// Manejo de señales
process.on('SIGINT', async () => {
    structuredLogger.info('Señal SIGINT recibida');
    await galaBot.stop();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    structuredLogger.info('Señal SIGTERM recibida');
    await galaBot.stop();
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    structuredLogger.fatal('Error no capturado', { error: err.message, stack: err.stack });
    
    // 🛡️ Intentar guardar ML antes de salir
    if (galaBot.mlLearner) {
        try {
            galaBot.mlLearner.save();
            structuredLogger.info('💾 ML guardado antes de crash');
        } catch (e) {
            structuredLogger.error('Error guardando ML: ' + e.message);
        }
    }
    
    galaBot.stop();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    structuredLogger.error('Promesa rechazada no manejada', {
        reason: reason?.message || reason,
        stack: reason?.stack
    });
    
    // 🛡️ Intentar guardar ML y continuar
    if (galaBot.mlLearner) {
        try {
            galaBot.mlLearner.save();
            structuredLogger.info('💾 ML guardado por error');
        } catch (e) {
            structuredLogger.error('Error guardando ML: ' + e.message);
        }
    }
    
    // No salir inmediatamente, intentar recovery
    structuredLogger.warn('Intentando recovery después de error...');
    if (galaBot.bot && galaBot.bot.health > 0) {
        // Bot aún vivo, intentar continuar
        structuredLogger.info('Bot continúa ejecutándose...');
    }
});

// Iniciar
(async () => {
    try {
        await galaBot.initialize();
        await galaBot.start();
    } catch (error) {
        structuredLogger.fatal('Error fatal al iniciar', { error: error.message, stack: error.stack });
        process.exit(1);
    }
})();

export default GalaBot;
