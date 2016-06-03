import { fabric } from 'fabric'
import * as shapes from './shapes'

export default class Ship extends fabric.Polygon {
    constructor({id, x, y, colour}, canvas) {
        super(shapes.ship, {
            left: x,
            top: y,
            fill: 'transparent',
            stroke: fabric.Color.fromHex(colour).toRgb(),
            selectable: false,
            originX: 'center',
            originY: 'center'
        })
        
        this.id = id
        
        canvas.add(this)
    }
    
    update(coords, duration) {
        
    }
}