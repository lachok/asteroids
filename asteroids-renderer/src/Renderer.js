import { fabric } from 'fabric'
import Asteroid from './Asteroid'
import Ship from './Ship'
import Explosion from './Explosion'
import FpsCounter from './FpsCounter'

export default class Renderer {
  
    constructor({FRAME_RATE}) {
        this.FRAME_RATE = FRAME_RATE
        this.state = { asteroids: {}, ships: {} }
        this.canvas = new fabric.Canvas('c')
        this.canvas.renderOnAddRemove = false
        this.canvas.stateful = false
    }
    
    getOrAddAsteroid(roid) {
        let theRoid = this.state.asteroids[roid.id] || new Asteroid(roid, this.canvas);
        this.state.asteroids[theRoid.id] = theRoid;
        return theRoid;
    }
    
    getOrAddShip(ship) {
        let theShip = this.state.ships[ship.id] || new Ship(ship, this.canvas);
        this.state.ships[theShip.id] = theShip;
        return theShip;
    }
    
    addExplosion(splosion) {
        return new Explosion(splosion, this.canvas)
    }
    
    updateAsteroids(asteroids) {
        asteroids.forEach((roid) => 
            this.getOrAddAsteroid(roid).update(roid, 1000 / this.FRAME_RATE)
        )
    }
    
    updateShips(ships) {
        ships.forEach((ship) => 
            this.getOrAddShip(ship).update(ship, 1000 / this.FRAME_RATE)
        )
    }
    
    updateExplosions(explosions) {
        explosions.forEach((splosion) => this.addExplosion(splosion).update(1000 / this.FRAME_RATE))
    }
    
    update(frame) {
        this.updateAsteroids(frame.asteroids)
        this.updateShips(frame.ships)
        this.updateExplosions(frame.explosions)
    }
        
    start() {        
        let fpsCounter = new FpsCounter(this.canvas)
        
        const step = (timestamp) => {
            fpsCounter.update()
            
            fabric.util.requestAnimFrame(step, this.canvas.getElement())
            this.canvas.renderAll()
        }

        step()
    }
}
