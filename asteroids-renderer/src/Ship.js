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
        
        this.text = new fabric.Text(id + '', {
            fontFamily: 'Courier New',
            left: x,
            top: y + r / 10,
            fontSize: 16,
            fill: fabric.Color.fromHex(colour).toRgb(),
            originX: 'center',
            originY: 'center',
        })
        
        this.id = id
        
        canvas.add(this.ship)
        canvas.add(this.text)
    }
    
    update({angle}, duration) {
        var animation = { angle: Math.abs(angle) }
        let animationSettings = { duration: duration, easing: utils.easing.linear }
        
        this.ship.animate(animation, animationSettings)
        this.text.animate(animation, animationSettings)
        
    }
}