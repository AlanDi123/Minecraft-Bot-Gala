/**
 * GALA AI V6.1 - Configuración Centralizada
 * @module config/index
 */

export const CONFIG = {
    // =========================================================================
    // CONFIGURACION DEL SERVIDOR
    // =========================================================================
    server: {
        host: process.env.MC_HOST || 'localhost',
        port: parseInt(process.env.MC_PORT) || 51419,
        username: process.env.BOT_NAME || 'Gala_Bot',
        version: process.env.MC_VERSION || '1.20.1',
        auth: process.env.MC_AUTH || 'offline'
    },

    // =========================================================================
    // CONFIGURACION DE MEMORIA Y RENDIMIENTO
    // =========================================================================
    memory: {
        maxHeap: 12288,
        gcThreshold: 0.85,
        cacheSize: 2000,
        backupInterval: 60000
    },

    // =========================================================================
    // CONFIGURACION DE SUPERVIVENCIA
    // =========================================================================
    survival: {
        fleeHealthThreshold: 8,
        buildShelterAtNight: true,
        nightStartTime: 13000,
        healthMin: 14,
        healthCritical: 8,
        healthRegenThreshold: 18,
        emergencyHP: 10,
        emergencyFood: 8,
        foodMin: 14,
        foodCritical: 6,
        foodRegenThreshold: 18,
        dangerDistance: 25,
        safeDistance: 50,
        panicDistance: 40,
        combatEnabled: true,
        fleeFromCreeper: true,
        fleeFromMultiple: true,
        maxEnemiesToFight: 3,
        minHealthToFight: 12,
        autoSleep: true,
        sleepHealthThreshold: 15
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
        retryMaxDelay: 15000
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
        pathfindingCacheSize: 2000,
        cacheExpirationMs: 300000,
        memoryCheckInterval: 30000,
        gcThreshold: 0.85,
        blockSearchRadius: 128,
        maxPathLength: 1000,
        pathRecalculationDistance: 15,
        telemetryInterval: 15000,
        backupInterval: 60000,
        logLevel: process.env.LOG_LEVEL || 'info'
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
            'bow', 'crossbow', 'shield', 'trident',
            'flint_and_steel', 'fishing_rod',
            'bucket', 'water_bucket', 'lava_bucket', 'milk_bucket',
            'torch', 'soul_torch', 'lantern', 'soul_lantern',
            'bed', 'respawn_anchor',
            'compass', 'recovery_compass', 'clock', 'map',
            'ender_pearl', 'eye_of_ender', 'ender_chest',
            'golden_apple', 'enchanted_golden_apple',
            'bread', 'cooked_beef', 'cooked_porkchop', 'golden_carrot',
            'potion', 'splash_potion', 'lingering_potion',
            'totem_of_undying', 'elytra', 'turtle_helmet',
            'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
            'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
            'beacon', 'anvil', 'enchanting_table', 'brewing_stand',
            'end_crystal'
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
            'rotten_flesh', 'spider_eye', 'poisonous_potato'
        ],
        autoStorageItems: [
            'cobblestone', 'dirt', 'gravel', 'sand',
            'oak_log', 'birch_log', 'spruce_log', 'jungle_log',
            'coal', 'iron_ingot', 'gold_ingot', 'diamond',
            'netherite_ingot', 'emerald', 'lapis_lazuli'
        ]
    },

    // =========================================================================
    // CONFIGURACION DE APRENDIZAJE Y PERSISTENCIA
    // =========================================================================
    learning: {
        episodicMemoryFile: './ml_data/episodic_memory.json',
        exploredChunksFile: './ml_data/explored_chunks.json',
        resourceMapFile: './ml_data/resource_map.json',
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
    // CONFIGURACION DE COMBATE
    // =========================================================================
    combat: {
        enabled: true,
        criticalHits: true,
        sprinting: true,
        strafing: true,
        shieldUse: true,
        bowCombat: true,
        priorities: {
            creeper: 10, skeleton: 8, spider: 6, zombie: 5,
            enderman: 7, witch: 9, blaze: 9, ghast: 8,
            piglin: 4, hoglin: 6, wither_skeleton: 10,
            guardian: 7, enderman_end: 3, ender_dragon: 100
        },
        flee: {
            enabled: true,
            healthThreshold: 6,
            multipleEnemies: 4,
            creeperDistance: 10
        }
    },

    // =========================================================================
    // ESTADOS DE LA FSM
    // =========================================================================
    states: {
        INIT: 'INIT',
        EMERGENCY: 'EMERGENCY',
        RECOVERY: 'RECOVERY',
        ASSESS: 'ASSESS',
        GATHER_WOOD: 'GATHER_WOOD',
        CRAFT_BASIC: 'CRAFT_BASIC',
        GET_FOOD: 'GET_FOOD',
        GATHER_STONE: 'GATHER_STONE',
        CRAFT_STONE_TOOLS: 'CRAFT_STONE_TOOLS',
        GATHER_COAL: 'GATHER_COAL',
        MINE_IRON: 'MINE_IRON',
        SMELT_IRON: 'SMELT_IRON',
        CRAFT_IRON_TOOLS: 'CRAFT_IRON_TOOLS',
        CRAFT_ARMOR: 'CRAFT_ARMOR',
        MINE_DIAMOND: 'MINE_DIAMOND',
        CRAFT_DIAMOND_TOOLS: 'CRAFT_DIAMOND_TOOLS',
        MINE_OBSIDIAN: 'MINE_OBSIDIAN',
        CRAFT_FLINT_STEEL: 'CRAFT_FLINT_STEEL',
        BUILD_PORTAL: 'BUILD_PORTAL',
        ENTER_PORTAL: 'ENTER_PORTAL',
        NETHER_EXPLORE: 'NETHER_EXPLORE',
        NETHER_FIND_FORTRESS: 'NETHER_FIND_FORTRESS',
        NETHER_FIGHT_BLAZE: 'NETHER_FIGHT_BLAZE',
        NETHER_GET_PEARLS: 'NETHER_GET_PEARLS',
        NETHER_RETURN: 'NETHER_RETURN',
        CRAFT_EYES: 'CRAFT_EYES',
        THROW_EYE: 'THROW_EYE',
        TRIANGULATE: 'TRIANGULATE',
        FIND_STRONGHOLD: 'FIND_STRONGHOLD',
        EXPLORE_STRONGHOLD: 'EXPLORE_STRONGHOLD',
        ACTIVATE_END_PORTAL: 'ACTIVATE_END_PORTAL',
        PREPARE_END: 'PREPARE_END',
        ENTER_END: 'ENTER_END',
        FIGHT_DRAGON: 'FIGHT_DRAGON',
        DEFEAT_DRAGON: 'DEFEAT_DRAGON',
        COLLECT_EGG: 'COLLECT_EGG',
        ENTER_END_GATEWAY: 'ENTER_END_GATEWAY',
        FIND_END_CITY: 'FIND_END_CITY',
        GET_ELYTRA: 'GET_ELYTRA',
        GET_SHULKER: 'GET_SHULKER',
        RETURN_END: 'RETURN_END',
        BUILD_BEACON: 'BUILD_BEACON',
        BUILD_IRON_FARM: 'BUILD_IRON_FARM',
        BUILD_GOLD_FARM: 'BUILD_GOLD_FARM',
        BUILD_XP_FARM: 'BUILD_XP_FARM',
        BUILD_TRADING_HALL: 'BUILD_TRADING_HALL',
        BUILD_STORAGE: 'BUILD_STORAGE',
        PERFECT_GEAR: 'PERFECT_GEAR',
        EXPLORE: 'EXPLORE',
        EXPLORE_CAVE: 'EXPLORE_CAVE',
        MINE_BRANCH: 'MINE_BRANCH',
        COMBAT: 'COMBAT',
        FLEE: 'FLEE',
        EAT: 'EAT',
        SLEEP: 'SLEEP',
        ENCHANT: 'ENCHANT',
        BREW: 'BREW',
        TRADE: 'TRADE',
        FARM: 'FARM',
        BUILD: 'BUILD',
        VICTORY: 'VICTORY',
        IDLE: 'IDLE'
    },
    // AI planner configuration
    ai: {
        plannerTickInterval: 500,
        scanRadius: 32,
        explorationRadius: 200,
        maxConsecutiveFailures: 3,
        deathRecoveryRadius: 50
    },
    
    // Phase tracking
    phases: {
        current: 1,
        autoAdvance: true
    }
};

export default CONFIG;
