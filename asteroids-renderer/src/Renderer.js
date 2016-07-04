import { fabric } from 'fabric'
import Asteroid from './Asteroid'
import Ship from './Ship'
import Explosion from './Explosion'
import Bullet from './Bullet'
import FpsCounter from './FpsCounter'

export default class Renderer {
  
    constructor({FRAME_RATE, WIDTH, HEIGHT}) {
        this.FRAME_RATE = FRAME_RATE
        this.state = { asteroids: {}, ships: {}, bullets: {} }
        this.canvas = new fabric.Canvas('c')
        this.canvas.renderOnAddRemove = false
        this.canvas.stateful = false
        
        this.canvas.setWidth(WIDTH)
        this.canvas.setHeight(HEIGHT)
        this.canvas.setBackgroundColor('000000')
        this.canvas.calcOffset()
        
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                this.goFullscreen()
            }
        }, false);
    }
    
    goFullscreen() {
        var canvas = this.canvas.getSelectionElement().parentNode;
        if(canvas.requestFullScreen) {
            canvas.requestFullScreen();
        }
        else if(canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        }
        else if(canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        }
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
    
    getOrAddBullet(bullet) {
        let theBullet = this.state.bullets[bullet.id] || new Bullet(bullet, this.canvas);
        this.state.bullets[theBullet.id] = theBullet;
        return theBullet;
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
        explosions.forEach((splosion) => new Explosion(splosion, this.canvas))
    }
    
    updateBullets(bullets) {
        let deadBulletIds = Object.keys(this.state.bullets).filter((existingId) => {
            return !bullets.some(({id}) => id === existingId )
        })
        deadBulletIds.forEach(id => {
            this.state.bullets[id].remove()
            delete this.state.bullets[id]
        })
        bullets.forEach(bullet => this.getOrAddBullet(bullet).update(bullet))
    }
    
    update(frame) {
        //console.log(frame);
        this.updateAsteroids(frame.asteroids)
        this.updateShips(frame.ships)
        this.updateExplosions(frame.explosions)
        this.updateBullets(frame.bullets)
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
    
    dispose() {
        this.canvas.dispose()
    }
}