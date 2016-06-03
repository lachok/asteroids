import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default class Ship extends fabric.Polygon {
    constructor({id, x, y, r, colour}, canvas) {
        super(shapes.ship, {
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
        
        canvas.add(this)
    }
    
    update({angle}, duration) {
        var animation = {
            angle: Math.abs(angle)
        }
        
        this.animate(animation, {
            duration: duration,
            easing: utils.easing.linear
        })
        
    }
}