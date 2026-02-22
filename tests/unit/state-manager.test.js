/**
 * Tests para State Manager
 * @tests utils/state-manager
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import StateManager from '../src/utils/state-manager.js';
import fs from 'fs';

describe('StateManager', () => {
    let stateManager;
    const testFile = './test_state.json';
    const testBackup = './test_state_backup.json';
    
    beforeEach(() => {
        // Limpiar archivos de test
        if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
        if (fs.existsSync(testBackup)) fs.unlinkSync(testBackup);
        
        stateManager = new StateManager({
            stateFile: testFile,
            backupFile: testBackup
        });
    });
    
    describe('Constructor', () => {
        it('debe crear instancia con valores por defecto', () => {
            expect(stateManager).toBeDefined();
            expect(stateManager.state).toBeDefined();
            expect(stateManager.state.health).toBe(20);
            expect(stateManager.state.food).toBe(20);
        });
        
        it('debe aceptar opciones personalizadas', () => {
            const customSM = new StateManager({
                stateFile: './custom.json',
                saveInterval: 10000
            });
            expect(customSM.stateFile).toBe('./custom.json');
            expect(customSM.saveInterval).toBe(10000);
        });
    });
    
    describe('Set/Get', () => {
        it('debe establecer y obtener valor simple', () => {
            stateManager.set('health', 15);
            expect(stateManager.get('health')).toBe(15);
        });
        
        it('debe establecer y obtener valor anidado', () => {
            stateManager.set('position.x', 100);
            stateManager.set('position.y', 64);
            stateManager.set('position.z', -50);
            
            expect(stateManager.get('position.x')).toBe(100);
            expect(stateManager.get('position')).toEqual({
                x: 100,
                y: 64,
                z: -50
            });
        });
        
        it('debe retornar default si clave no existe', () => {
            expect(stateManager.get('nonexistent', 'default')).toBe('default');
        });
    });
    
    describe('Save/Load', () => {
        it('debe guardar estado en archivo', async () => {
            stateManager.set('health', 10);
            stateManager.set('food', 15);
            
            const result = await stateManager.save();
            expect(result).toBe(true);
            expect(fs.existsSync(testFile)).toBe(true);
        });
        
        it('debe cargar estado desde archivo', async () => {
            // Guardar estado inicial
            stateManager.set('deaths', 5);
            await stateManager.save();
            
            // Crear nuevo state manager y cargar
            const sm2 = new StateManager({
                stateFile: testFile,
                backupFile: testBackup
            });
            
            await sm2.load();
            expect(sm2.get('deaths')).toBe(5);
        });
        
        it('debe crear backup antes de guardar', async () => {
            // Primer guardado
            stateManager.set('test', 'value1');
            await stateManager.save();
            
            // Segundo guardado (debe crear backup)
            stateManager.set('test', 'value2');
            await stateManager.save();
            
            expect(fs.existsSync(testBackup)).toBe(true);
        });
    });
    
    describe('Death Recording', () => {
        it('debe registrar muerte con ubicación', () => {
            const location = { x: 100, y: 64, z: -50 };
            stateManager.recordDeath(location, 'creeper');
            
            expect(stateManager.state.deaths).toBe(1);
            expect(stateManager.state.lastDeathLocation).toBeDefined();
            expect(stateManager.state.lastDeathLocation.cause).toBe('creeper');
        });
        
        it('debe incrementar contador de muertes', () => {
            stateManager.recordDeath({ x: 0, y: 0, z: 0 }, 'fall');
            stateManager.recordDeath({ x: 0, y: 0, z: 0 }, 'lava');
            
            expect(stateManager.state.deaths).toBe(2);
        });
    });
    
    describe('Waypoints', () => {
        it('debe añadir waypoint', () => {
            stateManager.addWaypoint('home', {
                x: 100,
                y: 64,
                z: -50
            }, 'base');
            
            expect(stateManager.state.waypoints.length).toBe(1);
            expect(stateManager.state.waypoints[0].name).toBe('home');
        });
        
        it('debe añadir múltiples waypoints', () => {
            stateManager.addWaypoint('home', { x: 0, y: 0, z: 0 });
            stateManager.addWaypoint('mine', { x: 100, y: 64, z: -50 });
            
            expect(stateManager.state.waypoints.length).toBe(2);
        });
    });
    
    describe('Phase Tracking', () => {
        it('debe marcar fase como completada', () => {
            stateManager.markPhaseCompleted('GATHER_WOOD');
            expect(stateManager.isPhaseCompleted('GATHER_WOOD')).toBe(true);
        });
        
        it('no debe duplicar fases completadas', () => {
            stateManager.markPhaseCompleted('CRAFT_BASIC');
            stateManager.markPhaseCompleted('CRAFT_BASIC');
            
            expect(stateManager.state.completedPhases.length).toBe(1);
        });
    });
    
    describe('Session Time', () => {
        it('debe calcular tiempo de sesión', () => {
            const time = stateManager.getSessionTime();
            expect(time).toBeGreaterThan(0);
            expect(typeof time).toBe('number');
        });
        
        it('debe formatear tiempo de sesión', () => {
            const formatted = stateManager.getFormattedSessionTime();
            expect(typeof formatted).toBe('string');
            expect(formatted).toMatch(/\d+[hms]/);
        });
    });
    
    describe('Auto Save', () => {
        it('debe iniciar auto-guardado', () => {
            stateManager.startAutoSave();
            expect(stateManager.saveTimer).toBeDefined();
        });
        
        it('debe detener auto-guardado', () => {
            stateManager.startAutoSave();
            stateManager.stopAutoSave();
            expect(stateManager.saveTimer).toBeNull();
        });
    });
    
    // Cleanup
    afterAll(() => {
        if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
        if (fs.existsSync(testBackup)) fs.unlinkSync(testBackup);
    });
});
