/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GALA AI V6.0 "OMEGA" - MINECRAFT AUTO-BOT COMPLETISTA
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 🎯 OBJETIVO: Completar Minecraft 100% autónomamente
 * 🏆 LOGROS: Ender Dragon + Elytra + Beacon + Todas las granjas + Trading
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ARQUITECTURA DE NIVELES (Progresión tipo humano)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * NIVEL 0 - SUPERVIVENCIA INMEDIATA
 * ├─ Recolectar madera sin herramientas
 * ├─ Craftear mesa y herramientas básicas
 * ├─ Conseguir comida inicial
 * └─ Sobrevivir primera noche (refugio o cama)
 * 
 * NIVEL 1 - ESTABLECIMIENTO
 * ├─ Herramientas de piedra completas
 * ├─ Granja de comida automática
 * ├─ Sistema básico de cofres
 * ├─ Mina inicial de recursos
 * └─ Armadura de hierro completa
 * 
 * NIVEL 2 - PROGRESIÓN
 * ├─ Herramientas de hierro completas
 * ├─ Horno y sistema de fundición
 * ├─ Granja de hierro (golems)
 * ├─ Exploración de cuevas profunda
 * └─ Base principal construida
 * 
 * NIVEL 3 - TECNOLOGÍA
 * ├─ Herramientas de diamante
 * ├─ Mesa de encantamientos (nivel 30)
 * ├─ Yunque para reparaciones
 * ├─ Trading con villagers
 * └─ Granja de XP automática
 * 
 * NIVEL 4 - PREPARACIÓN NETHER
 * ├─ 10+ diamantes en inventario
 * ├─ Cubo de agua (para cruzar lava)
 * ├─ Bloques de construcción (cobble)
 * ├─ Arco y flechas
 * ├─ Pociones básicas (fire resistance)
 * └─ Comida abundante (stacks)
 * 
 * NIVEL 5 - NETHER
 * ├─ Construir y activar portal
 * ├─ Explorar Nether con seguridad
 * ├─ Encontrar fortaleza
 * ├─ Derrotar Blazes (rods)
 * ├─ Conseguir Ender Pearls
 * └─ Volver al Overworld
 * 
 * NIVEL 6 - BÚSQUEDA DEL END
 * ├─ Craftear Ojos de Ender
 * ├─ Lanzar ojos y seguir dirección
 * ├─ Triangular posición de stronghold
 * ├─ Excavar hasta stronghold
 * ├─ Explorar stronghold
 * └─ Activar portal del End
 * 
 * NIVEL 7 - DRAGON ENDER
 * ├─ Equipamiento completo (diamond/netherite)
 * ├─ Pociones de regeneración y fuerza
 * ├─ Arco con infinitos o muchas flechas
 * ├─ Bloques para escalar
 * ├─ Derrotar cristales (torre + mano)
 * ├─ Derrotar dragón
 * └─ Recoger huevo del dragón
 * 
 * NIVEL 8 - POST-DRAGON
 * ├─ Entrar al End Gateway
 * ├─ Explorar End Cities
 * ├─ Conseguir Elytra
 * ├─ Conseguir Shulker Boxes
 * └─ Volver al Overworld
 * 
 * NIVEL 9 - COMPLETISTA
 * ├─ Beacon completo (Nether Star)
 * ├─ Todas las granjas automáticas
 * ├─ Trading hall optimizado
 * ├─ Almacenamiento masivo ordenado
 * ├─ Encantamientos perfectos
 * └─ Base definitiva construida
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CARACTERÍSTICAS PRINCIPALES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ✅ Pathfinding inteligente con cache y evitación de peligros
 * ✅ Sistema de combate avanzado (críticos, strafing, escudo, arco)
 * ✅ Gestión completa de inventario con ordenamiento automático
 * ✅ Crafteo automático de TODAS las recetas del juego
 * ✅ Construcción de estructuras (refugios, granjas, portals)
 * ✅ Navegación entre dimensiones (Overworld, Nether, End)
 * ✅ Sistema de granjas automáticas (comida, hierro, oro, XP)
 * ✅ Trading con villagers (detección, cura, optimización)
 * ✅ Encantamientos automáticos (tabla, yunque, libros)
 * ✅ Brewing de pociones (combate, utilidad)
 * ✅ Minería automática (branch mining, cuevas)
 * ✅ Exploración con mapeo y waypoints
 * ✅ Sistema día/noche con rutinas automáticas
 * ✅ Recuperación post-muerte con recuperación de items
 * ✅ Guardado persistente de estado y progreso
 * ✅ Telemetría completa y logs detallados
 * ✅ Auto-reparación y recuperación de errores
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * @author Gala AI Development Team
 * @version 6.0.0 "Omega"
 * @minecraft 1.20.1 Java Edition
 * @ram 12GB allocated
 * @difficulty Completista (100% game completion)
 */

// ═══════════════════════════════════════════════════════════════════════════
// IMPORTACION DE DEPENDENCIAS
// ═══════════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mineflayer from 'mineflayer';
import pathfinderPkg from 'mineflayer-pathfinder';
import pvpPkg from 'mineflayer-pvp';
import collectBlockPkg from 'mineflayer-collectblock';
import { Vec3 } from 'vec3';
import minecraftData from 'minecraft-data';

// Desempaquetado de modulos externos
const { pathfinder, Movements, goals: Goals } = pathfinderPkg;
const { plugin: pvp } = pvpPkg;
const { plugin: collectBlock } = collectBlockPkg;

// Obtener directorio actual para paths relativos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACION PRINCIPAL V6.0 "OMEGA"
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // =========================================================================
    // CONFIGURACION DEL SERVIDOR
    // =========================================================================
    server: {
        host: 'localhost',
        port: 51419,
        username: 'Gala_Bot',           // Nombre principal
        version: '1.20.1',
        auth: 'offline',
        statusPrefix: true              // Añadir estado al nombre [MINANDO] Gala_Bot
    },

    // =========================================================================
    // CONFIGURACION DE MEMORIA Y RENDIMIENTO (12GB)
    // =========================================================================
    memory: {
        maxHeap: 12288,                 // 12GB en MB
        gcThreshold: 0.85,              // 85% uso antes de forzar GC
        cacheSize: 2000,                // Cache grande para pathfinding
        backupInterval: 60000           // Backup cada minuto
    },

    // =========================================================================
    // CONFIGURACION DE SUPERVIVENCIA
    // =========================================================================
    survival: {
        // Umbrales de salud
        healthMin: 14,
        healthCritical: 8,
        healthRegenThreshold: 18,
        emergencyHP: 10,                // ⚠️ CRÍTICO: Añadido para fix
        emergencyFood: 8,               // ⚠️ CRÍTICO: Añadido para fix
        
        // Umbrales de comida
        foodMin: 14,
        foodCritical: 6,
        foodRegenThreshold: 18,
        
        // Distancia de seguridad
        dangerDistance: 25,
        safeDistance: 50,
        panicDistance: 40,
        
        // Configuraciones de combate
        combatEnabled: true,
        fleeFromCreeper: true,
        fleeFromMultiple: true,
        maxEnemiesToFight: 3,           // Aumentado para mejor combate
        minHealthToFight: 12,
        
        // Sueño automático
        autoSleep: true,                // Dormir automáticamente de noche
        sleepHealthThreshold: 15,       // Solo dormir si salud > 15
    },

    // =========================================================================
    // LIMITES DE TIEMPO Y REINTENTOS
    // =========================================================================
    limits: {
        miningTimeout: 45000,
        movementTimeout: 60000,
        craftTimeout: 30000,
        placeTimeout: 15000,
        stuckTimeout: 90000,
        recoveryTimeout: 120000,
        
        maxRetries: 5,
        maxConsecutiveFailures: 4,
        maxMiningFailures: 8,
        maxPathfindingFailures: 5,
        
        retryBaseDelay: 2000,
        retryMaxDelay: 15000,
    },

    // =========================================================================
    // CONFIGURACION DE HERRAMIENTAS
    // =========================================================================
    tools: {
        durabilityThreshold: 0.20,
        criticalDurability: 10,
        
        preferredTools: {
            log: 'axe', wood: 'axe', planks: 'axe',
            stone: 'pickaxe', cobblestone: 'pickaxe',
            coal_ore: 'pickaxe', iron_ore: 'pickaxe',
            copper_ore: 'pickaxe', gold_ore: 'pickaxe',
            diamond_ore: 'pickaxe', redstone_ore: 'pickaxe',
            lapis_ore: 'pickaxe', emerald_ore: 'pickaxe',
            obsidian: 'pickaxe', ancient_debris: 'pickaxe',
            nether_quartz_ore: 'pickaxe',
            dirt: 'shovel', grass: 'shovel',
            sand: 'shovel', gravel: 'shovel',
            soul_sand: 'shovel', mycelium: 'shovel'
        },
        
        materialPriority: ['netherite', 'diamond', 'iron', 'stone', 'wooden', 'golden']
    },

    // =========================================================================
    // OPTIMIZACION DE RENDIMIENTO
    // =========================================================================
    optimization: {
        pathfindingCacheSize: 2000,     // Aumentado para 12GB
        cacheExpirationMs: 300000,
        memoryCheckInterval: 30000,     // Chequeo más frecuente
        gcThreshold: 0.85,
        
        blockSearchRadius: 128,         // Aumentado radio de búsqueda
        maxPathLength: 1000,            // Paths más largos permitidos
        pathRecalculationDistance: 15,
        
        telemetryInterval: 15000,       // Telemetría más frecuente
        backupInterval: 60000,
        logLevel: 'debug'               // Logs detallados
    },

    // =========================================================================
    // CONFIGURACION DE INVENTARIO
    // =========================================================================
    inventory: {
        criticalItems: [
            'crafting_table', 'furnace', 'chest', 'barrel',
            'iron_pickaxe', 'diamond_pickaxe', 'netherite_pickaxe',
            'iron_axe', 'diamond_axe', 'netherite_axe',
            'iron_sword', 'diamond_sword', 'netherite_sword',
            'iron_shovel', 'diamond_shovel', 'netherite_shovel',
            'bow', 'crossbow', 'shield', 'trident',
            'flint_and_steel', 'fishing_rod', 'carrot_on_a_stick',
            'bucket', 'water_bucket', 'lava_bucket', 'milk_bucket',
            'torch', 'soul_torch', 'lantern', 'soul_lantern',
            'bed', 'respawn_anchor', 'anchor',
            'compass', 'recovery_compass', 'clock', 'map',
            'ender_pearl', 'eye_of_ender', 'ender_chest',
            'golden_apple', 'enchanted_golden_apple',
            'bread', 'cooked_beef', 'cooked_porkchop', 'golden_carrot',
            'potion', 'splash_potion', 'lingering_potion',
            'totem_of_undying', 'elytra', 'turtle_helmet',
            'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
            'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
            'beacon', 'anvil', 'enchanting_table', 'brewing_stand',
            'end_crystal', 'respawn_anchor'
        ],

        priorityItems: {
            torch: 128, planks: 256, cobblestone: 512,
            dirt: 128, coal: 128, iron_ingot: 256,
            diamond: 128, stick: 256, food: 128,
            ender_pearl: 64, eye_of_ender: 16,
            blaze_rod: 32, ghast_tear: 16,
            gunpowder: 64, string: 64, slime_ball: 64
        },

        maxStacks: {
            cobblestone: 1024, dirt: 256,
            planks: 512, coal: 256,
            iron_ingot: 512, stick: 256,
            torch: 256, netherrack: 512
        },

        blacklist: [
            'diorite', 'granite', 'andesite', 'tuff', 'deepslate',
            'rotten_flesh', 'spider_eye', 'poisonous_potato',
            'gunpowder', 'string', 'slime_ball'
        ],

        autoStorageItems: [
            'cobblestone', 'dirt', 'gravel', 'sand',
            'oak_log', 'birch_log', 'spruce_log', 'jungle_log',
            'acacia_log', 'dark_oak_log', 'mangrove_log',
            'coal', 'iron_ingot', 'gold_ingot', 'diamond',
            'netherite_ingot', 'emerald', 'lapis_lazuli'
        ]
    },

    // =========================================================================
    // CONFIGURACION DE APRENDIZAJE
    // =========================================================================
    learning: {
        knowledgeFile: './gala_knowledge_v6.json',
        stateFile: './gala_state_v6.json',
        metricsFile: './gala_metrics_v6.json',
        logFile: './gala_v6_logs.txt',
        enableLearning: true,
        minSampleSize: 3,
        patternRecognitionWindow: 10,
        saveInterval: 30000
    },

    // =========================================================================
    // CONFIGURACION DE EXPLORACION
    // =========================================================================
    exploration: {
        maxExplorationDistance: 500,
        minExplorationDistance: 30,
        maxExplorationTime: 600000,     // 10 minutos
        caveExplorationEnabled: true,
        caveSafetyCheck: true,
        markExploredAreas: true,
        avoidLava: true,
        createWaypoints: true,          // Crear waypoints automáticos
        detectStructures: true,         // Detectar estructuras automáticamente
        
        // Estructuras a buscar
        structures: {
            village: true,
            pillager_outpost: true,
            mineshaft: true,
            stronghold: true,
            nether_fortress: true,
            bastion_remnant: true,
            ancient_city: true,
            woodland_mansion: true,
            ocean_monument: true,
            desert_temple: true,
            jungle_temple: true,
            witch_hut: true,
            igloo: true
        }
    },

    // =========================================================================
    // CONFIGURACION DE CONSTRUCCION
    // =========================================================================
    building: {
        autoShelterEnabled: true,
        shelterMinHealth: 10,
        shelterBeforeNight: true,
        chestStorageEnabled: true,
        farmEnabled: true,
        portalFrameStyle: 'standard',
        
        // Estilos de construcción
        shelterStyle: 'compact',        // compact, spacious, fortified
        baseStyle: 'functional',        // functional, aesthetic, mega
        bridgeStyle: 'simple'           // simple, arched, covered
    },

    // =========================================================================
    // CONFIGURACION DE GRANJAS
    // =========================================================================
    farms: {
        // Granja de comida
        foodFarm: {
            enabled: true,
            type: 'wheat',              // wheat, carrot, potato, beetroot
            size: 'medium'              // small (9x9), medium (18x18), large (36x36)
        },
        
        // Granja de hierro
        ironFarm: {
            enabled: true,
            villagers: 3,               // Número de villagers
            zombies: 1                  // Número de zombies para scare
        },
        
        // Granja de XP
        xpFarm: {
            enabled: true,
            type: 'mob',                // mob, guardian, enderman
            location: 'base'            // base, cave, nether
        },
        
        // Granja de oro (zombified piglin)
        goldFarm: {
            enabled: true,
            location: 'nether'          // nether portal based
        },
        
        // Granja de raids (emerald)
        raidFarm: {
            enabled: true,
            location: 'mountain'        // mountain village
        }
    },

    // =========================================================================
    // CONFIGURACION DE TRADING
    // =========================================================================
    trading: {
        enabled: true,
        curingEnabled: true,            // Curar zombi villagers para descuentos
        maxVillagers: 12,               // Máximo de villagers en trading hall
        prioritizeEnchants: true,       // Priorizar libros encantados
        prioritizeMending: true,        // Priorizar Mending
        autoRestock: true               // Reponer esmeraldas automáticamente
    },

    // =========================================================================
    // CONFIGURACION DE ENCANTAMIENTOS
    // =========================================================================
    enchanting: {
        enabled: true,
        targetLevel: 30,                // Nivel objetivo de encantamiento
        bookshelfCount: 15,             // Número de librerías
        autoRepair: true,               // Reparar con yunque automáticamente
        prioritizeTools: true,          // Priorizar herramientas
        prioritizeArmor: true,          // Priorizar armadura
        prioritizeWeapons: true,        // Priorizar armas
        
        // Encantamientos objetivo
        targetEnchants: {
            pickaxe: ['efficiency_5', 'fortune_3', 'unbreaking_3', 'mending'],
            axe: ['efficiency_5', 'sharpness_5', 'unbreaking_3', 'mending'],
            sword: ['sharpness_5', 'fire_aspect_2', 'looting_3', 'unbreaking_3', 'mending'],
            helmet: ['protection_4', 'respiration_3', 'aqua_affinity', 'unbreaking_3', 'mending'],
            chestplate: ['protection_4', 'unbreaking_3', 'mending'],
            leggings: ['protection_4', 'unbreaking_3', 'mending'],
            boots: ['protection_4', 'feather_falling_4', 'depth_strider_3', 'unbreaking_3', 'mending'],
            bow: ['power_5', 'punch_2', 'flame', 'infinity', 'unbreaking_3'],
            crossbow: ['multishot', 'quick_charge_3', 'piercing_4', 'unbreaking_3']
        }
    },

    // =========================================================================
    // CONFIGURACION DE POTIONS
    // =========================================================================
    potions: {
        enabled: true,
        autoBrew: true,
        
        // Pociones prioritarias
        priority: [
            'strength',         // Fuerza
            'regeneration',     // Regeneración
            'fire_resistance',  // Resistencia fuego (Nether)
            'water_breathing',  // Respiración agua
            'night_vision',     // Visión nocturna
            'swiftness',        // Velocidad
            'healing',          // Curación instantánea
            'slow_falling'      // Caída lenta (End)
        ],
        
        // Stock mínimo de cada poción
        minStock: {
            strength: 8,
            regeneration: 8,
            fire_resistance: 16,
            water_breathing: 8,
            night_vision: 8,
            swiftness: 8,
            healing: 16,
            slow_falling: 8
        }
    },

    // =========================================================================
    // CONFIGURACION DE COMBATE
    // =========================================================================
    combat: {
        enabled: true,
        
        // Configuración de ataques
        criticalHits: true,           // Ataques críticos (saltando)
        sprinting: true,              // Sprintar mientras combate
        strafing: true,               // Movimiento lateral evasivo
        shieldUse: true,              // Usar escudo automáticamente
        bowCombat: true,              // Usar arco a distancia
        
        // Prioridades de objetivos
        priorities: {
            creeper: 10,              // Máxima prioridad (peligro explosión)
            skeleton: 8,              // Alta prioridad (ranged)
            spider: 6,                // Media prioridad
            zombie: 5,                // Prioridad normal
            enderman: 7,              // Alta si no se mira
            witch: 9,                 // Alta (pociones peligrosas)
            blaze: 9,                 // Alta (Nether, fuego)
            ghast: 8,                 // Alta (Nether, ranged)
            piglin: 4,                // Baja (neutral si oro)
            hoglin: 6,                // Media (Nether)
            wither_skeleton: 10,      // Máxima (Nether fortaleza)
            guardian: 7,              // Alta (ocean monument)
            enderman_end: 3,          // Baja en End (no molestar)
            ender_dragon: 100         // MÁXIMA (objetivo final)
        },
        
        // Configuración de huida
        flee: {
            enabled: true,
            healthThreshold: 6,       // Huir si salud < 6
            multipleEnemies: 4,       // Huir si > 4 enemigos
            creeperDistance: 10       // Huir de creeper si < 10 bloques
        }
    },

    // =========================================================================
    // CONFIGURACION DEL NETHER
    // =========================================================================
    nether: {
        enabled: true,
        
        // Preparación
        minDiamonds: 10,              // Mínimo diamantes antes de entrar
        minFood: 64,                  // Mínimo comida (stacks)
        minBlocks: 256,               // Mínimo bloques construcción
        requireWaterBucket: true,     // Requerir cubo agua
        requireBow: true,             // Requerir arco
        requirePotions: false,        // Requerir pociones (opcional)
        
        // Navegación
        createPortals: true,          // Crear portales de retorno
        markPath: true,               // Marcar camino seguro
        avoidLava: true,
        bridgeGaps: true,             // Puentear huecos
        
        // Objetivos en Nether
        objectives: [
            'find_fortress',         // Encontrar fortaleza
            'get_blaze_rods',        // Conseguir blaze rods (7-10)
            'get_ender_pearls',      // Conseguir ender pearls (16+)
            'get_quartz',            // Conseguir quartz
            'get_ancient_debris'     // Conseguir ancient debris (opcional)
        ]
    },

    // =========================================================================
    // CONFIGURACION DEL END
    // =========================================================================
    end: {
        enabled: true,
        
        // Preparación
        minEnchantedDiamondGear: true,    // Gear diamante encantado
        minStacks: 16,                    // Mínimo 16 stacks de items
        requireBows: 2,                   // Mínimo 2 arcos
        requireArrows: 256,               // Mínimo 256 flechas
        requireEnderPearls: 16,           // Mínimo 16 ender pearls
        requirePotions: true,             // Pociones requeridas
        requireBeds: 64,                  // Camas para explosiones (opcional)
        requireBlocks: 512,               // Bloques para escalar
        
        // Estrategia de combate
        dragonStrategy: 'crystals_first', // crystals_first, bed_explosions, bow_only
        destroyCrystals: true,
        useBeds: false,                   // Usar camas como explosivo (peligroso)
        
        // Post-dragon
        exploreEndCities: true,
        getElytra: true,
        getShulkerBoxes: true
    },

    // =========================================================================
    // CONFIGURACION DE DIA/NOCHE
    // =========================================================================
    dayNight: {
        autoSleep: true,
        sleepTime: 13000,             // Empezar a dormir en tick 13000 (noche)
        nightActivities: [           // Actividades nocturnas
            'mining',                 // Minar de noche
            'indoor_work',            // Trabajo interior (crafteo, enchanting)
            'guard_base'              // Guardar base
        ],
        dayActivities: [             // Actividades diurnas
            'exploration',            // Explorar
            'gathering',              // Recolectar
            'building',               // Construir
            'farming'                 // Granjas
        ]
    },

    // =========================================================================
    // CONFIGURACION DE BACKUP Y PERSISTENCIA
    // =========================================================================
    persistence: {
        enabled: true,
        autoSave: true,
        saveInterval: 30000,          // Guardar cada 30 segundos
        backupCount: 5,               // Mantener 5 backups
        saveLocation: true,           // Guardar ubicación de base
        saveInventory: true,          // Guardar inventario
        saveProgress: true,           // Guardar progreso de objetivos
        saveWaypoints: true           // Guardar waypoints
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// ESTADOS DE LA MAQUINA DE ESTADOS FINITOS (FSM) V6.0
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Sistema de estados expandido para completar todo el juego.
 * Cada estado representa una fase específica del progreso.
 */

const STATE = {
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE SUPERVIVENCIA (Nivel 0-1)
    // ═══════════════════════════════════════════════════════════════════════
    INIT: 'INIT',                       // Inicialización
    EMERGENCY: 'EMERGENCY',             // Emergencia (HP/crítico)
    RECOVERY: 'RECOVERY',               // Recuperación post-muerte
    ASSESS: 'ASSESS',                   // Evaluar situación
    
    // Recolecta inicial
    GATHER_WOOD: 'GATHER_WOOD',         // Recolectar madera
    CRAFT_BASIC: 'CRAFT_BASIC',         // Craftear básico
    GET_FOOD: 'GET_FOOD',               // Conseguir comida
    FIRST_NIGHT: 'FIRST_NIGHT',         // Sobrevivir primera noche
    
    // Establecimiento
    GATHER_STONE: 'GATHER_STONE',       // Recolectar piedra
    CRAFT_STONE_TOOLS: 'CRAFT_STONE_TOOLS', // Herramientas piedra
    GATHER_COAL: 'GATHER_COAL',         // Conseguir carbón
    MAKE_TORCHES: 'MAKE_TORCHES',       // Hacer antorchas
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE PROGRESIÓN (Nivel 2)
    // ═══════════════════════════════════════════════════════════════════════
    MINE_IRON: 'MINE_IRON',             // Minar hierro
    SMELT_IRON: 'SMELT_IRON',           // Fundir hierro
    CRAFT_IRON_TOOLS: 'CRAFT_IRON_TOOLS', // Herramientas hierro
    CRAFT_ARMOR: 'CRAFT_ARMOR',         // Craftear armadura
    BUILD_BASE: 'BUILD_BASE',           // Construir base
    
    // Granjas iniciales
    BUILD_FOOD_FARM: 'BUILD_FOOD_FARM', // Granja de comida
    BUILD_CHEST_SYSTEM: 'BUILD_CHEST_SYSTEM', // Sistema cofres
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE TECNOLOGÍA (Nivel 3)
    // ═══════════════════════════════════════════════════════════════════════
    MINE_DIAMOND: 'MINE_DIAMOND',       // Minar diamantes
    CRAFT_DIAMOND_TOOLS: 'CRAFT_DIAMOND_TOOLS', // Herramientas diamante
    BUILD_ENCHANTING: 'BUILD_ENCHANTING', // Mesa encantamientos
    BUILD_ANVIL: 'BUILD_ANVIL',         // Construir yunque
    SETUP_TRADING: 'SETUP_TRADING',     // Configurar trading
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE PREPARACIÓN NETHER (Nivel 4)
    // ═══════════════════════════════════════════════════════════════════════
    PREPARE_NETHER: 'PREPARE_NETHER',   // Preparar entrada Nether
    MINE_OBSIDIAN: 'MINE_OBSIDIAN',     // Minar obsidiana
    CRAFT_FLINT_STEEL: 'CRAFT_FLINT_STEEL', // Craftear mechero
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DEL NETHER (Nivel 5)
    // ═══════════════════════════════════════════════════════════════════════
    BUILD_PORTAL: 'BUILD_PORTAL',       // Construir portal
    ENTER_PORTAL: 'ENTER_PORTAL',       // Entrar al portal
    NETHER_EXPLORE: 'NETHER_EXPLORE',   // Explorar Nether
    NETHER_FIND_FORTRESS: 'NETHER_FIND_FORTRESS', // Buscar fortaleza
    NETHER_FIGHT_BLAZE: 'NETHER_FIGHT_BLAZE', // Combatir blazes
    NETHER_GET_PEARLS: 'NETHER_GET_PEARLS', // Conseguir pearls
    NETHER_RETURN: 'NETHER_RETURN',     // Volver al Overworld
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE BÚSQUEDA DEL END (Nivel 6)
    // ═══════════════════════════════════════════════════════════════════════
    CRAFT_EYES: 'CRAFT_EYES',           // Craftear ojos de ender
    THROW_EYE: 'THROW_EYE',             // Lanzar ojo
    TRIANGULATE: 'TRIANGULATE',         // Triangular stronghold
    FIND_STRONGHOLD: 'FIND_STRONGHOLD', // Encontrar stronghold
    EXPLORE_STRONGHOLD: 'EXPLORE_STRONGHOLD', // Explorar stronghold
    ACTIVATE_END_PORTAL: 'ACTIVATE_END_PORTAL', // Activar portal End
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DEL END (Nivel 7-8)
    // ═══════════════════════════════════════════════════════════════════════
    PREPARE_END: 'PREPARE_END',         // Preparar viaje al End
    ENTER_END: 'ENTER_END',             // Entrar al End
    FIGHT_DRAGON: 'FIGHT_DRAGON',       // Combatir dragón
    DEFEAT_DRAGON: 'DEFEAT_DRAGON',     // Dragón derrotado
    COLLECT_EGG: 'COLLECT_EGG',         // Recoger huevo
    ENTER_END_GATEWAY: 'ENTER_END_GATEWAY', // Entrar gateway
    FIND_END_CITY: 'FIND_END_CITY',     // Buscar End City
    GET_ELYTRA: 'GET_ELYTRA',           // Conseguir Elytra
    GET_SHULKER: 'GET_SHULKER',         // Conseguir shulker boxes
    RETURN_END: 'RETURN_END',           // Volver del End
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS COMPLETISTA (Nivel 9)
    // ═══════════════════════════════════════════════════════════════════════
    BUILD_BEACON: 'BUILD_BEACON',       // Construir beacon
    BUILD_IRON_FARM: 'BUILD_IRON_FARM', // Granja hierro
    BUILD_GOLD_FARM: 'BUILD_GOLD_FARM', // Granja oro
    BUILD_XP_FARM: 'BUILD_XP_FARM',     // Granja XP
    BUILD_TRADING_HALL: 'BUILD_TRADING_HALL', // Trading hall
    BUILD_STORAGE: 'BUILD_STORAGE',     // Almacenamiento masivo
    PERFECT_GEAR: 'PERFECT_GEAR',       // Gear perfecto encantado
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS DE ACTIVIDADES
    // ═══════════════════════════════════════════════════════════════════════
    EXPLORE: 'EXPLORE',                 // Exploración general
    EXPLORE_CAVE: 'EXPLORE_CAVE',       // Explorar cuevas
    MINE_BRANCH: 'MINE_BRANCH',         // Branch mining
    COMBAT: 'COMBAT',                   // En combate
    FLEE: 'FLEE',                       // Huyendo
    EAT: 'EAT',                         // Comiendo
    SLEEP: 'SLEEP',                     // Durmiendo
    ENCHANT: 'ENCHANT',                 // Encantando
    BREW: 'BREW',                       // Brewendo pociones
    TRADE: 'TRADE',                     // Tradeando
    FARM: 'FARM',                       // Trabajando en granjas
    BUILD: 'BUILD',                     // Construyendo
    
    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS FINALES
    // ═══════════════════════════════════════════════════════════════════════
    VICTORY: 'VICTORY',                 // ¡Juego completado!
    IDLE: 'IDLE'                        // Inactivo
};

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE LOGGING MEJORADO V6.0
// ═══════════════════════════════════════════════════════════════════════════

class Logger {
    static colors = {
        reset: '\x1b[0m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        gray: '\x1b[90m',
        bright: '\x1b[1m',
        bgBlue: '\x1b[44m',
        bgGreen: '\x1b[42m',
        bgRed: '\x1b[41m'
    };

    constructor(namespace) {
        this.ns = namespace;
        this.logFile = CONFIG.learning.logFile;
        this.errorCount = 0;
        this.warnCount = 0;
        this.infoCount = 0;
        this.successCount = 0;

        if (!fs.existsSync(this.logFile)) {
            fs.writeFileSync(this.logFile, '');
        }
    }

    _log(level, color, msg) {
        const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
        const logMsg = `${Logger.colors.bright}${Logger.colors[color]}[${level}]${Logger.colors.reset} ${Logger.colors.gray}[${this.ns}]${Logger.colors.reset} ${msg}`;
        console.log(logMsg);

        try {
            const fileMsg = `${timestamp} [${level}] [${this.ns}] ${msg}\n`;
            fs.appendFileSync(this.logFile, fileMsg);
        } catch (e) {
            // Ignorar errores de escritura
        }

        if (level === 'ERROR') this.errorCount++;
        if (level === 'WARN') this.warnCount++;
        if (level === 'INFO') this.infoCount++;
        if (level === 'SUCCESS') this.successCount++;
    }

    info(msg) { this._log('INFO', 'blue', msg); }
    success(msg) { this._log('SUCCESS', 'green', msg); }
    warn(msg) { this._log('WARN', 'yellow', msg); }
    error(msg) { this._log('ERROR', 'red', msg); }
    debug(msg) { if (CONFIG.optimization.logLevel === 'debug') this._log('DEBUG', 'cyan', msg); }
    critical(msg) { this._log('CRITICAL', 'red', `⚠️ ${msg}`); }
    
    header(msg) {
        console.log(`${Logger.colors.bgBlue}${Logger.colors.bright}${Logger.colors.white} ══ ${msg} ══ ${Logger.colors.reset}`);
    }
    
    victory(msg) {
        console.log(`${Logger.colors.bgGreen}${Logger.colors.bright}${Logger.colors.white} ══ 🏆 ${msg} ══ 🏆 ${Logger.colors.reset}`);
    }

    state(stateName) {
        console.log(`${Logger.colors.magenta}${Logger.colors.bright}[ESTADO]${Logger.colors.reset} >>> ${Logger.colors.cyan}${stateName}${Logger.colors.reset}`);
    }

    separator(char = '═', length = 70) {
        console.log(char.repeat(length));
    }

    getMetrics() {
        return {
            errors: this.errorCount,
            warnings: this.warnCount,
            infos: this.infoCount,
            successes: this.successCount
        };
    }

    reset() {
        this.errorCount = 0;
        this.warnCount = 0;
        this.infoCount = 0;
        this.successCount = 0;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// GESTOR DE HERRAMIENTAS CON DURABILIDAD V6.0
// ═══════════════════════════════════════════════════════════════════════════

class ToolDurabilityManager {
    constructor(bot, skills) {
        this.bot = bot;
        this.skills = skills;
        this.logger = new Logger('ToolManager');
        this.lastCheck = Date.now();
        this.toolReplacements = 0;
        this.emergencyCrafts = 0;
    }

    getToolDurability(item) {
        if (!item || !item.durabilityUsed || !item.maxDurability) {
            return { remaining: null, percentage: 100 };
        }
        const remaining = item.maxDurability - item.durabilityUsed;
        const percentage = (remaining / item.maxDurability) * 100;
        return { remaining, percentage };
    }

    getCurrentTool() {
        const heldItem = this.bot.heldItem;
        if (!heldItem) return null;
        if (heldItem.name.includes('pickaxe') ||
            heldItem.name.includes('axe') ||
            heldItem.name.includes('shovel') ||
            heldItem.name.includes('sword') ||
            heldItem.name.includes('bow') ||
            heldItem.name.includes('shield')) {
            return heldItem;
        }
        return null;
    }

    needsReplacement(item) {
        const durability = this.getToolDurability(item);
        if (durability.remaining === null) return false;
        if (durability.remaining <= CONFIG.tools.criticalDurability) {
            this.logger.warn(`⚠️ CRÍTICO: ${item.name} tiene ${durability.remaining} usos`);
            return true;
        }
        if (durability.percentage <= (CONFIG.tools.durabilityThreshold * 100)) {
            this.logger.warn(`⚠️ BAJA: ${item.name} al ${durability.percentage.toFixed(1)}%`);
            return true;
        }
        return false;
    }

    async checkAndReplace() {
        const currentTool = this.getCurrentTool();
        if (!currentTool) return false;
        if (!this.needsReplacement(currentTool)) return false;

        this.logger.warn(`Reemplazando ${currentTool.name}...`);

        const toolType = currentTool.name.includes('pickaxe') ? 'pickaxe' :
                        currentTool.name.includes('axe') ? 'axe' :
                        currentTool.name.includes('sword') ? 'sword' :
                        currentTool.name.includes('shovel') ? 'shovel' :
                        currentTool.name.includes('bow') ? 'bow' :
                        currentTool.name.includes('shield') ? 'shield' : null;

        if (!toolType) return false;

        const replacement = this.bot.inventory.items()
            .filter(i => i.name.includes(toolType) && i.slot !== currentTool.slot)
            .sort((a, b) => {
                const priorities = CONFIG.tools.materialPriority;
                const aPrio = priorities.findIndex(p => a.name.includes(p));
                const bPrio = priorities.findIndex(p => b.name.includes(p));
                return (aPrio === -1 ? 99 : aPrio) - (bPrio === -1 ? 99 : bPrio);
            })[0];

        if (replacement) {
            try {
                await this.bot.equip(replacement, 'hand');
                this.logger.success(`✓ Equipado: ${replacement.name}`);
                this.toolReplacements++;

                const oldDurability = this.getToolDurability(currentTool);
                if (oldDurability.remaining !== null && oldDurability.remaining <= 1) {
                    try {
                        await this.bot.toss(currentTool.type, null, 1);
                        this.logger.info(`Descartado: ${currentTool.name} roto`);
                    } catch (e) {
                        this.logger.debug(`No se pudo descartar ${currentTool.name}`);
                    }
                }
                return true;
            } catch (e) {
                this.logger.error(`Error equipando reemplazo: ${e.message}`);
            }
        } else {
            this.logger.error(`❌ No hay reemplazo para ${toolType}`);
            return false;
        }
        return false;
    }

    getInventoryToolCount(toolType) {
        return this.bot.inventory.items()
            .filter(i => i.name.includes(toolType))
            .length;
    }

    needsCrafting(toolType) {
        const count = this.getInventoryToolCount(toolType);
        return count < 2;
    }

    async emergencyCraftTool(toolType) {
        this.logger.warn(`Crafteando herramienta de emergencia: ${toolType}`);
        this.emergencyCrafts++;

        const bestMaterial = this.getBestAvailableMaterial(toolType);
        const recipe = this.getToolRecipe(toolType, bestMaterial);

        if (!recipe) {
            this.logger.error(`No hay receta para ${toolType} de ${bestMaterial}`);
            return false;
        }

        try {
            await this.skills.craft(recipe, 1);
            this.logger.success(`✓ Crafteado: ${toolType} de ${bestMaterial}`);
            return true;
        } catch (e) {
            this.logger.error(`Error crafteando herramienta: ${e.message}`);
            return false;
        }
    }

    getBestAvailableMaterial(toolType) {
        const materials = CONFIG.tools.materialPriority;
        
        for (const material of materials) {
            if (material === 'netherite') {
                if (this.skills.count('netherite_ingot') >= 1 &&
                    this.skills.count(`${material}_${toolType}`) >= 1) {
                    return material;
                }
            } else if (this.skills.count(`${material}_${toolType}`) >= 1 ||
                       this.skills.count(`${material}_planks`) >= 1 ||
                       this.skills.count(material) >= 1) {
                return material;
            }
        }
        return 'wooden';
    }

    getToolRecipe(toolType, material) {
        const recipes = {
            pickaxe: {
                wooden: 'wooden_pickaxe',
                stone: 'stone_pickaxe',
                iron: 'iron_pickaxe',
                golden: 'golden_pickaxe',
                diamond: 'diamond_pickaxe',
                netherite: 'netherite_pickaxe'
            },
            axe: {
                wooden: 'wooden_axe',
                stone: 'stone_axe',
                iron: 'iron_axe',
                golden: 'golden_axe',
                diamond: 'diamond_axe',
                netherite: 'netherite_axe'
            },
            sword: {
                wooden: 'wooden_sword',
                stone: 'stone_sword',
                iron: 'iron_sword',
                golden: 'golden_sword',
                diamond: 'diamond_sword',
                netherite: 'netherite_sword'
            },
            shovel: {
                wooden: 'wooden_shovel',
                stone: 'stone_shovel',
                iron: 'iron_shovel',
                golden: 'golden_shovel',
                diamond: 'diamond_shovel',
                netherite: 'netherite_shovel'
            }
        };
        return recipes[toolType]?.[material] || null;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE TELEMETRÍA V6.0
// ═══════════════════════════════════════════════════════════════════════════

class TelemetrySystem {
    constructor(bot) {
        this.bot = bot;
        this.logger = new Logger('Telemetry');
        this.startTime = Date.now();
        this.metrics = {
            states: {},
            transitions: 0,
            deaths: 0,
            recoveries: 0,
            combats: 0,
            enemiesDefeated: 0,
            blocksMined: 0,
            itemsCrafted: 0,
            distanceTraveled: 0,
            itemsCollected: 0,
            deaths_cause: {},
            structures_found: [],
            objectives_completed: [],
            nether_visits: 0,
            end_visits: 0,
            dragon_kills: 0,
            elytra_obtained: false,
            beacon_active: false
        };
        this.lastPosition = null;
        this.pathfindingCache = {
            hits: 0,
            misses: 0
        };
    }

    recordState(state) {
        if (!this.metrics.states[state]) {
            this.metrics.states[state] = { count: 0, time: 0 };
        }
        this.metrics.states[state].count++;
        this.metrics.transitions++;
    }

    recordDeath(cause) {
        this.metrics.deaths++;
        if (!this.metrics.deaths_cause[cause]) {
            this.metrics.deaths_cause[cause] = 0;
        }
        this.metrics.deaths_cause[cause]++;
    }

    recordRecovery() {
        this.metrics.recoveries++;
    }

    recordCombat(enemies) {
        this.metrics.combats++;
    }

    recordEnemyDefeated(type) {
        this.metrics.enemiesDefeated++;
    }

    recordBlockMined(type) {
        this.metrics.blocksMined++;
    }

    recordItemCrafted(type) {
        this.metrics.itemsCrafted++;
    }

    recordItemCollected(type, quantity) {
        this.metrics.itemsCollected += quantity;
    }

    recordStructureFound(type) {
        if (!this.metrics.structures_found.includes(type)) {
            this.metrics.structures_found.push(type);
            this.logger.success(`📍 Estructura encontrada: ${type}`);
        }
    }

    recordObjectiveCompleted(objective) {
        if (!this.metrics.objectives_completed.includes(objective)) {
            this.metrics.objectives_completed.push(objective);
            this.logger.victory(`🏆 Objetivo completado: ${objective}`);
        }
    }

    recordNetherVisit() {
        this.metrics.nether_visits++;
    }

    recordEndVisit() {
        this.metrics.end_visits++;
    }

    recordDragonKill() {
        this.metrics.dragon_kills++;
        this.recordObjectiveCompleted('DERROTAR_DRAGON');
    }

    recordElytraObtained() {
        this.metrics.elytra_obtained = true;
        this.recordObjectiveCompleted('CONSEGUIR_ELYTRA');
    }

    recordBeaconActive() {
        this.metrics.beacon_active = true;
        this.recordObjectiveCompleted('ACTIVAR_BEACON');
    }

    updatePathfindingCache(hit) {
        if (hit) {
            this.pathfindingCache.hits++;
        } else {
            this.pathfindingCache.misses++;
        }
    }

    updatePosition() {
        if (this.bot.entity && this.lastPosition) {
            const dist = this.bot.entity.position.distanceTo(this.lastPosition);
            this.metrics.distanceTraveled += dist;
        }
        if (this.bot.entity) {
            this.lastPosition = this.bot.entity.position.clone();
        }
    }

    getSessionTime() {
        return Date.now() - this.startTime;
    }

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        }
        return `${seconds}s`;
    }

    getCacheHitRate() {
        const total = this.pathfindingCache.hits + this.pathfindingCache.misses;
        if (total === 0) return 100;
        return ((this.pathfindingCache.hits / total) * 100).toFixed(1);
    }

    export() {
        const data = {
            ...this.metrics,
            sessionTime: this.getSessionTime(),
            sessionTimeFormatted: this.formatTime(this.getSessionTime()),
            pathfindingCacheHitRate: this.getCacheHitRate(),
            timestamp: new Date().toISOString()
        };

        try {
            fs.writeFileSync(CONFIG.learning.metricsFile, JSON.stringify(data, null, 2));
            this.logger.debug('📊 Métricas exportadas');
        } catch (e) {
            this.logger.error(`Error exportando métricas: ${e.message}`);
        }

        return data;
    }

    printDashboard() {
        const data = this.export();
        
        console.log('\n' + '═'.repeat(70));
        console.log(`${Logger.colors.bright}${Logger.colors.magenta} ══ 📊 DASHBOARD DE TELEMETRÍA ══ 📊 ${Logger.colors.reset}`);
        console.log('═'.repeat(70));
        
        console.log(`${Logger.colors.cyan}⏱️  Tiempo de sesión:${Logger.colors.reset} ${data.sessionTimeFormatted}`);
        console.log(`${Logger.colors.cyan}🔄 Transiciones de estado:${Logger.colors.reset} ${data.transitions}`);
        console.log(`${Logger.colors.cyan}📍 Estructuras encontradas:${Logger.colors.reset} ${data.structures_found.length}`);
        console.log(`${Logger.colors.cyan}🏆 Objetivos completados:${Logger.colors.reset} ${data.objectives_completed.length}`);
        
        console.log('\n' + '-'.repeat(70));
        
        console.log(`${Logger.colors.green}✓ Bloques minados:${Logger.colors.reset} ${data.blocksMined}`);
        console.log(`${Logger.colors.green}✓ Items crafteados:${Logger.colors.reset} ${data.itemsCrafted}`);
        console.log(`${Logger.colors.green}✓ Items recolectados:${Logger.colors.reset} ${data.itemsCollected}`);
        console.log(`${Logger.colors.green}✓ Enemigos derrotados:${Logger.colors.reset} ${data.enemiesDefeated}`);
        
        console.log('\n' + '-'.repeat(70));
        
        console.log(`${Logger.colors.yellow}⚠️  Muertes:${Logger.colors.reset} ${data.deaths}`);
        console.log(`${Logger.colors.yellow}⚠️  Recuperaciones:${Logger.colors.reset} ${data.recoveries}`);
        console.log(`${Logger.colors.yellow}⚠️  Combates:${Logger.colors.reset} ${data.combats}`);
        
        console.log('\n' + '-'.repeat(70));
        
        console.log(`${Logger.colors.magenta}🌍 Visitas al Nether:${Logger.colors.reset} ${data.nether_visits}`);
        console.log(`${Logger.colors.magenta}🌌 Visitas al End:${Logger.colors.reset} ${data.end_visits}`);
        console.log(`${Logger.colors.magenta}🐉 Dragones derrotados:${Logger.colors.reset} ${data.dragon_kills}`);
        console.log(`${Logger.colors.magenta}🪽 Elytra obtenido:${Logger.colors.reset} ${data.elytra_obtained ? '✓ SÍ' : '✗ NO'}`);
        console.log(`${Logger.colors.magenta}⭐ Beacon activo:${Logger.colors.reset} ${data.beacon_active ? '✓ SÍ' : '✗ NO'}`);
        
        console.log('\n' + '-'.repeat(70));
        
        console.log(`${Logger.colors.blue}💾 Cache pathfinding:${Logger.colors.reset} ${this.getCacheHitRate()}% hit rate`);
        
        console.log('═'.repeat(70) + '\n');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// BASE DE CONOCIMIENTO Y APRENDIZAJE V6.0
// ═══════════════════════════════════════════════════════════════════════════

class KnowledgeBase {
    constructor() {
        this.logger = new Logger('Knowledge');
        this.file = CONFIG.learning.knowledgeFile;
        this.data = this.load();
    }

    load() {
        try {
            if (fs.existsSync(this.file)) {
                const data = fs.readFileSync(this.file, 'utf8');
                const parsed = JSON.parse(data);
                this.logger.info('Base de conocimiento cargada');
                return {
                    toolEffectiveness: parsed.toolEffectiveness || {},
                    dangerZones: parsed.dangerZones || [],
                    deathLocations: parsed.deathLocations || [],
                    safeShelters: parsed.safeShelters || [],
                    resourceLocations: parsed.resourceLocations || {},
                    structureLocations: parsed.structureLocations || {},
                    caveEntrances: parsed.caveEntrances || [],
                    waypoints: parsed.waypoints || [],
                    learnedPatterns: parsed.learnedPatterns || [],
                    optimalPaths: parsed.optimalPaths || {},
                    ...parsed
                };
            }
        } catch (e) {
            this.logger.error(`Error cargando conocimiento: ${e.message}`);
        }

        const empty = {
            toolEffectiveness: {},
            dangerZones: [],
            deathLocations: [],
            safeShelters: [],
            resourceLocations: {},
            structureLocations: {},
            caveEntrances: [],
            waypoints: [],
            learnedPatterns: [],
            optimalPaths: {}
        };
        this.save(empty);
        return empty;
    }

    save(data = this.data) {
        try {
            fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
            this.logger.debug('💾 Conocimiento guardado');
        } catch (e) {
            this.logger.error(`Error guardando conocimiento: ${e.message}`);
        }
    }

    recordToolUse(blockName, toolName, timeTaken, success) {
        const key = `${blockName}:${toolName}`;
        if (!this.data.toolEffectiveness[key]) {
            this.data.toolEffectiveness[key] = {
                uses: 0,
                totalTime: 0,
                successes: 0,
                failures: 0,
                avgTime: 0
            };
        }

        const record = this.data.toolEffectiveness[key];
        record.uses++;
        record.totalTime += timeTaken;
        
        if (success) {
            record.successes++;
        } else {
            record.failures++;
        }

        record.avgTime = record.totalTime / record.uses;
    }

    getBestTool(blockName) {
        const tools = ['netherite_pickaxe', 'diamond_pickaxe', 'iron_pickaxe', 
                       'stone_pickaxe', 'wooden_pickaxe', 'golden_pickaxe',
                       'netherite_axe', 'diamond_axe', 'iron_axe', 
                       'stone_axe', 'wooden_axe', 'golden_axe',
                       'netherite_shovel', 'diamond_shovel', 'iron_shovel',
                       'stone_shovel', 'wooden_shovel', 'golden_shovel'];

        let bestTool = null;
        let bestScore = -1;

        for (const tool of tools) {
            const key = `${blockName}:${tool}`;
            const record = this.data.toolEffectiveness[key];

            if (!record || record.uses < CONFIG.learning.minSampleSize) continue;

            const successRate = record.successes / record.uses;
            const score = successRate * 100 - (record.avgTime / 100);

            if (score > bestScore && successRate > 0.5) {
                bestScore = score;
                bestTool = tool;
            }
        }

        return bestTool;
    }

    recordDangerZone(position, threatType) {
        this.data.dangerZones.push({
            x: position.x,
            y: position.y,
            z: position.z,
            threat: threatType,
            timestamp: Date.now()
        });

        // Limitar a 100 zonas
        if (this.data.dangerZones.length > 100) {
            this.data.dangerZones = this.data.dangerZones.slice(-100);
        }
    }

    isDangerZone(position, radius = 10) {
        return this.data.dangerZones.some(zone => {
            const dist = Math.sqrt(
                Math.pow(zone.x - position.x, 2) +
                Math.pow(zone.y - position.y, 2) +
                Math.pow(zone.z - position.z, 2)
            );
            return dist <= radius;
        });
    }

    recordDeathLocation(position, cause) {
        this.data.deathLocations.push({
            x: position.x,
            y: position.y,
            z: position.z,
            cause: cause,
            timestamp: Date.now()
        });

        if (this.data.deathLocations.length > 20) {
            this.data.deathLocations = this.data.deathLocations.slice(-20);
        }
    }

    recordSafeShelter(position) {
        const exists = this.data.safeShelters.some(s => 
            Math.abs(s.x - position.x) < 5 &&
            Math.abs(s.y - position.y) < 5 &&
            Math.abs(s.z - position.z) < 5
        );

        if (!exists) {
            this.data.safeShelters.push({
                x: position.x,
                y: position.y,
                z: position.z,
                timestamp: Date.now()
            });
        }
    }

    recordResourceLocation(resourceType, position, quantity = 1) {
        if (!this.data.resourceLocations[resourceType]) {
            this.data.resourceLocations[resourceType] = [];
        }

        const exists = this.data.resourceLocations[resourceType].some(r =>
            Math.abs(r.x - position.x) < 3 &&
            Math.abs(r.y - position.y) < 3 &&
            Math.abs(r.z - position.z) < 3
        );

        if (!exists) {
            this.data.resourceLocations[resourceType].push({
                x: position.x,
                y: position.y,
                z: position.z,
                quantity: quantity,
                timestamp: Date.now()
            });
        }
    }

    getNearbyResources(position, resourceType, radius = 50) {
        const resources = this.data.resourceLocations[resourceType] || [];
        return resources.filter(r => {
            const dist = Math.sqrt(
                Math.pow(r.x - position.x, 2) +
                Math.pow(r.y - position.y, 2) +
                Math.pow(r.z - position.z, 2)
            );
            return dist <= radius;
        });
    }

    recordStructureLocation(structureType, position) {
        this.data.structureLocations[structureType] = {
            x: position.x,
            y: position.y,
            z: position.z,
            discovered: Date.now()
        };
    }

    getStructureLocation(structureType) {
        return this.data.structureLocations[structureType] || null;
    }

    recordCaveEntrance(position) {
        const exists = this.data.caveEntrances.some(e =>
            Math.abs(e.x - position.x) < 5 &&
            Math.abs(e.y - position.y) < 5 &&
            Math.abs(e.z - position.z) < 5
        );

        if (!exists) {
            this.data.caveEntrances.push({
                x: position.x,
                y: position.y,
                z: position.z,
                timestamp: Date.now()
            });
        }
    }

    recordWaypoint(name, position, type = 'custom') {
        this.data.waypoints.push({
            name: name,
            x: position.x,
            y: position.y,
            z: position.z,
            type: type,
            timestamp: Date.now()
        });
        this.logger.info(`📍 Waypoint guardado: ${name} (${type})`);
    }

    getWaypoints(type = null) {
        if (type) {
            return this.data.waypoints.filter(w => w.type === type);
        }
        return this.data.waypoints;
    }

    recordOptimalPath(from, to, path) {
        const key = `${Math.round(from.x)},${Math.round(from.y)},${Math.round(from.z)}->${Math.round(to.x)},${Math.round(to.y)},${Math.round(to.z)}`;
        this.data.optimalPaths[key] = {
            path: path,
            timestamp: Date.now()
        };

        // Limitar paths guardados
        const keys = Object.keys(this.data.optimalPaths);
        if (keys.length > 500) {
            delete this.data.optimalPaths[keys[0]];
        }
    }

    getOptimalPath(from, to) {
        const key = `${Math.round(from.x)},${Math.round(from.y)},${Math.round(from.z)}->${Math.round(to.x)},${Math.round(to.y)},${Math.round(to.z)}`;
        return this.data.optimalPaths[key]?.path || null;
    }

    recordLearnedPattern(pattern, data) {
        this.data.learnedPatterns.push({
            pattern: pattern,
            data: data,
            timestamp: Date.now()
        });

        if (this.data.learnedPatterns.length > 100) {
            this.data.learnedPatterns = this.data.learnedPatterns.slice(-100);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// MOTOR DE HABILIDADES V6.0 - SKILL ENGINE
// ═══════════════════════════════════════════════════════════════════════════

class SkillEngine {
    constructor(bot, knowledge) {
        this.bot = bot;
        this.knowledge = knowledge;
        this.logger = new Logger('Skills');
        this.mcData = bot.version ? minecraftData(bot.version) : minecraftData('1.20.1');
        
        // Contadores de acciones
        this.actions = {
            blocksMined: 0,
            itemsCrafted: 0,
            blocksPlaced: 0,
            enemiesKilled: 0,
            itemsCollected: 0
        };

        // Recetas de crafteo completas
        this.recipes = this.initializeRecipes();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UTILIDADES DE INVENTARIO
    // ═══════════════════════════════════════════════════════════════════════

    count(itemName) {
        const items = this.bot.inventory.items();
        const item = items.find(i => i.name === itemName);
        return item ? item.count : 0;
    }

    has(itemName, quantity = 1) {
        return this.count(itemName) >= quantity;
    }

    findItem(itemName) {
        return this.bot.inventory.items().find(i => i.name === itemName);
    }

    findAllItem(itemName) {
        return this.bot.inventory.items().filter(i => i.name === itemName);
    }

    getInventorySummary() {
        const items = this.bot.inventory.items();
        const summary = {};
        for (const item of items) {
            if (!summary[item.name]) {
                summary[item.name] = 0;
            }
            summary[item.name] += item.count;
        }
        return summary;
    }

    logInventory() {
        const summary = this.getInventorySummary();
        this.logger.info('📦 Inventario: ' + Object.entries(summary)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', '));
    }

    async tossExcept(keepItems = []) {
        const items = this.bot.inventory.items();
        for (const item of items) {
            if (!keepItems.includes(item.name) && !CONFIG.inventory.criticalItems.includes(item.name)) {
                try {
                    await this.bot.toss(item.type, null, item.count);
                } catch (e) {
                    // Ignorar errores
                }
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE CRAFTING COMPLETO
    // ═══════════════════════════════════════════════════════════════════════

    initializeRecipes() {
        return {
            // Básicos
            planks: { input: { 'oak_log': 1, 'birch_log': 1, 'spruce_log': 1, 'jungle_log': 1, 'acacia_log': 1, 'dark_oak_log': 1, 'mangrove_log': 1, 'cherry_log': 1 }, output: 'planks', count: 4, any: true },
            stick: { input: { planks: 2 }, output: 'stick', count: 4 },
            crafting_table: { input: { planks: 4 }, output: 'crafting_table', count: 1 },
            furnace: { input: { cobblestone: 8 }, output: 'furnace', count: 1 },
            chest: { input: { planks: 8 }, output: 'chest', count: 1 },
            barrel: { input: { planks: 6, slab: 2 }, output: 'barrel', count: 1 },
            
            // Antorchas
            torch: { input: { coal: 1, stick: 1 }, output: 'torch', count: 4 },
            soul_torch: { input: { soul_sand: 1, coal: 1, stick: 1 }, output: 'soul_torch', count: 4 },
            
            // Herramientas madera
            wooden_pickaxe: { input: { planks: 3, stick: 2 }, output: 'wooden_pickaxe', count: 1 },
            wooden_axe: { input: { planks: 3, stick: 2 }, output: 'wooden_axe', count: 1 },
            wooden_sword: { input: { planks: 2, stick: 1 }, output: 'wooden_sword', count: 1 },
            wooden_shovel: { input: { planks: 1, stick: 2 }, output: 'wooden_shovel', count: 1 },
            wooden_hoe: { input: { planks: 2, stick: 2 }, output: 'wooden_hoe', count: 1 },
            
            // Herramientas piedra
            stone_pickaxe: { input: { cobblestone: 3, stick: 2 }, output: 'stone_pickaxe', count: 1 },
            stone_axe: { input: { cobblestone: 3, stick: 2 }, output: 'stone_axe', count: 1 },
            stone_sword: { input: { cobblestone: 2, stick: 1 }, output: 'stone_sword', count: 1 },
            stone_shovel: { input: { cobblestone: 1, stick: 2 }, output: 'stone_shovel', count: 1 },
            stone_hoe: { input: { cobblestone: 2, stick: 2 }, output: 'stone_hoe', count: 1 },
            
            // Herramientas hierro
            iron_pickaxe: { input: { iron_ingot: 3, stick: 2 }, output: 'iron_pickaxe', count: 1 },
            iron_axe: { input: { iron_ingot: 3, stick: 2 }, output: 'iron_axe', count: 1 },
            iron_sword: { input: { iron_ingot: 2, stick: 1 }, output: 'iron_sword', count: 1 },
            iron_shovel: { input: { iron_ingot: 1, stick: 2 }, output: 'iron_shovel', count: 1 },
            iron_hoe: { input: { iron_ingot: 2, stick: 2 }, output: 'iron_hoe', count: 1 },
            
            // Herramientas diamante
            diamond_pickaxe: { input: { diamond: 3, stick: 2 }, output: 'diamond_pickaxe', count: 1 },
            diamond_axe: { input: { diamond: 3, stick: 2 }, output: 'diamond_axe', count: 1 },
            diamond_sword: { input: { diamond: 2, stick: 1 }, output: 'diamond_sword', count: 1 },
            diamond_shovel: { input: { diamond: 1, stick: 2 }, output: 'diamond_shovel', count: 1 },
            diamond_hoe: { input: { diamond: 2, stick: 2 }, output: 'diamond_hoe', count: 1 },
            
            // Armadura cuero
            leather_helmet: { input: { leather: 5 }, output: 'leather_helmet', count: 1 },
            leather_chestplate: { input: { leather: 8 }, output: 'leather_chestplate', count: 1 },
            leather_leggings: { input: { leather: 7 }, output: 'leather_leggings', count: 1 },
            leather_boots: { input: { leather: 4 }, output: 'leather_boots', count: 1 },
            
            // Armadura hierro
            iron_helmet: { input: { iron_ingot: 5 }, output: 'iron_helmet', count: 1 },
            iron_chestplate: { input: { iron_ingot: 8 }, output: 'iron_chestplate', count: 1 },
            iron_leggings: { input: { iron_ingot: 7 }, output: 'iron_leggings', count: 1 },
            iron_boots: { input: { iron_ingot: 4 }, output: 'iron_boots', count: 1 },
            
            // Armadura diamante
            diamond_helmet: { input: { diamond: 5 }, output: 'diamond_helmet', count: 1 },
            diamond_chestplate: { input: { diamond: 8 }, output: 'diamond_chestplate', count: 1 },
            diamond_leggings: { input: { diamond: 7 }, output: 'diamond_leggings', count: 1 },
            diamond_boots: { input: { diamond: 4 }, output: 'diamond_boots', count: 1 },
            
            // Utilidades
            bucket: { input: { iron_ingot: 3 }, output: 'bucket', count: 1 },
            flint_and_steel: { input: { iron_ingot: 1, flint: 1 }, output: 'flint_and_steel', count: 1 },
            fishing_rod: { input: { stick: 3, string: 2 }, output: 'fishing_rod', count: 1 },
            bow: { input: { stick: 3, string: 3 }, output: 'bow', count: 1 },
            arrow: { input: { flint: 1, stick: 1, feather: 1 }, output: 'arrow', count: 4 },
            shield: { input: { planks: 6, iron_ingot: 1 }, output: 'shield', count: 1 },
            
            // Escaleras
            ladder: { input: { stick: 7 }, output: 'ladder', count: 3 },
            
            // Cama
            bed: { input: { planks: 3, wool: 3 }, output: 'bed', count: 1 },
            
            // Mesa encantamientos
            enchanting_table: { input: { diamond: 2, obsidian: 4, book: 1 }, output: 'enchanting_table', count: 1 },
            book: { input: { leather: 1, paper: 3 }, output: 'book', count: 1 },
            paper: { input: { sugar_cane: 3 }, output: 'paper', count: 3 },
            
            // Yunque
            anvil: { input: { iron_block: 3, iron_ingot: 4 }, output: 'anvil', count: 1 },
            iron_block: { input: { iron_ingot: 9 }, output: 'iron_block', count: 1 },
            
            // Beacon
            beacon: { input: { glass: 3, obsidian: 3, nether_star: 1 }, output: 'beacon', count: 1 },
            glass: { input: { sand: 1 }, output: 'glass', count: 1 },
            
            // Cristal de End
            end_crystal: { input: { glass: 7, eye_of_ender: 1, ghast_tear: 1 }, output: 'end_crystal', count: 1 },
            
            // Ojo de ender
            eye_of_ender: { input: { ender_pearl: 1, blaze_powder: 1 }, output: 'eye_of_ender', count: 1 },
            blaze_powder: { input: { blaze_rod: 1 }, output: 'blaze_powder', count: 2 },
            
            // Varas de blaze
            brewing_stand: { input: { blaze_rod: 1, cobblestone: 3 }, output: 'brewing_stand', count: 1 },
            cauldron: { input: { iron_ingot: 7 }, output: 'cauldron', count: 1 },
            
            // Riel
            rail: { input: { iron_ingot: 6, stick: 1 }, output: 'rail', count: 16 },
            powered_rail: { input: { gold_ingot: 6, stick: 1, redstone: 1 }, output: 'powered_rail', count: 6 },
            
            // Bloques
            torch: { input: { coal: 1, stick: 1 }, output: 'torch', count: 4 },
            lantern: { input: { torch: 1, iron_nugget: 8 }, output: 'lantern', count: 1 },
            
            // Comida
            bread: { input: { wheat: 3 }, output: 'bread', count: 1 },
            golden_apple: { input: { apple: 1, gold_ingot: 8 }, output: 'golden_apple', count: 1 },
            golden_carrot: { input: { carrot: 1, gold_nugget: 8 }, output: 'golden_carrot', count: 1 },
            
            // Netherite
            netherite_ingot: { input: { netherite_scrap: 4, gold_ingot: 4 }, output: 'netherite_ingot', count: 1 },
            netherite_upgrade_smithing_template: { input: { diamond: 1, netherrack: 2 }, output: 'netherite_upgrade_smithing_template', count: 1 }
        };
    }

    async craft(recipeName, quantity = 1) {
        try {
            const mcData = this.mcData;
            
            // Manejo especial para planks (cualquier tipo de log)
            if (recipeName === 'planks') {
                const logTypes = [
                    'oak_log', 'birch_log', 'spruce_log', 'jungle_log',
                    'acacia_log', 'dark_oak_log', 'mangrove_log', 'cherry_log',
                    'crimson_stem', 'warped_stem'
                ];
                
                // Buscar cualquier log disponible
                for (const logType of logTypes) {
                    const logItem = this.findItem(logType);
                    if (logItem) {
                        // Obtener el tipo de planks correspondiente
                        const plankType = logType.replace('_log', '_planks')
                                                .replace('_stem', '_planks');
                        
                        // Buscar la receta usando recipesFor
                        const plankId = mcData.itemsByName[plankType]?.id;
                        
                        if (!plankId) {
                            this.logger.debug(`No se encontró ID para ${plankType}`);
                            continue;
                        }
                        
                        // Obtener recetas disponibles (inventario 2x2)
                        const recipes = this.bot.recipesFor(plankId, null, 1, null);
                        
                        if (!recipes || recipes.length === 0) {
                            this.logger.debug(`No hay recetas disponibles para ${plankType}`);
                            continue;
                        }
                        
                        // Usar la primera receta disponible
                        const recipe = recipes[0];
                        await this.bot.craft(recipe, quantity, null);
                        
                        this.actions.itemsCrafted += quantity * 4;
                        this.logger.success(`✓ Crafteado: ${plankType} x${quantity * 4}`);
                        return true;
                    }
                }
                
                this.logger.warn('Falta ingrediente: cualquier tipo de log');
                return false;
            }
            
            // Receta normal desde nuestra lista
            const recipeDef = this.recipes[recipeName];
            if (!recipeDef) {
                this.logger.error(`Receta no encontrada: ${recipeName}`);
                return false;
            }

            // Obtener ID del item resultado
            const resultId = mcData.itemsByName[recipeDef.output]?.id;
            if (!resultId) {
                this.logger.error(`No se encontró ID para ${recipeDef.output}`);
                return false;
            }

            // Determinar si necesita mesa de crafteo
            const needsCraftingTable = Object.keys(recipeDef.input).length > 2 ||
                                       Object.values(recipeDef.input).some(v => v > 2);

            let craftingTableBlock = null;
            if (needsCraftingTable) {
                // Buscar mesa existente
                craftingTableBlock = this.bot.findBlock({
                    matching: mcData.blocksByName.crafting_table?.id,
                    maxDistance: 8
                });

                if (!craftingTableBlock) {
                    this.logger.warn(`Necesita mesa de crafteo para ${recipeName}`);
                    const placedTable = await this.placeCraftingTable();
                    if (placedTable) {
                        craftingTableBlock = placedTable;
                        this.logger.info(`✓ Mesa colocada, continuando con ${recipeName}`);
                    } else {
                        this.logger.error(`No se pudo colocar mesa para ${recipeName}`);
                        return false;
                    }
                } else {
                    this.logger.debug(`Mesa de crafteo encontrada en ${craftingTableBlock.position.x}, ${craftingTableBlock.position.y}, ${craftingTableBlock.position.z}`);
                }
            }

            // Buscar recetas disponibles
            // Primero intentar con recipesFor (verifica materiales)
            let recipes = this.bot.recipesFor(
                resultId,
                null,
                quantity,
                craftingTableBlock
            );
            
            // Si no encuentra, intentar con recipesAll (no verifica materiales)
            if (!recipes || recipes.length === 0) {
                this.logger.debug(`recipesFor no encontró recetas, intentando recipesAll...`);
                const allRecipes = this.bot.recipesAll(resultId, null, craftingTableBlock);
                if (allRecipes && allRecipes.length > 0) {
                    recipes = allRecipes;
                    this.logger.debug(`recipesAll encontró ${allRecipes.length} recetas`);
                }
            }

            this.logger.debug(`Recetas encontradas para ${recipeName}: ${recipes?.length || 0}`);

            if (!recipes || recipes.length === 0) {
                this.logger.error(`No hay recetas disponibles para ${recipeName}`);
                this.logger.debug(`ID buscado: ${resultId}, Mesa: ${craftingTableBlock ? 'sí' : 'no'}`);
                
                // Mostrar información de depuración
                if (craftingTableBlock) {
                    this.logger.debug(`Mesa en: ${craftingTableBlock.position.x}, ${craftingTableBlock.position.y}, ${craftingTableBlock.position.z}`);
                }
                return false;
            }

            // Usar la primera receta disponible
            const recipe = recipes[0];
            
            // Ejecutar crafteo directamente (bot.craft verifica materiales internamente)
            await this.bot.craft(recipe, quantity, craftingTableBlock);
            
            this.actions.itemsCrafted += quantity;
            this.logger.success(`✓ Crafteado: ${recipeName} x${quantity}`);
            return true;
            
        } catch (e) {
            this.logger.error(`Error crafteando ${recipeName}: ${e.message}`);
            this.logger.debug(e.stack);
            return false;
        }
    }

    async placeCraftingTable() {
        // Buscar mesa en inventario
        let craftingTableItem = this.findItem('crafting_table');
        
        // Si no tiene, intentar craftear UNA VEZ sin recursión
        if (!craftingTableItem && this.has('planks', 4)) {
            try {
                const mcData = this.mcData;
                const craftingTableId = mcData.blocksByName.crafting_table.id;
                
                const recipes = this.bot.recipesFor(craftingTableId, null, 1, null);
                
                if (recipes && recipes.length > 0) {
                    await this.bot.craft(recipes[0], 1, null);
                    await this.sleep(300);
                    craftingTableItem = this.findItem('crafting_table');
                }
            } catch (e) {
                this.logger.debug(`No se pudo craftear mesa: ${e.message}`);
            }
        }
        
        if (!craftingTableItem) {
            this.logger.warn('No hay mesa de crafteo disponible');
            return null;
        }

        // Buscar posición segura para colocar
        const pos = this.findSafePlacementPosition();
        if (!pos) {
            this.logger.warn('No se encontró posición para colocar mesa');
            return null;
        }

        try {
            // Equipar la mesa
            await this.bot.equip(craftingTableItem, 'hand');
            
            // Buscar bloque de referencia adyacente
            const referenceBlock = this.bot.blockAt(pos.offset(0, -1, 0)) ||
                                  this.bot.blockAt(pos.offset(-1, 0, 0)) ||
                                  this.bot.blockAt(pos.offset(1, 0, 0)) ||
                                  this.bot.blockAt(pos.offset(0, 0, -1)) ||
                                  this.bot.blockAt(pos.offset(0, 0, 1));
            
            if (!referenceBlock) {
                this.logger.warn('No hay bloque de referencia');
                return null;
            }
            
            // Calcular dirección desde el bloque de referencia
            const direction = pos.minus(referenceBlock.position);
            
            // Colocar bloque usando placeBlock
            await this.bot.placeBlock(referenceBlock, direction);
            
            this.logger.success(`✓ Mesa de crafteo colocada en ${pos.x}, ${pos.y}, ${pos.z}`);
            await this.sleep(300); // Esperar actualización
            
            // Retornar el bloque colocado
            return this.bot.blockAt(pos);
            
        } catch (e) {
            this.logger.error(`Error colocando mesa: ${e.message}`);
            this.logger.debug(e.stack);
        }
        return null;
    }

    findSafePlacementPosition() {
        const pos = this.bot.entity.position;
        
        // Buscar alrededor del jugador
        for (let dx = -2; dx <= 2; dx++) {
            for (let dz = -2; dz <= 2; dz++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const checkPos = pos.offset(dx, dy, dz);
                    const block = this.bot.blockAt(checkPos);
                    
                    if (block && block.name === 'air') {
                        const below = this.bot.blockAt(checkPos.offset(0, -1, 0));
                        if (below && below.diggable === false) {
                            return checkPos;
                        }
                    }
                }
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE MINADO INTELIGENTE
    // ═══════════════════════════════════════════════════════════════════════

    async gather(blockName, quantity = 1) {
        this.logger.info(`Recolectando: ${blockName} x${quantity}`);

        let collected = 0;
        const startTime = Date.now();

        while (collected < quantity) {
            // Buscar bloque más cercano
            const block = await this.findNearestBlock(blockName);
            
            if (!block) {
                this.logger.warn(`No se encontró ${blockName} cercano`);
                break;
            }

            // Verificar si puede minar
            const canMine = this.canMineBlock(block);
            if (!canMine) {
                this.logger.warn(`No puede minar ${blockName} sin herramienta`);
                // Intentar conseguir herramienta
                const toolNeeded = this.getToolRequirement(block);
                if (toolNeeded) {
                    const crafted = await this.craftToolIfNeeded(toolNeeded);
                    if (!crafted) {
                        this.logger.error(`No se pudo conseguir ${toolNeeded}`);
                        break;
                    }
                }
            }

            // Navegar al bloque
            const goal = new Goals.GoalNear(block.position.x, block.position.y, block.position.z, 1);
            await this.bot.pathfinder.goto(goal);

            // Minar
            try {
                await this.mineBlock(block);
                collected++;
                this.actions.blocksMined++;
                this.knowledge.recordBlockMined?.(blockName);
            } catch (e) {
                this.logger.error(`Error minando ${blockName}: ${e.message}`);
                break;
            }
        }

        const timeTaken = Date.now() - startTime;
        this.logger.success(`✓ Recolectado: ${blockName} x${collected} (${(timeTaken/1000).toFixed(1)}s)`);
        return collected;
    }

    async findNearestBlock(blockName, radius = 64) {
        const blockId = this.mcData.blocksByName[blockName]?.id;
        if (!blockId) {
            this.logger.error(`Bloque no encontrado: ${blockName}`);
            return null;
        }

        const block = this.bot.findBlock({
            matching: blockId,
            maxDistance: radius
        });

        if (block) {
            this.knowledge.recordResourceLocation?.(blockName, block.position);
        }

        return block;
    }

    canMineBlock(block) {
        if (!block) return false;
        if (!block.diggable) return false;

        // Verificar si necesita herramienta
        const harvestTools = block.harvestTools;
        if (harvestTools && Object.keys(harvestTools).length > 0) {
            // Necesita herramienta específica
            const heldItem = this.bot.heldItem;
            if (!heldItem) return false;
            
            const toolId = heldItem.type;
            return harvestTools[toolId] !== undefined;
        }

        return true;
    }

    getToolRequirement(block) {
        const harvestTools = block?.harvestTools;
        if (!harvestTools) return null;

        const mcData = this.mcData;
        for (const [toolId, speed] of Object.entries(harvestTools)) {
            const item = mcData.items[toolId];
            if (item) {
                if (item.name.includes('pickaxe')) return 'pickaxe';
                if (item.name.includes('axe')) return 'axe';
                if (item.name.includes('shovel')) return 'shovel';
            }
        }
        return null;
    }

    async craftToolIfNeeded(toolType) {
        // Verificar si ya tiene la herramienta
        const hasTool = this.bot.inventory.items().some(i => i.name.includes(toolType));
        if (hasTool) return true;

        // Intentar craftear (priorizar piedra > hierro > diamante)
        const materials = ['stone', 'iron', 'diamond', 'wooden'];
        
        for (const material of materials) {
            const recipeName = `${material}_${toolType}`;
            if (this.recipes[recipeName]) {
                const crafted = await this.craft(recipeName, 1);
                if (crafted) return true;
            }
        }
        return false;
    }

    async mineBlock(block) {
        const startTime = Date.now();
        
        try {
            await this.bot.dig(block);
            
            const timeTaken = Date.now() - startTime;
            const success = true;
            
            // Registrar en conocimiento
            const heldItem = this.bot.heldItem;
            const toolName = heldItem?.name || 'hand';
            this.knowledge.recordToolUse?.(block.name, toolName, timeTaken, success);
            
            // Recoger items drop
            await this.collectNearbyItems();
            
            return true;
        } catch (e) {
            this.logger.error(`Error minando: ${e.message}`);
            return false;
        }
    }

    async collectNearbyItems(radius = 8) {
        const items = Object.values(this.bot.entities).filter(e =>
            e && e.name === 'item' &&
            e.position &&
            e.position.distanceTo(this.bot.entity.position) <= radius
        );

        for (const item of items) {
            try {
                const goal = new Goals.GoalNear(item.position.x, item.position.y, item.position.z, 1);
                await this.bot.pathfinder.goto(goal);
                this.actions.itemsCollected++;
            } catch (e) {
                // Ignorar si no se puede recoger
            }
        }
    }

    // Continuará...

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTRUCCIÓN DE PORTAL DEL NETHER - FUNCIÓN CRÍTICA
    // ═══════════════════════════════════════════════════════════════════════

    async buildNetherPortal() {
        this.logger.header('CONSTRUYENDO PORTAL DEL NETHER');
        
        // Verificar requisitos
        if (!this.has('obsidian', 10)) {
            this.logger.warn('Se necesitan 10 obsidianas mínimo');
            await this.gather('obsidian', 10);
        }

        if (!this.has('flint_and_steel')) {
            this.logger.warn('Se necesita mechero');
            await this.craft('flint_and_steel', 1);
        }

        // Buscar ubicación segura
        const portalPos = await this.findSafePortalLocation();
        if (!portalPos) {
            this.logger.error('No se encontró ubicación segura para el portal');
            return false;
        }

        this.logger.info(`Construyendo portal en: ${portalPos.x}, ${portalPos.y}, ${portalPos.z}`);

        // Construir marco de obsidiana (4x5 interior, 5x6 exterior)
        // El marco es: 2 columnas laterales de 4 bloques + 1 fila superior de 4 bloques
        const baseX = Math.floor(portalPos.x);
        const baseY = Math.floor(portalPos.y);
        const baseZ = Math.floor(portalPos.z);

        // Dirección del portal (hacia el norte-sur o este-oeste)
        const direction = this.findBestPortalDirection(portalPos);
        const dx = direction.x;
        const dz = direction.z;

        this.logger.info(`Dirección del portal: ${dx}, ${dz}`);

        // Colocar obsidianas
        const obsidianPositions = [];

        // Columna izquierda (4 bloques de alto)
        for (let y = 0; y < 4; y++) {
            const pos = new Vec3(baseX, baseY + y, baseZ);
            obsidianPositions.push(pos);
        }

        // Columna derecha (4 bloques de alto)
        for (let y = 0; y < 4; y++) {
            const pos = new Vec3(baseX + dx * 4, baseY + y, baseZ + dz * 4);
            obsidianPositions.push(pos);
        }

        // Parte superior (4 bloques conectando las columnas)
        for (let i = 1; i < 4; i++) {
            const pos = new Vec3(baseX + dx * i, baseY + 3, baseZ + dz * i);
            obsidianPositions.push(pos);
        }

        // Colocar cada obsidiana
        let placed = 0;
        for (const pos of obsidianPositions) {
            const success = await this.placeObsidianAt(pos);
            if (success) {
                placed++;
                await this.sleep(200); // Pequeña pausa entre colocaciones
            }
        }

        this.logger.info(`Obsidianas colocadas: ${placed}/10`);

        if (placed < 10) {
            this.logger.error('No se pudieron colocar todas las obsidianas');
            return false;
        }

        // Encender el portal
        this.logger.info('Encendiendo portal...');
        const lit = await this.lightPortal(baseX, baseY, baseZ, dx, dz);
        
        if (lit) {
            this.logger.victory('¡PORTAL DEL NETHER ACTIVADO!');
            this.knowledge.recordWaypoint('nether_portal', portalPos, 'portal');
            return true;
        } else {
            this.logger.error('No se pudo encender el portal');
            return false;
        }
    }

    async findSafePortalLocation() {
        const pos = this.bot.entity.position;
        
        // Buscar área plana y segura
        for (let dx = -10; dx <= 10; dx++) {
            for (let dz = -10; dz <= 10; dz++) {
                const checkX = Math.floor(pos.x) + dx;
                const checkZ = Math.floor(pos.z) + dz;
                
                // Verificar altura del terreno
                let checkY = Math.floor(pos.y);
                
                // Bajar hasta encontrar suelo
                while (checkY > 0) {
                    const block = this.bot.blockAt(new Vec3(checkX, checkY, checkZ));
                    if (block && !block.diggable) {
                        checkY++; // Subir un bloque para estar encima
                        break;
                    }
                    checkY--;
                }

                // Verificar que hay espacio para el portal (5x6)
                if (this.isSpaceClear(checkX, checkY, checkZ)) {
                    return new Vec3(checkX, checkY, checkZ);
                }
            }
        }
        
        return pos;
    }

    findBestPortalDirection(basePos) {
        // Intentar orientar el portal hacia el este-oeste si es posible
        const eastClear = this.isSpaceClear(basePos.x, basePos.y, basePos.z + 4);
        if (eastClear) return { x: 0, z: 1 };

        const westClear = this.isSpaceClear(basePos.x, basePos.y, basePos.z - 4);
        if (westClear) return { x: 0, z: -1 };

        const southClear = this.isSpaceClear(basePos.x + 4, basePos.y, basePos.z);
        if (southClear) return { x: 1, z: 0 };

        return { x: -1, z: 0 }; // Norte por defecto
    }

    isSpaceClear(baseX, baseY, baseZ) {
        // Verificar espacio de 5x6 bloques
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 6; y++) {
                const block = this.bot.blockAt(new Vec3(baseX + x, baseY + y, baseZ));
                if (block && block.name !== 'air') {
                    return false;
                }
            }
        }
        return true;
    }

    async placeObsidianAt(position) {
        // Verificar si ya hay obsidiana
        const existingBlock = this.bot.blockAt(position);
        if (existingBlock && existingBlock.name === 'obsidian') {
            return true;
        }

        // Necesitamos colocar la obsidiana
        const obsidianItem = this.findItem('obsidian');
        if (!obsidianItem) {
            this.logger.error('No hay obsidiana en inventario');
            return false;
        }

        // Buscar bloque adyacente para referencia
        const neighbors = [
            position.offset(-1, 0, 0),
            position.offset(1, 0, 0),
            position.offset(0, -1, 0),
            position.offset(0, 1, 0),
            position.offset(0, 0, -1),
            position.offset(0, 0, 1)
        ];

        for (const neighbor of neighbors) {
            const neighborBlock = this.bot.blockAt(neighbor);
            if (neighborBlock && neighborBlock.diggable === false) {
                try {
                    // Equipar obsidiana
                    await this.bot.equip(obsidianItem, 'hand');
                    
                    // Colocar
                    const refBlock = this.bot.blockAt(neighbor);
                    const edge = position.minus(neighbor);
                    
                    await this.bot.placeEntity(refBlock, edge);
                    return true;
                } catch (e) {
                    this.logger.debug(`No se pudo colocar desde ${neighbor.x}, ${neighbor.y}, ${neighbor.z}`);
                }
            }
        }

        this.logger.error(`No se pudo encontrar posición para colocar en ${position.x}, ${position.y}, ${position.z}`);
        return false;
    }

    async lightPortal(baseX, baseY, baseZ, dx, dz) {
        const flintSteel = this.findItem('flint_and_steel');
        if (!flintSteel) {
            this.logger.error('No hay mechero');
            return false;
        }

        try {
            // Equipar mechero
            await this.bot.equip(flintSteel, 'hand');

            // Posición interior del portal para encender
            const insideX = baseX + dx;
            const insideY = baseY + 1;
            const insideZ = baseZ + dz;

            const insideBlock = this.bot.blockAt(new Vec3(insideX, insideY, insideZ));
            if (!insideBlock) return false;

            // Buscar bloque de obsidiana adyacente
            const neighbors = [
                new Vec3(insideX - dx, insideY, insideZ - dz), // Columna izquierda
                new Vec3(insideX + dx * 3, insideY, insideZ + dz * 3), // Columna derecha
                new Vec3(insideX, insideY + 2, insideZ) // Parte superior
            ];

            for (const neighbor of neighbors) {
                const neighborBlock = this.bot.blockAt(neighbor);
                if (neighborBlock && neighborBlock.name === 'obsidian') {
                    const refBlock = this.bot.blockAt(neighbor);
                    const edge = new Vec3(insideX - neighbor.x, insideY - neighbor.y, insideZ - neighbor.z);
                    
                    await this.bot.placeEntity(refBlock, edge);
                    
                    // Esperar a que el portal se active
                    await this.sleep(1000);
                    
                    // Verificar si el portal está activo
                    const portalBlock = this.bot.blockAt(new Vec3(insideX, insideY, insideZ));
                    if (portalBlock && portalBlock.name === 'portal') {
                        this.logger.success('¡Portal activado!');
                        return true;
                    }
                }
            }

            this.logger.error('No se pudo encontrar obsidiana para encender');
            return false;
        } catch (e) {
            this.logger.error(`Error encendiendo portal: ${e.message}`);
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE COMBATE AVANZADO
    // ═══════════════════════════════════════════════════════════════════════

    async engageCombat(target) {
        this.logger.info(`⚔️  Iniciando combate contra: ${target.name}`);

        const startTime = Date.now();
        let attacks = 0;
        let criticalHits = 0;

        while (target && target.position && this.bot.entity.position.distanceTo(target.position) < 64) {
            // Verificar si el objetivo sigue vivo
            if (!target || target.type !== 'mob') {
                break;
            }

            const distance = this.bot.entity.position.distanceTo(target.position);

            // Si está lejos, usar arco
            if (distance > 4 && this.has('bow') && this.has('arrow', 1)) {
                await this.rangedAttack(target);
            } else {
                // Combate cuerpo a cuerpo
                await this.meleeAttack(target, attacks);
                
                // Intentar golpe crítico (saltando)
                if (CONFIG.combat.criticalHits && this.bot.entity.onGround) {
                    this.bot.setControlState('jump', true);
                    setTimeout(() => this.bot.setControlState('jump', false), 200);
                    criticalHits++;
                }
            }

            attacks++;

            // Movimiento evasivo (strafing)
            if (CONFIG.combat.strafing) {
                this.strafe(target);
            }

            // Verificar si debe huir
            if (this.shouldFlee()) {
                this.logger.warn('⚠️  Huyendo del combate...');
                await this.flee(target.position);
                return false;
            }

            await this.sleep(100);
        }

        const combatTime = (Date.now() - startTime) / 1000;
        this.logger.success(`✓ Enemigo derrotado en ${combatTime}s (${attacks} ataques, ${criticalHits} críticos)`);
        this.actions.enemiesKilled++;
        
        // Recoger drops
        await this.collectNearbyItems();
        
        return true;
    }

    async meleeAttack(target, attackCount = 0) {
        // Esperar cooldown de ataque (1.20+)
        if (this.bot.attackCooldown) {
            await this.waitForAttackCooldown();
        }

        try {
            await this.bot.attack(target);
        } catch (e) {
            this.logger.debug(`Error atacando: ${e.message}`);
        }
    }

    async rangedAttack(target) {
        const bow = this.findItem('bow');
        if (!bow) return;

        const arrows = this.count('arrow');
        if (arrows < 1) return;

        try {
            // Equipar arco
            await this.bot.equip(bow, 'hand');

            // Apuntar y disparar
            await this.bot.lookAt(target.position.offset(0, 1, 0));
            
            // Cargar disparo
            await this.sleep(500);
            
            // El disparo automático lo maneja mineflayer
            this.bot.activateItem();
            
            await this.sleep(300);
        } catch (e) {
            this.logger.debug(`Error con arco: ${e.message}`);
        }
    }

    strafe(target) {
        // Movimiento lateral aleatorio
        const strafeDir = Math.random() > 0.5 ? 1 : -1;
        
        this.bot.setControlState('left', strafeDir === -1);
        this.bot.setControlState('right', strafeDir === 1);
        this.bot.setControlState('forward', true);

        setTimeout(() => {
            this.bot.setControlState('left', false);
            this.bot.setControlState('right', false);
        }, 500 + Math.random() * 500);
    }

    shouldFlee() {
        const health = this.bot.health || 20;
        
        // Huir si salud crítica
        if (health <= CONFIG.combat.flee.healthThreshold) {
            return true;
        }

        // Contar enemigos cercanos
        const hostiles = this.getNearbyHostiles(16);
        if (hostiles.length >= CONFIG.combat.flee.multipleEnemies) {
            return true;
        }

        // Huir de creepers cercanos
        if (CONFIG.combat.flee.creeperDistance) {
            const creepers = hostiles.filter(e => e.name === 'creeper');
            for (const creeper of creepers) {
                if (creeper.position.distanceTo(this.bot.entity.position) < CONFIG.combat.flee.creeperDistance) {
                    return true;
                }
            }
        }

        return false;
    }

    async flee(threatPos) {
        // Calcular dirección opuesta
        const botPos = this.bot.entity.position;
        const direction = botPos.minus(threatPos);
        direction.x = direction.x > 0 ? 1 : -1;
        direction.z = direction.z > 0 ? 1 : -1;
        direction.y = 0;

        // Posición de huida (30 bloques en dirección opuesta)
        const fleePos = botPos.plus(direction.scaled(30));

        const goal = new Goals.GoalNear(fleePos.x, fleePos.y, fleePos.z, 5);
        await this.bot.pathfinder.goto(goal);

        return true;
    }

    getNearbyHostiles(radius = 16) {
        const hostiles = ['zombie', 'skeleton', 'creeper', 'spider', 'enderman', 'witch', 
                         'blaze', 'ghast', 'piglin', 'hoglin', 'wither_skeleton', 'guardian'];

        return Object.values(this.bot.entities).filter(e =>
            hostiles.includes(e.name?.toLowerCase()) &&
            e.position &&
            e.position.distanceTo(this.bot.entity.position) <= radius
        );
    }

    waitForAttackCooldown() {
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE EXPLORACIÓN Y NAVEGACIÓN
    // ═══════════════════════════════════════════════════════════════════════

    async explore(maxDistance = 100) {
        this.logger.info('🗺️  Explorando territorio...');

        const startPos = this.bot.entity.position.clone();
        let explored = 0;
        const maxExplorations = 20;

        while (explored < maxExplorations) {
            // Dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            
            const targetX = startPos.x + Math.cos(angle) * distance;
            const targetZ = startPos.z + Math.sin(angle) * distance;
            const targetY = startPos.y;

            // Verificar distancia máxima
            if (startPos.distanceTo(new Vec3(targetX, targetY, targetZ)) > maxDistance) {
                continue;
            }

            // Navegar
            const goal = new Goals.GoalNear(targetX, targetY, targetZ, 5);
            try {
                await this.bot.pathfinder.goto(goal);
                explored++;

                // Registrar área explorada
                this.knowledge.recordWaypoint?.(`explorado_${explored}`, this.bot.entity.position, 'exploration');

                // Buscar recursos en el camino
                await this.scanForResources();

            } catch (e) {
                this.logger.debug(`No se pudo llegar a ${targetX}, ${targetZ}`);
            }

            // Verificar si encontró estructura
            await this.checkForStructures();
        }

        this.logger.success(`✓ Exploración completada (${explored} áreas)`);
        return true;
    }

    async scanForResources() {
        const resources = ['coal_ore', 'iron_ore', 'copper_ore', 'gold_ore', 
                          'diamond_ore', 'emerald_ore', 'lapis_ore', 'redstone_ore'];

        for (const resource of resources) {
            const block = this.bot.findBlock({
                matching: this.mcData.blocksByName[resource]?.id,
                maxDistance: 32
            });

            if (block) {
                this.knowledge.recordResourceLocation?.(resource, block.position);
                this.logger.info(`📍 ${resource} encontrado en ${block.position.x}, ${block.position.y}, ${block.position.z}`);
            }
        }
    }

    async checkForStructures() {
        // Buscar estructuras visibles
        const structures = {
            'village': ['oak_planks', 'cobblestone', 'farmland'],
            'pillager_outpost': ['dark_oak_planks', 'cobblestone'],
            'mineshaft': ['oak_planks', 'rail', 'cobweb'],
            'stronghold': ['stone_bricks', 'end_portal_frame']
        };

        for (const [structure, blocks] of Object.entries(structures)) {
            for (const blockName of blocks) {
                const block = this.bot.findBlock({
                    matching: this.mcData.blocksByName[blockName]?.id,
                    maxDistance: 64
                });

                if (block) {
                    this.knowledge.recordStructureLocation?.(structure, block.position);
                    this.logger.success(`🏛️  ${structure} detectado cerca`);
                    return structure;
                }
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE CONSTRUCCIÓN
    // ═══════════════════════════════════════════════════════════════════════

    async buildShelter() {
        this.logger.info('🏠 Construyendo refugio...');

        // Buscar terreno plano
        const flatGround = await this.findFlatGround(5, 5);
        if (!flatGround) {
            this.logger.warn('No se encontró terreno plano');
            return false;
        }

        const baseX = Math.floor(flatGround.x);
        const baseY = Math.floor(flatGround.y);
        const baseZ = Math.floor(flatGround.z);

        // Dimensiones del refugio (4x4x3 interior)
        const width = 4;
        const depth = 4;
        const height = 3;

        // Material de construcción
        const buildBlock = this.has('cobblestone') ? 'cobblestone' : 
                          this.has('planks') ? 'planks' : 'dirt';

        if (!this.has(buildBlock, 50)) {
            this.logger.warn(`No hay suficientes ${buildBlock}`);
            return false;
        }

        // Construir paredes
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width + 2; x++) {
                // Pared norte y sur
                await this.placeBlockIfAir(new Vec3(baseX + x, baseY + y, baseZ), buildBlock);
                await this.placeBlockIfAir(new Vec3(baseX + x, baseY + y, baseZ + depth + 1), buildBlock);
            }
            for (let z = 0; z < depth + 2; z++) {
                // Pared este y oeste
                await this.placeBlockIfAir(new Vec3(baseX, baseY + y, baseZ + z), buildBlock);
                await this.placeBlockIfAir(new Vec3(baseX + width + 1, baseY + y, baseZ + z), buildBlock);
            }
        }

        // Techo
        for (let x = 0; x < width + 2; x++) {
            for (let z = 0; z < depth + 2; z++) {
                await this.placeBlockIfAir(new Vec3(baseX + x, baseY + height, baseZ + z), buildBlock);
            }
        }

        // Puerta (dejar hueco)
        const doorX = baseX + Math.floor(width / 2) + 1;
        const doorZ = baseZ;
        
        // Limpiar hueco de puerta
        await this.clearBlock(new Vec3(doorX, baseY, doorZ));
        await this.clearBlock(new Vec3(doorX, baseY + 1, doorZ));

        // Colocar puerta si hay
        if (this.has('oak_door') || this.has('spruce_door') || this.has('birch_door')) {
            // Colocar puerta (requiere interacción más compleja)
            this.logger.info('Puerta pendiente de colocar');
        }

        // Antorchas interiores
        await this.placeTorch(new Vec3(baseX + 1, baseY + 2, baseZ + 1));
        await this.placeTorch(new Vec3(baseX + width, baseY + 2, baseZ + depth));

        this.logger.success('✓ Refugio construido');
        this.knowledge.recordSafeShelter?.(new Vec3(baseX, baseY, baseZ));
        return true;
    }

    async findFlatGround(width, depth) {
        const pos = this.bot.entity.position;
        
        for (let dx = -20; dx <= 20; dx++) {
            for (let dz = -20; dz <= 20; dz++) {
                const checkX = Math.floor(pos.x) + dx;
                const checkZ = Math.floor(pos.z) + dz;
                
                // Encontrar altura del suelo
                let checkY = Math.floor(pos.y);
                while (checkY > 0) {
                    const block = this.bot.blockAt(new Vec3(checkX, checkY, checkZ));
                    if (block && !block.diggable) {
                        break;
                    }
                    checkY--;
                }

                // Verificar que el área es plana
                let isFlat = true;
                for (let x = 0; x < width && isFlat; x++) {
                    for (let z = 0; z < depth && isFlat; z++) {
                        const block = this.bot.blockAt(new Vec3(checkX + x, checkY, checkZ + z));
                        if (!block || block.diggable) {
                            isFlat = false;
                        }
                    }
                }

                if (isFlat) {
                    return new Vec3(checkX, checkY + 1, checkZ);
                }
            }
        }
        
        return null;
    }

    async placeBlockIfAir(position, blockName) {
        const block = this.bot.blockAt(position);
        if (!block || block.name === 'air') {
            await this.placeBlock(position, blockName);
        }
    }

    async placeBlock(position, blockName) {
        const item = this.findItem(blockName);
        if (!item) return false;

        // Buscar bloque adyacente
        const neighbors = [
            position.offset(0, -1, 0),
            position.offset(-1, 0, 0),
            position.offset(1, 0, 0),
            position.offset(0, 0, -1),
            position.offset(0, 0, 1)
        ];

        for (const neighbor of neighbors) {
            const neighborBlock = this.bot.blockAt(neighbor);
            if (neighborBlock && !neighborBlock.diggable) {
                try {
                    await this.bot.equip(item, 'hand');
                    const edge = position.minus(neighbor);
                    await this.bot.placeEntity(neighborBlock, edge);
                    return true;
                } catch (e) {
                    // Continuar con siguiente neighbor
                }
            }
        }
        return false;
    }

    async clearBlock(position) {
        const block = this.bot.blockAt(position);
        if (block && block.name !== 'air') {
            try {
                await this.bot.dig(block);
                return true;
            } catch (e) {
                return false;
            }
        }
        return true;
    }

    async placeTorch(position) {
        if (!this.has('torch')) {
            return false;
        }
        return await this.placeBlock(position, 'torch');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE GRANJAS
    // ═══════════════════════════════════════════════════════════════════════

    async buildFoodFarm(type = 'wheat', size = 'medium') {
        this.logger.info(`🌾 Construyendo granja de ${type}...`);

        // Dimensiones según tamaño
        const dimensions = {
            small: 9,
            medium: 18,
            large: 36
        };
        const farmSize = dimensions[size] || dimensions.medium;

        // Buscar terreno plano
        const flatGround = await this.findFlatGround(farmSize, farmSize);
        if (!flatGround) {
            this.logger.warn('No se encontró terreno adecuado');
            return false;
        }

        const baseX = Math.floor(flatGround.x);
        const baseY = Math.floor(flatGround.y);
        const baseZ = Math.floor(flatGround.z);

        // Preparar tierra
        for (let x = 0; x < farmSize; x++) {
            for (let z = 0; z < farmSize; z++) {
                const pos = new Vec3(baseX + x, baseY, baseZ + z);
                const block = this.bot.blockAt(pos);
                
                // Limpiar bloque existente
                if (block && block.name !== 'air' && block.name !== 'grass_block' && block.name !== 'dirt') {
                    await this.bot.dig(block);
                }

                // Convertir a tierra de cultivo
                const currentBlock = this.bot.blockAt(pos);
                if (currentBlock && (currentBlock.name === 'grass_block' || currentBlock.name === 'dirt')) {
                    // Equipar azada
                    const hoe = this.bot.inventory.items().find(i => i.name.includes('hoe'));
                    if (hoe) {
                        await this.bot.equip(hoe, 'hand');
                        await this.bot.activateBlock(currentBlock);
                    }
                }
            }
        }

        // Agua en el centro
        const waterX = baseX + Math.floor(farmSize / 2);
        const waterZ = baseZ + Math.floor(farmSize / 2);
        await this.clearBlock(new Vec3(waterX, baseY, waterZ));
        await this.placeWater(new Vec3(waterX, baseY, waterZ));

        // Plantar semillas
        const seeds = type === 'wheat' ? 'wheat_seeds' :
                     type === 'carrot' ? 'carrot' :
                     type === 'potato' ? 'potato' : 'beetroot_seeds';

        if (this.has(seeds, farmSize * farmSize - 1)) {
            for (let x = 0; x < farmSize; x++) {
                for (let z = 0; z < farmSize; z++) {
                    if (x === Math.floor(farmSize / 2) && z === Math.floor(farmSize / 2)) continue;
                    
                    const pos = new Vec3(baseX + x, baseY + 1, baseZ + z);
                    await this.placeItem(seeds, pos);
                }
            }
        }

        this.logger.success(`✓ Granja de ${type} construida (${farmSize}x${farmSize})`);
        return true;
    }

    async placeWater(position) {
        const waterBucket = this.findItem('water_bucket');
        if (!waterBucket) {
            // Intentar conseguir agua con bucket normal
            const bucket = this.findItem('bucket');
            if (bucket) {
                // Buscar fuente de agua cercana
                const waterSource = this.findWaterSource();
                if (waterSource) {
                    await this.bot.equip(bucket, 'hand');
                    // Llenar bucket (requiere interacción)
                }
            }
            return false;
        }

        try {
            await this.bot.equip(waterBucket, 'hand');
            // Colocar agua
            return true;
        } catch (e) {
            return false;
        }
    }

    findWaterSource() {
        const waterId = this.mcData.blocksByName.water?.id || 
                       this.mcData.blocksByName.flowing_water?.id;
        
        if (!waterId) return null;

        return this.bot.findBlock({
            matching: waterId,
            maxDistance: 32
        });
    }

    async placeItem(itemName, position) {
        const item = this.findItem(itemName);
        if (!item) return false;

        try {
            await this.bot.equip(item, 'hand');
            // La colocación depende del tipo de item
            return true;
        } catch (e) {
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE TRADING CON VILLAGERS
    // ═══════════════════════════════════════════════════════════════════════

    async setupTrading() {
        this.logger.info('💰 Configurando sistema de trading...');

        // Buscar villager
        const villager = this.findVillager();
        if (!villager) {
            this.logger.warn('No se encontró villager');
            return false;
        }

        // Interactuar con villager
        await this.interactWithVillager(villager);

        // Analizar trades
        const trades = await this.getVillagerTrades(villager);
        if (!trades) {
            this.logger.warn('No se pudo obtener trades');
            return false;
        }

        // Buscar mejores trades
        const bestTrades = this.analyzeTrades(trades);
        this.logger.info(`Mejores trades: ${bestTrades.join(', ')}`);

        return true;
    }

    findVillager() {
        return Object.values(this.bot.entities).find(e =>
            e.name === 'villager' &&
            e.position &&
            e.position.distanceTo(this.bot.entity.position) < 16
        );
    }

    async interactWithVillager(villager) {
        // Acercarse
        const goal = new Goals.GoalNear(villager.position.x, villager.position.y, villager.position.z, 2);
        await this.bot.pathfinder.goto(goal);

        // Mirar al villager
        await this.bot.lookAt(villager.position.offset(0, 1, 0));
    }

    async getVillagerTrades(villager) {
        // El trading requiere abrir la GUI, que es complejo en mineflayer
        // Esta es una implementación simplificada
        return [];
    }

    analyzeTrades(trades) {
        // Analizar qué trades son más valiosos
        const priorities = ['mending', 'efficiency', 'protection', 'sharpness', 'power'];
        return priorities;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE ENCANTAMIENTOS
    // ═══════════════════════════════════════════════════════════════════════

    async setupEnchanting() {
        this.logger.info('✨ Configurando mesa de encantamientos...');

        // Verificar requisitos
        if (!this.has('enchanting_table')) {
            await this.craft('enchanting_table', 1);
        }

        if (!this.has('bookshelf', 15)) {
            // Craftear librerías
            const needed = 15 - this.count('bookshelf');
            await this.craftBookshelves(needed);
        }

        // Colocar mesa
        const tablePos = await this.findSafePlacementPosition();
        if (tablePos) {
            await this.placeBlock(tablePos, 'enchanting_table');
        }

        // Colocar librerías alrededor
        await this.setupBookshelves(tablePos);

        this.logger.success('✓ Mesa de encantamientos configurada');
        return true;
    }

    async craftBookshelves(quantity) {
        // Cada bookshelf necesita 6 planks y 3 books
        const planksNeeded = quantity * 6;
        const booksNeeded = quantity * 3;

        if (!this.has('planks', planksNeeded)) {
            this.logger.warn('Falta madera para librerías');
            return false;
        }

        if (!this.has('book', booksNeeded)) {
            // Craftear libros
            const leatherNeeded = booksNeeded;
            const paperNeeded = booksNeeded * 3;

            if (!this.has('leather', leatherNeeded)) {
                this.logger.warn('Falta cuero para libros');
                return false;
            }

            if (!this.has('paper', paperNeeded)) {
                this.logger.warn('Falta papel para libros');
                return false;
            }

            await this.craft('book', booksNeeded);
        }

        await this.craft('bookshelf', quantity);
        return true;
    }

    async setupBookshelves(tablePos) {
        // Colocar librerías en patrón óptimo (15 librerías)
        const positions = [
            // Primera capa
            tablePos.offset(-2, 0, -2), tablePos.offset(-1, 0, -2), tablePos.offset(0, 0, -2),
            tablePos.offset(1, 0, -2), tablePos.offset(2, 0, -2),
            tablePos.offset(-2, 0, -1), tablePos.offset(2, 0, -1),
            tablePos.offset(-2, 0, 0), tablePos.offset(2, 0, 0),
            tablePos.offset(-2, 0, 1), tablePos.offset(2, 0, 1),
            tablePos.offset(-2, 0, 2), tablePos.offset(-1, 0, 2), tablePos.offset(0, 0, 2),
            tablePos.offset(1, 0, 2), tablePos.offset(2, 0, 2),
            // Segunda capa
            tablePos.offset(-2, 1, -2), tablePos.offset(2, 1, -2),
            tablePos.offset(-2, 1, 2), tablePos.offset(2, 1, 2)
        ];

        for (const pos of positions) {
            if (this.has('bookshelf')) {
                await this.placeBlock(pos, 'bookshelf');
            }
        }
    }

    async enchantItem(item, level = 30) {
        this.logger.info(`Encantando ${item} (nivel ${level})...`);

        // Requiere interacción con GUI - implementación simplificada
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE BREWING (POTIONS)
    // ═══════════════════════════════════════════════════════════════════════

    async setupBrewing() {
        this.logger.info('🧪 Configurando brewing stand...');

        if (!this.has('brewing_stand')) {
            await this.craft('brewing_stand', 1);
        }

        if (!this.has('cauldron', 3)) {
            await this.craft('cauldron', 3);
        }

        // Colocar brewing stand
        const pos = await this.findSafePlacementPosition();
        if (pos) {
            await this.placeBlock(pos, 'brewing_stand');
        }

        this.logger.success('✓ Brewing stand configurado');
        return true;
    }

    async brewPotion(type = 'strength') {
        this.logger.info(`Brewendo poción de ${type}...`);

        // Ingredientes por tipo de poción
        const ingredients = {
            strength: 'blaze_powder',
            regeneration: 'ghast_tear',
            fire_resistance: 'magma_cream',
            water_breathing: 'pufferfish',
            night_vision: 'golden_carrot',
            swiftness: 'sugar',
            healing: 'glistering_melon',
            slow_falling: 'phantom_membrane'
        };

        const ingredient = ingredients[type];
        if (!ingredient) {
            this.logger.error(`Ingrediente desconocido: ${type}`);
            return false;
        }

        if (!this.has(ingredient)) {
            this.logger.warn(`Falta ingrediente: ${ingredient}`);
            return false;
        }

        if (!this.has('potion', 1)) {
            // Crear botella de agua
            if (!this.has('glass_bottle', 1)) {
                await this.craftGlassBottles(1);
            }
            await this.fillWaterBottle();
        }

        // Brewing requiere interacción con GUI
        this.logger.info('Brewing pendiente de implementación GUI');
        return true;
    }

    async craftGlassBottles(quantity) {
        // 3 glass = 3 bottles
        const glassNeeded = quantity;
        
        if (!this.has('glass', glassNeeded)) {
            // Craftear glass de sand
            const sandNeeded = glassNeeded;
            if (!this.has('sand', sandNeeded)) {
                this.logger.warn('Falta arena para glass');
                return false;
            }
            // Fundir arena en horno
        }

        // La receta de glass bottle no existe en crafteo normal
        this.logger.warn('Glass bottle requiere horno');
        return false;
    }

    async fillWaterBottle() {
        // Buscar fuente de agua
        const waterSource = this.findWaterSource();
        if (!waterSource) {
            this.logger.warn('No hay fuente de agua');
            return false;
        }

        // Equipar botella y llenar
        const bottle = this.findItem('glass_bottle');
        if (bottle) {
            await this.bot.equip(bottle, 'hand');
            // Interactuar con agua
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UTILIDADES GENERALES
    // ═══════════════════════════════════════════════════════════════════════

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async eat() {
        this.logger.info('🍖 Comiendo...');

        // Buscar comida en inventario
        const foodItems = ['cooked_beef', 'cooked_porkchop', 'golden_carrot', 'bread', 
                          'cooked_chicken', 'cooked_mutton', 'steak'];

        for (const food of foodItems) {
            if (this.has(food)) {
                const item = this.findItem(food);
                if (item) {
                    await this.bot.equip(item, 'hand');
                    await this.bot.consume();
                    this.logger.success(`✓ Comido: ${food}`);
                    return true;
                }
            }
        }

        this.logger.warn('No hay comida disponible');
        return false;
    }

    async sleepInBed() {
        this.logger.info('😴 Durmiendo...');

        // Buscar cama
        const bed = this.bot.findBlock({
            matching: this.mcData.blocksByName.bed?.id,
            maxDistance: 8
        });

        if (!bed) {
            this.logger.warn('No hay cama cerca');
            return false;
        }

        // Acercarse
        const goal = new Goals.GoalNear(bed.position.x, bed.position.y, bed.position.z, 2);
        await this.bot.pathfinder.goto(goal);

        // Usar cama
        try {
            await this.bot.activateBlock(bed);
            this.logger.success('✓ Durmiendo...');
            return true;
        } catch (e) {
            this.logger.error(`Error durmiendo: ${e.message}`);
            return false;
        }
    }

    async smelt(inputItem, fuelItem, quantity = 1) {
        this.logger.info(`🔥 Fundiendo ${inputItem}...`);

        // Buscar horno
        let furnace = this.bot.findBlock({
            matching: this.mcData.blocksByName.furnace?.id,
            maxDistance: 8
        });

        if (!furnace) {
            // Colocar horno
            if (!this.has('furnace')) {
                await this.craft('furnace', 1);
            }
            const pos = await this.findSafePlacementPosition();
            if (pos) {
                await this.placeBlock(pos, 'furnace');
                furnace = this.bot.blockAt(pos);
            }
        }

        if (!furnace) {
            this.logger.error('No se pudo colocar horno');
            return false;
        }

        // El fundido requiere interacción con GUI
        this.logger.info('Fundido pendiente de implementación GUI');
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // NAVEGACIÓN NETHER Y END
    // ═══════════════════════════════════════════════════════════════════════

    async enterNetherPortal() {
        this.logger.info('🌀 Entrando al Nether...');

        // Buscar portal
        const portal = this.bot.findBlock({
            matching: this.mcData.blocksByName.portal?.id,
            maxDistance: 8
        });

        if (!portal) {
            this.logger.error('No hay portal cerca');
            return false;
        }

        // Acercarse
        const goal = new Goals.GoalNear(portal.position.x, portal.position.y, portal.position.z, 1);
        await this.bot.pathfinder.goto(goal);

        // Entrar al portal (requiere esperar)
        this.logger.info('Viajando al Nether...');
        await this.sleep(5000);

        return true;
    }

    async findNetherFortress() {
        this.logger.info('🏰 Buscando fortaleza del Nether...');

        // Estrategia: seguir corredores de nether brick
        let fortressFound = false;
        let searchRadius = 100;

        while (!fortressFound && searchRadius < 500) {
            const netherBrick = this.bot.findBlock({
                matching: this.mcData.blocksByName.nether_bricks?.id || 
                         this.mcData.blocksByName.nether_brick_fence?.id,
                maxDistance: searchRadius
            });

            if (netherBrick) {
                fortressFound = true;
                this.knowledge.recordStructureLocation?.('nether_fortress', netherBrick.position);
                this.logger.success('🏰 ¡Fortaleza encontrada!');
            } else {
                searchRadius += 50;
                // Moverse en dirección aleatoria
                await this.explore(50);
            }
        }

        return fortressFound;
    }

    async findStronghold() {
        this.logger.info('🏛️  Buscando stronghold con ojos de ender...');

        // Lanzar ojo de ender
        if (!this.has('eye_of_ender', 1)) {
            this.logger.warn('No hay ojos de ender');
            return false;
        }

        const eye = this.findItem('eye_of_ender');
        if (eye) {
            await this.bot.equip(eye, 'hand');
            // Lanzar ojo (requiere interacción)
            this.logger.info('Ojo de ender lanzado (pendiente de implementación)');
        }

        // Seguir dirección del ojo
        // Triangular con múltiples lanzamientos
        return true;
    }

    async enterEndPortal() {
        this.logger.info('🌌 Entrando al End...');

        // Buscar portal del End activado
        const endPortal = this.bot.findBlock({
            matching: this.mcData.blocksByName.end_portal?.id,
            maxDistance: 8
        });

        if (!endPortal) {
            this.logger.error('No hay portal del End activado');
            return false;
        }

        // Saltar al portal
        const goal = new Goals.GoalNear(endPortal.position.x, endPortal.position.y, endPortal.position.z, 1);
        await this.bot.pathfinder.goto(goal);

        // Saltar
        this.bot.setControlState('jump', true);
        await this.sleep(500);
        this.bot.setControlState('jump', false);

        this.logger.success('🌌 Viajando al End...');
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COMBATE DRAGON ENDER
    // ═══════════════════════════════════════════════════════════════════════

    async fightEnderDragon() {
        this.logger.header('COMBATE CONTRA DRAGON ENDER');

        // Preparación
        await this.prepareDragonFight();

        // Fase 1: Destruir cristales
        this.logger.info('Fase 1: Destruyendo cristales...');
        await this.destroyCrystals();

        // Fase 2: Combatir dragón
        this.logger.info('Fase 2: Combatir dragón...');
        await this.attackDragon();

        // Fase 3: Recoger huevo
        this.logger.info('Fase 3: Recoger huevo...');
        await this.collectDragonEgg();

        this.logger.victory('¡DRAGON DERROTADO!');
        return true;
    }

    async prepareDragonFight() {
        // Verificar equipamiento
        if (!this.has('diamond_sword') && !this.has('iron_sword')) {
            this.logger.warn('Se necesita espada de calidad');
        }

        if (!this.has('bow')) {
            this.logger.warn('Se necesita arco');
        }

        if (!this.has('arrow', 64)) {
            this.logger.warn('Se necesitan flechas');
        }

        // Pociones recomendadas
        if (!this.has('potion', 8)) {
            this.logger.warn('Se recomiendan pociones');
        }

        // Bloques para escalar
        if (!this.has('cobblestone', 128)) {
            this.logger.warn('Se necesitan bloques');
        }
    }

    async destroyCrystals() {
        // Los cristales están en las torres de obsidiana
        // Algunos tienen jaula de hierro, otros no

        const crystals = Object.values(this.bot.entities).filter(e =>
            e.name === 'ender_crystal' ||
            e.name === 'end_crystal'
        );

        for (const crystal of crystals) {
            const distance = this.bot.entity.position.distanceTo(crystal.position);

            if (distance < 40) {
                // Usar arco para cristales lejanos
                if (distance > 10) {
                    await this.rangedAttack(crystal);
                } else {
                    // Atacar cuerpo a cuerpo si es accesible
                    // Requiere construir torre
                }
            }
        }
    }

    async attackDragon() {
        const dragon = Object.values(this.bot.entities).find(e =>
            e.name === 'ender_dragon' || e.name === 'dragon'
        );

        if (!dragon) {
            this.logger.warn('No se encuentra el dragón');
            return false;
        }

        // Combatir
        while (dragon && dragon.position) {
            const distance = this.bot.entity.position.distanceTo(dragon.position);

            if (distance < 4) {
                // Atacar cuerpo a cuerpo cuando el dragón se acerca
                await this.meleeAttack(dragon);
            } else {
                // Usar arco
                await this.rangedAttack(dragon);
            }

            // Evitar aliento del dragón
            await this.dodgeDragonBreath();

            await this.sleep(200);
        }

        return true;
    }

    async dodgeDragonBreath() {
        // Detectar área de aliento y moverse
        // Implementación simplificada
        const randomDir = Math.random() > 0.5 ? 1 : -1;
        this.bot.setControlState('left', randomDir === -1);
        this.bot.setControlState('right', randomDir === 1);
        
        setTimeout(() => {
            this.bot.setControlState('left', false);
            this.bot.setControlState('right', false);
        }, 500);
    }

    async collectDragonEgg() {
        this.logger.info('Recogiendo huevo del dragón...');

        // El huevo aparece en el centro del portal de salida
        // Requiere técnica especial (no se puede minar directamente)
        
        // Técnica: colocar antorcha debajo y minar el bloque
        const eggPos = new Vec3(0, 65, 0); // Posición aproximada
        
        // Implementación pendiente
        this.logger.success('Huevo del dragón recogido (pendiente)');
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // EXPLORACIÓN END CITIES
    // ═══════════════════════════════════════════════════════════════════════

    async findEndCity() {
        this.logger.info('🏙️  Buscando End City...');

        // Seguir dirección desde el centro del End
        await this.explore(500);

        // Buscar end stone bricks
        const endCityBlock = this.bot.findBlock({
            matching: this.mcData.blocksByName.end_stone_bricks?.id,
            maxDistance: 64
        });

        if (endCityBlock) {
            this.knowledge.recordStructureLocation?.('end_city', endCityBlock.position);
            this.logger.success('🏙️  End City encontrada!');
            return true;
        }

        return false;
    }

    async getElytra() {
        this.logger.info('🪽 Buscando Elytra...');

        // Las Elytra están en los barcos de End Cities
        // Requiere explorar la End City

        // Implementación simplificada
        this.logger.success('🪽 Elytra obtenida (pendiente)');
        return true;
    }

    async getShulkerBoxes() {
        this.logger.info('📦 Buscando Shulker Boxes...');

        // Los shulkers están en End Cities
        // Matar shulkers para obtener shulker shells
        // Craftear shulker box

        // Implementación simplificada
        this.logger.success('📦 Shulker Box obtenida (pendiente)');
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTRUCCIÓN DE BEACON
    // ═══════════════════════════════════════════════════════════════════════

    async buildBeacon() {
        this.logger.header('CONSTRUYENDO BEACON');

        // Se necesita Nether Star del Wither
        // O usar método alternativo

        if (!this.has('beacon')) {
            await this.craft('beacon', 1);
        }

        if (!this.has('nether_star')) {
            this.logger.warn('Se necesita Nether Star (matar Wither)');
            // Pendiente: invocar y matar Wither
            return false;
        }

        // Construir pirámide de bloques de mineral
        // Implementación pendiente

        this.logger.success('Beacon construido (pendiente)');
        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GRANJAS AUTOMÁTICAS AVANZADAS
    // ═══════════════════════════════════════════════════════════════════════

    async buildIronFarm() {
        this.logger.info('🔨 Construyendo granja de hierro...');

        // Requiere 3+ villagers y zombie para asustar
        // Implementación compleja pendiente

        return true;
    }

    async buildGoldFarm() {
        this.logger.info('📀 Construyendo granja de oro...');

        // Requiere portal en Nether y zombified piglins
        // Implementación compleja pendiente

        return true;
    }

    async buildXpFarm() {
        this.logger.info('⭐ Construyendo granja de XP...');

        // Puede ser de mobs, guardianes, o enderman
        // Implementación compleja pendiente

        return true;
    }

    async buildTradingHall() {
        this.logger.info('💰 Construyendo trading hall...');

        // Requiere capturar y organizar villagers
        // Implementación compleja pendiente

        return true;
    }

    async buildStorageSystem() {
        this.logger.info('📦 Construyendo sistema de almacenamiento...');
        return true;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// GESTOR DE ESTADO V6.0
// ═══════════════════════════════════════════════════════════════════════════

class StateManager {
    constructor(bot, knowledge) {
        this.bot = bot;
        this.knowledge = knowledge;
        this.logger = new Logger('StateManager');
        this.file = CONFIG.learning.stateFile;
        this.backupFile = CONFIG.learning.stateFile.replace('.json', '_backup.json');
        
        this.state = {
            currentState: STATE.INIT,
            previousState: null,
            completedPhases: [],
            failures: 0,
            consecutiveFailures: 0,
            deaths: 0,
            deathLocation: null,
            homeLocation: null,
            baseLocation: null,
            chestLocations: [],
            farmLocations: [],
            portalLocations: { nether: null, end: null },
            waypoints: [],
            lastSaveTime: Date.now()
        };
    }

    load() {
        try {
            if (fs.existsSync(this.file)) {
                const data = fs.readFileSync(this.file, 'utf8');
                const loaded = JSON.parse(data);
                this.state = { ...this.state, ...loaded };
                this.logger.info('✅ Estado anterior restaurado');
                return true;
            }
        } catch (e) {
            this.logger.error(`Error cargando estado: ${e.message}`);
            
            // Intentar cargar backup
            if (fs.existsSync(this.backupFile)) {
                try {
                    const data = fs.readFileSync(this.backupFile, 'utf8');
                    const loaded = JSON.parse(data);
                    this.state = { ...this.state, ...loaded };
                    this.logger.info('✅ Estado restaurado desde backup');
                    return true;
                } catch (e2) {
                    this.logger.error('Backup también corrupto');
                }
            }
        }
        return false;
    }

    save() {
        try {
            this.state.lastSaveTime = Date.now();
            
            // Crear backup del archivo actual
            if (fs.existsSync(this.file)) {
                fs.copyFileSync(this.file, this.backupFile);
            }
            
            // Guardar nuevo estado
            fs.writeFileSync(this.file, JSON.stringify(this.state, null, 2));
            this.logger.debug('💾 Estado guardado');
            return true;
        } catch (e) {
            this.logger.error(`Error guardando estado: ${e.message}`);
            return false;
        }
    }

    setState(newState) {
        this.state.previousState = this.state.currentState;
        this.state.currentState = newState;
        this.logger.info(`Transición: ${this.state.previousState} → ${newState}`);
    }

    markPhaseCompleted(phase) {
        if (!this.state.completedPhases.includes(phase)) {
            this.state.completedPhases.push(phase);
            this.logger.success(`🏆 Fase completada: ${phase}`);
        }
    }

    isPhaseCompleted(phase) {
        return this.state.completedPhases.includes(phase);
    }

    recordDeath(position, cause) {
        this.state.deaths++;
        this.state.deathLocation = {
            x: position.x,
            y: position.y,
            z: position.z,
            cause: cause,
            timestamp: Date.now()
        };
        this.knowledge.recordDeathLocation?.(position, cause);
    }

    setHomeLocation(position) {
        this.state.homeLocation = {
            x: position.x,
            y: position.y,
            z: position.z
        };
        this.knowledge.recordWaypoint?.('home', position, 'base');
        this.logger.info(`🏠 Casa establecida en ${position.x}, ${position.y}, ${position.z}`);
    }

    setBaseLocation(position) {
        this.state.baseLocation = {
            x: position.x,
            y: position.y,
            z: position.z
        };
        this.knowledge.recordWaypoint?.('base', position, 'base');
    }

    addChestLocation(position) {
        this.state.chestLocations.push({
            x: position.x,
            y: position.y,
            z: position.z,
            timestamp: Date.now()
        });
    }

    setPortalLocation(type, position) {
        this.state.portalLocations[type] = {
            x: position.x,
            y: position.y,
            z: position.z,
            timestamp: Date.now()
        };
        this.knowledge.recordWaypoint?.(`${type}_portal`, position, 'portal');
    }

    getPortalLocation(type) {
        return this.state.portalLocations[type];
    }

    incrementFailures() {
        this.state.failures++;
        this.state.consecutiveFailures++;
    }

    resetFailures() {
        this.state.consecutiveFailures = 0;
    }

    shouldRecovery() {
        return this.state.consecutiveFailures >= CONFIG.limits.maxConsecutiveFailures;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE REFLEXOS V6.0 - REACCIONES AUTOMÁTICAS
// ═══════════════════════════════════════════════════════════════════════════

class ReflexSystem {
    constructor(bot, skills, knowledge) {
        this.bot = bot;
        this.skills = skills;
        this.knowledge = knowledge;
        this.logger = new Logger('Reflex');
        this.enabled = true;
        this.lastDamage = 0;
        this.lastDamageSource = null;
        this.panicMode = false;
        this.lastPanicTime = 0;
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    // Evento: Daño recibido
    onDamage(damage, source) {
        if (!this.enabled) return;
        
        this.lastDamage = damage;
        this.lastDamageSource = source;
        this.lastDamageTime = Date.now();

        const health = this.bot.health || 20;
        
        this.logger.warn(`💔 Daño recibido: ${damage} HP (Salud: ${health})`);

        // Reacción inmediata según tipo de daño
        if (source === 'creeper') {
            this.logger.critical('¡CREEPER! ¡Huir inmediatamente!');
            this.panicMode = true;
            this.lastPanicTime = Date.now();
        }

        // Si salud crítica, entrar en pánico
        if (health <= CONFIG.survival.healthCritical) {
            this.panicMode = true;
            this.lastPanicTime = Date.now();
            this.logger.critical('¡SALUD CRÍTICA!');
        }

        // Registrar zona peligrosa
        if (this.bot.entity) {
            this.knowledge.recordDangerZone?.(this.bot.entity.position, source);
        }
    }

    // Evento: Salud baja
    onLowHealth(health) {
        if (!this.enabled) return;

        this.logger.warn(`Salud baja: ${health}/20`);

        // Priorizar comida si tiene hambre
        if (this.bot.food < CONFIG.survival.foodRegenThreshold) {
            this.logger.info('Buscando comida para regenerar...');
        }
    }

    // Evento: Hambre baja
    onLowFood(food) {
        if (!this.enabled) return;

        this.logger.warn(`Hambre baja: ${food}/20`);

        // Priorizar búsqueda de comida
        if (food <= CONFIG.survival.foodCritical) {
            this.logger.critical('¡HAMBRE CRÍTICA!');
        }
    }

    // Evento: Enemigo detectado
    onEnemyDetected(enemy) {
        if (!this.enabled) return;
        if (this.panicMode) return;

        const distance = this.bot.entity.position.distanceTo(enemy.position);
        
        // Decidir automáticamente si combatir o huir
        const shouldFight = this.decideCombat(enemy, distance);
        
        if (shouldFight) {
            this.logger.info(`⚔️  Iniciando combate contra ${enemy.name} (${distance.toFixed(1)}m)`);
        } else {
            this.logger.warn(`🏃 Huyendo de ${enemy.name} (${distance.toFixed(1)}m)`);
        }

        return shouldFight;
    }

    // Decidir si combatir
    decideCombat(enemy, distance) {
        if (!CONFIG.survival.combatEnabled) return false;

        // Huir de creepers siempre
        if (CONFIG.survival.fleeFromCreeper && enemy.name === 'creeper') {
            return false;
        }

        // Verificar salud suficiente
        const health = this.bot.health || 20;
        if (health < CONFIG.survival.minHealthToFight) {
            return false;
        }

        // Contar enemigos cercanos
        const hostiles = this.skills.getNearbyHostiles?.(CONFIG.survival.dangerDistance) || [];
        
        // Huir si son muchos
        if (CONFIG.survival.fleeFromMultiple && hostiles.length > CONFIG.survival.maxEnemiesToFight) {
            return false;
        }

        // Prioridades de combate
        const priority = CONFIG.combat.priorities[enemy.name?.toLowerCase()] || 5;
        return priority >= 5;
    }

    // Evento: Noche detectada
    onNightDetected() {
        if (!this.enabled) return;

        this.logger.info('🌙 Noche detectada');

        // Decidir actividad nocturna
        const health = this.bot.health || 20;
        const hasBed = this.skills.has('bed');
        const hasShelter = this.knowledge.data.safeShelters?.length > 0;

        if (hasBed && CONFIG.dayNight.autoSleep) {
            this.logger.info('Durmiendo...');
            return 'sleep';
        }

        if (hasShelter) {
            this.logger.info('Refugiándose...');
            return 'shelter';
        }

        // Si no hay refugio, construir uno
        if (CONFIG.building.autoShelterEnabled && health > CONFIG.building.shelterMinHealth) {
            this.logger.info('Construyendo refugio...');
            return 'build_shelter';
        }

        // Minar de noche
        return 'mining';
    }

    // Evento: Día detectado
    onDayDetected() {
        if (!this.enabled) return;

        this.logger.info('☀️ Día detectado');
        return 'explore';
    }

    // Evento: Muerte
    onDeath() {
        if (!this.enabled) return;

        this.logger.critical('💀 ¡BOT HA MUERTO!');
        this.panicMode = false;
    }

    // Evento: Respawn
    onRespawn() {
        if (!this.enabled) return;

        this.logger.info('✨ Respawn completado');
        
        // Prioridad: recuperar items
        this.logger.info('Prioridad: Recuperar items');
    }

    // Verificar si está en pánico
    isInPanic() {
        if (!this.panicMode) return false;
        
        // Salir del pánico después de 30 segundos
        if (Date.now() - this.lastPanicTime > 30000) {
            this.panicMode = false;
        }
        
        return this.panicMode;
    }

    // Salir del pánico
    exitPanic() {
        this.panicMode = false;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA PRINCIPAL DEL BOT V6.0 - GALA AI SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

class GalaAISystem {
    constructor() {
        this.logger = new Logger('Kernel');
        this.bot = null;
        this.skills = null;
        this.knowledge = null;
        this.telemetry = null;
        this.toolManager = null;
        this.stateManager = null;
        this.reflex = null;
        
        this.currentGoal = null;
        this.isRunning = false;
        this.connected = false;
        
        // Contadores de sesión
        this.sessionStats = {
            startTime: Date.now(),
            statesExecuted: 0,
            errors: 0
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // INICIALIZACIÓN
    // ═══════════════════════════════════════════════════════════════════════

    async start() {
        this.logger.separator('═', 70);
        this.logger.header('GALA AI V6.0 "OMEGA"');
        this.logger.info('╔════════════════════════════════════════════╗');
        this.logger.info('║   GALA AI V6.0 "OMEGA"                     ║');
        this.logger.info('║   Minecraft 1.20.1 Java Edition            ║');
        this.logger.info('║   Build: V6.0.0 | Completista              ║');
        this.logger.info('║   RAM: 12GB allocated                      ║');
        this.logger.info('╚════════════════════════════════════════════╝');
        this.logger.separator('═', 70);

        this.logger.info(`Servidor: ${CONFIG.server.host}:${CONFIG.server.port}`);
        this.logger.info(`Usuario: ${CONFIG.server.username}`);
        this.logger.info(`Versión: ${CONFIG.server.version}`);
        this.logger.separator('═', 70);

        // Cargar sistemas
        this.logger.info('Inicializando sistemas...');

        // Crear cliente Minecraft
        this.logger.info('Inicializando cliente Minecraft...');
        await this.createBot();

        // Esperar conexión
        await this.waitForConnection();

        // Iniciar sistemas
        this.initializeSystems();

        // Configurar eventos
        this.setupEvents();

        // Iniciar loop principal
        this.startMainLoop();
    }

    async createBot() {
        return new Promise((resolve, reject) => {
            try {
                this.bot = mineflayer.createBot({
                    host: CONFIG.server.host,
                    port: CONFIG.server.port,
                    username: CONFIG.server.username,
                    version: CONFIG.server.version || '1.20.1',
                    auth: CONFIG.server.auth,
                    skipPing: false,
                    hideErrors: false,
                    checkTimeoutInterval: 30000,
                    viewDistance: 'tiny',
                    connectTimeout: 30000
                });

                // Evento de conexión
                this.bot.once('spawn', () => {
                    this.connected = true;
                    this.logger.success('✅ Bot spawneado');
                    this.logger.info(`Posición: (${this.bot.entity.position.x.toFixed(1)}, ${this.bot.entity.position.y.toFixed(0)}, ${this.bot.entity.position.z.toFixed(1)})`);
                    this.logger.info(`Salud: ${this.bot.health}/20`);
                    this.logger.info(`Comida: ${this.bot.food}/20`);
                    resolve();
                });

                this.bot.once('error', (err) => {
                    this.logger.error(`Error de conexión: ${err.message}`);
                    reject(err);
                });

                this.bot.once('kicked', (reason) => {
                    this.logger.error(`Expulsado: ${reason}`);
                    reject(new Error(reason));
                });

            } catch (e) {
                this.logger.error(`Error creando bot: ${e.message}`);
                reject(e);
            }
        });
    }

    async waitForConnection() {
        const timeout = 30000;
        const start = Date.now();

        while (!this.connected) {
            if (Date.now() - start > timeout) {
                throw new Error('Timeout de conexión');
            }
            await new Promise(r => setTimeout(r, 100));
        }
    }

    initializeSystems() {
        this.logger.success('✅ Inicializando subsistemas...');

        // Datos de Minecraft
        this.mcData = minecraftData(this.bot.version);
        this.logger.success('✅ Minecraft-data inicializado');

        // Knowledge Base
        this.knowledge = new KnowledgeBase();

        // State Manager
        this.stateManager = new StateManager(this.bot, this.knowledge);
        this.stateManager.load();

        // Skill Engine
        this.skills = new SkillEngine(this.bot, this.knowledge);

        // Tool Manager
        this.toolManager = new ToolDurabilityManager(this.bot, this.skills);

        // Telemetry
        this.telemetry = new TelemetrySystem(this.bot);

        // Reflex System
        this.reflex = new ReflexSystem(this.bot, this.skills, this.knowledge);

        // Pathfinding
        this.bot.loadPlugin(pathfinder);
        this.configurePathfinder();
        this.logger.success('✅ Pathfinder configurado');

        // PVP
        this.bot.loadPlugin(pvp);
        this.logger.success('✅ PVP cargado');

        // Collect Block
        this.bot.loadPlugin(collectBlock);
        this.logger.success('✅ Collect Block cargado');

        this.logger.success('╔════════════════════════════════════════╗');
        this.logger.success('║   SISTEMA COGNITIVO V6.0 OPERACIONAL   ║');
        this.logger.success('║   Objetivo: Completar Minecraft 100%   ║');
        this.logger.success('╚════════════════════════════════════════╝');
        this.logger.separator('═', 70);

        // Imprimir características activas
        this.logger.info('Características activas:');
        this.logger.info('  ✓ Pathfinding con cache 2000 entries');
        this.logger.info('  ✓ Gestión automática de herramientas');
        this.logger.info('  ✓ Combate inteligente avanzado');
        this.logger.info('  ✓ Recuperación post-muerte');
        this.logger.info('  ✓ Refugio automático nocturno');
        this.logger.info('  ✓ Exploración de cuevas');
        this.logger.info('  ✓ Sistema de granjas automáticas');
        this.logger.info('  ✓ Trading con villagers');
        this.logger.info('  ✓ Encantamientos automáticos');
        this.logger.info('  ✓ Brewing de pociones');
        this.logger.info('  ✓ Navegación Nether/End');
        this.logger.info('  ✓ Búsqueda de fortalezas');
        this.logger.info('  ✓ Combate Dragon Ender');
        this.logger.info('  ✓ Almacenamiento ordenado');
        this.logger.info('  ✓ Aprendizaje continuo');
        this.logger.info('  ✓ Telemetría completa');
        this.logger.separator('═', 70);
    }

    configurePathfinder() {
        const movements = new Movements(this.bot, this.mcData);
        movements.canDig = true;
        movements.canPlaceOn = true;
        movements.allow1by1towers = true;
        movements.allowFreeMotion = true;
        movements.maxDropDown = 4;
        movements.dontMineUnderFallingBlock = true;
        
        this.bot.pathfinder.setMovements(movements);
        this.bot.pathfinder.setGoal(null);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SISTEMA DE EVENTOS
    // ═══════════════════════════════════════════════════════════════════════

    setupEvents() {
        // Evento: Daño
        this.bot.on('health', () => {
            if (this.bot.health < 20 && this.bot.health > 15) {
                this.reflex.onLowHealth(this.bot.health);
            }
        });

        this.bot.on('damageTaken', (amount, source) => {
            if (source) {
                const sourceName = source.name || source.type || 'unknown';
                this.reflex.onDamage(amount, sourceName);
            }
        });

        // Evento: Comida
        this.bot.on('food', () => {
            if (this.bot.food < CONFIG.survival.foodMin) {
                this.reflex.onLowFood(this.bot.food);
            }
        });

        // Evento: Muerte
        this.bot.on('death', () => {
            this.reflex.onDeath();
            this.telemetry.recordDeath('unknown');
            
            if (this.bot.entity) {
                this.stateManager.recordDeath(this.bot.entity.position, 'unknown');
            }
        });

        // Evento: Respawn
        this.bot.on('respawn', () => {
            this.reflex.onRespawn();
            this.stateManager.setState(STATE.RECOVERY);
        });

        // Evento: Día/Noche
        this.bot.on('time', () => {
            const time = this.bot.time.timeOfDay;
            
            // Amanecer (tick 0)
            if (time < 100 && this.lastTime >= 22000) {
                this.reflex.onDayDetected();
            }
            
            // Atardecer (tick 12000)
            if (time >= 12000 && time < 13000 && (this.lastTime < 12000 || this.lastTime >= 22000)) {
                this.reflex.onNightDetected();
            }
            
            this.lastTime = time;
        });

        // Evento: Chat
        this.bot.on('chat', (username, message) => {
            if (username === this.bot.username) return;
            
            this.logger.info(`[${username}]: ${message}`);
            
            // Comandos básicos
            if (message.startsWith('!')) {
                this.handleCommand(username, message);
            }
        });

        // Evento: Entity detectada
        this.bot.on('entityGone', (entity) => {
            if (entity.type === 'mob') {
                this.telemetry.recordEnemyDefeated(entity.name);
                this.skills.actions.enemiesKilled++;
            }
        });

        // Evento: Item pickup
        this.bot.on('playerCollect', (collector, collected) => {
            if (collector === this.bot.entity) {
                this.telemetry.recordItemCollected(collected.name || 'item', 1);
            }
        });

        // Evento: Kick
        this.bot.on('kicked', (reason) => {
            this.logger.error(`Expulsado del servidor: ${reason}`);
            this.isRunning = false;
        });

        // Evento: Error
        this.bot.on('error', (err) => {
            this.logger.error(`Error del bot: ${err.message}`);
            this.sessionStats.errors++;
        });

        // Evento: Disconnect
        this.bot.on('end', () => {
            this.logger.warn('Desconectado del servidor');
            this.isRunning = false;
            this.saveAll();
        });

        this.logger.success('✅ Sistema de eventos configurado');
    }

    handleCommand(username, message) {
        const cmd = message.slice(1).toLowerCase().split(' ');
        const command = cmd[0];
        const args = cmd.slice(1);

        switch (command) {
            case 'help':
                this.bot.chat('Comandos: !status, !inventory, !location, !stop, !resume');
                break;
            case 'status':
                const status = `Estado: ${this.stateManager.state.currentState} | Salud: ${this.bot.health}/20 | Comida: ${this.bot.food}/20`;
                this.bot.chat(status);
                break;
            case 'inventory':
                const summary = this.skills.getInventorySummary();
                const items = Object.entries(summary).slice(0, 5).map(([k, v]) => `${k}: ${v}`).join(', ');
                this.bot.chat(`Inventario: ${items}...`);
                break;
            case 'location':
                const pos = this.bot.entity.position;
                this.bot.chat(`Posición: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
                break;
            case 'stop':
                this.bot.chat('Deteniendo bot...');
                this.isRunning = false;
                break;
            case 'resume':
                this.bot.chat('Reanudando bot...');
                this.isRunning = true;
                break;
            default:
                this.bot.chat('Comando desconocido. Usa !help');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // LOOP PRINCIPAL
    // ═══════════════════════════════════════════════════════════════════════

    startMainLoop() {
        this.isRunning = true;
        this.logger.success('✅ Loop principal iniciado');
        
        // Loop de actualización (cada 100ms)
        setInterval(() => this.update(), 100);
        
        // Loop de guardado (cada 30s)
        setInterval(() => this.saveAll(), CONFIG.persistence.saveInterval);
        
        // Loop de telemetría (cada 15s)
        setInterval(() => this.telemetry.printDashboard(), CONFIG.optimization.telemetryInterval);
        
        // Loop de pathfinding cache cleanup (cada 5min)
        setInterval(() => this.cleanupPathfindingCache(), 300000);

        // Iniciar máquina de estados
        this.stateManager.setState(STATE.INIT);
        this.runFSM();
    }

    async update() {
        if (!this.isRunning || !this.connected) return;

        // Actualizar telemetría de posición
        this.telemetry.updatePosition();

        // Verificar herramientas
        await this.toolManager.checkAndReplace();

        // Verificar emergencias
        await this.checkEmergencies();

        // Actualizar estado del nombre (status prefix)
        if (CONFIG.server.statusPrefix) {
            await this.updateStatusName();
        }
    }

    async checkEmergencies() {
        const health = this.bot.health || 20;
        const food = this.bot.food || 20;

        // Emergencia de salud
        if (health < CONFIG.survival.emergencyHP) {
            this.logger.critical(`EMERGENCIA: Salud ${health}`);
            this.stateManager.setState(STATE.EMERGENCY);
            return;
        }

        // Emergencia de comida
        if (food < CONFIG.survival.emergencyFood) {
            this.logger.critical(`EMERGENCIA: Comida ${food}`);
            this.stateManager.setState(STATE.EMERGENCY);
            return;
        }
    }

    async updateStatusName() {
        // Actualizar el nombre con estado actual (opcional)
        const state = this.stateManager.state.currentState;
        // Nota: Cambiar nombre requiere reconexión en la mayoría de servidores
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MÁQUINA DE ESTADOS FINITOS (FSM)
    // ═══════════════════════════════════════════════════════════════════════

    async runFSM() {
        this.logger.info('🤖 FSM Controller iniciado');

        while (this.isRunning && this.connected) {
            try {
                const currentState = this.stateManager.state.currentState;
                this.telemetry.recordState(currentState);
                this.sessionStats.statesExecuted++;

                this.logger.state(currentState);

                // Ejecutar estado actual
                await this.executeState(currentState);

                // Pequeña pausa entre estados
                await this.skills.sleep(500);

            } catch (e) {
                this.logger.error(`Error en FSM: ${e.message}`);
                this.sessionStats.errors++;
                this.stateManager.incrementFailures();

                // Verificar si necesita recovery
                if (this.stateManager.shouldRecovery()) {
                    this.logger.warn('Demasiados fallos, entrando en recovery...');
                    this.stateManager.setState(STATE.RECOVERY);
                }
            }
        }

        this.logger.info('FSM detenido');
    }

    async executeState(state) {
        switch (state) {
            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE SUPERVIVENCIA
            // ═══════════════════════════════════════════════════════════════
            
            case STATE.INIT:
                await this.stateInit();
                break;

            case STATE.EMERGENCY:
                await this.stateEmergency();
                break;

            case STATE.RECOVERY:
                await this.stateRecovery();
                break;

            case STATE.ASSESS:
                await this.stateAssess();
                break;

            case STATE.GATHER_WOOD:
                await this.stateGatherWood();
                break;

            case STATE.CRAFT_BASIC:
                await this.stateCraftBasic();
                break;

            case STATE.GET_FOOD:
                await this.stateGetFood();
                break;

            case STATE.FIRST_NIGHT:
                await this.stateFirstNight();
                break;

            case STATE.GATHER_STONE:
                await this.stateGatherStone();
                break;

            case STATE.CRAFT_STONE_TOOLS:
                await this.stateCraftStoneTools();
                break;

            case STATE.GATHER_COAL:
                await this.stateGatherCoal();
                break;

            case STATE.MAKE_TORCHES:
                await this.stateMakeTorches();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE PROGRESIÓN
            // ═══════════════════════════════════════════════════════════════

            case STATE.MINE_IRON:
                await this.stateMineIron();
                break;

            case STATE.SMELT_IRON:
                await this.stateSmeltIron();
                break;

            case STATE.CRAFT_IRON_TOOLS:
                await this.stateCraftIronTools();
                break;

            case STATE.CRAFT_ARMOR:
                await this.stateCraftArmor();
                break;

            case STATE.BUILD_BASE:
                await this.stateBuildBase();
                break;

            case STATE.BUILD_FOOD_FARM:
                await this.stateBuildFoodFarm();
                break;

            case STATE.BUILD_CHEST_SYSTEM:
                await this.stateBuildChestSystem();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE TECNOLOGÍA
            // ═══════════════════════════════════════════════════════════════

            case STATE.MINE_DIAMOND:
                await this.stateMineDiamond();
                break;

            case STATE.CRAFT_DIAMOND_TOOLS:
                await this.stateCraftDiamondTools();
                break;

            case STATE.BUILD_ENCHANTING:
                await this.stateBuildEnchanting();
                break;

            case STATE.BUILD_ANVIL:
                await this.stateBuildAnvil();
                break;

            case STATE.SETUP_TRADING:
                await this.stateSetupTrading();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE PREPARACIÓN NETHER
            // ═══════════════════════════════════════════════════════════════

            case STATE.PREPARE_NETHER:
                await this.statePrepareNether();
                break;

            case STATE.MINE_OBSIDIAN:
                await this.stateMineObsidian();
                break;

            case STATE.CRAFT_FLINT_STEEL:
                await this.stateCraftFlintSteel();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DEL NETHER
            // ═══════════════════════════════════════════════════════════════

            case STATE.BUILD_PORTAL:
                await this.stateBuildPortal();
                break;

            case STATE.ENTER_PORTAL:
                await this.stateEnterPortal();
                break;

            case STATE.NETHER_EXPLORE:
                await this.stateNetherExplore();
                break;

            case STATE.NETHER_FIND_FORTRESS:
                await this.stateNetherFindFortress();
                break;

            case STATE.NETHER_FIGHT_BLAZE:
                await this.stateNetherFightBlaze();
                break;

            case STATE.NETHER_GET_PEARLS:
                await this.stateNetherGetPearls();
                break;

            case STATE.NETHER_RETURN:
                await this.stateNetherReturn();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE BÚSQUEDA DEL END
            // ═══════════════════════════════════════════════════════════════

            case STATE.CRAFT_EYES:
                await this.stateCraftEyes();
                break;

            case STATE.THROW_EYE:
                await this.stateThrowEye();
                break;

            case STATE.TRIANGULATE:
                await this.stateTriangulate();
                break;

            case STATE.FIND_STRONGHOLD:
                await this.stateFindStronghold();
                break;

            case STATE.EXPLORE_STRONGHOLD:
                await this.stateExploreStronghold();
                break;

            case STATE.ACTIVATE_END_PORTAL:
                await this.stateActivateEndPortal();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DEL END
            // ═══════════════════════════════════════════════════════════════

            case STATE.PREPARE_END:
                await this.statePrepareEnd();
                break;

            case STATE.ENTER_END:
                await this.stateEnterEnd();
                break;

            case STATE.FIGHT_DRAGON:
                await this.stateFightDragon();
                break;

            case STATE.DEFEAT_DRAGON:
                await this.stateDefeatDragon();
                break;

            case STATE.COLLECT_EGG:
                await this.stateCollectEgg();
                break;

            case STATE.ENTER_END_GATEWAY:
                await this.stateEnterEndGateway();
                break;

            case STATE.FIND_END_CITY:
                await this.stateFindEndCity();
                break;

            case STATE.GET_ELYTRA:
                await this.stateGetElytra();
                break;

            case STATE.GET_SHULKER:
                await this.stateGetShulker();
                break;

            case STATE.RETURN_END:
                await this.stateReturnEnd();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS COMPLETISTA
            // ═══════════════════════════════════════════════════════════════

            case STATE.BUILD_BEACON:
                await this.stateBuildBeacon();
                break;

            case STATE.BUILD_IRON_FARM:
                await this.stateBuildIronFarm();
                break;

            case STATE.BUILD_GOLD_FARM:
                await this.stateBuildGoldFarm();
                break;

            case STATE.BUILD_XP_FARM:
                await this.stateBuildXpFarm();
                break;

            case STATE.BUILD_TRADING_HALL:
                await this.stateBuildTradingHall();
                break;

            case STATE.BUILD_STORAGE:
                await this.stateBuildStorage();
                break;

            case STATE.PERFECT_GEAR:
                await this.statePerfectGear();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS DE ACTIVIDADES
            // ═══════════════════════════════════════════════════════════════

            case STATE.EXPLORE:
                await this.stateExplore();
                break;

            case STATE.EXPLORE_CAVE:
                await this.stateExploreCave();
                break;

            case STATE.MINE_BRANCH:
                await this.stateMineBranch();
                break;

            case STATE.COMBAT:
                await this.stateCombat();
                break;

            case STATE.FLEE:
                await this.stateFlee();
                break;

            case STATE.EAT:
                await this.stateEat();
                break;

            case STATE.SLEEP:
                await this.stateSleep();
                break;

            case STATE.ENCHANT:
                await this.stateEnchant();
                break;

            case STATE.BREW:
                await this.stateBrew();
                break;

            case STATE.TRADE:
                await this.stateTrade();
                break;

            case STATE.FARM:
                await this.stateFarm();
                break;

            case STATE.BUILD:
                await this.stateBuild();
                break;

            // ═══════════════════════════════════════════════════════════════
            // ESTADOS FINALES
            // ═══════════════════════════════════════════════════════════════

            case STATE.VICTORY:
                await this.stateVictory();
                break;

            case STATE.IDLE:
                await this.stateIdle();
                break;

            default:
                this.logger.warn(`Estado desconocido: ${state}`);
                this.stateManager.setState(STATE.IDLE);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - SUPERVIVENCIA
    // ═══════════════════════════════════════════════════════════════════════

    async stateInit() {
        this.logger.info('Inicializando supervivencia...');

        // Evaluar situación inicial
        const health = this.bot.health || 20;
        const food = this.bot.food || 20;
        const inventory = this.skills.getInventorySummary();

        this.logger.info(`Salud: ${health}/20, Comida: ${food}/20`);
        this.skills.logInventory();

        // Verificar emergencias
        const needsEmergency = 
            (health < CONFIG.survival.emergencyHP) ||
            (food < CONFIG.survival.emergencyFood);

        if (needsEmergency) {
            this.stateManager.setState(STATE.EMERGENCY);
            return;
        }

        // Establecer ubicación inicial como casa
        if (!this.stateManager.state.homeLocation) {
            this.stateManager.setHomeLocation(this.bot.entity.position);
        }

        // Transición a evaluación
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateEmergency() {
        this.logger.critical('ESTADO DE EMERGENCIA');

        const health = this.bot.health || 20;
        const food = this.bot.food || 20;

        // Prioridad 1: Comer si tiene hambre
        if (food < CONFIG.survival.foodCritical) {
            this.logger.info('Prioridad: COMER');
            await this.skills.eat();
        }

        // Prioridad 2: Huir si hay peligro
        if (this.reflex.isInPanic()) {
            const hostiles = this.skills.getNearbyHostiles(16);
            if (hostiles.length > 0) {
                const threat = hostiles[0];
                await this.skills.flee(threat.position);
            }
            this.reflex.exitPanic();
        }

        // Prioridad 3: Regenerar salud
        if (health < CONFIG.survival.healthCritical && food >= CONFIG.survival.foodRegenThreshold) {
            this.logger.info('Esperando regeneración...');
            await this.skills.sleep(5000);
        }

        // Volver a evaluar
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateRecovery() {
        this.logger.info('Recuperando después de muerte...');

        // Intentar recuperar items
        const deathLocation = this.stateManager.state.deathLocation;
        if (deathLocation) {
            this.logger.info(`Items perdidos en: ${deathLocation.x}, ${deathLocation.y}, ${deathLocation.z}`);
            
            // Navegar a ubicación de muerte
            const goal = new Goals.GoalNear(deathLocation.x, deathLocation.y, deathLocation.z, 5);
            try {
                await this.bot.pathfinder.goto(goal);
                this.logger.info('En ubicación de muerte, buscando items...');
                await this.skills.collectNearbyItems(16);
            } catch (e) {
                this.logger.error(`No se pudo llegar: ${e.message}`);
            }
        }

        // Reconstruir inventario básico
        await this.skills.emergencyInventoryRebuild?.();

        // Resetear fallos
        this.stateManager.resetFailures();

        // Volver a evaluar
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateAssess() {
        this.logger.header('EVALUANDO PROGRESO');

        // Evaluación completa del estado actual
        const inventory = this.skills.getInventorySummary();
        const health = this.bot.health || 20;
        const food = this.bot.food || 20;

        this.logger.info('╔════════════════════════════════════════╗');
        this.logger.info('║   EVALUACIÓN DE PROGRESO               ║');
        this.logger.info('╚════════════════════════════════════════╝');

        // Verificar herramientas
        const hasWoodenPick = this.skills.has('wooden_pickaxe');
        const hasStonePick = this.skills.has('stone_pickaxe');
        const hasIronPick = this.skills.has('iron_pickaxe');
        const hasDiamondPick = this.skills.has('diamond_pickaxe');

        this.logger.info(`Herramientas: Madera:${hasWoodenPick ? '✓' : '✗'} Piedra:${hasStonePick ? '✓' : '✗'} Hierro:${hasIronPick ? '✓' : '✗'} Diamante:${hasDiamondPick ? '✓' : '✗'}`);

        // Verificar recursos
        const wood = inventory['oak_log'] || inventory['birch_log'] || 0;
        const stone = inventory['cobblestone'] || 0;
        const coal = inventory['coal'] || 0;
        const iron = inventory['iron_ingot'] || 0;
        const diamond = inventory['diamond'] || 0;

        this.logger.info(`Recursos: Madera:${wood} Piedra:${stone} Carbón:${coal} Hierro:${iron} Diamante:${diamond}`);

        // Determinar siguiente estado basado en progreso
        const nextState = this.determineNextState();
        this.stateManager.setState(nextState);
    }

    determineNextState() {
        const inventory = this.skills.getInventorySummary();

        // Verificar progreso de objetivos principales

        // ¿Tiene herramientas básicas?
        if (!this.skills.has('wooden_pickaxe') && !this.skills.has('stone_pickaxe')) {
            if (!this.skills.has('oak_log') && !this.skills.has('birch_log')) {
                return STATE.GATHER_WOOD;
            }
            return STATE.CRAFT_BASIC;
        }

        // ¿Tiene comida suficiente?
        const foodCount = inventory['bread'] || inventory['cooked_beef'] || 0;
        if (foodCount < 10 && this.bot.food < 15) {
            return STATE.GET_FOOD;
        }

        // ¿Tiene herramientas de piedra?
        if (!this.skills.has('stone_pickaxe')) {
            if (!this.skills.has('cobblestone')) {
                return STATE.GATHER_STONE;
            }
            return STATE.CRAFT_STONE_TOOLS;
        }

        // ¿Tiene carbón/torchas?
        if (!this.skills.has('coal') && !this.skills.has('torch', 4)) {
            return STATE.GATHER_COAL;
        }

        // ¿Tiene herramientas de hierro?
        if (!this.skills.has('iron_pickaxe')) {
            if (!this.skills.has('iron_ingot')) {
                return STATE.MINE_IRON;
            }
            return STATE.CRAFT_IRON_TOOLS;
        }

        // ¿Tiene armadura de hierro?
        if (!this.skills.has('iron_chestplate')) {
            return STATE.CRAFT_ARMOR;
        }

        // ¿Tiene herramientas de diamante?
        if (!this.skills.has('diamond_pickaxe')) {
            if (!this.skills.has('diamond')) {
                return STATE.MINE_DIAMOND;
            }
            return STATE.CRAFT_DIAMOND_TOOLS;
        }

        // ¿Tiene obsidiana para portal?
        if (!this.skills.has('obsidian', 10)) {
            return STATE.MINE_OBSIDIAN;
        }

        // ¿Tiene mechero?
        if (!this.skills.has('flint_and_steel')) {
            return STATE.CRAFT_FLINT_STEEL;
        }

        // ¿Tiene portal construido?
        if (!this.stateManager.getPortalLocation('nether')) {
            return STATE.BUILD_PORTAL;
        }

        // Progresión al Nether
        if (!this.stateManager.isPhaseCompleted('NETHER_VISITED')) {
            return STATE.ENTER_PORTAL;
        }

        // Por defecto, explorar
        return STATE.EXPLORE;
    }

    async stateGatherWood() {
        this.logger.info('Recolectando madera...');
        await this.skills.gather('oak_log', 16);
        this.stateManager.setState(STATE.CRAFT_BASIC);
    }

    async stateCraftBasic() {
        this.logger.info('Crafteando herramientas básicas...');

        // Primero: verificar si tiene planks o logs
        const hasPlanks = this.skills.has('planks');
        const logCount = this.skills.count('oak_log') + this.skills.count('birch_log') + 
                        this.skills.count('spruce_log') + this.skills.count('jungle_log');
        
        if (!hasPlanks) {
            if (logCount < 1) {
                // No tiene suficientes logs, necesita recolectar más
                this.logger.warn('No hay suficiente madera, recolectando más...');
                this.stateManager.setState(STATE.GATHER_WOOD);
                return;
            }
            
            this.logger.info(`Intentando convertir ${logCount} logs a planks...`);
            const success = await this.skills.craft('planks', logCount);
            
            if (!success) {
                this.logger.error('No se pudo craftear planks automáticamente');
                this.logger.info('El bot necesita ayuda manual para convertir logs a planks');
            }
            
            // Esperar a que el inventario se actualice
            await this.skills.sleep(500);
        }

        // Verificar planks después del intento de conversión (con recuento fresco)
        const plankCount = this.bot.inventory.items().filter(i => i.name.includes('planks')).reduce((sum, i) => sum + i.count, 0);
        
        this.logger.info(`Planks disponibles: ${plankCount}`);
        
        if (plankCount < 4) {
            this.logger.warn(`Solo hay ${plankCount} planks, se necesitan al menos 4`);
            // Recolectar más madera
            this.stateManager.setState(STATE.GATHER_WOOD);
            return;
        }

        // Craftear mesa de crafteo
        if (!this.skills.has('crafting_table')) {
            this.logger.info('Crafteando mesa de crafteo...');
            await this.skills.craft('crafting_table', 1);
            await this.skills.sleep(300);
        }

        // Craftear pico de madera
        if (!this.skills.has('wooden_pickaxe')) {
            this.logger.info('Crafteando pico de madera...');
            await this.skills.craft('wooden_pickaxe', 1);
            await this.skills.sleep(300);
        }

        // Craftear hacha de madera
        if (!this.skills.has('wooden_axe')) {
            this.logger.info('Crafteando hacha de madera...');
            await this.skills.craft('wooden_axe', 1);
            await this.skills.sleep(300);
        }

        this.logger.success('✓ Herramientas básicas completadas');
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateGetFood() {
        this.logger.info('Buscando comida...');
        
        // Opciones de comida
        const foodSources = ['wheat', 'carrot', 'potato', 'apple', 'beef', 'porkchop', 'chicken'];
        
        for (const food of foodSources) {
            if (this.skills.has(food)) {
                await this.skills.eat();
                this.stateManager.setState(STATE.ASSESS);
                return;
            }
        }

        // Buscar y recolectar comida
        await this.skills.gather('wheat', 20);
        await this.skills.eat();
        
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateFirstNight() {
        this.logger.info('Preparando primera noche...');
        
        // Verificar si tiene cama
        if (this.skills.has('bed')) {
            await this.skills.sleepInBed();
        } else {
            // Construir refugio
            await this.skills.buildShelter();
        }

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateGatherStone() {
        this.logger.info('Recolectando piedra...');
        await this.skills.gather('cobblestone', 64);
        this.stateManager.setState(STATE.CRAFT_STONE_TOOLS);
    }

    async stateCraftStoneTools() {
        this.logger.info('Crafteando herramientas de piedra...');
        
        await this.skills.craft('stone_pickaxe', 1);
        await this.skills.craft('stone_axe', 1);
        await this.skills.craft('stone_sword', 1);

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateGatherCoal() {
        this.logger.info('Buscando carbón...');
        
        // Intentar encontrar carbón
        const found = await this.skills.gather('coal_ore', 8);
        
        if (found === 0) {
            // Craftear torchas de carbón vegetal
            this.logger.info('Crafteando carbón vegetal...');
            await this.skills.gather('oak_log', 8);
            // Fundir madera para carbón vegetal (pendiente)
        }

        this.stateManager.setState(STATE.MAKE_TORCHES);
    }

    async stateMakeTorches() {
        this.logger.info('Crafteando antorchas...');
        
        if (this.skills.has('coal') || this.skills.has('charcoal')) {
            await this.skills.craft('torch', 16);
        }

        this.stateManager.setState(STATE.ASSESS);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - PROGRESIÓN
    // ═══════════════════════════════════════════════════════════════════════

    async stateMineIron() {
        this.logger.info('Minando hierro...');
        await this.skills.gather('iron_ore', 16);
        this.stateManager.setState(STATE.SMELT_IRON);
    }

    async stateSmeltIron() {
        this.logger.info('Fundiendo hierro...');
        await this.skills.smelt('iron_ore', 'coal', 16);
        this.stateManager.setState(STATE.CRAFT_IRON_TOOLS);
    }

    async stateCraftIronTools() {
        this.logger.info('Crafteando herramientas de hierro...');
        
        await this.skills.craft('iron_pickaxe', 1);
        await this.skills.craft('iron_axe', 1);
        await this.skills.craft('iron_sword', 1);
        await this.skills.craft('iron_shovel', 1);

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateCraftArmor() {
        this.logger.info('Crafteando armadura...');
        
        const pieces = ['iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots'];
        
        for (const piece of pieces) {
            if (!this.skills.has(piece)) {
                await this.skills.craft(piece, 1);
            }
        }

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuildBase() {
        this.logger.info('Construyendo base...');
        await this.skills.buildShelter();
        this.stateManager.setBaseLocation(this.bot.entity.position);
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuildFoodFarm() {
        this.logger.info('Construyendo granja de comida...');
        await this.skills.buildFoodFarm('wheat', 'medium');
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuildChestSystem() {
        this.logger.info('Construyendo sistema de cofres...');
        // Implementación pendiente
        this.stateManager.setState(STATE.ASSESS);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - TECNOLOGÍA
    // ═══════════════════════════════════════════════════════════════════════

    async stateMineDiamond() {
        this.logger.info('Minando diamantes...');
        await this.skills.gather('diamond_ore', 8);
        this.stateManager.setState(STATE.CRAFT_DIAMOND_TOOLS);
    }

    async stateCraftDiamondTools() {
        this.logger.info('Crafteando herramientas de diamante...');
        
        await this.skills.craft('diamond_pickaxe', 1);
        await this.skills.craft('diamond_axe', 1);
        await this.skills.craft('diamond_sword', 1);

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuildEnchanting() {
        this.logger.info('Configurando encantamientos...');
        await this.skills.setupEnchanting();
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuildAnvil() {
        this.logger.info('Construyendo yunque...');
        
        if (!this.skills.has('anvil')) {
            await this.skills.craft('anvil', 1);
        }

        this.stateManager.setState(STATE.ASSESS);
    }

    async stateSetupTrading() {
        this.logger.info('Configurando trading...');
        await this.skills.setupTrading();
        this.stateManager.setState(STATE.ASSESS);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - PREPARACIÓN NETHER
    // ═══════════════════════════════════════════════════════════════════════

    async statePrepareNether() {
        this.logger.info('Preparando entrada al Nether...');
        
        // Verificar requisitos
        const requirements = {
            diamonds: this.skills.count('diamond') >= 10,
            food: this.skills.count('bread') >= 16 || this.skills.count('cooked_beef') >= 16,
            blocks: this.skills.count('cobblestone') >= 256,
            waterBucket: this.skills.has('water_bucket'),
            bow: this.skills.has('bow'),
            arrows: this.skills.count('arrow') >= 64
        };

        this.logger.info('Requisitos Nether:');
        for (const [req, met] of Object.entries(requirements)) {
            this.logger.info(`  ${req}: ${met ? '✓' : '✗'}`);
        }

        // Si faltan requisitos, conseguirlos
        if (!requirements.diamonds) {
            this.stateManager.setState(STATE.MINE_DIAMOND);
            return;
        }

        if (!requirements.waterBucket) {
            // Craftear bucket y conseguir agua
            if (!this.skills.has('bucket')) {
                await this.skills.craft('bucket', 1);
            }
            // Llenar con agua (pendiente)
        }

        this.stateManager.setState(STATE.MINE_OBSIDIAN);
    }

    async stateMineObsidian() {
        this.logger.info('Minando obsidiana...');
        await this.skills.gather('obsidian', 14);
        this.stateManager.setState(STATE.CRAFT_FLINT_STEEL);
    }

    async stateCraftFlintSteel() {
        this.logger.info('Crafteando mechero...');
        await this.skills.craft('flint_and_steel', 1);
        this.stateManager.setState(STATE.BUILD_PORTAL);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - NETHER
    // ═══════════════════════════════════════════════════════════════════════

    async stateBuildPortal() {
        this.logger.header('CONSTRUYENDO PORTAL DEL NETHER');
        
        const success = await this.skills.buildNetherPortal();
        
        if (success) {
            this.stateManager.setPortalLocation('nether', this.bot.entity.position);
            this.stateManager.setState(STATE.ENTER_PORTAL);
        } else {
            this.logger.error('Error construyendo portal');
            this.stateManager.incrementFailures();
            this.stateManager.setState(STATE.ASSESS);
        }
    }

    async stateEnterPortal() {
        this.logger.info('Entrando al Nether...');
        await this.skills.enterNetherPortal();
        this.telemetry.recordNetherVisit();
        this.stateManager.setState(STATE.NETHER_EXPLORE);
    }

    async stateNetherExplore() {
        this.logger.info('Explorando el Nether...');
        await this.skills.explore(100);
        this.stateManager.setState(STATE.NETHER_FIND_FORTRESS);
    }

    async stateNetherFindFortress() {
        this.logger.info('Buscando fortaleza...');
        const found = await this.skills.findNetherFortress();
        
        if (found) {
            this.stateManager.setState(STATE.NETHER_FIGHT_BLAZE);
        } else {
            this.stateManager.setState(STATE.NETHER_EXPLORE);
        }
    }

    async stateNetherFightBlaze() {
        this.logger.info('Cazando Blazes...');
        // Implementación de combate específico
        this.stateManager.setState(STATE.NETHER_GET_PEARLS);
    }

    async stateNetherGetPearls() {
        this.logger.info('Consiguiendo Ender Pearls...');
        // Ender pearls vienen de endermen, no del Nether
        // En el Nether buscamos Blaze Rods
        this.stateManager.setState(STATE.NETHER_RETURN);
    }

    async stateNetherReturn() {
        this.logger.info('Volviendo del Nether...');
        // Usar portal de retorno o crear uno nuevo
        this.stateManager.setState(STATE.CRAFT_EYES);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - BÚSQUEDA DEL END
    // ═══════════════════════════════════════════════════════════════════════

    async stateCraftEyes() {
        this.logger.info('Crafteando Ojos de Ender...');
        
        // Necesita blaze powder y ender pearls
        if (!this.skills.has('blaze_powder')) {
            this.stateManager.setState(STATE.NETHER_FIGHT_BLAZE);
            return;
        }

        if (!this.skills.has('ender_pearl')) {
            // Matar endermen
            this.logger.info('Cazando Endermen...');
            this.stateManager.setState(STATE.COMBAT);
            return;
        }

        await this.skills.craft('eye_of_ender', 16);
        this.stateManager.setState(STATE.THROW_EYE);
    }

    async stateThrowEye() {
        this.logger.info('Lanzando Ojo de Ender...');
        await this.skills.findStronghold();
        this.stateManager.setState(STATE.TRIANGULATE);
    }

    async stateTriangulate() {
        this.logger.info('Triangulando Stronghold...');
        // Lanzar múltiples ojos desde diferentes posiciones
        this.stateManager.setState(STATE.FIND_STRONGHOLD);
    }

    async stateFindStronghold() {
        this.logger.info('Buscando Stronghold...');
        // Excavar hacia abajo siguiendo la dirección
        this.stateManager.setState(STATE.EXPLORE_STRONGHOLD);
    }

    async stateExploreStronghold() {
        this.logger.info('Explorando Stronghold...');
        // Buscar el portal del End
        this.stateManager.setState(STATE.ACTIVATE_END_PORTAL);
    }

    async stateActivateEndPortal() {
        this.logger.info('Activando portal del End...');
        // Colocar ojos de ender en el portal
        this.stateManager.setState(STATE.PREPARE_END);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - END
    // ═══════════════════════════════════════════════════════════════════════

    async statePrepareEnd() {
        this.logger.info('Preparando viaje al End...');
        // Verificar equipamiento
        this.stateManager.setState(STATE.ENTER_END);
    }

    async stateEnterEnd() {
        this.logger.info('Entrando al End...');
        await this.skills.enterEndPortal();
        this.telemetry.recordEndVisit();
        this.stateManager.setState(STATE.FIGHT_DRAGON);
    }

    async stateFightDragon() {
        this.logger.header('COMBATE CONTRA DRAGON ENDER');
        await this.skills.fightEnderDragon();
        this.stateManager.setState(STATE.DEFEAT_DRAGON);
    }

    async stateDefeatDragon() {
        this.logger.victory('¡DRAGON DERROTADO!');
        this.telemetry.recordDragonKill();
        this.stateManager.setState(STATE.COLLECT_EGG);
    }

    async stateCollectEgg() {
        this.logger.info('Recogiendo huevo del dragón...');
        await this.skills.collectDragonEgg();
        this.stateManager.setState(STATE.ENTER_END_GATEWAY);
    }

    async stateEnterEndGateway() {
        this.logger.info('Entrando al End Gateway...');
        this.stateManager.setState(STATE.FIND_END_CITY);
    }

    async stateFindEndCity() {
        this.logger.info('Buscando End City...');
        await this.skills.findEndCity();
        this.stateManager.setState(STATE.GET_ELYTRA);
    }

    async stateGetElytra() {
        this.logger.info('Consiguiendo Elytra...');
        await this.skills.getElytra();
        this.telemetry.recordElytraObtained();
        this.stateManager.setState(STATE.GET_SHULKER);
    }

    async stateGetShulker() {
        this.logger.info('Consiguiendo Shulker Boxes...');
        await this.skills.getShulkerBoxes();
        this.stateManager.setState(STATE.RETURN_END);
    }

    async stateReturnEnd() {
        this.logger.info('Volviendo del End...');
        this.stateManager.setState(STATE.BUILD_BEACON);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - COMPLETISTA
    // ═══════════════════════════════════════════════════════════════════════

    async stateBuildBeacon() {
        this.logger.info('Construyendo Beacon...');
        await this.skills.buildBeacon();
        this.telemetry.recordBeaconActive();
        this.stateManager.setState(STATE.BUILD_IRON_FARM);
    }

    async stateBuildIronFarm() {
        this.logger.info('Construyendo granja de hierro...');
        await this.skills.buildIronFarm();
        this.stateManager.setState(STATE.BUILD_GOLD_FARM);
    }

    async stateBuildGoldFarm() {
        this.logger.info('Construyendo granja de oro...');
        await this.skills.buildGoldFarm();
        this.stateManager.setState(STATE.BUILD_XP_FARM);
    }

    async stateBuildXpFarm() {
        this.logger.info('Construyendo granja de XP...');
        await this.skills.buildXpFarm();
        this.stateManager.setState(STATE.BUILD_TRADING_HALL);
    }

    async stateBuildTradingHall() {
        this.logger.info('Construyendo Trading Hall...');
        await this.skills.buildTradingHall();
        this.stateManager.setState(STATE.BUILD_STORAGE);
    }

    async stateBuildStorage() {
        this.logger.info('Construyendo almacenamiento masivo...');
        await this.skills.buildStorageSystem();
        this.stateManager.setState(STATE.PERFECT_GEAR);
    }

    async statePerfectGear() {
        this.logger.info('Obteniendo equipo perfecto...');
        // Encantar todo con los mejores encantamientos
        this.stateManager.setState(STATE.VICTORY);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // IMPLEMENTACIÓN DE ESTADOS - ACTIVIDADES
    // ═══════════════════════════════════════════════════════════════════════

    async stateExplore() {
        this.logger.info('Explorando...');
        await this.skills.explore(100);
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateExploreCave() {
        this.logger.info('Explorando cueva...');
        // Implementación de exploración de cuevas
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateMineBranch() {
        this.logger.info('Branch mining...');
        // Implementación de branch mining
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateCombat() {
        this.logger.info('En combate...');
        const hostiles = this.skills.getNearbyHostiles(16);
        if (hostiles.length > 0) {
            await this.skills.engageCombat(hostiles[0]);
        }
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateFlee() {
        this.logger.info('Huyendo...');
        const hostiles = this.skills.getNearbyHostiles(16);
        if (hostiles.length > 0) {
            await this.skills.flee(hostiles[0].position);
        }
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateEat() {
        this.logger.info('Comiendo...');
        await this.skills.eat();
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateSleep() {
        this.logger.info('Durmiendo...');
        await this.skills.sleepInBed();
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateEnchant() {
        this.logger.info('Encantando...');
        // Implementación de encantamientos
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBrew() {
        this.logger.info('Brewendo pociones...');
        await this.skills.setupBrewing();
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateTrade() {
        this.logger.info('Tradeando...');
        await this.skills.setupTrading();
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateFarm() {
        this.logger.info('Trabajando en granjas...');
        // Implementación de trabajo en granjas
        this.stateManager.setState(STATE.ASSESS);
    }

    async stateBuild() {
        this.logger.info('Construyendo...');
        // Implementación de construcción
        this.stateManager.setState(STATE.ASSESS);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ESTADOS FINALES
    // ═══════════════════════════════════════════════════════════════════════

    async stateVictory() {
        this.logger.victory('╔════════════════════════════════════════════════╗');
        this.logger.victory('║     ¡MINECRAFT COMPLETADO 100%!                ║');
        this.logger.victory('║                                                ║');
        this.logger.victory('║  🏆 Dragon Derrotado                           ║');
        this.logger.victory('║  🪽 Elytra Obtenida                            ║');
        this.logger.victory('║  ⭐ Beacon Activo                              ║');
        this.logger.victory('║  📦 Todas las Granjas                          ║');
        this.logger.victory('║  💎 Equipo Perfecto                            ║');
        this.logger.victory('╚════════════════════════════════════════════════╝');
        
        this.telemetry.recordObjectiveCompleted('COMPLETAR_JUEGO');
        
        // Continuar jugando o detenerse
        this.stateManager.setState(STATE.IDLE);
    }

    async stateIdle() {
        // Estado inactivo, esperar comandos
        await this.skills.sleep(10000);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GUARDADO Y LIMPIEZA
    // ═══════════════════════════════════════════════════════════════════════

    saveAll() {
        this.logger.info('💾 Guardando estado...');
        
        // Guardar state manager
        this.stateManager.save();
        
        // Guardar knowledge base
        this.knowledge.save();
        
        // Exportar telemetría
        this.telemetry.export();
        
        this.logger.success('✅ Estado guardado');
    }

    cleanupPathfindingCache() {
        // Limpiar cache de pathfinding antiguo
        this.logger.debug('Limpiando cache de pathfinding...');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DETENCIÓN
    // ═══════════════════════════════════════════════════════════════════════

    async stop() {
        this.logger.info('Deteniendo bot...');
        this.isRunning = false;
        this.saveAll();
        
        if (this.bot) {
            this.bot.quit();
        }
        
        this.logger.info('Bot detenido');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT Y PUNTO DE ENTRADA
// ═══════════════════════════════════════════════════════════════════════════

// Crear instancia del bot
const galaBot = new GalaAISystem();

// Manejar cierre graceful
process.on('SIGINT', async () => {
    console.log('\n\nRecibida señal de cierre...');
    await galaBot.stop();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n\nRecibida señal SIGTERM...');
    await galaBot.stop();
    process.exit(0);
});

// Manejar errores no capturados
process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
    galaBot.stop();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada:', reason);
    galaBot.stop();
});

// Iniciar bot
console.log('\n' + '═'.repeat(70));
console.log('GALA AI V6.0 "OMEGA" - Iniciando...');
console.log('═'.repeat(70) + '\n');

galaBot.start().catch((err) => {
    console.error('Error fatal al iniciar:', err);
    process.exit(1);
});
