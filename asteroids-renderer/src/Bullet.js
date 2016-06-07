import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'


export default class Bullet {
    constructor({id, x, y}, canvas) {
        var bullet = new fabric.Line([-2, -2, 2, 2], {
            left: x,
            top: y,
            fill: 'transparent',
            stroke: 'white',
            selectable: false,
            originX: 'left',
            originY: 'top'
        })
        
        canvas.add(bullet)
        this.canvas = canvas
        this.id = id
        this.bullet = bullet
    }
    
    update({x, y}, duration) {
        let animation = {
            left: x,
            top: y
        }
        
        let animationSettings = { duration: duration, easing: utils.easing.linear }
        
        if(Math.abs(this.bullet.left - x) > 100) {
            this.bullet.set('left', x)
        }
        if(Math.abs(this.bullet.top - y) > 100) {
            this.bullet.set('top', y)
        }
        this.bullet.animate(animation, animationSettings)
    }
    
    remove() {
        this.canvas.remove(this.bullet)
    }
}