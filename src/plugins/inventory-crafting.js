/**
 * Plugin de Crafteo en Inventario 2x2
 * 
 * Extiende mineflayer para permitir crafteo en la grilla 2x2 del inventario
 * sin necesidad de una crafting table.
 * 
 * @module plugins/inventory-crafting
 */

import structuredLogger from '../utils/logger.js';

/**
 * Clase para manejar el crafteo en inventario 2x2
 */
export default class InventoryCraftingPlugin {
    constructor(bot) {
        this.bot = bot;
        this.craftingWindow = null;
        
        // Extender el bot con nuevos métodos
        this.bot.craftInInventory = this.craftInInventory.bind(this);
        this.bot.recipesForInInventory = this.recipesForInInventory.bind(this);
        
        structuredLogger.info('🔌 Plugin InventoryCrafting inicializado');
    }

    /**
     * Obtener recetas disponibles para un item en la grilla 2x2
     * @param {number} itemId - ID del item a craftear
     * @param {Array} ingredients - Ingredientes disponibles (opcional)
     * @param {number} count - Cantidad a craftear
     * @param {Object} craftingTable - Ventana de crafteo (null para inventario)
     * @returns {Array} Recetas disponibles
     */
    recipesForInInventory(itemId, ingredients, count, craftingTable) {
        // Si craftingTable es null o 0, usamos la grilla 2x2 del inventario
        if (craftingTable === null || craftingTable === 0) {
            return this.get2x2Recipes(itemId, ingredients, count);
        }
        
        // Usar el método normal de mineflayer
        return this.bot.recipesFor(itemId, ingredients, count, craftingTable);
    }

    /**
     * Obtener recetas 2x2 disponibles
     */
    get2x2Recipes(itemId, ingredients, count) {
        const registry = this.bot.registry;
        const recipes = [];
        
        // Recetas 2x2 conocidas para Minecraft 1.20.1
        const recipes2x2 = {
            // Crafting Table
            'crafting_table': {
                pattern: [
                    ['any_planks', 'any_planks'],
                    ['any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['crafting_table'].id, count: 1 }
            },
            // Sticks
            'stick': {
                pattern: [
                    ['any_planks', null],
                    ['any_planks', null]
                ],
                output: { id: registry.itemsByName['stick'].id, count: 4 }
            },
            // Planks (es 1x1 pero lo incluimos)
            'oak_planks': {
                pattern: [['oak_log']],
                output: { id: registry.itemsByName['oak_planks'].id, count: 4 }
            },
            'birch_planks': {
                pattern: [['birch_log']],
                output: { id: registry.itemsByName['birch_planks'].id, count: 4 }
            },
            'spruce_planks': {
                pattern: [['spruce_log']],
                output: { id: registry.itemsByName['spruce_planks'].id, count: 4 }
            },
            'jungle_planks': {
                pattern: [['jungle_log']],
                output: { id: registry.itemsByName['jungle_planks'].id, count: 4 }
            },
            'acacia_planks': {
                pattern: [['acacia_log']],
                output: { id: registry.itemsByName['acacia_planks'].id, count: 4 }
            },
            'dark_oak_planks': {
                pattern: [['dark_oak_log']],
                output: { id: registry.itemsByName['dark_oak_planks'].id, count: 4 }
            },
            'mangrove_planks': {
                pattern: [['mangrove_log']],
                output: { id: registry.itemsByName['mangrove_planks'].id, count: 4 }
            },
            'cherry_planks': {
                pattern: [['cherry_log']],
                output: { id: registry.itemsByName['cherry_planks'].id, count: 4 }
            },
            // Wooden Slabs
            'oak_slab': {
                pattern: [['oak_planks', 'oak_planks', 'oak_planks']],
                output: { id: registry.itemsByName['oak_slab'].id, count: 6 }
            },
            // Wooden Buttons
            'oak_button': {
                pattern: [['oak_planks']],
                output: { id: registry.itemsByName['oak_button'].id, count: 1 }
            },
            // Wooden Pressure Plates
            'oak_pressure_plate': {
                pattern: [['oak_planks', 'oak_planks']],
                output: { id: registry.itemsByName['oak_pressure_plate'].id, count: 1 }
            },
            // Stairs
            'oak_stairs': {
                pattern: [
                    ['oak_planks', null, null],
                    ['oak_planks', 'oak_planks', null],
                    ['oak_planks', 'oak_planks', null]
                ],
                output: { id: registry.itemsByName['oak_stairs'].id, count: 4 }
            },
            // Fences
            'oak_fence': {
                pattern: [
                    ['oak_planks', 'stick', 'oak_planks'],
                    ['oak_planks', 'stick', 'oak_planks']
                ],
                output: { id: registry.itemsByName['oak_fence'].id, count: 3 }
            },
            // Fence Gates
            'oak_fence_gate': {
                pattern: [
                    ['stick', 'oak_planks', 'stick'],
                    ['stick', 'oak_planks', 'stick']
                ],
                output: { id: registry.itemsByName['oak_fence_gate'].id, count: 1 }
            },
            // Doors
            'oak_door': {
                pattern: [
                    ['oak_planks', 'oak_planks'],
                    ['oak_planks', 'oak_planks'],
                    ['oak_planks', 'oak_planks']
                ],
                output: { id: registry.itemsByName['oak_door'].id, count: 3 }
            },
            // Trapdoors
            'oak_trapdoor': {
                pattern: [
                    ['oak_planks', 'oak_planks', 'oak_planks'],
                    ['oak_planks', 'oak_planks', 'oak_planks']
                ],
                output: { id: registry.itemsByName['oak_trapdoor'].id, count: 2 }
            },
            // Signs
            'oak_sign': {
                pattern: [
                    ['oak_planks', 'oak_planks', 'oak_planks'],
                    ['oak_planks', 'oak_planks', 'oak_planks'],
                    [null, 'stick', null]
                ],
                output: { id: registry.itemsByName['oak_sign'].id, count: 3 }
            },
            // Boats
            'oak_boat': {
                pattern: [
                    ['oak_planks', null, 'oak_planks'],
                    ['oak_planks', 'oak_planks', 'oak_planks']
                ],
                output: { id: registry.itemsByName['oak_boat'].id, count: 1 }
            },
            // Ladders
            'ladder': {
                pattern: [
                    ['stick', null, 'stick'],
                    ['stick', 'stick', 'stick'],
                    ['stick', null, 'stick']
                ],
                output: { id: registry.itemsByName['ladder'].id, count: 3 }
            },
            // Torches
            'torch': {
                pattern: [
                    ['coal', null, null],
                    ['stick', null, null]
                ],
                output: { id: registry.itemsByName['torch'].id, count: 4 }
            },
            // Soul Torches
            'soul_torch': {
                pattern: [
                    ['coal', null, null],
                    ['stick', null, null],
                    ['soul_sand', null, null]
                ],
                output: { id: registry.itemsByName['soul_torch'].id, count: 4 }
            },
            // Chest
            'chest': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['any_planks', null, 'any_planks'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['chest'].id, count: 1 }
            },
            // Barrel
            'barrel': {
                pattern: [
                    ['any_planks', 'any_slab', 'any_planks'],
                    ['any_planks', null, 'any_planks'],
                    ['any_planks', 'any_slab', 'any_planks']
                ],
                output: { id: registry.itemsByName['barrel'].id, count: 1 }
            },
            // Cartography Table
            'cartography_table': {
                pattern: [
                    ['paper', 'paper', null],
                    ['any_planks', 'any_planks', null],
                    ['any_planks', 'any_planks', null]
                ],
                output: { id: registry.itemsByName['cartography_table'].id, count: 1 }
            },
            // Fletching Table
            'fletching_table': {
                pattern: [
                    ['flint', 'flint', null],
                    ['any_planks', 'any_planks', null],
                    ['any_planks', 'any_planks', null]
                ],
                output: { id: registry.itemsByName['fletching_table'].id, count: 1 }
            },
            // Smithing Table
            'smithing_table': {
                pattern: [
                    ['iron_ingot', 'iron_ingot', null],
                    ['any_planks', 'any_planks', null],
                    ['any_planks', 'any_planks', null]
                ],
                output: { id: registry.itemsByName['smithing_table'].id, count: 1 }
            },
            // Lectern
            'lectern': {
                pattern: [
                    [null, 'any_slab', null],
                    [null, 'bookshelf', null],
                    [null, 'any_slab', null]
                ],
                output: { id: registry.itemsByName['lectern'].id, count: 1 }
            },
            // Composter
            'composter': {
                pattern: [
                    ['any_planks', null, 'any_planks'],
                    ['any_planks', null, 'any_planks'],
                    ['any_slab', 'any_slab', 'any_slab']
                ],
                output: { id: registry.itemsByName['composter'].id, count: 1 }
            },
            // Loom
            'loom': {
                pattern: [
                    ['string', 'string', null],
                    ['any_planks', null, null],
                    ['any_planks', null, null]
                ],
                output: { id: registry.itemsByName['loom'].id, count: 1 }
            },
            // Scaffolding
            'scaffolding': {
                pattern: [
                    ['bamboo', 'string', 'bamboo'],
                    ['bamboo', null, 'bamboo'],
                    ['bamboo', null, 'bamboo']
                ],
                output: { id: registry.itemsByName['scaffolding'].id, count: 6 }
            },
            // Beehive
            'beehive': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['honeycomb', 'honeycomb', 'honeycomb'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['beehive'].id, count: 1 }
            },
            // Honey Block
            'honey_block': {
                pattern: [
                    ['honey_bottle', 'honey_bottle'],
                    ['honey_bottle', 'honey_bottle']
                ],
                output: { id: registry.itemsByName['honey_block'].id, count: 1 }
            },
            // Honeycomb Block
            'honeycomb_block': {
                pattern: [
                    ['honeycomb', 'honeycomb'],
                    ['honeycomb', 'honeycomb']
                ],
                output: { id: registry.itemsByName['honeycomb_block'].id, count: 1 }
            },
            // Wax variants
            'waxed_copper_block': {
                pattern: [
                    ['honeycomb', null, null],
                    ['copper_block', null, null]
                ],
                output: { id: registry.itemsByName['waxed_copper_block'].id, count: 1 }
            },
            // Block of Iron/Gold/Diamond/etc (9 items)
            'iron_block': {
                pattern: [
                    ['iron_ingot', 'iron_ingot', 'iron_ingot'],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot'],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['iron_block'].id, count: 1 }
            },
            // Slime Block
            'slime_block': {
                pattern: [
                    ['slimeball', 'slimeball', 'slimeball'],
                    ['slimeball', 'slimeball', 'slimeball'],
                    ['slimeball', 'slimeball', 'slimeball']
                ],
                output: { id: registry.itemsByName['slime_block'].id, count: 1 }
            },
            // Magma Block
            'magma_block': {
                pattern: [
                    ['magma_cream', 'magma_cream'],
                    ['magma_cream', 'magma_cream']
                ],
                output: { id: registry.itemsByName['magma_block'].id, count: 1 }
            },
            // Bone Block
            'bone_block': {
                pattern: [
                    ['bone_meal', 'bone_meal', 'bone_meal'],
                    ['bone_meal', 'bone_meal', 'bone_meal'],
                    ['bone_meal', 'bone_meal', 'bone_meal']
                ],
                output: { id: registry.itemsByName['bone_block'].id, count: 1 }
            },
            // Dried Kelp Block
            'dried_kelp_block': {
                pattern: [
                    ['dried_kelp', 'dried_kelp', 'dried_kelp'],
                    ['dried_kelp', 'dried_kelp', 'dried_kelp'],
                    ['dried_kelp', 'dried_kelp', 'dried_kelp']
                ],
                output: { id: registry.itemsByName['dried_kelp_block'].id, count: 1 }
            },
            // Hay Bale
            'hay_block': {
                pattern: [
                    ['wheat', 'wheat', 'wheat'],
                    ['wheat', 'wheat', 'wheat'],
                    ['wheat', 'wheat', 'wheat']
                ],
                output: { id: registry.itemsByName['hay_block'].id, count: 1 }
            },
            // Nether Wart Block
            'nether_wart_block': {
                pattern: [
                    ['nether_wart', 'nether_wart', 'nether_wart'],
                    ['nether_wart', 'nether_wart', 'nether_wart'],
                    ['nether_wart', 'nether_wart', 'nether_wart']
                ],
                output: { id: registry.itemsByName['nether_wart_block'].id, count: 1 }
            },
            // Wool
            'white_wool': {
                pattern: [
                    ['string', 'string'],
                    ['string', 'string']
                ],
                output: { id: registry.itemsByName['white_wool'].id, count: 1 }
            },
            // Carpet
            'white_carpet': {
                pattern: [
                    ['white_wool', 'white_wool']
                ],
                output: { id: registry.itemsByName['white_carpet'].id, count: 3 }
            },
            // Banner
            'white_banner': {
                pattern: [
                    ['white_wool', 'white_wool', 'white_wool'],
                    ['white_wool', 'white_wool', 'white_wool'],
                    [null, 'stick', null]
                ],
                output: { id: registry.itemsByName['white_banner'].id, count: 1 }
            },
            // Bed
            'white_bed': {
                pattern: [
                    ['white_wool', 'white_wool', 'white_wool'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['white_bed'].id, count: 1 }
            },
            // Painting
            'painting': {
                pattern: [
                    ['stick', 'stick', 'stick'],
                    ['stick', 'white_wool', 'stick'],
                    ['stick', 'stick', 'stick']
                ],
                output: { id: registry.itemsByName['painting'].id, count: 1 }
            },
            // Item Frame
            'item_frame': {
                pattern: [
                    ['stick', 'stick', 'stick'],
                    ['stick', 'leather', 'stick'],
                    ['stick', 'stick', 'stick']
                ],
                output: { id: registry.itemsByName['item_frame'].id, count: 1 }
            },
            // Armor Stand
            'armor_stand': {
                pattern: [
                    [null, 'stick', null],
                    ['stick', 'stick', 'stick'],
                    ['stick', null, 'stick']
                ],
                output: { id: registry.itemsByName['armor_stand'].id, count: 1 }
            },
            // Glass Bottle
            'glass_bottle': {
                pattern: [
                    ['glass', null, 'glass'],
                    [null, 'glass', null]
                ],
                output: { id: registry.itemsByName['glass_bottle'].id, count: 3 }
            },
            // Glass Pane
            'glass_pane': {
                pattern: [
                    ['glass', 'glass', 'glass'],
                    ['glass', 'glass', 'glass']
                ],
                output: { id: registry.itemsByName['glass_pane'].id, count: 16 }
            },
            // Iron Bars
            'iron_bars': {
                pattern: [
                    ['iron_ingot', 'iron_ingot', 'iron_ingot'],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['iron_bars'].id, count: 16 }
            },
            // Chain
            'chain': {
                pattern: [
                    ['iron_nugget', null, null],
                    ['iron_ingot', null, null],
                    ['iron_nugget', null, null]
                ],
                output: { id: registry.itemsByName['chain'].id, count: 1 }
            },
            // Lightning Rod
            'lightning_rod': {
                pattern: [
                    ['copper_ingot', null, null],
                    ['copper_ingot', null, null],
                    ['copper_ingot', null, null]
                ],
                output: { id: registry.itemsByName['lightning_rod'].id, count: 1 }
            },
            // Spyglass
            'spyglass': {
                pattern: [
                    [null, 'amethyst_shard', null],
                    [null, 'copper_ingot', null],
                    [null, 'copper_ingot', null]
                ],
                output: { id: registry.itemsByName['spyglass'].id, count: 1 }
            },
            // Brush
            'brush': {
                pattern: [
                    [null, 'feather', null],
                    [null, 'copper_ingot', null],
                    [null, 'stick', null]
                ],
                output: { id: registry.itemsByName['brush'].id, count: 1 }
            },
            // Candle
            'white_candle': {
                pattern: [
                    [null, 'honeycomb', null],
                    [null, 'string', null]
                ],
                output: { id: registry.itemsByName['white_candle'].id, count: 1 }
            },
            // Snow Block
            'snow_block': {
                pattern: [
                    ['snowball', 'snowball'],
                    ['snowball', 'snowball']
                ],
                output: { id: registry.itemsByName['snow_block'].id, count: 1 }
            },
            // Clay Block
            'clay': {
                pattern: [
                    ['clay_ball', 'clay_ball'],
                    ['clay_ball', 'clay_ball']
                ],
                output: { id: registry.itemsByName['clay'].id, count: 1 }
            },
            // Brick Block
            'bricks': {
                pattern: [
                    ['brick', 'brick'],
                    ['brick', 'brick']
                ],
                output: { id: registry.itemsByName['bricks'].id, count: 1 }
            },
            // Nether Brick
            'nether_bricks': {
                pattern: [
                    ['nether_brick', 'nether_brick'],
                    ['nether_brick', 'nether_brick']
                ],
                output: { id: registry.itemsByName['nether_bricks'].id, count: 1 }
            },
            // End Stone Bricks
            'end_stone_bricks': {
                pattern: [
                    ['end_stone', 'end_stone'],
                    ['end_stone', 'end_stone']
                ],
                output: { id: registry.itemsByName['end_stone_bricks'].id, count: 4 }
            },
            // Purpur Block
            'purpur_block': {
                pattern: [
                    ['popped_chorus_fruit', 'popped_chorus_fruit'],
                    ['popped_chorus_fruit', 'popped_chorus_fruit']
                ],
                output: { id: registry.itemsByName['purpur_block'].id, count: 4 }
            },
            // Quartz Block
            'quartz_block': {
                pattern: [
                    ['quartz', 'quartz'],
                    ['quartz', 'quartz']
                ],
                output: { id: registry.itemsByName['quartz_block'].id, count: 4 }
            },
            // Sandstone
            'sandstone': {
                pattern: [
                    ['sand', 'sand'],
                    ['sand', 'sand']
                ],
                output: { id: registry.itemsByName['sandstone'].id, count: 1 }
            },
            // Red Sandstone
            'red_sandstone': {
                pattern: [
                    ['red_sand', 'red_sand'],
                    ['red_sand', 'red_sand']
                ],
                output: { id: registry.itemsByName['red_sandstone'].id, count: 1 }
            },
            // Prismarine
            'prismarine': {
                pattern: [
                    ['prismarine_shard', 'prismarine_shard'],
                    ['prismarine_shard', 'prismarine_shard']
                ],
                output: { id: registry.itemsByName['prismarine'].id, count: 1 }
            },
            // Dark Prismarine
            'dark_prismarine': {
                pattern: [
                    ['prismarine_shard', 'ink_sac', 'prismarine_shard'],
                    ['prismarine_shard', 'prismarine_shard', 'prismarine_shard'],
                    ['prismarine_shard', 'prismarine_shard', 'prismarine_shard']
                ],
                output: { id: registry.itemsByName['dark_prismarine'].id, count: 1 }
            },
            // Sea Lantern
            'sea_lantern': {
                pattern: [
                    ['prismarine_shard', 'prismarine_crystals', 'prismarine_shard'],
                    ['prismarine_crystals', 'prismarine_crystals', 'prismarine_crystals'],
                    ['prismarine_shard', 'prismarine_crystals', 'prismarine_shard']
                ],
                output: { id: registry.itemsByName['sea_lantern'].id, count: 1 }
            },
            // Glowstone
            'glowstone': {
                pattern: [
                    ['glowstone_dust', 'glowstone_dust'],
                    ['glowstone_dust', 'glowstone_dust']
                ],
                output: { id: registry.itemsByName['glowstone'].id, count: 1 }
            },
            // Book
            'book': {
                pattern: [
                    [null, 'paper', null],
                    ['paper', 'paper', null],
                    ['leather', null, null]
                ],
                output: { id: registry.itemsByName['book'].id, count: 1 }
            },
            // Writable Book
            'writable_book': {
                pattern: [
                    [null, 'book', null],
                    [null, 'ink_sac', null],
                    [null, 'feather', null]
                ],
                output: { id: registry.itemsByName['writable_book'].id, count: 1 }
            },
            // Map
            'map': {
                pattern: [
                    ['paper', 'paper', 'paper'],
                    ['paper', 'compass', 'paper'],
                    ['paper', 'paper', 'paper']
                ],
                output: { id: registry.itemsByName['map'].id, count: 1 }
            },
            // Bookshelf
            'bookshelf': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['book', 'book', 'book'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['bookshelf'].id, count: 1 }
            },
            // Chiseled Bookshelf
            'chiseled_bookshelf': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['any_planks', null, 'any_planks'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['chiseled_bookshelf'].id, count: 1 }
            },
            // Note Block
            'note_block': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['any_planks', 'redstone', 'any_planks'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['note_block'].id, count: 1 }
            },
            // Jukebox
            'jukebox': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['any_planks', 'diamond', 'any_planks'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['jukebox'].id, count: 1 }
            },
            // TNT
            'tnt': {
                pattern: [
                    ['gunpowder', 'sand', 'gunpowder'],
                    ['sand', 'gunpowder', 'sand'],
                    ['gunpowder', 'sand', 'gunpowder']
                ],
                output: { id: registry.itemsByName['tnt'].id, count: 1 }
            },
            // Dispenser
            'dispenser': {
                pattern: [
                    ['cobblestone', 'cobblestone', 'cobblestone'],
                    ['cobblestone', 'bow', 'cobblestone'],
                    ['cobblestone', 'redstone', 'cobblestone']
                ],
                output: { id: registry.itemsByName['dispenser'].id, count: 1 }
            },
            // Dropper
            'dropper': {
                pattern: [
                    ['cobblestone', 'cobblestone', 'cobblestone'],
                    ['cobblestone', 'redstone', 'cobblestone'],
                    ['cobblestone', 'cobblestone', 'cobblestone']
                ],
                output: { id: registry.itemsByName['dropper'].id, count: 1 }
            },
            // Piston
            'piston': {
                pattern: [
                    ['any_planks', 'any_planks', 'any_planks'],
                    ['cobblestone', 'iron_ingot', 'cobblestone'],
                    ['cobblestone', 'redstone', 'cobblestone']
                ],
                output: { id: registry.itemsByName['piston'].id, count: 1 }
            },
            // Sticky Piston
            'sticky_piston': {
                pattern: [
                    ['slimeball', null, null],
                    ['piston', null, null]
                ],
                output: { id: registry.itemsByName['sticky_piston'].id, count: 1 }
            },
            // Observer
            'observer': {
                pattern: [
                    ['cobblestone', 'cobblestone', 'cobblestone'],
                    ['cobblestone', 'redstone', 'quartz'],
                    ['cobblestone', 'cobblestone', 'cobblestone']
                ],
                output: { id: registry.itemsByName['observer'].id, count: 1 }
            },
            // Hopper
            'hopper': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', 'chest', 'iron_ingot'],
                    [null, 'iron_ingot', null]
                ],
                output: { id: registry.itemsByName['hopper'].id, count: 1 }
            },
            // Cauldron
            'cauldron': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['cauldron'].id, count: 1 }
            },
            // Brewing Stand
            'brewing_stand': {
                pattern: [
                    [null, 'blaze_rod', null],
                    ['cobblestone', 'cobblestone', 'cobblestone']
                ],
                output: { id: registry.itemsByName['brewing_stand'].id, count: 1 }
            },
            // Enchanting Table
            'enchanting_table': {
                pattern: [
                    [null, 'book', null],
                    ['diamond', 'obsidian', 'diamond'],
                    ['obsidian', 'obsidian', 'obsidian']
                ],
                output: { id: registry.itemsByName['enchanting_table'].id, count: 1 }
            },
            // End Crystal
            'end_crystal': {
                pattern: [
                    ['glass', 'glass', 'glass'],
                    ['glass', 'eye_of_ender', 'glass'],
                    ['glass', 'ghast_tear', 'glass']
                ],
                output: { id: registry.itemsByName['end_crystal'].id, count: 1 }
            },
            // Beacon
            'beacon': {
                pattern: [
                    ['glass', 'glass', 'glass'],
                    ['glass', 'nether_star', 'glass'],
                    ['obsidian', 'obsidian', 'obsidian']
                ],
                output: { id: registry.itemsByName['beacon'].id, count: 1 }
            },
            // Conduit
            'conduit': {
                pattern: [
                    ['nautilus_shell', 'nautilus_shell', 'nautilus_shell'],
                    ['nautilus_shell', 'heart_of_the_sea', 'nautilus_shell'],
                    ['nautilus_shell', 'nautilus_shell', 'nautilus_shell']
                ],
                output: { id: registry.itemsByName['conduit'].id, count: 1 }
            },
            // Anvil
            'anvil': {
                pattern: [
                    ['iron_block', 'iron_block', 'iron_block'],
                    [null, 'iron_ingot', null],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['anvil'].id, count: 1 }
            },
            // Grindstone
            'grindstone': {
                pattern: [
                    ['stick', 'stone_slab', 'stick'],
                    ['any_planks', null, 'any_planks']
                ],
                output: { id: registry.itemsByName['grindstone'].id, count: 1 }
            },
            // Bell
            'bell': {
                pattern: [
                    [null, 'gold_ingot', null],
                    [null, 'stone', null]
                ],
                output: { id: registry.itemsByName['bell'].id, count: 1 }
            },
            // Lantern
            'lantern': {
                pattern: [
                    ['iron_nugget', 'iron_nugget', 'iron_nugget'],
                    ['iron_nugget', 'torch', 'iron_nugget'],
                    ['iron_nugget', 'iron_nugget', 'iron_nugget']
                ],
                output: { id: registry.itemsByName['lantern'].id, count: 1 }
            },
            // Soul Lantern
            'soul_lantern': {
                pattern: [
                    ['iron_nugget', 'iron_nugget', 'iron_nugget'],
                    ['iron_nugget', 'soul_torch', 'iron_nugget'],
                    ['iron_nugget', 'iron_nugget', 'iron_nugget']
                ],
                output: { id: registry.itemsByName['soul_lantern'].id, count: 1 }
            },
            // Campfire
            'campfire': {
                pattern: [
                    [null, 'stick', null],
                    ['stick', 'coal', 'stick'],
                    ['any_log', 'any_log', 'any_log']
                ],
                output: { id: registry.itemsByName['campfire'].id, count: 1 }
            },
            // Soul Campfire
            'soul_campfire': {
                pattern: [
                    [null, 'stick', null],
                    ['stick', 'soul_sand', 'stick'],
                    ['any_log', 'any_log', 'any_log']
                ],
                output: { id: registry.itemsByName['soul_campfire'].id, count: 1 }
            },
            // Torch
            'torch': {
                pattern: [
                    ['coal', null],
                    ['stick', null]
                ],
                output: { id: registry.itemsByName['torch'].id, count: 4 }
            },
            // Lever
            'lever': {
                pattern: [
                    ['stick', null],
                    ['cobblestone', null]
                ],
                output: { id: registry.itemsByName['lever'].id, count: 1 }
            },
            // Stone Button
            'stone_button': {
                pattern: [['stone']],
                output: { id: registry.itemsByName['stone_button'].id, count: 1 }
            },
            // Wooden Button
            'oak_button': {
                pattern: [['oak_planks']],
                output: { id: registry.itemsByName['oak_button'].id, count: 1 }
            },
            // Stone Pressure Plate
            'stone_pressure_plate': {
                pattern: [['stone', 'stone']],
                output: { id: registry.itemsByName['stone_pressure_plate'].id, count: 1 }
            },
            // Wooden Pressure Plate
            'oak_pressure_plate': {
                pattern: [['oak_planks', 'oak_planks']],
                output: { id: registry.itemsByName['oak_pressure_plate'].id, count: 1 }
            },
            // Light Weighted Pressure Plate
            'light_weighted_pressure_plate': {
                pattern: [['gold_ingot', 'gold_ingot']],
                output: { id: registry.itemsByName['light_weighted_pressure_plate'].id, count: 1 }
            },
            // Heavy Weighted Pressure Plate
            'heavy_weighted_pressure_plate': {
                pattern: [['iron_ingot', 'iron_ingot']],
                output: { id: registry.itemsByName['heavy_weighted_pressure_plate'].id, count: 1 }
            },
            // Redstone Torch
            'redstone_torch': {
                pattern: [
                    ['redstone', null],
                    ['stick', null]
                ],
                output: { id: registry.itemsByName['redstone_torch'].id, count: 1 }
            },
            // Redstone Repeater
            'repeater': {
                pattern: [
                    [null, 'redstone_torch', null],
                    ['redstone_torch', 'redstone', null],
                    ['stone', 'stone', 'stone']
                ],
                output: { id: registry.itemsByName['repeater'].id, count: 1 }
            },
            // Redstone Comparator
            'comparator': {
                pattern: [
                    [null, 'redstone_torch', null],
                    ['redstone_torch', 'quartz', 'redstone_torch'],
                    ['stone', 'stone', 'stone']
                ],
                output: { id: registry.itemsByName['comparator'].id, count: 1 }
            },
            // Daylight Detector
            'daylight_detector': {
                pattern: [
                    ['glass', 'glass', 'glass'],
                    ['quartz', 'quartz', 'quartz'],
                    ['any_slab', 'any_slab', 'any_slab']
                ],
                output: { id: registry.itemsByName['daylight_detector'].id, count: 1 }
            },
            // Target
            'target': {
                pattern: [
                    [null, 'redstone', null],
                    [null, 'hay_block', null]
                ],
                output: { id: registry.itemsByName['target'].id, count: 1 }
            },
            // Redstone Lamp
            'redstone_lamp': {
                pattern: [
                    [null, 'redstone', null],
                    ['redstone', 'glowstone', 'redstone'],
                    [null, 'redstone', null]
                ],
                output: { id: registry.itemsByName['redstone_lamp'].id, count: 1 }
            },
            // Tripwire Hook
            'tripwire_hook': {
                pattern: [
                    ['iron_ingot', null],
                    ['stick', null],
                    ['any_planks', null]
                ],
                output: { id: registry.itemsByName['tripwire_hook'].id, count: 2 }
            },
            // Rail
            'rail': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', 'stick', 'iron_ingot'],
                    ['iron_ingot', null, 'iron_ingot']
                ],
                output: { id: registry.itemsByName['rail'].id, count: 16 }
            },
            // Powered Rail
            'powered_rail': {
                pattern: [
                    ['gold_ingot', null, 'gold_ingot'],
                    ['gold_ingot', 'stick', 'gold_ingot'],
                    ['gold_ingot', 'redstone', 'gold_ingot']
                ],
                output: { id: registry.itemsByName['powered_rail'].id, count: 6 }
            },
            // Detector Rail
            'detector_rail': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', 'stone_pressure_plate', 'iron_ingot'],
                    ['iron_ingot', 'redstone', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['detector_rail'].id, count: 6 }
            },
            // Activator Rail
            'activator_rail': {
                pattern: [
                    ['iron_ingot', 'stick', 'iron_ingot'],
                    ['iron_ingot', 'redstone_torch', 'iron_ingot'],
                    ['iron_ingot', 'stick', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['activator_rail'].id, count: 6 }
            },
            // Minecart
            'minecart': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    ['iron_ingot', 'iron_ingot', 'iron_ingot']
                ],
                output: { id: registry.itemsByName['minecart'].id, count: 1 }
            },
            // Chest Minecart
            'chest_minecart': {
                pattern: [
                    [null, 'chest', null],
                    [null, 'minecart', null]
                ],
                output: { id: registry.itemsByName['chest_minecart'].id, count: 1 }
            },
            // Furnace Minecart
            'furnace_minecart': {
                pattern: [
                    [null, 'furnace', null],
                    [null, 'minecart', null]
                ],
                output: { id: registry.itemsByName['furnace_minecart'].id, count: 1 }
            },
            // TNT Minecart
            'tnt_minecart': {
                pattern: [
                    [null, 'tnt', null],
                    [null, 'minecart', null]
                ],
                output: { id: registry.itemsByName['tnt_minecart'].id, count: 1 }
            },
            // Hopper Minecart
            'hopper_minecart': {
                pattern: [
                    [null, 'hopper', null],
                    [null, 'minecart', null]
                ],
                output: { id: registry.itemsByName['hopper_minecart'].id, count: 1 }
            },
            // Boat
            'oak_boat': {
                pattern: [
                    ['oak_planks', null, 'oak_planks'],
                    ['oak_planks', 'oak_planks', 'oak_planks']
                ],
                output: { id: registry.itemsByName['oak_boat'].id, count: 1 }
            },
            // Boat with Chest
            'oak_chest_boat': {
                pattern: [
                    [null, 'chest', null],
                    [null, 'oak_boat', null]
                ],
                output: { id: registry.itemsByName['oak_chest_boat'].id, count: 1 }
            },
            // Saddle (not craftable)
            // Shield
            'shield': {
                pattern: [
                    ['any_planks', 'iron_ingot', 'any_planks'],
                    ['any_planks', 'any_planks', 'any_planks'],
                    [null, 'any_planks', null]
                ],
                output: { id: registry.itemsByName['shield'].id, count: 1 }
            },
            // Bow
            'bow': {
                pattern: [
                    [null, 'stick', 'string'],
                    ['stick', null, 'string'],
                    [null, 'stick', 'string']
                ],
                output: { id: registry.itemsByName['bow'].id, count: 1 }
            },
            // Crossbow
            'crossbow': {
                pattern: [
                    ['stick', 'iron_ingot', 'stick'],
                    ['string', 'tripwire_hook', 'string'],
                    [null, 'stick', null]
                ],
                output: { id: registry.itemsByName['crossbow'].id, count: 1 }
            },
            // Arrow
            'arrow': {
                pattern: [
                    [null, 'flint', null],
                    [null, 'stick', null],
                    [null, 'feather', null]
                ],
                output: { id: registry.itemsByName['arrow'].id, count: 4 }
            },
            // Spectral Arrow
            'spectral_arrow': {
                pattern: [
                    [null, 'glowstone_dust', null],
                    ['arrow', 'arrow', 'arrow'],
                    [null, 'arrow', null]
                ],
                output: { id: registry.itemsByName['spectral_arrow'].id, count: 2 }
            },
            // Tipped Arrow (brewing, not crafting)
            // Firework Rocket
            'firework_rocket': {
                pattern: [
                    [null, 'gunpowder', null],
                    [null, 'paper', null]
                ],
                output: { id: registry.itemsByName['firework_rocket'].id, count: 3 }
            },
            // Firework Star
            'firework_star': {
                pattern: [
                    [null, 'gunpowder', null],
                    [null, 'any_dye', null]
                ],
                output: { id: registry.itemsByName['firework_star'].id, count: 1 }
            },
            // Lead
            'lead': {
                pattern: [
                    ['string', 'string', null],
                    ['string', 'slimeball', null],
                    [null, null, 'string']
                ],
                output: { id: registry.itemsByName['lead'].id, count: 2 }
            },
            // Name Tag (not craftable)
            // Carpet
            'white_carpet': {
                pattern: [['white_wool', 'white_wool']],
                output: { id: registry.itemsByName['white_carpet'].id, count: 3 }
            },
            // Banner
            'white_banner': {
                pattern: [
                    ['white_wool', 'white_wool', 'white_wool'],
                    ['white_wool', 'white_wool', 'white_wool'],
                    [null, 'stick', null]
                ],
                output: { id: registry.itemsByName['white_banner'].id, count: 1 }
            },
            // Bed
            'white_bed': {
                pattern: [
                    ['white_wool', 'white_wool', 'white_wool'],
                    ['any_planks', 'any_planks', 'any_planks']
                ],
                output: { id: registry.itemsByName['white_bed'].id, count: 1 }
            },
            // Food items
            'bread': {
                pattern: [['wheat', 'wheat', 'wheat']],
                output: { id: registry.itemsByName['bread'].id, count: 1 }
            },
            'cookie': {
                pattern: [['wheat', 'cocoa_beans', 'wheat']],
                output: { id: registry.itemsByName['cookie'].id, count: 8 }
            },
            'golden_apple': {
                pattern: [
                    ['gold_ingot', 'gold_ingot', 'gold_ingot'],
                    ['gold_ingot', 'apple', 'gold_ingot'],
                    ['gold_ingot', 'gold_ingot', 'gold_ingot']
                ],
                output: { id: registry.itemsByName['golden_apple'].id, count: 1 }
            },
            'golden_carrot': {
                pattern: [
                    ['gold_nugget', 'gold_nugget', 'gold_nugget'],
                    ['gold_nugget', 'carrot', 'gold_nugget'],
                    ['gold_nugget', 'gold_nugget', 'gold_nugget']
                ],
                output: { id: registry.itemsByName['golden_carrot'].id, count: 1 }
            },
            'pumpkin_pie': {
                pattern: [
                    ['pumpkin', null, null],
                    ['sugar', null, null],
                    ['egg', null, null]
                ],
                output: { id: registry.itemsByName['pumpkin_pie'].id, count: 1 }
            },
            'cake': {
                pattern: [
                    ['milk_bucket', 'milk_bucket', 'milk_bucket'],
                    ['sugar', 'egg', 'sugar'],
                    ['wheat', 'wheat', 'wheat']
                ],
                output: { id: registry.itemsByName['cake'].id, count: 1 }
            },
            'mushroom_stew': {
                pattern: [
                    [null, null, null],
                    ['red_mushroom', 'brown_mushroom', null],
                    [null, 'bowl', null]
                ],
                output: { id: registry.itemsByName['mushroom_stew'].id, count: 1 }
            },
            'rabbit_stew': {
                pattern: [
                    ['cooked_rabbit', null, 'carrot'],
                    [null, 'baked_potato', null],
                    [null, 'mushroom', 'bowl']
                ],
                output: { id: registry.itemsByName['rabbit_stew'].id, count: 1 }
            },
            'beetroot_soup': {
                pattern: [
                    ['beetroot', 'beetroot', 'beetroot'],
                    ['beetroot', 'beetroot', 'beetroot'],
                    [null, 'bowl', null]
                ],
                output: { id: registry.itemsByName['beetroot_soup'].id, count: 1 }
            },
            'suspicious_stew': {
                pattern: [
                    [null, null, null],
                    ['red_mushroom', 'brown_mushroom', null],
                    [null, 'bowl', 'flower']
                ],
                output: { id: registry.itemsByName['suspicious_stew'].id, count: 1 }
            },
            // Sugar
            'sugar': {
                pattern: [['sugar_cane']],
                output: { id: registry.itemsByName['sugar'].id, count: 1 }
            },
            // Fermented Spider Eye
            'fermented_spider_eye': {
                pattern: [
                    ['spider_eye', null, null],
                    ['brown_mushroom', null, null],
                    ['sugar', null, null]
                ],
                output: { id: registry.itemsByName['fermented_spider_eye'].id, count: 1 }
            },
            // Magma Cream
            'magma_cream': {
                pattern: [
                    ['blaze_powder', null, null],
                    ['slimeball', null, null]
                ],
                output: { id: registry.itemsByName['magma_cream'].id, count: 1 }
            },
            // Blaze Powder
            'blaze_powder': {
                pattern: [['blaze_rod']],
                output: { id: registry.itemsByName['blaze_powder'].id, count: 2 }
            },
            // Eye of Ender
            'eye_of_ender': {
                pattern: [
                    ['blaze_powder', null, null],
                    ['ender_pearl', null, null]
                ],
                output: { id: registry.itemsByName['eye_of_ender'].id, count: 1 }
            },
            // Paper
            'paper': {
                pattern: [['sugar_cane', 'sugar_cane', 'sugar_cane']],
                output: { id: registry.itemsByName['paper'].id, count: 3 }
            },
            // Book and Quill
            'writable_book': {
                pattern: [
                    [null, 'book', null],
                    [null, 'ink_sac', null],
                    [null, 'feather', null]
                ],
                output: { id: registry.itemsByName['writable_book'].id, count: 1 }
            },
            // Map
            'map': {
                pattern: [
                    ['paper', 'paper', 'paper'],
                    ['paper', 'compass', 'paper'],
                    ['paper', 'paper', 'paper']
                ],
                output: { id: registry.itemsByName['map'].id, count: 1 }
            },
            // Compass
            'compass': {
                pattern: [
                    [null, 'iron_ingot', null],
                    ['iron_ingot', 'redstone', 'iron_ingot'],
                    [null, 'iron_ingot', null]
                ],
                output: { id: registry.itemsByName['compass'].id, count: 1 }
            },
            // Clock
            'clock': {
                pattern: [
                    [null, 'gold_ingot', null],
                    ['gold_ingot', 'redstone', 'gold_ingot'],
                    [null, 'gold_ingot', null]
                ],
                output: { id: registry.itemsByName['clock'].id, count: 1 }
            },
            // Bucket
            'bucket': {
                pattern: [
                    ['iron_ingot', null, 'iron_ingot'],
                    [null, 'iron_ingot', null]
                ],
                output: { id: registry.itemsByName['bucket'].id, count: 1 }
            },
            // Milk Bucket (not craftable)
            // Water Bucket (not craftable)
            // Lava Bucket (not craftable)
            // Powder Snow Bucket (not craftable)
            // Axolotl Bucket (not craftable)
            // Fish Bucket (not craftable)
            // Cod Bucket (not craftable)
            // Salmon Bucket (not craftable)
            // Tropical Fish Bucket (not craftable)
            // Pufferfish Bucket (not craftable)
            // Shears
            'shears': {
                pattern: [
                    [null, 'iron_ingot', null],
                    ['iron_ingot', null, null]
                ],
                output: { id: registry.itemsByName['shears'].id, count: 1 }
            },
            // Flint and Steel
            'flint_and_steel': {
                pattern: [
                    ['iron_ingot', null, null],
                    [null, 'flint', null]
                ],
                output: { id: registry.itemsByName['flint_and_steel'].id, count: 1 }
            },
            // Fishing Rod
            'fishing_rod': {
                pattern: [
                    [null, null, 'stick'],
                    [null, 'stick', 'string'],
                    ['stick', null, 'string']
                ],
                output: { id: registry.itemsByName['fishing_rod'].id, count: 1 }
            },
            // Carrot on a Stick
            'carrot_on_a_stick': {
                pattern: [
                    ['carrot', null, null],
                    ['fishing_rod', null, null]
                ],
                output: { id: registry.itemsByName['carrot_on_a_stick'].id, count: 1 }
            },
            // Warped Fungus on a Stick
            'warped_fungus_on_a_stick': {
                pattern: [
                    ['warped_fungus', null, null],
                    ['fishing_rod', null, null]
                ],
                output: { id: registry.itemsByName['warped_fungus_on_a_stick'].id, count: 1 }
            },
            // Elytra (not craftable)
            // Turtle Shell
            'turtle_helmet': {
                pattern: [
                    ['scute', null, 'scute'],
                    ['scute', 'scute', 'scute']
                ],
                output: { id: registry.itemsByName['turtle_helmet'].id, count: 1 }
            },
            // Scute
            'scute': {
                pattern: [['scute']],
                output: { id: registry.itemsByName['scute'].id, count: 1 }
            },
            // Phantom Membrane (not craftable)
            // Nautilus Shell (not craftable)
            // Heart of the Sea (not craftable)
            // Nether Star (not craftable)
            // Dragon Egg (not craftable)
            // Totem of Undying (not craftable)
            // Shulker Shell (not craftable)
            // Netherite Ingot
            'netherite_ingot': {
                pattern: [
                    ['netherite_scrap', null, null],
                    ['gold_ingot', null, null]
                ],
                output: { id: registry.itemsByName['netherite_ingot'].id, count: 1 }
            },
            // Netherite Upgrade Smithing Template (not craftable)
            // Armor Trims (not craftable)
            // Music Discs (not craftable)
            // Dragon Head (not craftable)
            // Wither Skeleton Skull (not craftable)
            // Zombie Head (not craftable)
            // Player Head (not craftable)
            // Creeper Head (not craftable)
            // Piglin Head (not craftable)
            // Respawn Anchor
            'respawn_anchor': {
                pattern: [
                    ['crying_obsidian', 'crying_obsidian', 'crying_obsidian'],
                    ['glowstone', 'glowstone', 'glowstone'],
                    ['crying_obsidian', 'crying_obsidian', 'crying_obsidian']
                ],
                output: { id: registry.itemsByName['respawn_anchor'].id, count: 1 }
            },
            // Lodestone
            'lodestone': {
                pattern: [
                    ['chiseled_stone_bricks', 'chiseled_stone_bricks', 'chiseled_stone_bricks'],
                    ['chiseled_stone_bricks', 'netherite_ingot', 'chiseled_stone_bricks'],
                    ['chiseled_stone_bricks', 'chiseled_stone_bricks', 'chiseled_stone_bricks']
                ],
                output: { id: registry.itemsByName['lodestone'].id, count: 1 }
            },
            // Target
            'target': {
                pattern: [
                    [null, 'redstone', null],
                    [null, 'hay_block', null]
                ],
                output: { id: registry.itemsByName['target'].id, count: 1 }
            },
            // Copper Grate
            'copper_grate': {
                pattern: [
                    ['copper_ingot', 'copper_ingot'],
                    ['copper_ingot', 'copper_ingot']
                ],
                output: { id: registry.itemsByName['copper_grate'].id, count: 4 }
            },
            // Waxed Copper Grate
            'waxed_copper_grate': {
                pattern: [
                    ['honeycomb', null],
                    ['copper_grate', null]
                ],
                output: { id: registry.itemsByName['waxed_copper_grate'].id, count: 1 }
            },
            // Chiseled Copper
            'chiseled_copper': {
                pattern: [
                    ['cut_copper_slab', null],
                    ['cut_copper_slab', null]
                ],
                output: { id: registry.itemsByName['chiseled_copper'].id, count: 1 }
            },
            // Waxed Chiseled Copper
            'waxed_chiseled_copper': {
                pattern: [
                    ['honeycomb', null],
                    ['chiseled_copper', null]
                ],
                output: { id: registry.itemsByName['waxed_chiseled_copper'].id, count: 1 }
            },
            // Tuff Bricks
            'tuff_bricks': {
                pattern: [
                    ['tuff', 'tuff'],
                    ['tuff', 'tuff']
                ],
                output: { id: registry.itemsByName['tuff_bricks'].id, count: 4 }
            },
            // Chiseled Tuff
            'chiseled_tuff': {
                pattern: [
                    ['tuff_slab', null],
                    ['tuff_slab', null]
                ],
                output: { id: registry.itemsByName['chiseled_tuff'].id, count: 1 }
            },
            // Chiseled Tuff Bricks
            'chiseled_tuff_bricks': {
                pattern: [
                    ['tuff_brick_slab', null],
                    ['tuff_brick_slab', null]
                ],
                output: { id: registry.itemsByName['chiseled_tuff_bricks'].id, count: 1 }
            },
            // Polished Tuff
            'polished_tuff': {
                pattern: [
                    ['tuff', 'tuff'],
                    ['tuff', 'tuff']
                ],
                output: { id: registry.itemsByName['polished_tuff'].id, count: 4 }
            },
            // Tuff Stairs
            'tuff_stairs': {
                pattern: [
                    ['tuff', null, null],
                    ['tuff', 'tuff', null],
                    ['tuff', 'tuff', null]
                ],
                output: { id: registry.itemsByName['tuff_stairs'].id, count: 4 }
            },
            // Tuff Slab
            'tuff_slab': {
                pattern: [
                    ['tuff', 'tuff', 'tuff']
                ],
                output: { id: registry.itemsByName['tuff_slab'].id, count: 6 }
            },
            // Tuff Wall
            'tuff_wall': {
                pattern: [
                    ['tuff', 'tuff', 'tuff'],
                    ['tuff', 'tuff', 'tuff']
                ],
                output: { id: registry.itemsByName['tuff_wall'].id, count: 6 }
            },
            // Polished Tuff Stairs
            'polished_tuff_stairs': {
                pattern: [
                    ['polished_tuff', null, null],
                    ['polished_tuff', 'polished_tuff', null],
                    ['polished_tuff', 'polished_tuff', null]
                ],
                output: { id: registry.itemsByName['polished_tuff_stairs'].id, count: 4 }
            },
            // Polished Tuff Slab
            'polished_tuff_slab': {
                pattern: [
                    ['polished_tuff', 'polished_tuff', 'polished_tuff']
                ],
                output: { id: registry.itemsByName['polished_tuff_slab'].id, count: 6 }
            },
            // Polished Tuff Wall
            'polished_tuff_wall': {
                pattern: [
                    ['polished_tuff', 'polished_tuff', 'polished_tuff'],
                    ['polished_tuff', 'polished_tuff', 'polished_tuff']
                ],
                output: { id: registry.itemsByName['polished_tuff_wall'].id, count: 6 }
            },
            // Tuff Brick Stairs
            'tuff_brick_stairs': {
                pattern: [
                    ['tuff_bricks', null, null],
                    ['tuff_bricks', 'tuff_bricks', null],
                    ['tuff_bricks', 'tuff_bricks', null]
                ],
                output: { id: registry.itemsByName['tuff_brick_stairs'].id, count: 4 }
            },
            // Tuff Brick Slab
            'tuff_brick_slab': {
                pattern: [
                    ['tuff_bricks', 'tuff_bricks', 'tuff_bricks']
                ],
                output: { id: registry.itemsByName['tuff_brick_slab'].id, count: 6 }
            },
            // Tuff Brick Wall
            'tuff_brick_wall': {
                pattern: [
                    ['tuff_bricks', 'tuff_bricks', 'tuff_bricks'],
                    ['tuff_bricks', 'tuff_bricks', 'tuff_bricks']
                ],
                output: { id: registry.itemsByName['tuff_brick_wall'].id, count: 6 }
            },
            // Chiseled Polished Blackstone
            'chiseled_polished_blackstone': {
                pattern: [
                    ['polished_blackstone_slab', null],
                    ['polished_blackstone_slab', null]
                ],
                output: { id: registry.itemsByName['chiseled_polished_blackstone'].id, count: 1 }
            },
            // Cracked Polished Blackstone Bricks
            'cracked_polished_blackstone_bricks': {
                pattern: [['polished_blackstone_bricks']],
                output: { id: registry.itemsByName['cracked_polished_blackstone_bricks'].id, count: 1 }
            },
            // Gilded Blackstone (not craftable)
            // Crying Obsidian (not craftable)
            // Ancient Debris (not craftable)
        };

        const recipe = recipes2x2[registry.items[itemId]?.name];
        if (recipe) {
            recipes.push(recipe);
        }

        return recipes;
    }

    /**
     * Craftear un item en la grilla 2x2 del inventario
     * @param {number} itemId - ID del item a craftear
     * @param {number} count - Cantidad a craftear
     * @returns {Promise<boolean>} True si tuvo éxito
     */
    async craftInInventory(itemId, count = 1) {
        try {
            structuredLogger.debug(`🔨 Intentando crafteo en inventario 2x2 para item ID: ${itemId}`);
            
            // Obtener recetas disponibles para este item SIN crafting table (null = inventario 2x2)
            const recipes = this.bot.recipesFor(itemId, null, count, null);
            
            structuredLogger.debug(`📋 Recetas encontradas: ${recipes?.length || 0}`);
            
            if (!recipes || recipes.length === 0) {
                structuredLogger.debug(`❌ No hay receta 2x2 disponible para item ID ${itemId}`);
                return false;
            }

            const recipe = recipes[0];
            const registry = this.bot.registry;
            const itemName = registry.items[itemId]?.name || 'unknown';
            
            structuredLogger.info(`🔨 Crafteando ${itemName} en grilla 2x2 del inventario...`);
            
            // Ejecutar crafteo usando null = grilla 2x2 del inventario
            await this.bot.craft(recipe, count, null);
            
            structuredLogger.success(`✅ ${itemName} crafteado exitosamente en inventario 2x2`);
            return true;
            
        } catch (e) {
            structuredLogger.error(`❌ Error crafteando en inventario 2x2: ${e.message}`);
            structuredLogger.debug(e.stack);
            return false;
        }
    }

    /**
     * Verificar si tiene los ingredientes necesarios
     */
    checkIngredients(pattern) {
        const inventory = this.bot.inventory.slots;
        
        for (const row of pattern) {
            for (const itemRef of row) {
                if (!itemRef) continue;
                
                if (itemRef === 'any_planks') {
                    const hasPlanks = this.hasAnyOf(['oak_planks', 'birch_planks', 'spruce_planks', 
                                                      'jungle_planks', 'acacia_planks', 'dark_oak_planks',
                                                      'mangrove_planks', 'cherry_planks', 'bamboo_planks',
                                                      'crimson_planks', 'warped_planks'], inventory);
                    if (!hasPlanks) return false;
                } else if (itemRef === 'any_slab') {
                    const hasSlab = inventory.some(slot => slot && slot.name && slot.name.includes('_slab'));
                    if (!hasSlab) return false;
                } else if (itemRef === 'any_log') {
                    const hasLog = this.hasAnyOf(['oak_log', 'birch_log', 'spruce_log', 'jungle_log',
                                                   'acacia_log', 'dark_oak_log', 'mangrove_log', 'cherry_log'], inventory);
                    if (!hasLog) return false;
                } else if (itemRef === 'any_dye') {
                    const hasDye = this.hasAnyOf(['white_dye', 'orange_dye', 'magenta_dye', 'light_blue_dye',
                                                   'yellow_dye', 'lime_dye', 'pink_dye', 'gray_dye',
                                                   'light_gray_dye', 'cyan_dye', 'purple_dye', 'blue_dye',
                                                   'brown_dye', 'green_dye', 'red_dye', 'black_dye'], inventory);
                    if (!hasDye) return false;
                } else {
                    const hasItem = inventory.some(slot => slot && slot.name === itemRef);
                    if (!hasItem) return false;
                }
            }
        }
        
        return true;
    }

    /**
     * Verificar si tiene alguno de los items listados
     */
    hasAnyOf(itemNames, inventory) {
        return inventory.some(slot => slot && itemNames.includes(slot.name));
    }
}
