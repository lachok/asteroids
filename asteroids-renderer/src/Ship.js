import { fabric } from 'fabric'
import * as shapes from './shapes'

export default class Ship extends fabric.Polygon {
    constructor(id, coords, canvas) {
        super(shapes.ship, {
            left: coords.x,
            top: coords.y,
            fill: 'transparent',
            stroke: 'black',
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