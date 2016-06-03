import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default class Ship {
    constructor({id, x, y, r, colour}, canvas) {
        this.ship = new fabric.Polygon(shapes.ship, {
            left: x,
            top: y,
            fill: 'transparent',
            stroke: fabric.Color.fromHex(colour).toRgb(),
            selectable: false,
            originX: 'center',
            originY: 'center',
            scaleX: r / 10,
            scaleY: r / 10
        })
        
        this.id = id
        
        canvas.add(this.ship)
    }
    
    update({angle}, duration) {
        var animation = {
            angle: Math.abs(angle)
        }
        
        this.ship.animate(animation, {
            duration: duration,
            easing: utils.easing.linear
        })
        
    }
}