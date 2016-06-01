import { fabric } from 'fabric'
import Asteroid from './Asteroid'
import Ship from './Ship'

export default class Renderer {
  
    constructor() {
        this.state = { asteroids: {}, ships: {} }
        this.canvas = new fabric.Canvas('c')
    }
    
    getOrAddAsteroid(coords) {
        let roid = this.state.asteroids[coords.id] || new Asteroid(coords.id, coords, this.canvas);
        this.state.asteroids[roid.id] = roid;
        return roid;
    }
    
    getOrAddShip(coords) {
        let ship = this.state.ships[coords.id] || new Ship(coords.id, coords, this.canvas);
        this.state.ships[ship.id] = ship;
        return ship;
    }
    
    updateAsteroids(asteroids) {
        asteroids.forEach((coords) => 
            this.getOrAddAsteroid(coords).update(coords, 1000 / this.FRAME_RATE)
        )
    }
    
    updateShips(ships) {
        ships.forEach((coords) => 
            this.getOrAddShip(coords).update(coords, 1000 / this.FRAME_RATE)
        );
    }
    
    updateExplosions(explosions) {
        
    }
    
    update(frame) {
        this.updateAsteroids(frame.asteroids)
        this.updateShips(frame.ships)
        this.updateExplosions(frame.explosions)
    }
        
    start(server) {
        this.FRAME_RATE = server.FRAME_RATE
        server.on('frame', (frame) => this.update(frame))
        
        const step = (timestamp) => {
            this.canvas.renderAll()
            window.requestAnimationFrame(step)
        }

        window.requestAnimationFrame(step)
    }
}