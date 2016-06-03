import { fabric } from 'fabric'
import Asteroid from './Asteroid'
import Ship from './Ship'

export default class Renderer {
  
    constructor() {
        this.state = { asteroids: {}, ships: {} }
        this.canvas = new fabric.Canvas('c')
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
    
    updateAsteroids(asteroids) {
        asteroids.forEach((roid) => 
            this.getOrAddAsteroid(roid).update(roid, 1000 / this.FRAME_RATE)
        )
    }
    
    updateShips(ships) {
        ships.forEach((ship) => 
            this.getOrAddShip(ship).update(ship, 1000 / this.FRAME_RATE)
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
        server.on('frame', (frame) => this.update(transformFrame(frame)))
        
        const step = (timestamp) => {
            this.canvas.renderAll()
            window.requestAnimationFrame(step)
        }

        window.requestAnimationFrame(step)
    }
}

const transformAsteroid = ([id, x, y, r]) => ({id, x, y, r})

const transformShip = ([id, x, y, r, angle, colour]) => ({id, x, y, r, angle, colour})

const transformExplosion = ([x, y]) => ({x, y})

const transformFrame = (frame) => {
    return {
        asteroids: frame.a.map(transformAsteroid),
        ships: frame.s.map(transformShip),
        explosions: frame.x.map(transformExplosion)
    }
}