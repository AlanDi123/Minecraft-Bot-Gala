/**
 * Base de Datos Completa de Recetas de Crafteo - Minecraft 1.20.1
 * 
 * Incluye TODAS las recetas de crafteo disponibles en la versión 1.20.1
 * organizadas por categorías y con jerarquía de prioridad de progresión.
 * 
 * @version 1.0.0
 * @author Gala AI Development Team
 */

// ============================================================================
// RECURSOS BÁSICOS (Nivel 0 - Materiales primarios)
// ============================================================================

/**
 * Materiales que se obtienen directamente del entorno (minando, rompiendo, etc.)
 * Estos son los ingredientes base para todo lo demás
 */
export const RAW_MATERIALS = {
    // Madera
    'oak_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'birch_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'spruce_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'jungle_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'acacia_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'dark_oak_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'mangrove_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'cherry_log': { category: 'wood', type: 'raw', tool: 'axe' },
    'crimson_stem': { category: 'wood', type: 'raw', tool: 'axe' },
    'warped_stem': { category: 'wood', type: 'raw', tool: 'axe' },
    
    // Piedras y minerales
    'stone': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'cobblestone': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'granite': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'diorite': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'andesite': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'deepslate': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'cobbled_deepslate': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'tuff': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'calcite': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'dripstone_block': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'pointed_dripstone': { category: 'stone', type: 'raw', tool: 'pickaxe' },
    'amethyst_shard': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'amethyst_block': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'budding_amethyst': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    
    // Minerales valiosos
    'coal': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'charcoal': { category: 'mineral', type: 'smelted', tool: 'none' },
    'iron_ingot': { category: 'mineral', type: 'smelted', tool: 'none' },
    'raw_iron': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'gold_ingot': { category: 'mineral', type: 'smelted', tool: 'none' },
    'raw_gold': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'diamond': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'emerald': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'lapis_lazuli': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'redstone': { category: 'mineral', type: 'raw', tool: 'pickaxe_silk' },
    'quartz': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    'netherite_scrap': { category: 'mineral', type: 'smelted', tool: 'none' },
    'netherite_ingot': { category: 'mineral', type: 'crafted', tool: 'none' },
    'copper_ingot': { category: 'mineral', type: 'smelted', tool: 'none' },
    'raw_copper': { category: 'mineral', type: 'raw', tool: 'pickaxe' },
    
    // Arena y vidrio
    'sand': { category: 'block', type: 'raw', tool: 'shovel' },
    'red_sand': { category: 'block', type: 'raw', tool: 'shovel' },
    'glass': { category: 'block', type: 'smelted', tool: 'none' },
    'glass_bottle': { category: 'item', type: 'crafted', tool: 'none' },
    
    // Otros materiales
    'clay_ball': { category: 'material', type: 'raw', tool: 'shovel' },
    'flint': { category: 'material', type: 'raw', tool: 'shovel' },
    'gunpowder': { category: 'material', type: 'drop', tool: 'none' },
    'string': { category: 'material', type: 'drop', tool: 'none' },
    'spider_eye': { category: 'material', type: 'drop', tool: 'none' },
    'ender_pearl': { category: 'material', type: 'drop', tool: 'none' },
    'blaze_rod': { category: 'material', type: 'drop', tool: 'none' },
    'ghast_tear': { category: 'material', type: 'drop', tool: 'none' },
    'magma_cream': { category: 'material', type: 'drop', tool: 'none' },
    'slime_ball': { category: 'material', type: 'drop', tool: 'none' },
    'ink_sac': { category: 'material', type: 'drop', tool: 'none' },
    'glow_ink_sac': { category: 'material', type: 'drop', tool: 'none' },
    'bone': { category: 'material', type: 'drop', tool: 'none' },
    'rotten_flesh': { category: 'material', type: 'drop', tool: 'none' },
    'leather': { category: 'material', type: 'drop', tool: 'none' },
    'feather': { category: 'material', type: 'drop', tool: 'none' },
    'egg': { category: 'material', type: 'drop', tool: 'none' },
    'milk_bucket': { category: 'material', type: 'obtained', tool: 'none' },
    'water_bucket': { category: 'material', type: 'obtained', tool: 'none' },
    'lava_bucket': { category: 'material', type: 'obtained', tool: 'none' },
    
    // Comida
    'wheat': { category: 'food', type: 'farmed', tool: 'none' },
    'carrot': { category: 'food', type: 'farmed', tool: 'none' },
    'potato': { category: 'food', type: 'farmed', tool: 'none' },
    'beetroot': { category: 'food', type: 'farmed', tool: 'none' },
    'apple': { category: 'food', type: 'obtained', tool: 'none' },
    'melon_slice': { category: 'food', type: 'obtained', tool: 'none' },
    'pumpkin': { category: 'food', type: 'obtained', tool: 'none' },
    'sugar_cane': { category: 'food', type: 'obtained', tool: 'none' },
    'cocoa_beans': { category: 'food', type: 'obtained', tool: 'none' },
    'sweet_berries': { category: 'food', type: 'obtained', tool: 'none' },
    'glow_berries': { category: 'food', type: 'obtained', tool: 'none' },
    'mushroom': { category: 'food', type: 'obtained', tool: 'none' },
    'nether_wart': { category: 'food', type: 'farmed', tool: 'none' },
    
    // Flora
    'flower': { category: 'flora', type: 'obtained', tool: 'none' },
    'sapling': { category: 'flora', type: 'obtained', tool: 'none' },
    'leaves': { category: 'flora', type: 'obtained', tool: 'shears' },
    'grass': { category: 'flora', type: 'obtained', tool: 'shears' },
    'tall_grass': { category: 'flora', type: 'obtained', tool: 'shears' },
    'fern': { category: 'flora', type: 'obtained', tool: 'shears' },
    'cactus': { category: 'flora', type: 'obtained', tool: 'none' },
    'vine': { category: 'flora', type: 'obtained', tool: 'shears' },
    'lily_pad': { category: 'flora', type: 'obtained', tool: 'none' },
    'seagrass': { category: 'flora', type: 'obtained', tool: 'shears' },
    'kelp': { category: 'flora', type: 'obtained', tool: 'shears' },
    'bamboo': { category: 'flora', type: 'obtained', tool: 'none' },
    
    // Nether
    'netherrack': { category: 'nether', type: 'raw', tool: 'pickaxe' },
    'soul_sand': { category: 'nether', type: 'raw', tool: 'shovel' },
    'soul_soil': { category: 'nether', type: 'raw', tool: 'shovel' },
    'basalt': { category: 'nether', type: 'raw', tool: 'pickaxe' },
    'blackstone': { category: 'nether', type: 'raw', tool: 'pickaxe' },
    'ancient_debris': { category: 'nether', type: 'raw', tool: 'diamond_pickaxe' },
    'nether_gold_ore': { category: 'nether', type: 'raw', tool: 'pickaxe' },
    'gilded_blackstone': { category: 'nether', type: 'raw', tool: 'pickaxe' },
    'shroomlight': { category: 'nether', type: 'raw', tool: 'none' },
    'weeping_vines': { category: 'nether', type: 'obtained', tool: 'shears' },
    'twisting_vines': { category: 'nether', type: 'obtained', tool: 'shears' },
    
    // End
    'end_stone': { category: 'end', type: 'raw', tool: 'pickaxe' },
    'chorus_fruit': { category: 'end', type: 'obtained', tool: 'none' },
    'popped_chorus_fruit': { category: 'end', type: 'smelted', tool: 'none' },
    'shulker_shell': { category: 'end', type: 'drop', tool: 'none' },
    'dragon_egg': { category: 'end', type: 'obtained', tool: 'none' },
    'elytra': { category: 'end', type: 'obtained', tool: 'none' },
    
    // Oceano
    'prismarine_shard': { category: 'ocean', type: 'drop', tool: 'none' },
    'prismarine_crystals': { category: 'ocean', type: 'drop', tool: 'none' },
    'nautilus_shell': { category: 'ocean', type: 'drop', tool: 'none' },
    'heart_of_the_sea': { category: 'ocean', type: 'obtained', tool: 'none' },
    'sponge': { category: 'ocean', type: 'obtained', tool: 'none' },
    'wet_sponge': { category: 'ocean', type: 'obtained', tool: 'none' },
    'sandstone': { category: 'ocean', type: 'raw', tool: 'pickaxe' },
    'red_sandstone': { category: 'ocean', type: 'raw', tool: 'pickaxe' },
    'tube_coral': { category: 'ocean', type: 'obtained', tool: 'silk_pickaxe' },
    'brain_coral': { category: 'ocean', type: 'obtained', tool: 'silk_pickaxe' },
    'bubble_coral': { category: 'ocean', type: 'obtained', tool: 'silk_pickaxe' },
    'fire_coral': { category: 'ocean', type: 'obtained', tool: 'silk_pickaxe' },
    'horn_coral': { category: 'ocean', type: 'obtained', tool: 'silk_pickaxe' },
    'sea_pickle': { category: 'ocean', type: 'obtained', tool: 'none' },
    
    // Varios
    'obsidian': { category: 'block', type: 'obtained', tool: 'diamond_pickaxe' },
    'crying_obsidian': { category: 'block', type: 'obtained', tool: 'diamond_pickaxe' },
    'bedrock': { category: 'block', type: 'unbreakable', tool: 'none' },
    'end_portal_frame': { category: 'block', type: 'unbreakable', tool: 'none' },
    'command_block': { category: 'block', type: 'creative', tool: 'none' },
    'structure_block': { category: 'block', type: 'creative', tool: 'none' },
    'barrier': { category: 'block', type: 'creative', tool: 'none' },
    'light': { category: 'block', type: 'creative', tool: 'none' },
    'jigsaw': { category: 'block', type: 'creative', tool: 'none' },
};

// ============================================================================
// RECETAS DE CRAFTING (Nivel 1+)
// ============================================================================

/**
 * TODAS las recetas de crafteo de Minecraft 1.20.1
 * 
 * Formato:
 * - ingredients: lista de ingredientes requeridos
 * - pattern: patrón del crafting table (3x3)
 * - output: resultado del crafteo
 * - category: categoría del item
 * - priority: prioridad de progresión (1-100, menor es más prioritario)
 * - dependencies: items que se necesitan antes de poder craftear esto
 * - tool: herramienta necesaria para obtener los ingredientes
 */
export const CRAFTING_RECIPES = {
    // =========================================================================
    // NIVEL 1: SUPERVIVENCIA BÁSICA (Prioridad 1-10)
    // =========================================================================
    
    // Palos - Base para todo
    'stick': {
        ingredients: { 'any_planks': 2 },
        pattern: [
            ['P', null, null],
            ['P', null, null],
            [null, null, null]
        ],
        output: { item: 'stick', count: 4 },
        category: 'material',
        priority: 1,
        dependencies: ['any_planks'],
        description: 'Palos - Ingrediente básico para herramientas y armas'
    },
    
    // Mesa de crafteo - ESENCIAL
    'crafting_table': {
        ingredients: { 'any_planks': 4 },
        pattern: [
            ['P', 'P', null],
            ['P', 'P', null],
            [null, null, null]
        ],
        output: { item: 'crafting_table', count: 1 },
        category: 'utility',
        priority: 1,
        dependencies: ['any_planks'],
        description: 'Mesa de crafteo - Permite crafteos 3x3'
    },
    
    // Horno - ESENCIAL
    'furnace': {
        ingredients: { 'cobblestone': 8 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', null, 'C'],
            ['C', 'C', 'C']
        ],
        output: { item: 'furnace', count: 1 },
        category: 'utility',
        priority: 2,
        dependencies: ['cobblestone'],
        description: 'Horno - Para fundir minerales y cocinar comida'
    },
    
    // Cuenco - Para comida
    'bowl': {
        ingredients: { 'any_planks': 3 },
        pattern: [
            ['P', null, 'P'],
            [null, 'P', null],
            [null, null, null]
        ],
        output: { item: 'bowl', count: 4 },
        category: 'utility',
        priority: 5,
        dependencies: ['any_planks'],
        description: 'Cuenco - Para sopas y estofados'
    },
    
    // Tablones de madera (todos los tipos)
    'oak_planks': {
        ingredients: { 'oak_log': 1 },
        pattern: [['L']],
        output: { item: 'oak_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['oak_log'],
        description: 'Tablones de roble'
    },
    'birch_planks': {
        ingredients: { 'birch_log': 1 },
        pattern: [['L']],
        output: { item: 'birch_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['birch_log'],
        description: 'Tablones de abedul'
    },
    'spruce_planks': {
        ingredients: { 'spruce_log': 1 },
        pattern: [['L']],
        output: { item: 'spruce_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['spruce_log'],
        description: 'Tablones de pino'
    },
    'jungle_planks': {
        ingredients: { 'jungle_log': 1 },
        pattern: [['L']],
        output: { item: 'jungle_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['jungle_log'],
        description: 'Tablones de jungla'
    },
    'acacia_planks': {
        ingredients: { 'acacia_log': 1 },
        pattern: [['L']],
        output: { item: 'acacia_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['acacia_log'],
        description: 'Tablones de acacia'
    },
    'dark_oak_planks': {
        ingredients: { 'dark_oak_log': 1 },
        pattern: [['L']],
        output: { item: 'dark_oak_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['dark_oak_log'],
        description: 'Tablones de roble oscuro'
    },
    'mangrove_planks': {
        ingredients: { 'mangrove_log': 1 },
        pattern: [['L']],
        output: { item: 'mangrove_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['mangrove_log'],
        description: 'Tablones de mangle'
    },
    'cherry_planks': {
        ingredients: { 'cherry_log': 1 },
        pattern: [['L']],
        output: { item: 'cherry_planks', count: 4 },
        category: 'building',
        priority: 1,
        dependencies: ['cherry_log'],
        description: 'Tablones de cerezo'
    },
    'bamboo_planks': {
        ingredients: { 'bamboo_block': 1 },
        pattern: [['B']],
        output: { item: 'bamboo_planks', count: 2 },
        category: 'building',
        priority: 2,
        dependencies: ['bamboo_block'],
        description: 'Tablones de bambú'
    },
    'crimson_planks': {
        ingredients: { 'crimson_stem': 1 },
        pattern: [['S']],
        output: { item: 'crimson_planks', count: 4 },
        category: 'building',
        priority: 2,
        dependencies: ['crimson_stem'],
        description: 'Tablones carmesí (Nether)'
    },
    'warped_planks': {
        ingredients: { 'warped_stem': 1 },
        pattern: [['S']],
        output: { item: 'warped_planks', count: 4 },
        category: 'building',
        priority: 2,
        dependencies: ['warped_stem'],
        description: 'Tablones distorsionados (Nether)'
    },
    
    // Bloques de madera completa
    'oak_wood': {
        ingredients: { 'oak_log': 4 },
        pattern: [
            ['L', 'L', null],
            ['L', 'L', null],
            [null, null, null]
        ],
        output: { item: 'oak_wood', count: 3 },
        category: 'building',
        priority: 10,
        dependencies: ['oak_log'],
        description: 'Bloque de madera de roble (textura completa)'
    },
    
    // Lana
    'white_wool': {
        ingredients: { 'string': 4 },
        pattern: [
            ['S', 'S', null],
            ['S', 'S', null],
            [null, null, null]
        ],
        output: { item: 'white_wool', count: 1 },
        category: 'building',
        priority: 8,
        dependencies: ['string'],
        description: 'Lana blanca - Para camas y decoración'
    },
    
    // Cama (todas las colores)
    'white_bed': {
        ingredients: { 'white_wool': 3, 'any_planks': 3 },
        pattern: [
            ['W', 'W', 'W'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'white_bed', count: 1 },
        category: 'utility',
        priority: 6,
        dependencies: ['white_wool', 'any_planks'],
        description: 'Cama blanca - Para dormir y establecer spawn'
    },
    
    // Antorcha
    'torch': {
        ingredients: { 'coal': 1, 'stick': 1 },
        pattern: [
            ['C', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'torch', count: 4 },
        category: 'utility',
        priority: 4,
        dependencies: ['coal', 'stick'],
        description: 'Antorcha - Iluminación básica'
    },
    'soul_torch': {
        ingredients: { 'coal': 1, 'stick': 1, 'soul_sand': 1 },
        pattern: [
            ['C', null, null],
            ['S', null, null],
            ['B', null, null]
        ],
        output: { item: 'soul_torch', count: 4 },
        category: 'utility',
        priority: 5,
        dependencies: ['coal', 'stick', 'soul_sand'],
        description: 'Antorcha de almas - Iluminación azul del Nether'
    },
    
    // Linterna
    'lantern': {
        ingredients: { 'torch': 1, 'iron_nugget': 8 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'T', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'lantern', count: 1 },
        category: 'utility',
        priority: 7,
        dependencies: ['torch', 'iron_nugget'],
        description: 'Linterna - Iluminación decorativa'
    },
    
    // Escaleras de madera
    'oak_stairs': {
        ingredients: { 'oak_planks': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'oak_stairs', count: 4 },
        category: 'building',
        priority: 15,
        dependencies: ['oak_planks'],
        description: 'Escaleras de roble'
    },
    
    // Losas de madera
    'oak_slab': {
        ingredients: { 'oak_planks': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'oak_slab', count: 6 },
        category: 'building',
        priority: 15,
        dependencies: ['oak_planks'],
        description: 'Losas de roble'
    },
    
    // Valla
    'oak_fence': {
        ingredients: { 'oak_planks': 4, 'stick': 2 },
        pattern: [
            ['P', 'S', 'P'],
            ['P', 'S', 'P'],
            [null, null, null]
        ],
        output: { item: 'oak_fence', count: 3 },
        category: 'building',
        priority: 12,
        dependencies: ['oak_planks', 'stick'],
        description: 'Valla de roble'
    },
    
    // Puerta de madera
    'oak_door': {
        ingredients: { 'oak_planks': 6 },
        pattern: [
            ['P', 'P', null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'oak_door', count: 3 },
        category: 'building',
        priority: 10,
        dependencies: ['oak_planks'],
        description: 'Puerta de roble'
    },
    
    // Trampilla de madera
    'oak_trapdoor': {
        ingredients: { 'oak_planks': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'oak_trapdoor', count: 2 },
        category: 'building',
        priority: 10,
        dependencies: ['oak_planks'],
        description: 'Trampilla de roble'
    },
    
    // Botón de madera
    'oak_button': {
        ingredients: { 'oak_planks': 1 },
        pattern: [['P']],
        output: { item: 'oak_button', count: 1 },
        category: 'redstone',
        priority: 20,
        dependencies: ['oak_planks'],
        description: 'Botón de madera - Redstone'
    },
    
    // Placa de presión de madera
    'oak_pressure_plate': {
        ingredients: { 'oak_planks': 2 },
        pattern: [
            ['P', 'P', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'oak_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 20,
        dependencies: ['oak_planks'],
        description: 'Placa de presión de madera'
    },
    
    // Comedor
    'composter': {
        ingredients: { 'any_slab': 3, 'any_planks': 4 },
        pattern: [
            ['P', null, 'P'],
            ['P', null, 'P'],
            ['S', 'S', 'S']
        ],
        output: { item: 'composter', count: 1 },
        category: 'utility',
        priority: 15,
        dependencies: ['any_slab', 'any_planks'],
        description: 'Comedor - Produce bonemeal'
    },
    
    // Barril
    'barrel': {
        ingredients: { 'any_planks': 6, 'any_slab': 2 },
        pattern: [
            ['S', 'P', 'S'],
            ['P', 'P', 'P'],
            ['S', 'P', 'S']
        ],
        output: { item: 'barrel', count: 1 },
        category: 'utility',
        priority: 12,
        dependencies: ['any_planks', 'any_slab'],
        description: 'Barril - Almacenamiento'
    },
    
    // Andamio
    'scaffolding': {
        ingredients: { 'bamboo': 6, 'string': 1 },
        pattern: [
            ['B', 'S', 'B'],
            ['B', null, 'B'],
            ['B', null, 'B']
        ],
        output: { item: 'scaffolding', count: 6 },
        category: 'building',
        priority: 18,
        dependencies: ['bamboo', 'string'],
        description: 'Andamio - Para construir en altura'
    },
    
    // Ladder
    'ladder': {
        ingredients: { 'stick': 7 },
        pattern: [
            ['S', null, 'S'],
            ['S', 'S', 'S'],
            ['S', null, 'S']
        ],
        output: { item: 'ladder', count: 3 },
        category: 'building',
        priority: 10,
        dependencies: ['stick'],
        description: 'Escalera de mano'
    },
    
    // Cartel
    'oak_sign': {
        ingredients: { 'oak_planks': 6, 'stick': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, 'S', null]
        ],
        output: { item: 'oak_sign', count: 3 },
        category: 'utility',
        priority: 15,
        dependencies: ['oak_planks', 'stick'],
        description: 'Cartel de roble'
    },
    
    // Libro
    'book': {
        ingredients: { 'paper': 3, 'leather': 1 },
        pattern: [
            [null, 'P', null],
            ['P', 'P', null],
            ['L', null, null]
        ],
        output: { item: 'book', count: 1 },
        category: 'material',
        priority: 20,
        dependencies: ['paper', 'leather'],
        description: 'Libro - Para estanterías y encantamientos'
    },
    
    // Papel
    'paper': {
        ingredients: { 'sugar_cane': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'paper', count: 3 },
        category: 'material',
        priority: 15,
        dependencies: ['sugar_cane'],
        description: 'Papel - Para libros y mapas'
    },
    
    // Libro y pluma
    'writable_book': {
        ingredients: { 'book': 1, 'ink_sac': 1, 'feather': 1 },
        pattern: [
            [null, 'B', null],
            [null, 'I', null],
            [null, 'F', null]
        ],
        output: { item: 'writable_book', count: 1 },
        category: 'utility',
        priority: 25,
        dependencies: ['book', 'ink_sac', 'feather'],
        description: 'Libro y pluma - Para escribir'
    },
    
    // Mapa
    'map': {
        ingredients: { 'paper': 8, 'compass': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'C', 'P'],
            ['P', 'P', 'P']
        ],
        output: { item: 'map', count: 1 },
        category: 'utility',
        priority: 30,
        dependencies: ['paper', 'compass'],
        description: 'Mapa - Para explorar'
    },
    
    // Brújula
    'compass': {
        ingredients: { 'iron_ingot': 4, 'redstone': 1 },
        pattern: [
            [null, 'I', null],
            ['I', 'R', 'I'],
            [null, 'I', null]
        ],
        output: { item: 'compass', count: 1 },
        category: 'utility',
        priority: 25,
        dependencies: ['iron_ingot', 'redstone'],
        description: 'Brújula - Apunta al spawn'
    },
    
    // Reloj
    'clock': {
        ingredients: { 'gold_ingot': 4, 'redstone': 1 },
        pattern: [
            [null, 'G', null],
            ['G', 'R', 'G'],
            [null, 'G', null]
        ],
        output: { item: 'clock', count: 1 },
        category: 'utility',
        priority: 25,
        dependencies: ['gold_ingot', 'redstone'],
        description: 'Reloj - Muestra la hora del día'
    },
    
    // Cubo
    'bucket': {
        ingredients: { 'iron_ingot': 3 },
        pattern: [
            ['I', null, 'I'],
            [null, 'I', null],
            [null, null, null]
        ],
        output: { item: 'bucket', count: 1 },
        category: 'utility',
        priority: 8,
        dependencies: ['iron_ingot'],
        description: 'Cubo - Para líquidos'
    },
    
    // Minecart
    'minecart': {
        ingredients: { 'iron_ingot': 5 },
        pattern: [
            ['I', null, 'I'],
            ['I', 'I', 'I'],
            [null, null, null]
        ],
        output: { item: 'minecart', count: 1 },
        category: 'transportation',
        priority: 25,
        dependencies: ['iron_ingot'],
        description: 'Vagoneta - Transporte en raíles'
    },
    
    // Raíl
    'rail': {
        ingredients: { 'iron_ingot': 6, 'stick': 1 },
        pattern: [
            ['I', null, 'I'],
            ['I', 'S', 'I'],
            ['I', null, 'I']
        ],
        output: { item: 'rail', count: 16 },
        category: 'transportation',
        priority: 26,
        dependencies: ['iron_ingot', 'stick'],
        description: 'Raíl - Para vagonetas'
    },
    
    // Raíl propulsor
    'powered_rail': {
        ingredients: { 'gold_ingot': 6, 'stick': 1, 'redstone': 1 },
        pattern: [
            ['G', null, 'G'],
            ['G', 'S', 'G'],
            ['R', null, 'R']
        ],
        output: { item: 'powered_rail', count: 6 },
        category: 'transportation',
        priority: 30,
        dependencies: ['gold_ingot', 'stick', 'redstone'],
        description: 'Raíl propulsor - Impulsa vagonetas'
    },
    
    // Raíl detector
    'detector_rail': {
        ingredients: { 'iron_ingot': 6, 'stone_pressure_plate': 1, 'redstone': 1 },
        pattern: [
            ['I', null, 'I'],
            ['I', 'P', 'I'],
            ['I', 'R', 'I']
        ],
        output: { item: 'detector_rail', count: 6 },
        category: 'transportation',
        priority: 30,
        dependencies: ['iron_ingot', 'stone_pressure_plate', 'redstone'],
        description: 'Raíl detector - Detecta vagonetas'
    },
    
    // Raíl activador
    'activator_rail': {
        ingredients: { 'iron_ingot': 6, 'stick': 2, 'redstone_torch': 1 },
        pattern: [
            ['I', 'S', 'I'],
            ['I', 'T', 'I'],
            ['I', 'S', 'I']
        ],
        output: { item: 'activator_rail', count: 6 },
        category: 'transportation',
        priority: 30,
        dependencies: ['iron_ingot', 'stick', 'redstone_torch'],
        description: 'Raíl activador - Activa vagonetas'
    },
    
    // Barco
    'oak_boat': {
        ingredients: { 'oak_planks': 5 },
        pattern: [
            ['P', null, 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'oak_boat', count: 1 },
        category: 'transportation',
        priority: 20,
        dependencies: ['oak_planks'],
        description: 'Barco de roble - Transporte acuático'
    },
    
    // Barco con cofre
    'oak_chest_boat': {
        ingredients: { 'oak_boat': 1, 'chest': 1 },
        pattern: [
            [null, 'C', null],
            [null, 'B', null],
            [null, null, null]
        ],
        output: { item: 'oak_chest_boat', count: 1 },
        category: 'transportation',
        priority: 22,
        dependencies: ['oak_boat', 'chest'],
        description: 'Barco con cofre - Transporte acuático con almacenamiento'
    },
    
    // Balsa
    'bamboo_raft': {
        ingredients: { 'bamboo': 5 },
        pattern: [
            ['B', null, 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'bamboo_raft', count: 1 },
        category: 'transportation',
        priority: 20,
        dependencies: ['bamboo'],
        description: 'Balsa de bambú - Transporte acuático'
    },
    
    // ============================================================================
    // NIVEL 2: HERRAMIENTAS Y ARMAS (Prioridad 11-20)
    // ============================================================================
    
    // Picos
    'wooden_pickaxe': {
        ingredients: { 'any_planks': 3, 'stick': 2 },
        pattern: [
            ['P', 'P', 'P'],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'wooden_pickaxe', count: 1 },
        category: 'tool',
        priority: 10,
        dependencies: ['any_planks', 'stick', 'crafting_table'],
        description: 'Pico de madera - Minar piedra, carbón, hierro'
    },
    'stone_pickaxe': {
        ingredients: { 'cobblestone': 3, 'stick': 2 },
        pattern: [
            ['C', 'C', 'C'],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'stone_pickaxe', count: 1 },
        category: 'tool',
        priority: 11,
        dependencies: ['cobblestone', 'stick', 'crafting_table'],
        description: 'Pico de piedra - Minar hierro, oro, redstone'
    },
    'iron_pickaxe': {
        ingredients: { 'iron_ingot': 3, 'stick': 2 },
        pattern: [
            ['I', 'I', 'I'],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'iron_pickaxe', count: 1 },
        category: 'tool',
        priority: 15,
        dependencies: ['iron_ingot', 'stick', 'crafting_table'],
        description: 'Pico de hierro - Minar oro, redstone, diamante'
    },
    'golden_pickaxe': {
        ingredients: { 'gold_ingot': 3, 'stick': 2 },
        pattern: [
            ['G', 'G', 'G'],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'golden_pickaxe', count: 1 },
        category: 'tool',
        priority: 50,
        dependencies: ['gold_ingot', 'stick', 'crafting_table'],
        description: 'Pico de oro - Minar rápido, poca durabilidad'
    },
    'diamond_pickaxe': {
        ingredients: { 'diamond': 3, 'stick': 2 },
        pattern: [
            ['D', 'D', 'D'],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'diamond_pickaxe', count: 1 },
        category: 'tool',
        priority: 20,
        dependencies: ['diamond', 'stick', 'crafting_table'],
        description: 'Pico de diamante - Minar obsidiana, ancient debris'
    },
    'netherite_pickaxe': {
        ingredients: { 'diamond_pickaxe': 1, 'netherite_ingot': 1 },
        pattern: [
            ['D', null, null],
            ['N', null, null],
            [null, null, null]
        ],
        output: { item: 'netherite_pickaxe', count: 1 },
        category: 'tool',
        priority: 100,
        dependencies: ['diamond_pickaxe', 'netherite_ingot', 'smithing_table'],
        description: 'Pico de netherite - Máxima durabilidad y eficiencia'
    },
    
    // Hachas
    'wooden_axe': {
        ingredients: { 'any_planks': 3, 'stick': 2 },
        pattern: [
            ['P', 'P', null],
            ['P', 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'wooden_axe', count: 1 },
        category: 'tool',
        priority: 10,
        dependencies: ['any_planks', 'stick', 'crafting_table'],
        description: 'Hacha de madera - Cortar árboles rápido'
    },
    'stone_axe': {
        ingredients: { 'cobblestone': 3, 'stick': 2 },
        pattern: [
            ['C', 'C', null],
            ['C', 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'stone_axe', count: 1 },
        category: 'tool',
        priority: 11,
        dependencies: ['cobblestone', 'stick', 'crafting_table'],
        description: 'Hacha de piedra'
    },
    'iron_axe': {
        ingredients: { 'iron_ingot': 3, 'stick': 2 },
        pattern: [
            ['I', 'I', null],
            ['I', 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'iron_axe', count: 1 },
        category: 'tool',
        priority: 15,
        dependencies: ['iron_ingot', 'stick', 'crafting_table'],
        description: 'Hacha de hierro'
    },
    'golden_axe': {
        ingredients: { 'gold_ingot': 3, 'stick': 2 },
        pattern: [
            ['G', 'G', null],
            ['G', 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'golden_axe', count: 1 },
        category: 'tool',
        priority: 50,
        dependencies: ['gold_ingot', 'stick', 'crafting_table'],
        description: 'Hacha de oro'
    },
    'diamond_axe': {
        ingredients: { 'diamond': 3, 'stick': 2 },
        pattern: [
            ['D', 'D', null],
            ['D', 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'diamond_axe', count: 1 },
        category: 'tool',
        priority: 20,
        dependencies: ['diamond', 'stick', 'crafting_table'],
        description: 'Hacha de diamante'
    },
    'netherite_axe': {
        ingredients: { 'diamond_axe': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_axe', count: 1 },
        category: 'tool',
        priority: 100,
        dependencies: ['diamond_axe', 'netherite_ingot', 'smithing_table'],
        description: 'Hacha de netherite'
    },
    
    // Palas
    'wooden_shovel': {
        ingredients: { 'any_planks': 1, 'stick': 2 },
        pattern: [
            [null, 'P', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'wooden_shovel', count: 1 },
        category: 'tool',
        priority: 10,
        dependencies: ['any_planks', 'stick', 'crafting_table'],
        description: 'Pala de madera - Cavar tierra, arena, grava'
    },
    'stone_shovel': {
        ingredients: { 'cobblestone': 1, 'stick': 2 },
        pattern: [
            [null, 'C', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'stone_shovel', count: 1 },
        category: 'tool',
        priority: 11,
        dependencies: ['cobblestone', 'stick', 'crafting_table'],
        description: 'Pala de piedra'
    },
    'iron_shovel': {
        ingredients: { 'iron_ingot': 1, 'stick': 2 },
        pattern: [
            [null, 'I', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'iron_shovel', count: 1 },
        category: 'tool',
        priority: 15,
        dependencies: ['iron_ingot', 'stick', 'crafting_table'],
        description: 'Pala de hierro'
    },
    'golden_shovel': {
        ingredients: { 'gold_ingot': 1, 'stick': 2 },
        pattern: [
            [null, 'G', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'golden_shovel', count: 1 },
        category: 'tool',
        priority: 50,
        dependencies: ['gold_ingot', 'stick', 'crafting_table'],
        description: 'Pala de oro'
    },
    'diamond_shovel': {
        ingredients: { 'diamond': 1, 'stick': 2 },
        pattern: [
            [null, 'D', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'diamond_shovel', count: 1 },
        category: 'tool',
        priority: 20,
        dependencies: ['diamond', 'stick', 'crafting_table'],
        description: 'Pala de diamante'
    },
    'netherite_shovel': {
        ingredients: { 'diamond_shovel': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_shovel', count: 1 },
        category: 'tool',
        priority: 100,
        dependencies: ['diamond_shovel', 'netherite_ingot', 'smithing_table'],
        description: 'Pala de netherite'
    },
    
    // Azadas
    'wooden_hoe': {
        ingredients: { 'any_planks': 2, 'stick': 2 },
        pattern: [
            ['P', 'P', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'wooden_hoe', count: 1 },
        category: 'tool',
        priority: 12,
        dependencies: ['any_planks', 'stick', 'crafting_table'],
        description: 'Azada de madera - Arar tierra para farming'
    },
    'stone_hoe': {
        ingredients: { 'cobblestone': 2, 'stick': 2 },
        pattern: [
            ['C', 'C', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'stone_hoe', count: 1 },
        category: 'tool',
        priority: 13,
        dependencies: ['cobblestone', 'stick', 'crafting_table'],
        description: 'Azada de piedra'
    },
    'iron_hoe': {
        ingredients: { 'iron_ingot': 2, 'stick': 2 },
        pattern: [
            ['I', 'I', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'iron_hoe', count: 1 },
        category: 'tool',
        priority: 16,
        dependencies: ['iron_ingot', 'stick', 'crafting_table'],
        description: 'Azada de hierro'
    },
    'golden_hoe': {
        ingredients: { 'gold_ingot': 2, 'stick': 2 },
        pattern: [
            ['G', 'G', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'golden_hoe', count: 1 },
        category: 'tool',
        priority: 50,
        dependencies: ['gold_ingot', 'stick', 'crafting_table'],
        description: 'Azada de oro'
    },
    'diamond_hoe': {
        ingredients: { 'diamond': 2, 'stick': 2 },
        pattern: [
            ['D', 'D', null],
            [null, 'S', null],
            [null, 'S', null]
        ],
        output: { item: 'diamond_hoe', count: 1 },
        category: 'tool',
        priority: 21,
        dependencies: ['diamond', 'stick', 'crafting_table'],
        description: 'Azada de diamante'
    },
    'netherite_hoe': {
        ingredients: { 'diamond_hoe': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_hoe', count: 1 },
        category: 'tool',
        priority: 100,
        dependencies: ['diamond_hoe', 'netherite_ingot', 'smithing_table'],
        description: 'Azada de netherite'
    },
    
    // Espadas
    'wooden_sword': {
        ingredients: { 'any_planks': 2, 'stick': 1 },
        pattern: [
            [null, 'P', null],
            [null, 'P', null],
            [null, 'S', null]
        ],
        output: { item: 'wooden_sword', count: 1 },
        category: 'weapon',
        priority: 10,
        dependencies: ['any_planks', 'stick', 'crafting_table'],
        description: 'Espada de madera - Combate básico'
    },
    'stone_sword': {
        ingredients: { 'cobblestone': 2, 'stick': 1 },
        pattern: [
            [null, 'C', null],
            [null, 'C', null],
            [null, 'S', null]
        ],
        output: { item: 'stone_sword', count: 1 },
        category: 'weapon',
        priority: 11,
        dependencies: ['cobblestone', 'stick', 'crafting_table'],
        description: 'Espada de piedra'
    },
    'iron_sword': {
        ingredients: { 'iron_ingot': 2, 'stick': 1 },
        pattern: [
            [null, 'I', null],
            [null, 'I', null],
            [null, 'S', null]
        ],
        output: { item: 'iron_sword', count: 1 },
        category: 'weapon',
        priority: 15,
        dependencies: ['iron_ingot', 'stick', 'crafting_table'],
        description: 'Espada de hierro'
    },
    'golden_sword': {
        ingredients: { 'gold_ingot': 2, 'stick': 1 },
        pattern: [
            [null, 'G', null],
            [null, 'G', null],
            [null, 'S', null]
        ],
        output: { item: 'golden_sword', count: 1 },
        category: 'weapon',
        priority: 50,
        dependencies: ['gold_ingot', 'stick', 'crafting_table'],
        description: 'Espada de oro'
    },
    'diamond_sword': {
        ingredients: { 'diamond': 2, 'stick': 1 },
        pattern: [
            [null, 'D', null],
            [null, 'D', null],
            [null, 'S', null]
        ],
        output: { item: 'diamond_sword', count: 1 },
        category: 'weapon',
        priority: 20,
        dependencies: ['diamond', 'stick', 'crafting_table'],
        description: 'Espada de diamante'
    },
    'netherite_sword': {
        ingredients: { 'diamond_sword': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_sword', count: 1 },
        category: 'weapon',
        priority: 100,
        dependencies: ['diamond_sword', 'netherite_ingot', 'smithing_table'],
        description: 'Espada de netherite - Máximo daño'
    },
    
    // ============================================================================
    // NIVEL 3: ARMADURA (Prioridad 21-30)
    // ============================================================================
    
    // Armadura de cuero
    'leather_helmet': {
        ingredients: { 'leather': 5 },
        pattern: [
            ['L', 'L', 'L'],
            ['L', null, 'L'],
            [null, null, null]
        ],
        output: { item: 'leather_helmet', count: 1 },
        category: 'armor',
        priority: 21,
        dependencies: ['leather', 'crafting_table'],
        description: 'Casco de cuero - Protección básica'
    },
    'leather_chestplate': {
        ingredients: { 'leather': 8 },
        pattern: [
            ['L', null, 'L'],
            ['L', 'L', 'L'],
            ['L', 'L', 'L']
        ],
        output: { item: 'leather_chestplate', count: 1 },
        category: 'armor',
        priority: 21,
        dependencies: ['leather', 'crafting_table'],
        description: 'Peto de cuero'
    },
    'leather_leggings': {
        ingredients: { 'leather': 7 },
        pattern: [
            ['L', 'L', 'L'],
            ['L', null, 'L'],
            ['L', null, 'L']
        ],
        output: { item: 'leather_leggings', count: 1 },
        category: 'armor',
        priority: 21,
        dependencies: ['leather', 'crafting_table'],
        description: 'Pantalones de cuero'
    },
    'leather_boots': {
        ingredients: { 'leather': 4 },
        pattern: [
            ['L', null, 'L'],
            ['L', null, 'L'],
            [null, null, null]
        ],
        output: { item: 'leather_boots', count: 1 },
        category: 'armor',
        priority: 21,
        dependencies: ['leather', 'crafting_table'],
        description: 'Botas de cuero'
    },
    
    // Armadura de cadena (no crafteable en survival, solo trading/loot)
    'chainmail_helmet': {
        ingredients: { 'iron_bars': 5 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', null, 'I'],
            [null, null, null]
        ],
        output: { item: 'chainmail_helmet', count: 1 },
        category: 'armor',
        priority: 60,
        dependencies: ['iron_bars'],
        description: 'Casco de cadena - Solo trading/loot',
        obtainable: 'trading_loot'
    },
    
    // Armadura de hierro
    'iron_helmet': {
        ingredients: { 'iron_ingot': 5 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', null, 'I'],
            [null, null, null]
        ],
        output: { item: 'iron_helmet', count: 1 },
        category: 'armor',
        priority: 25,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Casco de hierro - Buena protección'
    },
    'iron_chestplate': {
        ingredients: { 'iron_ingot': 8 },
        pattern: [
            ['I', null, 'I'],
            ['I', 'I', 'I'],
            ['I', 'I', 'I']
        ],
        output: { item: 'iron_chestplate', count: 1 },
        category: 'armor',
        priority: 25,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Peto de hierro'
    },
    'iron_leggings': {
        ingredients: { 'iron_ingot': 7 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', null, 'I'],
            ['I', null, 'I']
        ],
        output: { item: 'iron_leggings', count: 1 },
        category: 'armor',
        priority: 25,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Pantalones de hierro'
    },
    'iron_boots': {
        ingredients: { 'iron_ingot': 4 },
        pattern: [
            ['I', null, 'I'],
            ['I', null, 'I'],
            [null, null, null]
        ],
        output: { item: 'iron_boots', count: 1 },
        category: 'armor',
        priority: 25,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Botas de hierro'
    },
    
    // Armadura de oro
    'golden_helmet': {
        ingredients: { 'gold_ingot': 5 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', null, 'G'],
            [null, null, null]
        ],
        output: { item: 'golden_helmet', count: 1 },
        category: 'armor',
        priority: 55,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Casco de oro - Piglins neutrales'
    },
    'golden_chestplate': {
        ingredients: { 'gold_ingot': 8 },
        pattern: [
            ['G', null, 'G'],
            ['G', 'G', 'G'],
            ['G', 'G', 'G']
        ],
        output: { item: 'golden_chestplate', count: 1 },
        category: 'armor',
        priority: 55,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Peto de oro'
    },
    'golden_leggings': {
        ingredients: { 'gold_ingot': 7 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', null, 'G'],
            ['G', null, 'G']
        ],
        output: { item: 'golden_leggings', count: 1 },
        category: 'armor',
        priority: 55,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Pantalones de oro'
    },
    'golden_boots': {
        ingredients: { 'gold_ingot': 4 },
        pattern: [
            ['G', null, 'G'],
            ['G', null, 'G'],
            [null, null, null]
        ],
        output: { item: 'golden_boots', count: 1 },
        category: 'armor',
        priority: 55,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Botas de oro'
    },
    
    // Armadura de diamante
    'diamond_helmet': {
        ingredients: { 'diamond': 5 },
        pattern: [
            ['D', 'D', 'D'],
            ['D', null, 'D'],
            [null, null, null]
        ],
        output: { item: 'diamond_helmet', count: 1 },
        category: 'armor',
        priority: 30,
        dependencies: ['diamond', 'crafting_table'],
        description: 'Casco de diamante - Excelente protección'
    },
    'diamond_chestplate': {
        ingredients: { 'diamond': 8 },
        pattern: [
            ['D', null, 'D'],
            ['D', 'D', 'D'],
            ['D', 'D', 'D']
        ],
        output: { item: 'diamond_chestplate', count: 1 },
        category: 'armor',
        priority: 30,
        dependencies: ['diamond', 'crafting_table'],
        description: 'Peto de diamante'
    },
    'diamond_leggings': {
        ingredients: { 'diamond': 7 },
        pattern: [
            ['D', 'D', 'D'],
            ['D', null, 'D'],
            ['D', null, 'D']
        ],
        output: { item: 'diamond_leggings', count: 1 },
        category: 'armor',
        priority: 30,
        dependencies: ['diamond', 'crafting_table'],
        description: 'Pantalones de diamante'
    },
    'diamond_boots': {
        ingredients: { 'diamond': 4 },
        pattern: [
            ['D', null, 'D'],
            ['D', null, 'D'],
            [null, null, null]
        ],
        output: { item: 'diamond_boots', count: 1 },
        category: 'armor',
        priority: 30,
        dependencies: ['diamond', 'crafting_table'],
        description: 'Botas de diamante'
    },
    
    // Armadura de netherite
    'netherite_helmet': {
        ingredients: { 'diamond_helmet': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_helmet', count: 1 },
        category: 'armor',
        priority: 100,
        dependencies: ['diamond_helmet', 'netherite_ingot', 'smithing_table'],
        description: 'Casco de netherite - Máxima protección'
    },
    'netherite_chestplate': {
        ingredients: { 'diamond_chestplate': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_chestplate', count: 1 },
        category: 'armor',
        priority: 100,
        dependencies: ['diamond_chestplate', 'netherite_ingot', 'smithing_table'],
        description: 'Peto de netherite'
    },
    'netherite_leggings': {
        ingredients: { 'diamond_leggings': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_leggings', count: 1 },
        category: 'armor',
        priority: 100,
        dependencies: ['diamond_leggings', 'netherite_ingot', 'smithing_table'],
        description: 'Pantalones de netherite'
    },
    'netherite_boots': {
        ingredients: { 'diamond_boots': 1, 'netherite_ingot': 1 },
        pattern: [['D'], ['N']],
        output: { item: 'netherite_boots', count: 1 },
        category: 'armor',
        priority: 100,
        dependencies: ['diamond_boots', 'netherite_ingot', 'smithing_table'],
        description: 'Botas de netherite'
    },
    
    // Caparazón de tortuga
    'turtle_helmet': {
        ingredients: { 'scute': 5 },
        pattern: [
            ['S', null, 'S'],
            ['S', 'S', 'S'],
            [null, null, null]
        ],
        output: { item: 'turtle_helmet', count: 1 },
        category: 'armor',
        priority: 35,
        dependencies: ['scute', 'crafting_table'],
        description: 'Caparazón de tortuga - Respiración水下'
    },
    
    // Elytra (no crafteable, solo End Cities)
    'elytra': {
        ingredients: {},
        pattern: [],
        output: { item: 'elytra', count: 1 },
        category: 'armor',
        priority: 90,
        dependencies: [],
        description: 'Elytra - Vuelo',
        obtainable: 'end_city'
    },
    
    // Escudo
    'shield': {
        ingredients: { 'any_planks': 6, 'iron_ingot': 1 },
        pattern: [
            ['P', 'I', 'P'],
            ['P', 'P', 'P'],
            [null, 'P', null]
        ],
        output: { item: 'shield', count: 1 },
        category: 'combat',
        priority: 25,
        dependencies: ['any_planks', 'iron_ingot', 'crafting_table'],
        description: 'Escudo - Bloquea ataques'
    },
    
    // Arco
    'bow': {
        ingredients: { 'stick': 3, 'string': 3 },
        pattern: [
            [null, 'S', 'T'],
            ['S', null, 'T'],
            [null, 'S', 'T']
        ],
        output: { item: 'bow', count: 1 },
        category: 'weapon',
        priority: 25,
        dependencies: ['stick', 'string', 'crafting_table'],
        description: 'Arco - Ataque a distancia'
    },
    
    // Ballesta
    'crossbow': {
        ingredients: { 'stick': 3, 'iron_ingot': 1, 'string': 2, 'tripwire_hook': 1 },
        pattern: [
            ['S', 'T', 'S'],
            ['I', 'S', null],
            [null, null, 'T']
        ],
        output: { item: 'crossbow', count: 1 },
        category: 'weapon',
        priority: 35,
        dependencies: ['stick', 'iron_ingot', 'string', 'tripwire_hook', 'crafting_table'],
        description: 'Ballesta - Ataque a distancia potente'
    },
    
    // Flecha
    'arrow': {
        ingredients: { 'flint': 1, 'stick': 1, 'feather': 1 },
        pattern: [
            [null, 'F', null],
            [null, 'S', null],
            [null, 'E', null]
        ],
        output: { item: 'arrow', count: 4 },
        category: 'ammunition',
        priority: 26,
        dependencies: ['flint', 'stick', 'feather', 'crafting_table'],
        description: 'Flecha - Munición para arco'
    },
    
    // Flecha espectral
    'spectral_arrow': {
        ingredients: { 'arrow': 4, 'glowstone_dust': 1 },
        pattern: [
            [null, 'G', null],
            ['A', 'A', 'A'],
            [null, 'A', null]
        ],
        output: { item: 'spectral_arrow', count: 2 },
        category: 'ammunition',
        priority: 40,
        dependencies: ['arrow', 'glowstone_dust', 'crafting_table'],
        description: 'Flecha espectral - Brilla en entidades'
    },
    
    // Maza (1.20.1 no tiene, es 1.21+)
    // Nota: La maza no existe en 1.20.1, se añade en 1.21
    
    // ============================================================================
    // NIVEL 4: UTILIDADES Y REDSTONE (Prioridad 31-50)
    // ============================================================================
    
    // Cofre
    'chest': {
        ingredients: { 'any_planks': 8 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', null, 'P'],
            ['P', 'P', 'P']
        ],
        output: { item: 'chest', count: 1 },
        category: 'utility',
        priority: 8,
        dependencies: ['any_planks', 'crafting_table'],
        description: 'Cofre - Almacenamiento básico'
    },
    
    // Cofre atrapado
    'trapped_chest': {
        ingredients: { 'chest': 1, 'tripwire_hook': 1 },
        pattern: [
            [null, 'T', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'trapped_chest', count: 1 },
        category: 'redstone',
        priority: 40,
        dependencies: ['chest', 'tripwire_hook', 'crafting_table'],
        description: 'Cofre atrapado - Emite señal redstone'
    },
    
    // Barril (ya definido arriba)
    
    // Shulker Box
    'shulker_box': {
        ingredients: { 'shulker_shell': 2, 'chest': 1 },
        pattern: [
            [null, 'S', null],
            ['S', 'C', 'S'],
            [null, 'S', null]
        ],
        output: { item: 'shulker_box', count: 1 },
        category: 'utility',
        priority: 70,
        dependencies: ['shulker_shell', 'chest', 'crafting_table'],
        description: 'Shulker Box - Almacenamiento portátil'
    },
    
    // Ender Chest
    'ender_chest': {
        ingredients: { 'obsidian': 8, 'eye_of_ender': 1 },
        pattern: [
            ['O', 'O', 'O'],
            ['O', 'E', 'O'],
            ['O', 'O', 'O']
        ],
        output: { item: 'ender_chest', count: 1 },
        category: 'utility',
        priority: 60,
        dependencies: ['obsidian', 'eye_of_ender', 'crafting_table'],
        description: 'Ender Chest - Almacenamiento dimensional'
    },
    
    // Horno (ya definido arriba)
    
    // Horno de humo
    'smoker': {
        ingredients: { 'furnace': 1, 'any_log': 4 },
        pattern: [
            [null, 'L', null],
            ['L', 'F', 'L'],
            [null, 'L', null]
        ],
        output: { item: 'smoker', count: 1 },
        category: 'utility',
        priority: 30,
        dependencies: ['furnace', 'any_log', 'crafting_table'],
        description: 'Horno de humo - Cocina comida rápido'
    },
    
    // Alto horno
    'blast_furnace': {
        ingredients: { 'furnace': 1, 'iron_ingot': 3, 'smooth_stone': 3 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', 'F', 'I'],
            ['S', 'S', 'S']
        ],
        output: { item: 'blast_furnace', count: 1 },
        category: 'utility',
        priority: 35,
        dependencies: ['furnace', 'iron_ingot', 'smooth_stone', 'crafting_table'],
        description: 'Alto horno - Funde minerales rápido'
    },
    
    // Hoguera
    'campfire': {
        ingredients: { 'stick': 3, 'any_log': 3, 'coal': 1 },
        pattern: [
            [null, 'S', null],
            ['S', 'C', 'S'],
            ['L', 'L', 'L']
        ],
        output: { item: 'campfire', count: 1 },
        category: 'utility',
        priority: 25,
        dependencies: ['stick', 'any_log', 'coal', 'crafting_table'],
        description: 'Hoguera - Cocina comida y da luz'
    },
    
    // Hoguera de almas
    'soul_campfire': {
        ingredients: { 'stick': 3, 'any_log': 3, 'soul_sand': 1 },
        pattern: [
            [null, 'S', null],
            ['S', 'B', 'S'],
            ['L', 'L', 'L']
        ],
        output: { item: 'soul_campfire', count: 1 },
        category: 'utility',
        priority: 30,
        dependencies: ['stick', 'any_log', 'soul_sand', 'crafting_table'],
        description: 'Hoguera de almas - Ahuyenta piglins'
    },
    
    // Mesa de encantamientos
    'enchanting_table': {
        ingredients: { 'book': 1, 'diamond': 2, 'obsidian': 4 },
        pattern: [
            [null, 'B', null],
            ['D', 'O', 'D'],
            ['O', 'O', 'O']
        ],
        output: { item: 'enchanting_table', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['book', 'diamond', 'obsidian', 'crafting_table'],
        description: 'Mesa de encantamientos - Encanta items'
    },
    
    // Estantería
    'bookshelf': {
        ingredients: { 'any_planks': 6, 'book': 3 },
        pattern: [
            ['P', 'P', 'P'],
            ['B', 'B', 'B'],
            ['P', 'P', 'P']
        ],
        output: { item: 'bookshelf', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['any_planks', 'book', 'crafting_table'],
        description: 'Estantería - Para encantamientos y decoración'
    },
    
    // Estantería tallada
    'chiseled_bookshelf': {
        ingredients: { 'any_planks': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', null, 'P'],
            ['P', 'P', 'P']
        ],
        output: { item: 'chiseled_bookshelf', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['any_planks', 'crafting_table'],
        description: 'Estantería tallada - Almacena libros'
    },
    
    // Yunque
    'anvil': {
        ingredients: { 'iron_block': 3, 'iron_ingot': 4 },
        pattern: [
            ['I', 'I', 'I'],
            [null, null, 'I'],
            ['I', 'I', 'I']
        ],
        output: { item: 'anvil', count: 1 },
        category: 'utility',
        priority: 45,
        dependencies: ['iron_block', 'iron_ingot', 'crafting_table'],
        description: 'Yunque - Repara y combina items'
    },
    
    // Piedra de afilar
    'grindstone': {
        ingredients: { 'stick': 2, 'stone_slab': 1, 'any_planks': 2 },
        pattern: [
            ['S', 'P', 'S'],
            ['P', null, 'P'],
            [null, null, null]
        ],
        output: { item: 'grindstone', count: 1 },
        category: 'utility',
        priority: 35,
        dependencies: ['stick', 'stone_slab', 'any_planks', 'crafting_table'],
        description: 'Piedra de afilar - Quita encantamientos'
    },
    
    // Mesa de smithing
    'smithing_table': {
        ingredients: { 'any_planks': 4, 'iron_ingot': 2 },
        pattern: [
            ['I', 'I', null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'smithing_table', count: 1 },
        category: 'utility',
        priority: 35,
        dependencies: ['any_planks', 'iron_ingot', 'crafting_table'],
        description: 'Mesa de smithing - Mejora a netherite'
    },
    
    // Mesa de cartografía
    'cartography_table': {
        ingredients: { 'any_planks': 4, 'paper': 2 },
        pattern: [
            ['P', 'P', null],
            ['W', 'W', null],
            ['W', 'W', null]
        ],
        output: { item: 'cartography_table', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['any_planks', 'paper', 'crafting_table'],
        description: 'Mesa de cartografía - Modifica mapas'
    },
    
    // Mesa de fletching
    'fletching_table': {
        ingredients: { 'any_planks': 4, 'flint': 2 },
        pattern: [
            ['F', 'F', null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'fletching_table', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['any_planks', 'flint', 'crafting_table'],
        description: 'Mesa de fletching - Para flecheros'
    },
    
    // Telar
    'loom': {
        ingredients: { 'any_planks': 2, 'string': 2 },
        pattern: [
            ['S', 'S', null],
            ['P', null, null],
            ['P', null, null]
        ],
        output: { item: 'loom', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['any_planks', 'string', 'crafting_table'],
        description: 'Telar - Diseña banners'
    },
    
    // Atril
    'lectern': {
        ingredients: { 'any_slab': 1, 'bookshelf': 1 },
        pattern: [
            [null, 'S', null],
            [null, 'B', null],
            [null, null, null]
        ],
        output: { item: 'lectern', count: 1 },
        category: 'utility',
        priority: 45,
        dependencies: ['any_slab', 'bookshelf', 'crafting_table'],
        description: 'Atril - Lee libros'
    },
    
    // Farol
    'lantern': {
        ingredients: { 'torch': 1, 'iron_nugget': 8 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'T', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'lantern', count: 1 },
        category: 'utility',
        priority: 25,
        dependencies: ['torch', 'iron_nugget', 'crafting_table'],
        description: 'Farol - Iluminación decorativa'
    },
    
    // Farol de almas
    'soul_lantern': {
        ingredients: { 'soul_torch': 1, 'iron_nugget': 8 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'T', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'soul_lantern', count: 1 },
        category: 'utility',
        priority: 30,
        dependencies: ['soul_torch', 'iron_nugget', 'crafting_table'],
        description: 'Farol de almas - Ahuyenta piglins'
    },
    
    // Maceta
    'flower_pot': {
        ingredients: { 'brick': 3 },
        pattern: [
            ['B', null, 'B'],
            [null, 'B', null],
            [null, null, null]
        ],
        output: { item: 'flower_pot', count: 1 },
        category: 'utility',
        priority: 35,
        dependencies: ['brick', 'crafting_table'],
        description: 'Maceta - Para plantas'
    },
    
    // Marco
    'item_frame': {
        ingredients: { 'stick': 8, 'leather': 1 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'L', 'S'],
            ['S', 'S', 'S']
        ],
        output: { item: 'item_frame', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['stick', 'leather', 'crafting_table'],
        description: 'Marco - Muestra items'
    },
    
    // Marco brillante
    'glow_item_frame': {
        ingredients: { 'item_frame': 1, 'glow_ink_sac': 1 },
        pattern: [
            [null, 'G', null],
            [null, 'F', null],
            [null, null, null]
        ],
        output: { item: 'glow_item_frame', count: 1 },
        category: 'utility',
        priority: 45,
        dependencies: ['item_frame', 'glow_ink_sac', 'crafting_table'],
        description: 'Marco brillante - Brilla en la oscuridad'
    },
    
    // Cuadro
    'painting': {
        ingredients: { 'stick': 8, 'white_wool': 1 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'W', 'S'],
            ['S', 'S', 'S']
        ],
        output: { item: 'painting', count: 1 },
        category: 'utility',
        priority: 35,
        dependencies: ['stick', 'white_wool', 'crafting_table'],
        description: 'Cuadro - Decoración'
    },
    
    // Soporte de armaduras
    'armor_stand': {
        ingredients: { 'stick': 6, 'smooth_stone_slab': 1 },
        pattern: [
            [null, 'S', null],
            ['S', 'S', 'S'],
            ['S', null, 'S']
        ],
        output: { item: 'armor_stand', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['stick', 'smooth_stone_slab', 'crafting_table'],
        description: 'Soporte de armaduras - Muestra armaduras'
    },
    
    // Soporte de pociones
    'brewing_stand': {
        ingredients: { 'blaze_rod': 1, 'cobblestone': 3 },
        pattern: [
            [null, 'B', null],
            ['C', 'C', 'C'],
            [null, null, null]
        ],
        output: { item: 'brewing_stand', count: 1 },
        category: 'utility',
        priority: 45,
        dependencies: ['blaze_rod', 'cobblestone', 'crafting_table'],
        description: 'Soporte de pociones - Brew potions'
    },
    
    // Caldero
    'cauldron': {
        ingredients: { 'iron_ingot': 7 },
        pattern: [
            ['I', null, 'I'],
            ['I', null, 'I'],
            ['I', 'I', 'I']
        ],
        output: { item: 'cauldron', count: 1 },
        category: 'utility',
        priority: 40,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Caldero - Contiene líquidos'
    },
    
    // Hopper
    'hopper': {
        ingredients: { 'iron_ingot': 5, 'chest': 1 },
        pattern: [
            ['I', null, 'I'],
            ['I', 'C', 'I'],
            [null, 'I', null]
        ],
        output: { item: 'hopper', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['iron_ingot', 'chest', 'crafting_table'],
        description: 'Hopper - Transfiere items'
    },
    
    // Dropper
    'dropper': {
        ingredients: { 'cobblestone': 8, 'redstone': 1 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'R', 'C'],
            ['C', 'C', 'C']
        ],
        output: { item: 'dropper', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['cobblestone', 'redstone', 'crafting_table'],
        description: 'Dropper - Dispensa items'
    },
    
    // Dispenser
    'dispenser': {
        ingredients: { 'cobblestone': 7, 'bow': 1, 'redstone': 1 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'B', 'C'],
            ['C', 'R', 'C']
        ],
        output: { item: 'dispenser', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['cobblestone', 'bow', 'redstone', 'crafting_table'],
        description: 'Dispenser - Dispensa items'
    },
    
    // Observador
    'observer': {
        ingredients: { 'cobblestone': 6, 'redstone': 1, 'quartz': 1 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'R', 'Q'],
            ['C', 'C', 'C']
        ],
        output: { item: 'observer', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['cobblestone', 'redstone', 'quartz', 'crafting_table'],
        description: 'Observador - Detecta cambios'
    },
    
    // Pistón
    'piston': {
        ingredients: { 'any_planks': 3, 'cobblestone': 4, 'iron_ingot': 1, 'redstone': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['C', 'I', 'C'],
            ['C', 'R', 'C']
        ],
        output: { item: 'piston', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['any_planks', 'cobblestone', 'iron_ingot', 'redstone', 'crafting_table'],
        description: 'Pistón - Empuja bloques'
    },
    
    // Pistón pegajoso
    'sticky_piston': {
        ingredients: { 'slime_ball': 1, 'piston': 1 },
        pattern: [
            ['S', null, null],
            ['P', null, null],
            [null, null, null]
        ],
        output: { item: 'sticky_piston', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['slime_ball', 'piston', 'crafting_table'],
        description: 'Pistón pegajoso - Empuja y tira bloques'
    },
    
    // Antorcha de redstone
    'redstone_torch': {
        ingredients: { 'redstone': 1, 'stick': 1 },
        pattern: [
            ['R', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'redstone_torch', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['redstone', 'stick', 'crafting_table'],
        description: 'Antorcha de redstone - Fuente de energía'
    },
    
    // Repetidor
    'repeater': {
        ingredients: { 'redstone_torch': 2, 'redstone': 1, 'stone': 3 },
        pattern: [
            [null, null, null],
            ['T', 'R', 'T'],
            ['S', 'S', 'S']
        ],
        output: { item: 'repeater', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['redstone_torch', 'redstone', 'stone', 'crafting_table'],
        description: 'Repetidor - Retrasa señal redstone'
    },
    
    // Comparador
    'comparator': {
        ingredients: { 'redstone_torch': 3, 'quartz': 1, 'stone': 3 },
        pattern: [
            [null, 'T', null],
            ['T', 'Q', 'T'],
            ['S', 'S', 'S']
        ],
        output: { item: 'comparator', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['redstone_torch', 'quartz', 'stone', 'crafting_table'],
        description: 'Comparador - Compara señales redstone'
    },
    
    // Día detector
    'daylight_detector': {
        ingredients: { 'glass': 3, 'quartz': 3, 'any_slab': 3 },
        pattern: [
            ['G', 'G', 'G'],
            ['Q', 'Q', 'Q'],
            ['S', 'S', 'S']
        ],
        output: { item: 'daylight_detector', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['glass', 'quartz', 'any_slab', 'crafting_table'],
        description: 'Detector de día - Emite señal con luz'
    },
    
    // Target
    'target': {
        ingredients: { 'redstone': 1, 'hay_block': 1 },
        pattern: [
            [null, 'R', null],
            [null, 'H', null],
            [null, null, null]
        ],
        output: { item: 'target', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['redstone', 'hay_block', 'crafting_table'],
        description: 'Target - Emite señal con proyectiles'
    },
    
    // Nota bloque
    'note_block': {
        ingredients: { 'any_planks': 8, 'redstone': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'R', 'P'],
            ['P', 'P', 'P']
        ],
        output: { item: 'note_block', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['any_planks', 'redstone', 'crafting_table'],
        description: 'Nota bloque - Emite sonidos'
    },
    
    // Jukebox
    'jukebox': {
        ingredients: { 'any_planks': 8, 'diamond': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'D', 'P'],
            ['P', 'P', 'P']
        ],
        output: { item: 'jukebox', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: ['any_planks', 'diamond', 'crafting_table'],
        description: 'Jukebox - Reproduce discos'
    },
    
    // Lámpara de redstone
    'redstone_lamp': {
        ingredients: { 'redstone': 4, 'glowstone': 1 },
        pattern: [
            [null, 'R', null],
            ['R', 'G', 'R'],
            [null, 'R', null]
        ],
        output: { item: 'redstone_lamp', count: 1 },
        category: 'redstone',
        priority: 45,
        dependencies: ['redstone', 'glowstone', 'crafting_table'],
        description: 'Lámpara de redstone - Luz controlada'
    },
    
    // TNT
    'tnt': {
        ingredients: { 'gunpowder': 5, 'sand': 4 },
        pattern: [
            ['G', 'S', 'G'],
            ['S', 'G', 'S'],
            ['G', 'S', 'G']
        ],
        output: { item: 'tnt', count: 1 },
        category: 'combat',
        priority: 50,
        dependencies: ['gunpowder', 'sand', 'crafting_table'],
        description: 'TNT - Explosivo'
    },
    
    // Palanca
    'lever': {
        ingredients: { 'stick': 1, 'cobblestone': 1 },
        pattern: [
            [null, 'S', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'lever', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['stick', 'cobblestone', 'crafting_table'],
        description: 'Palanca - Interruptor redstone'
    },
    
    // Botón de piedra
    'stone_button': {
        ingredients: { 'stone': 1 },
        pattern: [['S']],
        output: { item: 'stone_button', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['stone', 'crafting_table'],
        description: 'Botón de piedra - Interruptor temporal'
    },
    
    // Botón de madera
    'wooden_button': {
        ingredients: { 'any_planks': 1 },
        pattern: [['P']],
        output: { item: 'wooden_button', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['any_planks', 'crafting_table'],
        description: 'Botón de madera'
    },
    
    // Placa de presión de piedra
    'stone_pressure_plate': {
        ingredients: { 'stone': 2 },
        pattern: [
            ['S', 'S', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'stone_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['stone', 'crafting_table'],
        description: 'Placa de presión de piedra'
    },
    
    // Placa de presión de madera
    'wooden_pressure_plate': {
        ingredients: { 'any_planks': 2 },
        pattern: [
            ['P', 'P', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'wooden_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 35,
        dependencies: ['any_planks', 'crafting_table'],
        description: 'Placa de presión de madera'
    },
    
    // Placa de presión ligera
    'light_weighted_pressure_plate': {
        ingredients: { 'gold_ingot': 2 },
        pattern: [
            ['G', 'G', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'light_weighted_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Placa de presión ligera - Oro'
    },
    
    // Placa de presión pesada
    'heavy_weighted_pressure_plate': {
        ingredients: { 'iron_ingot': 2 },
        pattern: [
            ['I', 'I', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'heavy_weighted_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Placa de presión pesada - Hierro'
    },
    
    // Gancho de tripwire
    'tripwire_hook': {
        ingredients: { 'iron_ingot': 1, 'stick': 1, 'any_planks': 1 },
        pattern: [
            ['I', null, null],
            ['S', null, null],
            ['P', null, null]
        ],
        output: { item: 'tripwire_hook', count: 2 },
        category: 'redstone',
        priority: 40,
        dependencies: ['iron_ingot', 'stick', 'any_planks', 'crafting_table'],
        description: 'Gancho de tripwire - Trampas'
    },
    
    // Raíl (ya definido arriba)
    
    // Vagoneta con cofre
    'chest_minecart': {
        ingredients: { 'minecart': 1, 'chest': 1 },
        pattern: [
            [null, 'C', null],
            [null, 'M', null],
            [null, null, null]
        ],
        output: { item: 'chest_minecart', count: 1 },
        category: 'transportation',
        priority: 30,
        dependencies: ['minecart', 'chest', 'crafting_table'],
        description: 'Vagoneta con cofre'
    },
    
    // Vagoneta con horno
    'furnace_minecart': {
        ingredients: { 'minecart': 1, 'furnace': 1 },
        pattern: [
            [null, 'F', null],
            [null, 'M', null],
            [null, null, null]
        ],
        output: { item: 'furnace_minecart', count: 1 },
        category: 'transportation',
        priority: 35,
        dependencies: ['minecart', 'furnace', 'crafting_table'],
        description: 'Vagoneta con horno'
    },
    
    // Vagoneta con TNT
    'tnt_minecart': {
        ingredients: { 'minecart': 1, 'tnt': 1 },
        pattern: [
            [null, 'T', null],
            [null, 'M', null],
            [null, null, null]
        ],
        output: { item: 'tnt_minecart', count: 1 },
        category: 'transportation',
        priority: 40,
        dependencies: ['minecart', 'tnt', 'crafting_table'],
        description: 'Vagoneta con TNT'
    },
    
    // Vagoneta con hopper
    'hopper_minecart': {
        ingredients: { 'minecart': 1, 'hopper': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'M', null],
            [null, null, null]
        ],
        output: { item: 'hopper_minecart', count: 1 },
        category: 'transportation',
        priority: 40,
        dependencies: ['minecart', 'hopper', 'crafting_table'],
        description: 'Vagoneta con hopper'
    },
    
    // Bloque de hierro
    'iron_block': {
        ingredients: { 'iron_ingot': 9 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', 'I', 'I'],
            ['I', 'I', 'I']
        ],
        output: { item: 'iron_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Bloque de hierro'
    },
    
    // Bloque de oro
    'gold_block': {
        ingredients: { 'gold_ingot': 9 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'G', 'G'],
            ['G', 'G', 'G']
        ],
        output: { item: 'gold_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['gold_ingot', 'crafting_table'],
        description: 'Bloque de oro'
    },
    
    // Bloque de diamante
    'diamond_block': {
        ingredients: { 'diamond': 9 },
        pattern: [
            ['D', 'D', 'D'],
            ['D', 'D', 'D'],
            ['D', 'D', 'D']
        ],
        output: { item: 'diamond_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['diamond', 'crafting_table'],
        description: 'Bloque de diamante'
    },
    
    // Bloque de esmeralda
    'emerald_block': {
        ingredients: { 'emerald': 9 },
        pattern: [
            ['E', 'E', 'E'],
            ['E', 'E', 'E'],
            ['E', 'E', 'E']
        ],
        output: { item: 'emerald_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['emerald', 'crafting_table'],
        description: 'Bloque de esmeralda'
    },
    
    // Bloque de lapis
    'lapis_block': {
        ingredients: { 'lapis_lazuli': 9 },
        pattern: [
            ['L', 'L', 'L'],
            ['L', 'L', 'L'],
            ['L', 'L', 'L']
        ],
        output: { item: 'lapis_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['lapis_lazuli', 'crafting_table'],
        description: 'Bloque de lapis'
    },
    
    // Bloque de redstone
    'redstone_block': {
        ingredients: { 'redstone': 9 },
        pattern: [
            ['R', 'R', 'R'],
            ['R', 'R', 'R'],
            ['R', 'R', 'R']
        ],
        output: { item: 'redstone_block', count: 1 },
        category: 'redstone',
        priority: 50,
        dependencies: ['redstone', 'crafting_table'],
        description: 'Bloque de redstone - Fuente de energía'
    },
    
    // Bloque de carbón
    'coal_block': {
        ingredients: { 'coal': 9 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'C', 'C'],
            ['C', 'C', 'C']
        ],
        output: { item: 'coal_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['coal', 'crafting_table'],
        description: 'Bloque de carbón'
    },
    
    // Bloque de cobre
    'copper_block': {
        ingredients: { 'copper_ingot': 9 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'C', 'C'],
            ['C', 'C', 'C']
        ],
        output: { item: 'copper_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['copper_ingot', 'crafting_table'],
        description: 'Bloque de cobre'
    },
    
    // Bloque de netherite
    'netherite_block': {
        ingredients: { 'netherite_ingot': 9 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'N', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'netherite_block', count: 1 },
        category: 'building',
        priority: 100,
        dependencies: ['netherite_ingot', 'crafting_table'],
        description: 'Bloque de netherite'
    },
    
    // Bloque de raw iron
    'raw_iron_block': {
        ingredients: { 'raw_iron': 9 },
        pattern: [
            ['R', 'R', 'R'],
            ['R', 'R', 'R'],
            ['R', 'R', 'R']
        ],
        output: { item: 'raw_iron_block', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['raw_iron', 'crafting_table'],
        description: 'Bloque de hierro en bruto'
    },
    
    // Bloque de raw gold
    'raw_gold_block': {
        ingredients: { 'raw_gold': 9 },
        pattern: [
            ['R', 'R', 'R'],
            ['R', 'R', 'R'],
            ['R', 'R', 'R']
        ],
        output: { item: 'raw_gold_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['raw_gold', 'crafting_table'],
        description: 'Bloque de oro en bruto'
    },
    
    // Bloque de raw copper
    'raw_copper_block': {
        ingredients: { 'raw_copper': 9 },
        pattern: [
            ['R', 'R', 'R'],
            ['R', 'R', 'R'],
            ['R', 'R', 'R']
        ],
        output: { item: 'raw_copper_block', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['raw_copper', 'crafting_table'],
        description: 'Bloque de cobre en bruto'
    },
    
    // Bloque de amatista
    'amethyst_block': {
        ingredients: { 'amethyst_shard': 4 },
        pattern: [
            ['A', 'A'],
            ['A', 'A']
        ],
        output: { item: 'amethyst_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['amethyst_shard', 'crafting_table'],
        description: 'Bloque de amatista'
    },
    
    // Bloque de hueso
    'bone_block': {
        ingredients: { 'bone_meal': 9 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            ['B', 'B', 'B']
        ],
        output: { item: 'bone_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['bone_meal', 'crafting_table'],
        description: 'Bloque de hueso'
    },
    
    // Bloque de slime
    'slime_block': {
        ingredients: { 'slime_ball': 9 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'S', 'S'],
            ['S', 'S', 'S']
        ],
        output: { item: 'slime_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['slime_ball', 'crafting_table'],
        description: 'Bloque de slime - Rebota'
    },
    
    // Bloque de miel
    'honey_block': {
        ingredients: { 'honey_bottle': 4 },
        pattern: [
            ['H', 'H'],
            ['H', 'H']
        ],
        output: { item: 'honey_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['honey_bottle', 'crafting_table'],
        description: 'Bloque de miel - Pegajoso'
    },
    
    // Bloque de magma
    'magma_block': {
        ingredients: { 'magma_cream': 4 },
        pattern: [
            ['M', 'M'],
            ['M', 'M']
        ],
        output: { item: 'magma_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['magma_cream', 'crafting_table'],
        description: 'Bloque de magma - Daña'
    },
    
    // Bloque de nether wart
    'nether_wart_block': {
        ingredients: { 'nether_wart': 9 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'N', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'nether_wart_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['nether_wart', 'crafting_table'],
        description: 'Bloque de nether wart'
    },
    
    // Bloque de warped wart
    'warped_wart_block': {
        ingredients: { 'nether_wart': 9 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'N', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'warped_wart_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['nether_wart', 'crafting_table'],
        description: 'Bloque de warped wart'
    },
    
    // Bloque de kelp seco
    'dried_kelp_block': {
        ingredients: { 'dried_kelp': 9 },
        pattern: [
            ['K', 'K', 'K'],
            ['K', 'K', 'K'],
            ['K', 'K', 'K']
        ],
        output: { item: 'dried_kelp_block', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['dried_kelp', 'crafting_table'],
        description: 'Bloque de kelp seco'
    },
    
    // Bloque de heno
    'hay_block': {
        ingredients: { 'wheat': 9 },
        pattern: [
            ['W', 'W', 'W'],
            ['W', 'W', 'W'],
            ['W', 'W', 'W']
        ],
        output: { item: 'hay_block', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['wheat', 'crafting_table'],
        description: 'Bloque de heno - Para caballos'
    },
    
    // Bloque de ladrillos
    'bricks': {
        ingredients: { 'brick': 4 },
        pattern: [
            ['B', 'B'],
            ['B', 'B']
        ],
        output: { item: 'bricks', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['brick', 'crafting_table'],
        description: 'Bloque de ladrillos'
    },
    
    // Ladrillo
    'brick': {
        ingredients: { 'clay_ball': 1 },
        pattern: [],
        output: { item: 'brick', count: 1 },
        category: 'material',
        priority: 30,
        dependencies: ['clay_ball'],
        description: 'Ladrillo - Se obtiene horneando clay',
        obtainable: 'smelted'
    },
    
    // Piedra pulida
    'smooth_stone': {
        ingredients: { 'stone': 1 },
        pattern: [],
        output: { item: 'smooth_stone', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['stone'],
        description: 'Piedra pulida - Se obtiene horneando stone dos veces',
        obtainable: 'smelted'
    },
    
    // Arena pulida
    'smooth_sandstone': {
        ingredients: { 'sandstone': 1 },
        pattern: [],
        output: { item: 'smooth_sandstone', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['sandstone'],
        description: 'Arena pulida - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Arena roja pulida
    'smooth_red_sandstone': {
        ingredients: { 'red_sandstone': 1 },
        pattern: [],
        output: { item: 'smooth_red_sandstone', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['red_sandstone'],
        description: 'Arena roja pulida - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Cuarzo pulido
    'smooth_quartz': {
        ingredients: { 'quartz_block': 1 },
        pattern: [],
        output: { item: 'smooth_quartz', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['quartz_block'],
        description: 'Cuarzo pulido - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Basalto pulido
    'polished_basalt': {
        ingredients: { 'basalt': 4 },
        pattern: [
            ['B', 'B'],
            ['B', 'B']
        ],
        output: { item: 'polished_basalt', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['basalt', 'crafting_table'],
        description: 'Basalto pulido'
    },
    
    // Blackstone pulido
    'polished_blackstone': {
        ingredients: { 'blackstone': 4 },
        pattern: [
            ['B', 'B'],
            ['B', 'B']
        ],
        output: { item: 'polished_blackstone', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['blackstone', 'crafting_table'],
        description: 'Blackstone pulido'
    },
    
    // Deepslate pulido
    'polished_deepslate': {
        ingredients: { 'cobbled_deepslate': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'polished_deepslate', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Deepslate pulido'
    },
    
    // Tuff pulido
    'polished_tuff': {
        ingredients: { 'tuff': 4 },
        pattern: [
            ['T', 'T'],
            ['T', 'T']
        ],
        output: { item: 'polished_tuff', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['tuff', 'crafting_table'],
        description: 'Tuff pulido'
    },
    
    // ============================================================================
    // NIVEL 5: COMIDA (Prioridad 51-60)
    // ============================================================================
    
    // Pan
    'bread': {
        ingredients: { 'wheat': 3 },
        pattern: [
            ['W', 'W', 'W'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'bread', count: 1 },
        category: 'food',
        priority: 15,
        dependencies: ['wheat', 'crafting_table'],
        description: 'Pan - Comida básica'
    },
    
    // Galleta
    'cookie': {
        ingredients: { 'wheat': 2, 'cocoa_beans': 1 },
        pattern: [
            ['W', 'C', 'W'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'cookie', count: 8 },
        category: 'food',
        priority: 25,
        dependencies: ['wheat', 'cocoa_beans', 'crafting_table'],
        description: 'Galleta - Comida'
    },
    
    // Manzana dorada
    'golden_apple': {
        ingredients: { 'gold_ingot': 8, 'apple': 1 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'A', 'G'],
            ['G', 'G', 'G']
        ],
        output: { item: 'golden_apple', count: 1 },
        category: 'food',
        priority: 50,
        dependencies: ['gold_ingot', 'apple', 'crafting_table'],
        description: 'Manzana dorada - Regeneración y resistencia'
    },
    
    // Zanahoria dorada
    'golden_carrot': {
        ingredients: { 'gold_nugget': 8, 'carrot': 1 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'C', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'golden_carrot', count: 1 },
        category: 'food',
        priority: 45,
        dependencies: ['gold_nugget', 'carrot', 'crafting_table'],
        description: 'Zanahoria dorada - Para pociones y comida'
    },
    
    // Pastel de calabaza
    'pumpkin_pie': {
        ingredients: { 'pumpkin': 1, 'sugar': 1, 'egg': 1 },
        pattern: [
            ['P', null, null],
            ['S', null, null],
            ['E', null, null]
        ],
        output: { item: 'pumpkin_pie', count: 1 },
        category: 'food',
        priority: 30,
        dependencies: ['pumpkin', 'sugar', 'egg', 'crafting_table'],
        description: 'Pastel de calabaza - Comida'
    },
    
    // Pastel
    'cake': {
        ingredients: { 'milk_bucket': 3, 'sugar': 2, 'egg': 1, 'wheat': 3 },
        pattern: [
            ['M', 'M', 'M'],
            ['S', 'E', 'S'],
            ['W', 'W', 'W']
        ],
        output: { item: 'cake', count: 1 },
        category: 'food',
        priority: 35,
        dependencies: ['milk_bucket', 'sugar', 'egg', 'wheat', 'crafting_table'],
        description: 'Pastel - Comida (6 slices)'
    },
    
    // Estofado de champiñones
    'mushroom_stew': {
        ingredients: { 'red_mushroom': 1, 'brown_mushroom': 1, 'bowl': 1 },
        pattern: [
            [null, null, null],
            ['R', 'B', null],
            [null, 'O', null]
        ],
        output: { item: 'mushroom_stew', count: 1 },
        category: 'food',
        priority: 25,
        dependencies: ['red_mushroom', 'brown_mushroom', 'bowl', 'crafting_table'],
        description: 'Estofado de champiñones - Comida'
    },
    
    // Estofado de conejo
    'rabbit_stew': {
        ingredients: { 'cooked_rabbit': 1, 'carrot': 1, 'baked_potato': 1, 'mushroom': 1, 'bowl': 1 },
        pattern: [
            ['C', null, 'M'],
            [null, 'R', null],
            [null, 'B', null]
        ],
        output: { item: 'rabbit_stew', count: 1 },
        category: 'food',
        priority: 40,
        dependencies: ['cooked_rabbit', 'carrot', 'baked_potato', 'mushroom', 'bowl', 'crafting_table'],
        description: 'Estofado de conejo - Comida'
    },
    
    // Sopa de remolacha
    'beetroot_soup': {
        ingredients: { 'beetroot': 6, 'bowl': 1 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, 'O', null]
        ],
        output: { item: 'beetroot_soup', count: 1 },
        category: 'food',
        priority: 35,
        dependencies: ['beetroot', 'bowl', 'crafting_table'],
        description: 'Sopa de remolacha - Comida'
    },
    
    // Estofado sospechoso
    'suspicious_stew': {
        ingredients: { 'red_mushroom': 1, 'brown_mushroom': 1, 'bowl': 1, 'flower': 1 },
        pattern: [
            [null, null, null],
            ['R', 'B', null],
            [null, 'O', 'F']
        ],
        output: { item: 'suspicious_stew', count: 1 },
        category: 'food',
        priority: 40,
        dependencies: ['red_mushroom', 'brown_mushroom', 'bowl', 'flower', 'crafting_table'],
        description: 'Estofado sospechoso - Efectos'
    },
    
    // Azúcar
    'sugar': {
        ingredients: { 'sugar_cane': 1 },
        pattern: [['S']],
        output: { item: 'sugar', count: 1 },
        category: 'material',
        priority: 20,
        dependencies: ['sugar_cane', 'crafting_table'],
        description: 'Azúcar - Para comida y pociones'
    },
    
    // Ojo de araña fermentado
    'fermented_spider_eye': {
        ingredients: { 'spider_eye': 1, 'brown_mushroom': 1, 'sugar': 1 },
        pattern: [
            ['S', null, null],
            ['M', null, null],
            ['G', null, null]
        ],
        output: { item: 'fermented_spider_eye', count: 1 },
        category: 'material',
        priority: 40,
        dependencies: ['spider_eye', 'brown_mushroom', 'sugar', 'crafting_table'],
        description: 'Ojo de araña fermentado - Para pociones'
    },
    
    // Crema de magma
    'magma_cream': {
        ingredients: { 'blaze_powder': 1, 'slime_ball': 1 },
        pattern: [
            ['B', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'magma_cream', count: 1 },
        category: 'material',
        priority: 45,
        dependencies: ['blaze_powder', 'slime_ball', 'crafting_table'],
        description: 'Crema de magma - Para pociones'
    },
    
    // Polvo de blaze
    'blaze_powder': {
        ingredients: { 'blaze_rod': 1 },
        pattern: [['B']],
        output: { item: 'blaze_powder', count: 2 },
        category: 'material',
        priority: 40,
        dependencies: ['blaze_rod', 'crafting_table'],
        description: 'Polvo de blaze - Para pociones y ojos de ender'
    },
    
    // Ojo de ender
    'eye_of_ender': {
        ingredients: { 'blaze_powder': 1, 'ender_pearl': 1 },
        pattern: [
            ['B', null, null],
            ['E', null, null],
            [null, null, null]
        ],
        output: { item: 'eye_of_ender', count: 1 },
        category: 'material',
        priority: 70,
        dependencies: ['blaze_powder', 'ender_pearl', 'crafting_table'],
        description: 'Ojo de ender - Para encontrar stronghold'
    },
    
    // Cristal de end
    'end_crystal': {
        ingredients: { 'glass': 7, 'eye_of_ender': 1, 'ghast_tear': 1 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'E', 'G'],
            [null, 'T', null]
        ],
        output: { item: 'end_crystal', count: 1 },
        category: 'utility',
        priority: 80,
        dependencies: ['glass', 'eye_of_ender', 'ghast_tear', 'crafting_table'],
        description: 'Cristal de end - Respawn del dragón'
    },
    
    // Beacon
    'beacon': {
        ingredients: { 'glass': 5, 'obsidian': 3, 'nether_star': 1 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'N', 'G'],
            ['O', 'O', 'O']
        ],
        output: { item: 'beacon', count: 1 },
        category: 'utility',
        priority: 90,
        dependencies: ['glass', 'obsidian', 'nether_star', 'crafting_table'],
        description: 'Beacon - Efectos de área'
    },
    
    // Conduit
    'conduit': {
        ingredients: { 'nautilus_shell': 8, 'heart_of_the_sea': 1 },
        pattern: [
            ['N', 'N', 'N'],
            ['N', 'H', 'N'],
            ['N', 'N', 'N']
        ],
        output: { item: 'conduit', count: 1 },
        category: 'utility',
        priority: 80,
        dependencies: ['nautilus_shell', 'heart_of_the_sea', 'crafting_table'],
        description: 'Conduit - Respiración水下 y visión'
    },
    
    // Linterna de mar
    'sea_lantern': {
        ingredients: { 'prismarine_crystals': 4, 'prismarine_shard': 5 },
        pattern: [
            ['S', 'C', 'S'],
            ['C', 'C', 'C'],
            ['S', 'C', 'S']
        ],
        output: { item: 'sea_lantern', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine_crystals', 'prismarine_shard', 'crafting_table'],
        description: 'Linterna de mar - Iluminación underwater'
    },
    
    // Bloque de prismarina
    'prismarine': {
        ingredients: { 'prismarine_shard': 4 },
        pattern: [
            ['S', 'S'],
            ['S', 'S']
        ],
        output: { item: 'prismarine', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['prismarine_shard', 'crafting_table'],
        description: 'Bloque de prismarina'
    },
    
    // Prismarina oscura
    'dark_prismarine': {
        ingredients: { 'prismarine_shard': 8, 'ink_sac': 1 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'I', 'S'],
            ['S', 'S', 'S']
        ],
        output: { item: 'dark_prismarine', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine_shard', 'ink_sac', 'crafting_table'],
        description: 'Prismarina oscura'
    },
    
    // Ladrillos de prismarina
    'prismarine_bricks': {
        ingredients: { 'prismarine_shard': 9 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'S', 'S'],
            ['S', 'S', 'S']
        ],
        output: { item: 'prismarine_bricks', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine_shard', 'crafting_table'],
        description: 'Ladrillos de prismarina'
    },
    
    // Barra de end
    'end_rod': {
        ingredients: { 'blaze_rod': 1, 'popped_chorus_fruit': 1 },
        pattern: [
            ['B', null, null],
            ['C', null, null],
            [null, null, null]
        ],
        output: { item: 'end_rod', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['blaze_rod', 'popped_chorus_fruit', 'crafting_table'],
        description: 'Barra de end - Decoración luminosa'
    },
    
    // Bloque de purpur
    'purpur_block': {
        ingredients: { 'popped_chorus_fruit': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'purpur_block', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['popped_chorus_fruit', 'crafting_table'],
        description: 'Bloque de purpur'
    },
    
    // Pilar de purpur
    'purpur_pillar': {
        ingredients: { 'purpur_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'purpur_pillar', count: 2 },
        category: 'building',
        priority: 60,
        dependencies: ['purpur_slab', 'crafting_table'],
        description: 'Pilar de purpur'
    },
    
    // Escaleras de purpur
    'purpur_stairs': {
        ingredients: { 'purpur_block': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'purpur_stairs', count: 4 },
        category: 'building',
        priority: 60,
        dependencies: ['purpur_block', 'crafting_table'],
        description: 'Escaleras de purpur'
    },
    
    // Losa de purpur
    'purpur_slab': {
        ingredients: { 'purpur_block': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'purpur_slab', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['purpur_block', 'crafting_table'],
        description: 'Losas de purpur'
    },
    
    // Bloque de ladrillos del end
    'end_stone_bricks': {
        ingredients: { 'end_stone': 4 },
        pattern: [
            ['E', 'E'],
            ['E', 'E']
        ],
        output: { item: 'end_stone_bricks', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['end_stone', 'crafting_table'],
        description: 'Ladrillos del end'
    },
    
    // Ladrillos de nether
    'nether_bricks': {
        ingredients: { 'nether_brick': 4 },
        pattern: [
            ['N', 'N'],
            ['N', 'N']
        ],
        output: { item: 'nether_bricks', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['nether_brick', 'crafting_table'],
        description: 'Ladrillos de nether'
    },
    
    // Valla de nether
    'nether_brick_fence': {
        ingredients: { 'nether_bricks': 6, 'nether_brick': 2 },
        pattern: [
            ['B', 'N', 'B'],
            ['B', 'N', 'B'],
            [null, null, null]
        ],
        output: { item: 'nether_brick_fence', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['nether_bricks', 'nether_brick', 'crafting_table'],
        description: 'Valla de nether'
    },
    
    // Escaleras de nether
    'nether_brick_stairs': {
        ingredients: { 'nether_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'nether_brick_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['nether_bricks', 'crafting_table'],
        description: 'Escaleras de nether'
    },
    
    // Losa de nether
    'nether_brick_slab': {
        ingredients: { 'nether_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'nether_brick_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['nether_bricks', 'crafting_table'],
        description: 'Losas de nether'
    },
    
    // Ladrillos de nether rojos
    'red_nether_bricks': {
        ingredients: { 'nether_wart': 2, 'nether_bricks': 2 },
        pattern: [
            ['N', 'W'],
            ['W', 'N']
        ],
        output: { item: 'red_nether_bricks', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['nether_wart', 'nether_bricks', 'crafting_table'],
        description: 'Ladrillos de nether rojos'
    },
    
    // Ladrillos de nether agrietados
    'cracked_nether_bricks': {
        ingredients: { 'nether_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_nether_bricks', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['nether_bricks'],
        description: 'Ladrillos de nether agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Ladrillos de nether tallados
    'chiseled_nether_bricks': {
        ingredients: { 'nether_brick_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_nether_bricks', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['nether_brick_slab', 'crafting_table'],
        description: 'Ladrillos de nether tallados'
    },
    
    // Blackstone
    'blackstone': {
        ingredients: {},
        pattern: [],
        output: { item: 'blackstone', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: [],
        description: 'Blackstone - Se obtiene en el Nether',
        obtainable: 'nether'
    },
    
    // Ladrillos de blackstone
    'blackstone_bricks': {
        ingredients: { 'blackstone': 4 },
        pattern: [
            ['B', 'B'],
            ['B', 'B']
        ],
        output: { item: 'blackstone_bricks', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['blackstone', 'crafting_table'],
        description: 'Ladrillos de blackstone'
    },
    
    // Ladrillos de blackstone agrietados
    'cracked_blackstone_bricks': {
        ingredients: { 'blackstone_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_blackstone_bricks', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['blackstone_bricks'],
        description: 'Ladrillos de blackstone agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Ladrillos de blackstone tallados
    'chiseled_blackstone': {
        ingredients: { 'blackstone_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_blackstone', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['blackstone_slab', 'crafting_table'],
        description: 'Blackstone tallado'
    },
    
    // Ladrillos de blackstone pulidos
    'polished_blackstone_bricks': {
        ingredients: { 'polished_blackstone': 4 },
        pattern: [
            ['P', 'P'],
            ['P', 'P']
        ],
        output: { item: 'polished_blackstone_bricks', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['polished_blackstone', 'crafting_table'],
        description: 'Ladrillos de blackstone pulidos'
    },
    
    // Ladrillos de blackstone pulidos agrietados
    'cracked_polished_blackstone_bricks': {
        ingredients: { 'polished_blackstone_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_polished_blackstone_bricks', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['polished_blackstone_bricks'],
        description: 'Ladrillos de blackstone pulidos agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Blackstone pulido tallado
    'chiseled_polished_blackstone': {
        ingredients: { 'polished_blackstone_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_polished_blackstone', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['polished_blackstone_slab', 'crafting_table'],
        description: 'Blackstone pulido tallado'
    },
    
    // Escaleras de blackstone
    'blackstone_stairs': {
        ingredients: { 'blackstone': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'blackstone_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['blackstone', 'crafting_table'],
        description: 'Escaleras de blackstone'
    },
    
    // Losa de blackstone
    'blackstone_slab': {
        ingredients: { 'blackstone': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'blackstone_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['blackstone', 'crafting_table'],
        description: 'Losas de blackstone'
    },
    
    // Muro de blackstone
    'blackstone_wall': {
        ingredients: { 'blackstone': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'blackstone_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['blackstone', 'crafting_table'],
        description: 'Muro de blackstone'
    },
    
    // Escaleras de blackstone pulido
    'polished_blackstone_stairs': {
        ingredients: { 'polished_blackstone': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'polished_blackstone_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['polished_blackstone', 'crafting_table'],
        description: 'Escaleras de blackstone pulido'
    },
    
    // Losa de blackstone pulido
    'polished_blackstone_slab': {
        ingredients: { 'polished_blackstone': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'polished_blackstone_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['polished_blackstone', 'crafting_table'],
        description: 'Losas de blackstone pulido'
    },
    
    // Muro de blackstone pulido
    'polished_blackstone_wall': {
        ingredients: { 'polished_blackstone': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'polished_blackstone_wall', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['polished_blackstone', 'crafting_table'],
        description: 'Muro de blackstone pulido'
    },
    
    // Escaleras de ladrillos de blackstone pulido
    'polished_blackstone_brick_stairs': {
        ingredients: { 'polished_blackstone_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'polished_blackstone_brick_stairs', count: 4 },
        category: 'building',
        priority: 60,
        dependencies: ['polished_blackstone_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de blackstone pulido'
    },
    
    // Losa de ladrillos de blackstone pulido
    'polished_blackstone_brick_slab': {
        ingredients: { 'polished_blackstone_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'polished_blackstone_brick_slab', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['polished_blackstone_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de blackstone pulido'
    },
    
    // Muro de ladrillos de blackstone pulido
    'polished_blackstone_brick_wall': {
        ingredients: { 'polished_blackstone_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'polished_blackstone_brick_wall', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['polished_blackstone_bricks', 'crafting_table'],
        description: 'Muro de ladrillos de blackstone pulido'
    },
    
    // Basalto
    'basalt': {
        ingredients: {},
        pattern: [],
        output: { item: 'basalt', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: [],
        description: 'Basalto - Se obtiene en el Nether',
        obtainable: 'nether'
    },
    
    // Basalto pulido
    'polished_basalt': {
        ingredients: { 'basalt': 4 },
        pattern: [
            ['B', 'B'],
            ['B', 'B']
        ],
        output: { item: 'polished_basalt', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['basalt', 'crafting_table'],
        description: 'Basalto pulido'
    },
    
    // Basalto liso
    'smooth_basalt': {
        ingredients: { 'basalt': 1 },
        pattern: [],
        output: { item: 'smooth_basalt', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['basalt'],
        description: 'Basalto liso - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Tuff
    'tuff': {
        ingredients: {},
        pattern: [],
        output: { item: 'tuff', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: [],
        description: 'Tuff - Se obtiene minando',
        obtainable: 'mined'
    },
    
    // Tuff pulido
    'polished_tuff': {
        ingredients: { 'tuff': 4 },
        pattern: [
            ['T', 'T'],
            ['T', 'T']
        ],
        output: { item: 'polished_tuff', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['tuff', 'crafting_table'],
        description: 'Tuff pulido'
    },
    
    // Ladrillos de tuff
    'tuff_bricks': {
        ingredients: { 'tuff': 4 },
        pattern: [
            ['T', 'T'],
            ['T', 'T']
        ],
        output: { item: 'tuff_bricks', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['tuff', 'crafting_table'],
        description: 'Ladrillos de tuff'
    },
    
    // Tuff agrietado
    'cracked_tuff': {
        ingredients: { 'tuff': 1 },
        pattern: [],
        output: { item: 'cracked_tuff', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['tuff'],
        description: 'Tuff agrietado - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Tuff tallado
    'chiseled_tuff': {
        ingredients: { 'tuff_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_tuff', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['tuff_slab', 'crafting_table'],
        description: 'Tuff tallado'
    },
    
    // Ladrillos de tuff agrietados
    'cracked_tuff_bricks': {
        ingredients: { 'tuff_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_tuff_bricks', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['tuff_bricks'],
        description: 'Ladrillos de tuff agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Tuff tallado
    'chiseled_tuff_bricks': {
        ingredients: { 'tuff_brick_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_tuff_bricks', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['tuff_brick_slab', 'crafting_table'],
        description: 'Ladrillos de tuff tallados'
    },
    
    // Deepslate
    'deepslate': {
        ingredients: {},
        pattern: [],
        output: { item: 'deepslate', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: [],
        description: 'Deepslate - Se obtiene minando',
        obtainable: 'mined'
    },
    
    // Deepslate pulido
    'polished_deepslate': {
        ingredients: { 'cobbled_deepslate': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'polished_deepslate', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Deepslate pulido'
    },
    
    // Ladrillos de deepslate
    'deepslate_bricks': {
        ingredients: { 'cobbled_deepslate': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'deepslate_bricks', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Ladrillos de deepslate'
    },
    
    // Ladrillos de deepslate agrietados
    'cracked_deepslate_bricks': {
        ingredients: { 'deepslate_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_deepslate_bricks', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['deepslate_bricks'],
        description: 'Ladrillos de deepslate agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Ladrillos de deepslate tallados
    'chiseled_deepslate': {
        ingredients: { 'deepslate_brick_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_deepslate', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['deepslate_brick_slab', 'crafting_table'],
        description: 'Ladrillos de deepslate tallados'
    },
    
    // Baldosas de deepslate
    'deepslate_tiles': {
        ingredients: { 'polished_deepslate': 4 },
        pattern: [
            ['P', 'P'],
            ['P', 'P']
        ],
        output: { item: 'deepslate_tiles', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['polished_deepslate', 'crafting_table'],
        description: 'Baldosas de deepslate'
    },
    
    // Baldosas de deepslate agrietadas
    'cracked_deepslate_tiles': {
        ingredients: { 'deepslate_tiles': 1 },
        pattern: [],
        output: { item: 'cracked_deepslate_tiles', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tiles'],
        description: 'Baldosas de deepslate agrietadas - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Baldosas de deepslate talladas
    'chiseled_deepslate_tiles': {
        ingredients: { 'deepslate_tile_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_deepslate_tiles', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tile_slab', 'crafting_table'],
        description: 'Baldosas de deepslate talladas'
    },
    
    // Escaleras de deepslate
    'cobbled_deepslate_stairs': {
        ingredients: { 'cobbled_deepslate': 6 },
        pattern: [
            ['C', null, null],
            ['C', 'C', null],
            ['C', 'C', null]
        ],
        output: { item: 'cobbled_deepslate_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Escaleras de deepslate'
    },
    
    // Losa de deepslate
    'cobbled_deepslate_slab': {
        ingredients: { 'cobbled_deepslate': 3 },
        pattern: [
            ['C', 'C', 'C'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'cobbled_deepslate_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Losas de deepslate'
    },
    
    // Muro de deepslate
    'cobbled_deepslate_wall': {
        ingredients: { 'cobbled_deepslate': 6 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'C', 'C'],
            [null, null, null]
        ],
        output: { item: 'cobbled_deepslate_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['cobbled_deepslate', 'crafting_table'],
        description: 'Muro de deepslate'
    },
    
    // Escaleras de ladrillos de deepslate
    'deepslate_brick_stairs': {
        ingredients: { 'deepslate_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'deepslate_brick_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['deepslate_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de deepslate'
    },
    
    // Losa de ladrillos de deepslate
    'deepslate_brick_slab': {
        ingredients: { 'deepslate_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'deepslate_brick_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['deepslate_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de deepslate'
    },
    
    // Muro de ladrillos de deepslate
    'deepslate_brick_wall': {
        ingredients: { 'deepslate_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'deepslate_brick_wall', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['deepslate_bricks', 'crafting_table'],
        description: 'Muro de ladrillos de deepslate'
    },
    
    // Escaleras de baldosas de deepslate
    'deepslate_tile_stairs': {
        ingredients: { 'deepslate_tiles': 6 },
        pattern: [
            ['T', null, null],
            ['T', 'T', null],
            ['T', 'T', null]
        ],
        output: { item: 'deepslate_tile_stairs', count: 4 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tiles', 'crafting_table'],
        description: 'Escaleras de baldosas de deepslate'
    },
    
    // Losa de baldosas de deepslate
    'deepslate_tile_slab': {
        ingredients: { 'deepslate_tiles': 3 },
        pattern: [
            ['T', 'T', 'T'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'deepslate_tile_slab', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tiles', 'crafting_table'],
        description: 'Losas de baldosas de deepslate'
    },
    
    // Muro de baldosas de deepslate
    'deepslate_tile_wall': {
        ingredients: { 'deepslate_tiles': 6 },
        pattern: [
            ['T', 'T', 'T'],
            ['T', 'T', 'T'],
            [null, null, null]
        ],
        output: { item: 'deepslate_tile_wall', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tiles', 'crafting_table'],
        description: 'Muro de baldosas de deepslate'
    },
    
    // Ladrillos de ladrillos agrietados
    'cracked_deepslate_tiles': {
        ingredients: { 'deepslate_tiles': 1 },
        pattern: [],
        output: { item: 'cracked_deepslate_tiles', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['deepslate_tiles'],
        description: 'Baldosas de deepslate agrietadas - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Arena cortada
    'cut_sandstone': {
        ingredients: { 'sandstone': 4 },
        pattern: [
            ['S', 'S'],
            ['S', 'S']
        ],
        output: { item: 'cut_sandstone', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['sandstone', 'crafting_table'],
        description: 'Arena cortada'
    },
    
    // Arena roja cortada
    'cut_red_sandstone': {
        ingredients: { 'red_sandstone': 4 },
        pattern: [
            ['S', 'S'],
            ['S', 'S']
        ],
        output: { item: 'cut_red_sandstone', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['red_sandstone', 'crafting_table'],
        description: 'Arena roja cortada'
    },
    
    // Arena tallada
    'chiseled_sandstone': {
        ingredients: { 'sandstone_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_sandstone', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['sandstone_slab', 'crafting_table'],
        description: 'Arena tallada'
    },
    
    // Arena roja tallada
    'chiseled_red_sandstone': {
        ingredients: { 'red_sandstone_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_red_sandstone', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['red_sandstone_slab', 'crafting_table'],
        description: 'Arena roja tallada'
    },
    
    // Cuarzo tallado
    'chiseled_quartz_block': {
        ingredients: { 'quartz_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_quartz_block', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['quartz_slab', 'crafting_table'],
        description: 'Cuarzo tallado'
    },
    
    // Cuarzo con líneas
    'quartz_pillar': {
        ingredients: { 'quartz_block': 2 },
        pattern: [
            ['Q', null, null],
            ['Q', null, null],
            [null, null, null]
        ],
        output: { item: 'quartz_pillar', count: 2 },
        category: 'building',
        priority: 50,
        dependencies: ['quartz_block', 'crafting_table'],
        description: 'Cuarzo con líneas'
    },
    
    // Escaleras de cuarzo
    'quartz_stairs': {
        ingredients: { 'quartz_block': 6 },
        pattern: [
            ['Q', null, null],
            ['Q', 'Q', null],
            ['Q', 'Q', null]
        ],
        output: { item: 'quartz_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['quartz_block', 'crafting_table'],
        description: 'Escaleras de cuarzo'
    },
    
    // Losa de cuarzo
    'quartz_slab': {
        ingredients: { 'quartz_block': 3 },
        pattern: [
            ['Q', 'Q', 'Q'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'quartz_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['quartz_block', 'crafting_table'],
        description: 'Losas de cuarzo'
    },
    
    // Escaleras de cuarzo liso
    'smooth_quartz_stairs': {
        ingredients: { 'smooth_quartz': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'smooth_quartz_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['smooth_quartz', 'crafting_table'],
        description: 'Escaleras de cuarzo liso'
    },
    
    // Losa de cuarzo liso
    'smooth_quartz_slab': {
        ingredients: { 'smooth_quartz': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'smooth_quartz_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['smooth_quartz', 'crafting_table'],
        description: 'Losas de cuarzo liso'
    },
    
    // Escaleras de arena
    'sandstone_stairs': {
        ingredients: { 'sandstone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'sandstone_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['sandstone', 'crafting_table'],
        description: 'Escaleras de arena'
    },
    
    // Losa de arena
    'sandstone_slab': {
        ingredients: { 'sandstone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'sandstone_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['sandstone', 'crafting_table'],
        description: 'Losas de arena'
    },
    
    // Muro de arena
    'sandstone_wall': {
        ingredients: { 'sandstone': 6 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'S', 'S'],
            [null, null, null]
        ],
        output: { item: 'sandstone_wall', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['sandstone', 'crafting_table'],
        description: 'Muro de arena'
    },
    
    // Escaleras de arena roja
    'red_sandstone_stairs': {
        ingredients: { 'red_sandstone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'red_sandstone_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['red_sandstone', 'crafting_table'],
        description: 'Escaleras de arena roja'
    },
    
    // Losa de arena roja
    'red_sandstone_slab': {
        ingredients: { 'red_sandstone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'red_sandstone_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['red_sandstone', 'crafting_table'],
        description: 'Losas de arena roja'
    },
    
    // Muro de arena roja
    'red_sandstone_wall': {
        ingredients: { 'red_sandstone': 6 },
        pattern: [
            ['S', 'S', 'S'],
            ['S', 'S', 'S'],
            [null, null, null]
        ],
        output: { item: 'red_sandstone_wall', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['red_sandstone', 'crafting_table'],
        description: 'Muro de arena roja'
    },
    
    // Escaleras de arena lisa
    'smooth_sandstone_stairs': {
        ingredients: { 'smooth_sandstone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'smooth_sandstone_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['smooth_sandstone', 'crafting_table'],
        description: 'Escaleras de arena lisa'
    },
    
    // Losa de arena lisa
    'smooth_sandstone_slab': {
        ingredients: { 'smooth_sandstone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'smooth_sandstone_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['smooth_sandstone', 'crafting_table'],
        description: 'Losas de arena lisa'
    },
    
    // Escaleras de arena roja lisa
    'smooth_red_sandstone_stairs': {
        ingredients: { 'smooth_red_sandstone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'smooth_red_sandstone_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['smooth_red_sandstone', 'crafting_table'],
        description: 'Escaleras de arena roja lisa'
    },
    
    // Losa de arena roja lisa
    'smooth_red_sandstone_slab': {
        ingredients: { 'smooth_red_sandstone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'smooth_red_sandstone_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['smooth_red_sandstone', 'crafting_table'],
        description: 'Losas de arena roja lisa'
    },
    
    // Escaleras de ladrillos
    'brick_stairs': {
        ingredients: { 'bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'brick_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos'
    },
    
    // Losa de ladrillos
    'brick_slab': {
        ingredients: { 'bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'brick_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['bricks', 'crafting_table'],
        description: 'Losas de ladrillos'
    },
    
    // Muro de ladrillos
    'brick_wall': {
        ingredients: { 'bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'brick_wall', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['bricks', 'crafting_table'],
        description: 'Muro de ladrillos'
    },
    
    // Escaleras de piedra
    'stone_stairs': {
        ingredients: { 'stone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'stone_stairs', count: 4 },
        category: 'building',
        priority: 35,
        dependencies: ['stone', 'crafting_table'],
        description: 'Escaleras de piedra'
    },
    
    // Losa de piedra
    'stone_slab': {
        ingredients: { 'stone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'stone_slab', count: 6 },
        category: 'building',
        priority: 35,
        dependencies: ['stone', 'crafting_table'],
        description: 'Losas de piedra'
    },
    
    // Escaleras de piedra lisa
    'smooth_stone_stairs': {
        ingredients: { 'smooth_stone': 6 },
        pattern: [
            ['S', null, null],
            ['S', 'S', null],
            ['S', 'S', null]
        ],
        output: { item: 'smooth_stone_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['smooth_stone', 'crafting_table'],
        description: 'Escaleras de piedra lisa'
    },
    
    // Losa de piedra lisa
    'smooth_stone_slab': {
        ingredients: { 'smooth_stone': 3 },
        pattern: [
            ['S', 'S', 'S'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'smooth_stone_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['smooth_stone', 'crafting_table'],
        description: 'Losas de piedra lisa'
    },
    
    // Escaleras de cobblestone
    'cobblestone_stairs': {
        ingredients: { 'cobblestone': 6 },
        pattern: [
            ['C', null, null],
            ['C', 'C', null],
            ['C', 'C', null]
        ],
        output: { item: 'cobblestone_stairs', count: 4 },
        category: 'building',
        priority: 35,
        dependencies: ['cobblestone', 'crafting_table'],
        description: 'Escaleras de cobblestone'
    },
    
    // Losa de cobblestone
    'cobblestone_slab': {
        ingredients: { 'cobblestone': 3 },
        pattern: [
            ['C', 'C', 'C'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'cobblestone_slab', count: 6 },
        category: 'building',
        priority: 35,
        dependencies: ['cobblestone', 'crafting_table'],
        description: 'Losas de cobblestone'
    },
    
    // Muro de cobblestone
    'cobblestone_wall': {
        ingredients: { 'cobblestone': 6 },
        pattern: [
            ['C', 'C', 'C'],
            ['C', 'C', 'C'],
            [null, null, null]
        ],
        output: { item: 'cobblestone_wall', count: 6 },
        category: 'building',
        priority: 35,
        dependencies: ['cobblestone', 'crafting_table'],
        description: 'Muro de cobblestone'
    },
    
    // Muro de cobblestone con musgo
    'mossy_cobblestone_wall': {
        ingredients: { 'mossy_cobblestone': 6 },
        pattern: [
            ['M', 'M', 'M'],
            ['M', 'M', 'M'],
            [null, null, null]
        ],
        output: { item: 'mossy_cobblestone_wall', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['mossy_cobblestone', 'crafting_table'],
        description: 'Muro de cobblestone con musgo'
    },
    
    // Escaleras de cobblestone con musgo
    'mossy_cobblestone_stairs': {
        ingredients: { 'mossy_cobblestone': 6 },
        pattern: [
            ['M', null, null],
            ['M', 'M', null],
            ['M', 'M', null]
        ],
        output: { item: 'mossy_cobblestone_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['mossy_cobblestone', 'crafting_table'],
        description: 'Escaleras de cobblestone con musgo'
    },
    
    // Losa de cobblestone con musgo
    'mossy_cobblestone_slab': {
        ingredients: { 'mossy_cobblestone': 3 },
        pattern: [
            ['M', 'M', 'M'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_cobblestone_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['mossy_cobblestone', 'crafting_table'],
        description: 'Losas de cobblestone con musgo'
    },
    
    // Escaleras de ladrillos de piedra
    'stone_brick_stairs': {
        ingredients: { 'stone_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'stone_brick_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['stone_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de piedra'
    },
    
    // Losa de ladrillos de piedra
    'stone_brick_slab': {
        ingredients: { 'stone_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'stone_brick_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['stone_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de piedra'
    },
    
    // Muro de ladrillos de piedra
    'stone_brick_wall': {
        ingredients: { 'stone_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'stone_brick_wall', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['stone_bricks', 'crafting_table'],
        description: 'Muro de ladrillos de piedra'
    },
    
    // Escaleras de ladrillos de piedra con musgo
    'mossy_stone_brick_stairs': {
        ingredients: { 'mossy_stone_bricks': 6 },
        pattern: [
            ['M', null, null],
            ['M', 'M', null],
            ['M', 'M', null]
        ],
        output: { item: 'mossy_stone_brick_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['mossy_stone_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de piedra con musgo'
    },
    
    // Losa de ladrillos de piedra con musgo
    'mossy_stone_brick_slab': {
        ingredients: { 'mossy_stone_bricks': 3 },
        pattern: [
            ['M', 'M', 'M'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_stone_brick_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['mossy_stone_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de piedra con musgo'
    },
    
    // Muro de ladrillos de piedra con musgo
    'mossy_stone_brick_wall': {
        ingredients: { 'mossy_stone_bricks': 6 },
        pattern: [
            ['M', 'M', 'M'],
            ['M', 'M', 'M'],
            [null, null, null]
        ],
        output: { item: 'mossy_stone_brick_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['mossy_stone_bricks', 'crafting_table'],
        description: 'Muro de ladrillos de piedra con musgo'
    },
    
    // Ladrillos de piedra agrietados
    'cracked_stone_bricks': {
        ingredients: { 'stone_bricks': 1 },
        pattern: [],
        output: { item: 'cracked_stone_bricks', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['stone_bricks'],
        description: 'Ladrillos de piedra agrietados - Se obtiene horneando',
        obtainable: 'smelted'
    },
    
    // Ladrillos de piedra tallados
    'chiseled_stone_bricks': {
        ingredients: { 'stone_brick_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_stone_bricks', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['stone_brick_slab', 'crafting_table'],
        description: 'Ladrillos de piedra tallados'
    },
    
    // Ladrillos de piedra con musgo
    'mossy_stone_bricks': {
        ingredients: { 'stone_bricks': 1, 'vine': 1 },
        pattern: [
            ['S', null, null],
            ['V', null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_stone_bricks', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['stone_bricks', 'vine', 'crafting_table'],
        description: 'Ladrillos de piedra con musgo'
    },
    
    // Ladrillos de piedra
    'stone_bricks': {
        ingredients: { 'stone': 4 },
        pattern: [
            ['S', 'S'],
            ['S', 'S']
        ],
        output: { item: 'stone_bricks', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['stone', 'crafting_table'],
        description: 'Ladrillos de piedra'
    },
    
    // Escaleras de granito
    'granite_stairs': {
        ingredients: { 'granite': 6 },
        pattern: [
            ['G', null, null],
            ['G', 'G', null],
            ['G', 'G', null]
        ],
        output: { item: 'granite_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['granite', 'crafting_table'],
        description: 'Escaleras de granito'
    },
    
    // Losa de granito
    'granite_slab': {
        ingredients: { 'granite': 3 },
        pattern: [
            ['G', 'G', 'G'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'granite_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['granite', 'crafting_table'],
        description: 'Losas de granito'
    },
    
    // Muro de granito
    'granite_wall': {
        ingredients: { 'granite': 6 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'G', 'G'],
            [null, null, null]
        ],
        output: { item: 'granite_wall', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['granite', 'crafting_table'],
        description: 'Muro de granito'
    },
    
    // Granito pulido
    'polished_granite': {
        ingredients: { 'granite': 4 },
        pattern: [
            ['G', 'G'],
            ['G', 'G']
        ],
        output: { item: 'polished_granite', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['granite', 'crafting_table'],
        description: 'Granito pulido'
    },
    
    // Escaleras de granito pulido
    'polished_granite_stairs': {
        ingredients: { 'polished_granite': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'polished_granite_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_granite', 'crafting_table'],
        description: 'Escaleras de granito pulido'
    },
    
    // Losa de granito pulido
    'polished_granite_slab': {
        ingredients: { 'polished_granite': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'polished_granite_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_granite', 'crafting_table'],
        description: 'Losas de granito pulido'
    },
    
    // Escaleras de diorita
    'diorite_stairs': {
        ingredients: { 'diorite': 6 },
        pattern: [
            ['D', null, null],
            ['D', 'D', null],
            ['D', 'D', null]
        ],
        output: { item: 'diorite_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['diorite', 'crafting_table'],
        description: 'Escaleras de diorita'
    },
    
    // Losa de diorita
    'diorite_slab': {
        ingredients: { 'diorite': 3 },
        pattern: [
            ['D', 'D', 'D'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'diorite_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['diorite', 'crafting_table'],
        description: 'Losas de diorita'
    },
    
    // Muro de diorita
    'diorite_wall': {
        ingredients: { 'diorite': 6 },
        pattern: [
            ['D', 'D', 'D'],
            ['D', 'D', 'D'],
            [null, null, null]
        ],
        output: { item: 'diorite_wall', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['diorite', 'crafting_table'],
        description: 'Muro de diorita'
    },
    
    // Diorita pulida
    'polished_diorite': {
        ingredients: { 'diorite': 4 },
        pattern: [
            ['D', 'D'],
            ['D', 'D']
        ],
        output: { item: 'polished_diorite', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['diorite', 'crafting_table'],
        description: 'Diorita pulida'
    },
    
    // Escaleras de diorita pulida
    'polished_diorite_stairs': {
        ingredients: { 'polished_diorite': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'polished_diorite_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_diorite', 'crafting_table'],
        description: 'Escaleras de diorita pulida'
    },
    
    // Losa de diorita pulida
    'polished_diorite_slab': {
        ingredients: { 'polished_diorite': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'polished_diorite_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_diorite', 'crafting_table'],
        description: 'Losas de diorita pulida'
    },
    
    // Escaleras de andesita
    'andesite_stairs': {
        ingredients: { 'andesite': 6 },
        pattern: [
            ['A', null, null],
            ['A', 'A', null],
            ['A', 'A', null]
        ],
        output: { item: 'andesite_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['andesite', 'crafting_table'],
        description: 'Escaleras de andesita'
    },
    
    // Losa de andesita
    'andesite_slab': {
        ingredients: { 'andesite': 3 },
        pattern: [
            ['A', 'A', 'A'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'andesite_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['andesite', 'crafting_table'],
        description: 'Losas de andesita'
    },
    
    // Muro de andesita
    'andesite_wall': {
        ingredients: { 'andesite': 6 },
        pattern: [
            ['A', 'A', 'A'],
            ['A', 'A', 'A'],
            [null, null, null]
        ],
        output: { item: 'andesite_wall', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['andesite', 'crafting_table'],
        description: 'Muro de andesita'
    },
    
    // Andesita pulida
    'polished_andesite': {
        ingredients: { 'andesite': 4 },
        pattern: [
            ['A', 'A'],
            ['A', 'A']
        ],
        output: { item: 'polished_andesite', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['andesite', 'crafting_table'],
        description: 'Andesita pulida'
    },
    
    // Escaleras de andesita pulida
    'polished_andesite_stairs': {
        ingredients: { 'polished_andesite': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'polished_andesite_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_andesite', 'crafting_table'],
        description: 'Escaleras de andesita pulida'
    },
    
    // Losa de andesita pulida
    'polished_andesite_slab': {
        ingredients: { 'polished_andesite': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'polished_andesite_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['polished_andesite', 'crafting_table'],
        description: 'Losas de andesita pulida'
    },
    
    // Escaleras de prismarina
    'prismarine_stairs': {
        ingredients: { 'prismarine': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'prismarine_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Escaleras de prismarina'
    },
    
    // Losa de prismarina
    'prismarine_slab': {
        ingredients: { 'prismarine': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'prismarine_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Losas de prismarina'
    },
    
    // Muro de prismarina
    'prismarine_wall': {
        ingredients: { 'prismarine': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'prismarine_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Muro de prismarina'
    },
    
    // Escaleras de ladrillos de prismarina
    'prismarine_brick_stairs': {
        ingredients: { 'prismarine_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'prismarine_brick_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['prismarine_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de prismarina'
    },
    
    // Losa de ladrillos de prismarina
    'prismarine_brick_slab': {
        ingredients: { 'prismarine_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'prismarine_brick_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['prismarine_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de prismarina'
    },
    
    // Escaleras de prismarina oscura
    'dark_prismarine_stairs': {
        ingredients: { 'dark_prismarine': 6 },
        pattern: [
            ['D', null, null],
            ['D', 'D', null],
            ['D', 'D', null]
        ],
        output: { item: 'dark_prismarine_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['dark_prismarine', 'crafting_table'],
        description: 'Escaleras de prismarina oscura'
    },
    
    // Losa de prismarina oscura
    'dark_prismarine_slab': {
        ingredients: { 'dark_prismarine': 3 },
        pattern: [
            ['D', 'D', 'D'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'dark_prismarine_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['dark_prismarine', 'crafting_table'],
        description: 'Losas de prismarina oscura'
    },
    
    // Escaleras de ladrillos del end
    'end_stone_brick_stairs': {
        ingredients: { 'end_stone_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'end_stone_brick_stairs', count: 4 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos del end'
    },
    
    // Losa de ladrillos del end
    'end_stone_brick_slab': {
        ingredients: { 'end_stone_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'end_stone_brick_slab', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Losas de ladrillos del end'
    },
    
    // Muro de ladrillos del end
    'end_stone_brick_wall': {
        ingredients: { 'end_stone_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'end_stone_brick_wall', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Muro de ladrillos del end'
    },
    
    // Escaleras de cobblestone con musgo
    'mossy_cobblestone_stairs': {
        ingredients: { 'mossy_cobblestone': 6 },
        pattern: [
            ['M', null, null],
            ['M', 'M', null],
            ['M', 'M', null]
        ],
        output: { item: 'mossy_cobblestone_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['mossy_cobblestone', 'crafting_table'],
        description: 'Escaleras de cobblestone con musgo'
    },
    
    // Losa de cobblestone con musgo
    'mossy_cobblestone_slab': {
        ingredients: { 'mossy_cobblestone': 3 },
        pattern: [
            ['M', 'M', 'M'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_cobblestone_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['mossy_cobblestone', 'crafting_table'],
        description: 'Losas de cobblestone con musgo'
    },
    
    // Cobblestone con musgo
    'mossy_cobblestone': {
        ingredients: { 'cobblestone': 1, 'vine': 1 },
        pattern: [
            ['C', null, null],
            ['V', null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_cobblestone', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['cobblestone', 'vine', 'crafting_table'],
        description: 'Cobblestone con musgo'
    },
    
    // Ladrillos de cobblestone con musgo
    'mossy_stone_bricks': {
        ingredients: { 'stone_bricks': 1, 'vine': 1 },
        pattern: [
            ['S', null, null],
            ['V', null, null],
            [null, null, null]
        ],
        output: { item: 'mossy_stone_bricks', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['stone_bricks', 'vine', 'crafting_table'],
        description: 'Ladrillos de piedra con musgo'
    },
    
    // Escaleras de prismarina
    'prismarine_stairs': {
        ingredients: { 'prismarine': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'prismarine_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Escaleras de prismarina'
    },
    
    // Losa de prismarina
    'prismarine_slab': {
        ingredients: { 'prismarine': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'prismarine_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Losas de prismarina'
    },
    
    // Muro de prismarina
    'prismarine_wall': {
        ingredients: { 'prismarine': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'prismarine_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['prismarine', 'crafting_table'],
        description: 'Muro de prismarina'
    },
    
    // Escaleras de ladrillos de prismarina
    'prismarine_brick_stairs': {
        ingredients: { 'prismarine_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'prismarine_brick_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['prismarine_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de prismarina'
    },
    
    // Losa de ladrillos de prismarina
    'prismarine_brick_slab': {
        ingredients: { 'prismarine_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'prismarine_brick_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['prismarine_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de prismarina'
    },
    
    // Escaleras de prismarina oscura
    'dark_prismarine_stairs': {
        ingredients: { 'dark_prismarine': 6 },
        pattern: [
            ['D', null, null],
            ['D', 'D', null],
            ['D', 'D', null]
        ],
        output: { item: 'dark_prismarine_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['dark_prismarine', 'crafting_table'],
        description: 'Escaleras de prismarina oscura'
    },
    
    // Losa de prismarina oscura
    'dark_prismarine_slab': {
        ingredients: { 'dark_prismarine': 3 },
        pattern: [
            ['D', 'D', 'D'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'dark_prismarine_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['dark_prismarine', 'crafting_table'],
        description: 'Losas de prismarina oscura'
    },
    
    // Escaleras de ladrillos del end
    'end_stone_brick_stairs': {
        ingredients: { 'end_stone_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'end_stone_brick_stairs', count: 4 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos del end'
    },
    
    // Losa de ladrillos del end
    'end_stone_brick_slab': {
        ingredients: { 'end_stone_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'end_stone_brick_slab', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Losas de ladrillos del end'
    },
    
    // Muro de ladrillos del end
    'end_stone_brick_wall': {
        ingredients: { 'end_stone_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'end_stone_brick_wall', count: 6 },
        category: 'building',
        priority: 60,
        dependencies: ['end_stone_bricks', 'crafting_table'],
        description: 'Muro de ladrillos del end'
    },
    
    // Bloque de lodo
    'mud': {
        ingredients: { 'dirt': 1, 'water_bucket': 1 },
        pattern: [
            ['D', null, null],
            ['W', null, null],
            [null, null, null]
        ],
        output: { item: 'mud', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['dirt', 'water_bucket', 'crafting_table'],
        description: 'Bloque de lodo'
    },
    
    // Ladrillos de lodo
    'mud_bricks': {
        ingredients: { 'packed_mud': 4 },
        pattern: [
            ['P', 'P'],
            ['P', 'P']
        ],
        output: { item: 'mud_bricks', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['packed_mud', 'crafting_table'],
        description: 'Ladrillos de lodo'
    },
    
    // Lodo empaquetado
    'packed_mud': {
        ingredients: { 'mud': 1, 'wheat': 1 },
        pattern: [
            ['M', 'W', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'packed_mud', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['mud', 'wheat', 'crafting_table'],
        description: 'Lodo empaquetado'
    },
    
    // Escaleras de ladrillos de lodo
    'mud_brick_stairs': {
        ingredients: { 'mud_bricks': 6 },
        pattern: [
            ['B', null, null],
            ['B', 'B', null],
            ['B', 'B', null]
        ],
        output: { item: 'mud_brick_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['mud_bricks', 'crafting_table'],
        description: 'Escaleras de ladrillos de lodo'
    },
    
    // Losa de ladrillos de lodo
    'mud_brick_slab': {
        ingredients: { 'mud_bricks': 3 },
        pattern: [
            ['B', 'B', 'B'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'mud_brick_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['mud_bricks', 'crafting_table'],
        description: 'Losas de ladrillos de lodo'
    },
    
    // Muro de ladrillos de lodo
    'mud_brick_wall': {
        ingredients: { 'mud_bricks': 6 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            [null, null, null]
        ],
        output: { item: 'mud_brick_wall', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['mud_bricks', 'crafting_table'],
        description: 'Muro de ladrillos de lodo'
    },
    
    // Escaleras de bambú
    'bamboo_mosaic_stairs': {
        ingredients: { 'bamboo_mosaic': 6 },
        pattern: [
            ['M', null, null],
            ['M', 'M', null],
            ['M', 'M', null]
        ],
        output: { item: 'bamboo_mosaic_stairs', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['bamboo_mosaic', 'crafting_table'],
        description: 'Escaleras de mosaico de bambú'
    },
    
    // Losa de bambú
    'bamboo_mosaic_slab': {
        ingredients: { 'bamboo_mosaic': 3 },
        pattern: [
            ['M', 'M', 'M'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'bamboo_mosaic_slab', count: 6 },
        category: 'building',
        priority: 45,
        dependencies: ['bamboo_mosaic', 'crafting_table'],
        description: 'Losas de mosaico de bambú'
    },
    
    // Mosaico de bambú
    'bamboo_mosaic': {
        ingredients: { 'bamboo_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'bamboo_mosaic', count: 1 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_slab', 'crafting_table'],
        description: 'Mosaico de bambú'
    },
    
    // Escaleras de bambú
    'bamboo_stairs': {
        ingredients: { 'bamboo_planks': 6 },
        pattern: [
            ['P', null, null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'bamboo_stairs', count: 4 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Escaleras de bambú'
    },
    
    // Losa de bambú
    'bamboo_slab': {
        ingredients: { 'bamboo_planks': 3 },
        pattern: [
            ['P', 'P', 'P'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'bamboo_slab', count: 6 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Losas de bambú'
    },
    
    // Muro de bambú
    'bamboo_fence': {
        ingredients: { 'bamboo_planks': 4, 'stick': 2 },
        pattern: [
            ['P', 'S', 'P'],
            ['P', 'S', 'P'],
            [null, null, null]
        ],
        output: { item: 'bamboo_fence', count: 3 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_planks', 'stick', 'crafting_table'],
        description: 'Valla de bambú'
    },
    
    // Puerta de bambú
    'bamboo_door': {
        ingredients: { 'bamboo_planks': 6 },
        pattern: [
            ['P', 'P', null],
            ['P', 'P', null],
            ['P', 'P', null]
        ],
        output: { item: 'bamboo_door', count: 3 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Puerta de bambú'
    },
    
    // Trampilla de bambú
    'bamboo_trapdoor': {
        ingredients: { 'bamboo_planks': 6 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, null, null]
        ],
        output: { item: 'bamboo_trapdoor', count: 2 },
        category: 'building',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Trampilla de bambú'
    },
    
    // Botón de bambú
    'bamboo_button': {
        ingredients: { 'bamboo_planks': 1 },
        pattern: [['P']],
        output: { item: 'bamboo_button', count: 1 },
        category: 'redstone',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Botón de bambú'
    },
    
    // Placa de presión de bambú
    'bamboo_pressure_plate': {
        ingredients: { 'bamboo_planks': 2 },
        pattern: [
            ['P', 'P', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'bamboo_pressure_plate', count: 1 },
        category: 'redstone',
        priority: 40,
        dependencies: ['bamboo_planks', 'crafting_table'],
        description: 'Placa de presión de bambú'
    },
    
    // Señuelo de bambú
    'bamboo_sign': {
        ingredients: { 'bamboo_planks': 6, 'stick': 1 },
        pattern: [
            ['P', 'P', 'P'],
            ['P', 'P', 'P'],
            [null, 'S', null]
        ],
        output: { item: 'bamboo_sign', count: 3 },
        category: 'utility',
        priority: 40,
        dependencies: ['bamboo_planks', 'stick', 'crafting_table'],
        description: 'Cartel de bambú'
    },
    
    // Bloque de bambú
    'bamboo_block': {
        ingredients: { 'bamboo': 9 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'B', 'B'],
            ['B', 'B', 'B']
        ],
        output: { item: 'bamboo_block', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['bamboo', 'crafting_table'],
        description: 'Bloque de bambú'
    },
    
    // Bloque de bambú sin corteza
    'stripped_bamboo_block': {
        ingredients: { 'stripped_bamboo': 4 },
        pattern: [
            ['S', 'S'],
            ['S', 'S']
        ],
        output: { item: 'stripped_bamboo_block', count: 3 },
        category: 'building',
        priority: 40,
        dependencies: ['stripped_bamboo', 'crafting_table'],
        description: 'Bloque de bambú sin corteza'
    },
    
    // ============================================================================
    // NIVEL 6: BANNERS Y DECORACIÓN (Prioridad 61-70)
    // ============================================================================
    
    // Banner
    'white_banner': {
        ingredients: { 'white_wool': 6, 'stick': 1 },
        pattern: [
            ['W', 'W', 'W'],
            ['W', 'W', 'W'],
            [null, 'S', null]
        ],
        output: { item: 'white_banner', count: 1 },
        category: 'decoration',
        priority: 60,
        dependencies: ['white_wool', 'stick', 'crafting_table'],
        description: 'Banner blanco - Decoración'
    },
    
    // Alfombra
    'white_carpet': {
        ingredients: { 'white_wool': 2 },
        pattern: [
            ['W', 'W', null],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'white_carpet', count: 3 },
        category: 'decoration',
        priority: 50,
        dependencies: ['white_wool', 'crafting_table'],
        description: 'Alfombra blanca - Decoración'
    },
    
    // Cristal
    'glass': {
        ingredients: { 'sand': 1 },
        pattern: [],
        output: { item: 'glass', count: 1 },
        category: 'building',
        priority: 35,
        dependencies: ['sand'],
        description: 'Cristal - Se obtiene horneando arena',
        obtainable: 'smelted'
    },
    
    // Panel de cristal
    'glass_pane': {
        ingredients: { 'glass': 6 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'G', 'G'],
            [null, null, null]
        ],
        output: { item: 'glass_pane', count: 16 },
        category: 'building',
        priority: 40,
        dependencies: ['glass', 'crafting_table'],
        description: 'Panel de cristal'
    },
    
    // Cristal teñido
    'white_stained_glass': {
        ingredients: { 'glass': 8, 'white_dye': 1 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'D', 'G'],
            ['G', 'G', 'G']
        ],
        output: { item: 'white_stained_glass', count: 8 },
        category: 'building',
        priority: 45,
        dependencies: ['glass', 'white_dye', 'crafting_table'],
        description: 'Cristal teñido blanco'
    },
    
    // Panel de cristal teñido
    'white_stained_glass_pane': {
        ingredients: { 'white_stained_glass': 6 },
        pattern: [
            ['G', 'G', 'G'],
            ['G', 'G', 'G'],
            [null, null, null]
        ],
        output: { item: 'white_stained_glass_pane', count: 16 },
        category: 'building',
        priority: 50,
        dependencies: ['white_stained_glass', 'crafting_table'],
        description: 'Panel de cristal teñido blanco'
    },
    
    // Barra de hierro
    'iron_bars': {
        ingredients: { 'iron_ingot': 6 },
        pattern: [
            ['I', 'I', 'I'],
            ['I', 'I', 'I'],
            [null, null, null]
        ],
        output: { item: 'iron_bars', count: 16 },
        category: 'building',
        priority: 40,
        dependencies: ['iron_ingot', 'crafting_table'],
        description: 'Barra de hierro'
    },
    
    // Cadena
    'chain': {
        ingredients: { 'iron_nugget': 2, 'iron_ingot': 1 },
        pattern: [
            ['N', null, null],
            ['I', null, null],
            ['N', null, null]
        ],
        output: { item: 'chain', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['iron_nugget', 'iron_ingot', 'crafting_table'],
        description: 'Cadena - Decoración'
    },
    
    // Varilla de pararrayos
    'lightning_rod': {
        ingredients: { 'copper_ingot': 3 },
        pattern: [
            ['C', null, null],
            ['C', null, null],
            ['C', null, null]
        ],
        output: { item: 'lightning_rod', count: 1 },
        category: 'utility',
        priority: 45,
        dependencies: ['copper_ingot', 'crafting_table'],
        description: 'Varilla de pararrayos'
    },
    
    // Catalejo
    'spyglass': {
        ingredients: { 'amethyst_shard': 1, 'copper_ingot': 2 },
        pattern: [
            [null, 'A', null],
            [null, 'C', null],
            [null, 'C', null]
        ],
        output: { item: 'spyglass', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: ['amethyst_shard', 'copper_ingot', 'crafting_table'],
        description: 'Catalejo - Zoom'
    },
    
    // Pincel
    'brush': {
        ingredients: { 'feather': 1, 'copper_ingot': 1, 'stick': 1 },
        pattern: [
            [null, 'F', null],
            [null, 'C', null],
            [null, 'S', null]
        ],
        output: { item: 'brush', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: ['feather', 'copper_ingot', 'stick', 'crafting_table'],
        description: 'Pincel - Para arqueología'
    },
    
    // Bloque de cobre cortado
    'cut_copper': {
        ingredients: { 'copper_block': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'cut_copper', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['copper_block', 'crafting_table'],
        description: 'Bloque de cobre cortado'
    },
    
    // Escaleras de cobre cortado
    'cut_copper_stairs': {
        ingredients: { 'cut_copper': 6 },
        pattern: [
            ['C', null, null],
            ['C', 'C', null],
            ['C', 'C', null]
        ],
        output: { item: 'cut_copper_stairs', count: 4 },
        category: 'building',
        priority: 50,
        dependencies: ['cut_copper', 'crafting_table'],
        description: 'Escaleras de cobre cortado'
    },
    
    // Losa de cobre cortado
    'cut_copper_slab': {
        ingredients: { 'cut_copper': 3 },
        pattern: [
            ['C', 'C', 'C'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'cut_copper_slab', count: 6 },
        category: 'building',
        priority: 50,
        dependencies: ['cut_copper', 'crafting_table'],
        description: 'Losas de cobre cortado'
    },
    
    // Cobre encerado
    'waxed_copper_block': {
        ingredients: { 'copper_block': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_copper_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['copper_block', 'honeycomb', 'crafting_table'],
        description: 'Bloque de cobre encerado'
    },
    
    // Cobre cortado encerado
    'waxed_cut_copper': {
        ingredients: { 'cut_copper': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_cut_copper', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['cut_copper', 'honeycomb', 'crafting_table'],
        description: 'Cobre cortado encerado'
    },
    
    // Escaleras de cobre cortado encerado
    'waxed_cut_copper_stairs': {
        ingredients: { 'waxed_cut_copper': 6 },
        pattern: [
            ['C', null, null],
            ['C', 'C', null],
            ['C', 'C', null]
        ],
        output: { item: 'waxed_cut_copper_stairs', count: 4 },
        category: 'building',
        priority: 55,
        dependencies: ['waxed_cut_copper', 'crafting_table'],
        description: 'Escaleras de cobre cortado encerado'
    },
    
    // Losa de cobre cortado encerado
    'waxed_cut_copper_slab': {
        ingredients: { 'waxed_cut_copper': 3 },
        pattern: [
            ['C', 'C', 'C'],
            [null, null, null],
            [null, null, null]
        ],
        output: { item: 'waxed_cut_copper_slab', count: 6 },
        category: 'building',
        priority: 55,
        dependencies: ['waxed_cut_copper', 'crafting_table'],
        description: 'Losas de cobre cortado encerado'
    },
    
    // Cobre expuesto
    'exposed_copper': {
        ingredients: {},
        pattern: [],
        output: { item: 'exposed_copper', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['copper_block'],
        description: 'Cobre expuesto - Se obtiene por oxidación',
        obtainable: 'oxidation'
    },
    
    // Cobre erosionado
    'weathered_copper': {
        ingredients: {},
        pattern: [],
        output: { item: 'weathered_copper', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['exposed_copper'],
        description: 'Cobre erosionado - Se obtiene por oxidación',
        obtainable: 'oxidation'
    },
    
    // Cobre oxidado
    'oxidized_copper': {
        ingredients: {},
        pattern: [],
        output: { item: 'oxidized_copper', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['weathered_copper'],
        description: 'Cobre oxidado - Se obtiene por oxidación',
        obtainable: 'oxidation'
    },
    
    // Cobre expuesto encerado
    'waxed_exposed_copper': {
        ingredients: { 'exposed_copper': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_exposed_copper', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['exposed_copper', 'honeycomb', 'crafting_table'],
        description: 'Cobre expuesto encerado'
    },
    
    // Cobre erosionado encerado
    'waxed_weathered_copper': {
        ingredients: { 'weathered_copper': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_weathered_copper', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['weathered_copper', 'honeycomb', 'crafting_table'],
        description: 'Cobre erosionado encerado'
    },
    
    // Cobre oxidado encerado
    'waxed_oxidized_copper': {
        ingredients: { 'oxidized_copper': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_oxidized_copper', count: 1 },
        category: 'building',
        priority: 60,
        dependencies: ['oxidized_copper', 'honeycomb', 'crafting_table'],
        description: 'Cobre oxidado encerado'
    },
    
    // Rejilla de cobre
    'copper_grate': {
        ingredients: { 'copper_ingot': 4 },
        pattern: [
            ['C', 'C'],
            ['C', 'C']
        ],
        output: { item: 'copper_grate', count: 4 },
        category: 'building',
        priority: 45,
        dependencies: ['copper_ingot', 'crafting_table'],
        description: 'Rejilla de cobre'
    },
    
    // Rejilla de cobre encerada
    'waxed_copper_grate': {
        ingredients: { 'copper_grate': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'G', null],
            [null, null, null]
        ],
        output: { item: 'waxed_copper_grate', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['copper_grate', 'honeycomb', 'crafting_table'],
        description: 'Rejilla de cobre encerada'
    },
    
    // Cobre tallado
    'chiseled_copper': {
        ingredients: { 'cut_copper_slab': 2 },
        pattern: [
            ['S', null, null],
            ['S', null, null],
            [null, null, null]
        ],
        output: { item: 'chiseled_copper', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['cut_copper_slab', 'crafting_table'],
        description: 'Cobre tallado'
    },
    
    // Cobre tallado encerado
    'waxed_chiseled_copper': {
        ingredients: { 'chiseled_copper': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'waxed_chiseled_copper', count: 1 },
        category: 'building',
        priority: 55,
        dependencies: ['chiseled_copper', 'honeycomb', 'crafting_table'],
        description: 'Cobre tallado encerado'
    },
    
    // Bloque de amatista
    'amethyst_block': {
        ingredients: { 'amethyst_shard': 4 },
        pattern: [
            ['A', 'A'],
            ['A', 'A']
        ],
        output: { item: 'amethyst_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['amethyst_shard', 'crafting_table'],
        description: 'Bloque de amatista'
    },
    
    // Amatista brotante
    'budding_amethyst': {
        ingredients: {},
        pattern: [],
        output: { item: 'budding_amethyst', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: [],
        description: 'Amatista brotante - No se puede craftear, solo en geodas',
        obtainable: 'amethyst_geode'
    },
    
    // Cristal de amatista grande
    'large_amethyst_bud': {
        ingredients: {},
        pattern: [],
        output: { item: 'large_amethyst_bud', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['budding_amethyst'],
        description: 'Cristal de amatista grande - Crece de budding amethyst',
        obtainable: 'grown'
    },
    
    // Cristal de amatista mediano
    'medium_amethyst_bud': {
        ingredients: {},
        pattern: [],
        output: { item: 'medium_amethyst_bud', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['budding_amethyst'],
        description: 'Cristal de amatista mediano - Crece de budding amethyst',
        obtainable: 'grown'
    },
    
    // Cristal de amatista pequeño
    'small_amethyst_bud': {
        ingredients: {},
        pattern: [],
        output: { item: 'small_amethyst_bud', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['budding_amethyst'],
        description: 'Cristal de amatista pequeño - Crece de budding amethyst',
        obtainable: 'grown'
    },
    
    // Bloque de goteo
    'dripstone_block': {
        ingredients: { 'pointed_dripstone': 4 },
        pattern: [
            ['P', 'P'],
            ['P', 'P']
        ],
        output: { item: 'dripstone_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['pointed_dripstone', 'crafting_table'],
        description: 'Bloque de goteo'
    },
    
    // Estalactita
    'pointed_dripstone': {
        ingredients: {},
        pattern: [],
        output: { item: 'pointed_dripstone', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['dripstone_block'],
        description: 'Estalactita - Crece de dripstone block',
        obtainable: 'grown'
    },
    
    // Vidrio tintado
    'tinted_glass': {
        ingredients: { 'glass': 4, 'amethyst_shard': 1 },
        pattern: [
            [null, 'A', null],
            ['G', 'G', 'G'],
            [null, null, null]
        ],
        output: { item: 'tinted_glass', count: 2 },
        category: 'building',
        priority: 50,
        dependencies: ['glass', 'amethyst_shard', 'crafting_table'],
        description: 'Vidrio tintado - Bloquea luz'
    },
    
    // ============================================================================
    // NIVEL 7: AVANZADO Y END GAME (Prioridad 71-100)
    // ============================================================================
    
    // Bloque de netherite (ya definido)
    
    // Faro (ya definido)
    
    // Ancla de respawn
    'respawn_anchor': {
        ingredients: { 'crying_obsidian': 6, 'glowstone': 3 },
        pattern: [
            ['C', 'C', 'C'],
            ['G', 'G', 'G'],
            ['C', 'C', 'C']
        ],
        output: { item: 'respawn_anchor', count: 1 },
        category: 'utility',
        priority: 70,
        dependencies: ['crying_obsidian', 'glowstone', 'crafting_table'],
        description: 'Ancla de respawn - Respawn en el Nether'
    },
    
    // Piedra de imán
    'lodestone': {
        ingredients: { 'chiseled_stone_bricks': 8, 'netherite_ingot': 1 },
        pattern: [
            ['B', 'B', 'B'],
            ['B', 'N', 'B'],
            ['B', 'B', 'B']
        ],
        output: { item: 'lodestone', count: 1 },
        category: 'utility',
        priority: 70,
        dependencies: ['chiseled_stone_bricks', 'netherite_ingot', 'crafting_table'],
        description: 'Piedra de imán - Brújula apunta aquí'
    },
    
    // Campana
    'bell': {
        ingredients: { 'gold_ingot': 1, 'stone': 1 },
        pattern: [
            [null, 'G', null],
            [null, 'S', null],
            [null, null, null]
        ],
        output: { item: 'bell', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: ['gold_ingot', 'stone', 'crafting_table'],
        description: 'Campana - Suena al ser golpeada'
    },
    
    // Colmena
    'beehive': {
        ingredients: { 'any_planks': 6, 'honeycomb': 3 },
        pattern: [
            ['P', 'P', 'P'],
            ['H', 'H', 'H'],
            ['P', 'P', 'P']
        ],
        output: { item: 'beehive', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: ['any_planks', 'honeycomb', 'crafting_table'],
        description: 'Colmena - Abejas artificiales'
    },
    
    // Nido de abejas
    'bee_nest': {
        ingredients: {},
        pattern: [],
        output: { item: 'bee_nest', count: 1 },
        category: 'utility',
        priority: 50,
        dependencies: [],
        description: 'Nido de abejas - Natural, no crafteable',
        obtainable: 'natural'
    },
    
    // Bloque de miel
    'honey_block': {
        ingredients: { 'honey_bottle': 4 },
        pattern: [
            ['H', 'H'],
            ['H', 'H']
        ],
        output: { item: 'honey_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['honey_bottle', 'crafting_table'],
        description: 'Bloque de miel - Pegajoso'
    },
    
    // Bloque de panal
    'honeycomb_block': {
        ingredients: { 'honeycomb': 4 },
        pattern: [
            ['H', 'H'],
            ['H', 'H']
        ],
        output: { item: 'honeycomb_block', count: 1 },
        category: 'building',
        priority: 45,
        dependencies: ['honeycomb', 'crafting_table'],
        description: 'Bloque de panal'
    },
    
    // Vela
    'white_candle': {
        ingredients: { 'string': 1, 'honeycomb': 1 },
        pattern: [
            [null, 'H', null],
            [null, 'S', null],
            [null, null, null]
        ],
        output: { item: 'white_candle', count: 1 },
        category: 'decoration',
        priority: 45,
        dependencies: ['string', 'honeycomb', 'crafting_table'],
        description: 'Vela blanca - Iluminación'
    },
    
    // Vela teñida
    'white_candle': {
        ingredients: { 'candle': 1, 'white_dye': 1 },
        pattern: [
            [null, 'D', null],
            [null, 'C', null],
            [null, null, null]
        ],
        output: { item: 'white_candle', count: 1 },
        category: 'decoration',
        priority: 50,
        dependencies: ['candle', 'white_dye', 'crafting_table'],
        description: 'Vela teñida blanca'
    },
    
    // Esponja
    'sponge': {
        ingredients: {},
        pattern: [],
        output: { item: 'sponge', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: [],
        description: 'Esponja - Absorbe agua (monument ocean)',
        obtainable: 'ocean_monument'
    },
    
    // Esponja húmeda
    'wet_sponge': {
        ingredients: {},
        pattern: [],
        output: { item: 'wet_sponge', count: 1 },
        category: 'building',
        priority: 50,
        dependencies: ['sponge'],
        description: 'Esponja húmeda - Se obtiene al absorber agua',
        obtainable: 'used'
    },
    
    // Linterna de mar (ya definida)
    
    // Prismarina (ya definida)
    
    // ============================================================================
    // FIN DE LAS RECETAS
    // ============================================================================
};

// ============================================================================
// JERARQUÍA DE PROGRESIÓN
// ============================================================================

/**
 * Jerarquía de prioridad de crafteos para progresión óptima en survival
 * 
 * El bot debe seguir este orden para maximizar su eficiencia:
 * 1. Supervivencia básica (comida, refugio, luz)
 * 2. Herramientas de madera
 * 3. Herramientas de piedra
 * 4. Horno y comida cocinada
 * 5. Herramientas de hierro
 * 6. Armadura de hierro
 * 7. Herramientas de diamante
 * 8. Armadura de diamante
 * 9. Nether y preparación para ender dragon
 * 10. End game (netherite, beacon, etc.)
 */
export const PROGRESSION_HIERARCHY = [
    // FASE 1: SUPERVIVENCIA INMEDIATA (Priority 1-10)
    {
        phase: 1,
        name: 'Supervivencia Básica',
        priority: 1,
        items: [
            'crafting_table',
            'wooden_pickaxe',
            'wooden_axe',
            'wooden_sword',
            'torch',
            'furnace',
            'bowl',
            'stick'
        ],
        goals: ['Conseguir madera', 'Hacer herramientas básicas', 'Iluminación', 'Cocinar comida']
    },
    
    // FASE 2: PROGRESO A PIEDRA (Priority 11-20)
    {
        phase: 2,
        name: 'Herramientas de Piedra',
        priority: 2,
        items: [
            'stone_pickaxe',
            'stone_axe',
            'stone_sword',
            'stone_shovel',
            'stone_hoe',
            'chest',
            'bed'
        ],
        goals: ['Minar piedra', 'Minar carbón', 'Minar hierro', 'Dormir para evitar mobs']
    },
    
    // FASE 3: HIERRO TEMPRANO (Priority 21-30)
    {
        phase: 3,
        name: 'Hierro y Agricultura',
        priority: 3,
        items: [
            'iron_pickaxe',
            'iron_axe',
            'iron_sword',
            'bucket',
            'shield',
            'hopper',
            'composter',
            'farming_tools'
        ],
        goals: ['Minar diamantes', 'Crear granja de comida', 'Preparar para Nether']
    },
    
    // FASE 4: PREPARACIÓN NETHER (Priority 31-40)
    {
        phase: 4,
        name: 'Preparación para el Nether',
        priority: 4,
        items: [
            'flint_and_steel',
            'golden_armor',
            'bow',
            'arrows',
            'brewing_stand',
            'cauldron'
        ],
        goals: ['Construir portal', 'Preparar armor de oro', 'Crear pociones']
    },
    
    // FASE 5: NETHER (Priority 41-50)
    {
        phase: 5,
        name: 'Exploración del Nether',
        priority: 5,
        items: [
            'blaze_powder',
            'eye_of_ender',
            'ender_chest',
            'golden_apple',
            'fire_resistance_potion'
        ],
        goals: ['Encontrar fortress', 'Conseguir blaze rods', 'Preparar ojos de ender']
    },
    
    // FASE 6: DIAMANTE (Priority 51-60)
    {
        phase: 6,
        name: 'Equipamiento de Diamante',
        priority: 6,
        items: [
            'diamond_pickaxe',
            'diamond_axe',
            'diamond_sword',
            'diamond_armor',
            'enchanting_table',
            'bookshelf'
        ],
        goals: ['Minar obsidiana', 'Encantar equipo', 'Preparar para End']
    },
    
    // FASE 7: ENDER DRAGON (Priority 61-70)
    {
        phase: 7,
        name: 'Preparación para el Dragón',
        priority: 7,
        items: [
            'end_crystal',
            'ender_pearl',
            'slow_falling_potion',
            'water_bucket',
            'pumpkin'
        ],
        goals: ['Encontrar stronghold', 'Activar portal del End', 'Preparar batalla']
    },
    
    // FASE 8: END CITY (Priority 71-80)
    {
        phase: 8,
        name: 'End Cities y Elytra',
        priority: 8,
        items: [
            'elytra',
            'shulker_box',
            'dragon_head',
            'end_rod'
        ],
        goals: ['Derrotar dragón', 'Explorar End Cities', 'Conseguir Elytra']
    },
    
    // FASE 9: NETHERITE (Priority 81-90)
    {
        phase: 9,
        name: 'Upgrade a Netherite',
        priority: 9,
        items: [
            'netherite_scrap',
            'netherite_ingot',
            'netherite_armor',
            'netherite_tools',
            'smithing_table'
        ],
        goals: ['Minar ancient debris', 'Craftear netherite', 'Mejorar todo el equipo']
    },
    
    // FASE 10: END GAME (Priority 91-100)
    {
        phase: 10,
        name: 'End Game',
        priority: 10,
        items: [
            'beacon',
            'nether_star',
            'conduit',
            'totem_of_undying'
        ],
        goals: ['Derrotar Wither', 'Activar beacon', 'Explorar todo']
    }
];

// ============================================================================
// DEPENDENCIAS DE CRAFTING
// ============================================================================

/**
 * Árbol de dependencias para cada item
 * Define qué se necesita para poder craftear cada cosa
 */
export const CRAFTING_DEPENDENCIES = {
    // Herramientas básicas
    'wooden_pickaxe': ['any_planks', 'stick', 'crafting_table'],
    'stone_pickaxe': ['cobblestone', 'stick', 'crafting_table'],
    'iron_pickaxe': ['iron_ingot', 'stick', 'crafting_table'],
    'diamond_pickaxe': ['diamond', 'stick', 'crafting_table'],
    'netherite_pickaxe': ['diamond_pickaxe', 'netherite_ingot', 'smithing_table'],
    
    // Armas
    'wooden_sword': ['any_planks', 'stick', 'crafting_table'],
    'stone_sword': ['cobblestone', 'stick', 'crafting_table'],
    'iron_sword': ['iron_ingot', 'stick', 'crafting_table'],
    'diamond_sword': ['diamond', 'stick', 'crafting_table'],
    'bow': ['stick', 'string', 'crafting_table'],
    'crossbow': ['stick', 'iron_ingot', 'string', 'tripwire_hook', 'crafting_table'],
    
    // Armaduras
    'leather_helmet': ['leather', 'crafting_table'],
    'iron_helmet': ['iron_ingot', 'crafting_table'],
    'diamond_helmet': ['diamond', 'crafting_table'],
    'netherite_helmet': ['diamond_helmet', 'netherite_ingot', 'smithing_table'],
    
    // Utilidades esenciales
    'crafting_table': ['any_planks'],
    'furnace': ['cobblestone'],
    'chest': ['any_planks'],
    'bed': ['any_wool', 'any_planks'],
    'torch': ['coal', 'stick'],
    
    // Nether
    'flint_and_steel': ['iron_ingot', 'flint'],
    'golden_armor': ['gold_ingot', 'crafting_table'],
    'brewing_stand': ['blaze_rod', 'cobblestone'],
    
    // End
    'eye_of_ender': ['blaze_powder', 'ender_pearl'],
    'end_crystal': ['glass', 'eye_of_ender', 'ghast_tear'],
    
    // Netherite
    'netherite_scrap': ['ancient_debris'], // Se obtiene horneando
    'netherite_ingot': ['netherite_scrap', 'gold_ingot'],
    'smithing_table': ['any_planks', 'iron_ingot'],
    
    // Beacons
    'beacon': ['glass', 'obsidian', 'nether_star'],
    'nether_star': ['wither'], // Se obtiene derrotando al Wither
};

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Obtener todas las recetas para un item específico
 */
export function getRecipeForItem(itemName) {
    return CRAFTING_RECIPES[itemName] || null;
}

/**
 * Obtener todas las recetas de una categoría
 */
export function getRecipesByCategory(category) {
    return Object.entries(CRAFTING_RECIPES)
        .filter(([_, recipe]) => recipe.category === category)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Obtener recetas por prioridad (rango)
 */
export function getRecipesByPriority(minPriority, maxPriority) {
    return Object.entries(CRAFTING_RECIPES)
        .filter(([_, recipe]) => recipe.priority >= minPriority && recipe.priority <= maxPriority)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Verificar si se pueden craftear los ingredientes dados
 */
export function canCraft(recipe, inventory) {
    if (!recipe) return false;
    
    for (const [ingredient, count] of Object.entries(recipe.ingredients)) {
        const available = getIngredientCount(ingredient, inventory);
        if (available < count) return false;
    }
    
    return true;
}

/**
 * Obtener cantidad de un ingrediente en el inventario
 */
function getIngredientCount(ingredient, inventory) {
    // Manejar ingredientes especiales
    if (ingredient === 'any_planks') {
        const plankTypes = ['oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks',
                           'acacia_planks', 'dark_oak_planks', 'mangrove_planks', 'cherry_planks',
                           'bamboo_planks', 'crimson_planks', 'warped_planks'];
        return plankTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
    }
    
    if (ingredient === 'any_log') {
        const logTypes = ['oak_log', 'birch_log', 'spruce_log', 'jungle_log',
                         'acacia_log', 'dark_oak_log', 'mangrove_log', 'cherry_log'];
        return logTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
    }
    
    if (ingredient === 'any_wool') {
        const woolTypes = ['white_wool', 'orange_wool', 'magenta_wool', 'light_blue_wool',
                          'yellow_wool', 'lime_wool', 'pink_wool', 'gray_wool',
                          'light_gray_wool', 'cyan_wool', 'purple_wool', 'blue_wool',
                          'brown_wool', 'green_wool', 'red_wool', 'black_wool'];
        return woolTypes.reduce((sum, type) => sum + (inventory[type] || 0), 0);
    }
    
    return inventory[ingredient] || 0;
}

/**
 * Obtener el siguiente item a craftear basado en el progreso actual
 */
export function getNextCraftingGoal(inventory, currentPhase = 1) {
    const phase = PROGRESSION_HIERARCHY.find(p => p.phase === currentPhase);
    if (!phase) return null;
    
    for (const item of phase.items) {
        const recipe = getRecipeForItem(item);
        if (recipe && canCraft(recipe, inventory)) {
            return { item, recipe, phase: phase.name };
        }
    }
    
    return null;
}

/**
 * Obtener todos los items necesarios para un objetivo final
 */
export function getRequiredItemsForGoal(goalItem) {
    const requirements = [];
    const visited = new Set();
    
    function traverse(item) {
        if (visited.has(item)) return;
        visited.add(item);
        
        const recipe = getRecipeForItem(item);
        if (recipe && recipe.dependencies) {
            for (const dep of recipe.dependencies) {
                requirements.push(dep);
                traverse(dep);
            }
        }
    }
    
    traverse(goalItem);
    return [...new Set(requirements)];
}

export default {
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
};
