import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default class Explosion extends fabric.Polyline {
    constructor({x, y}, canvas) {
        super(shapes.explosion, {
            left: x,
            top: y,
            fill: 'transparent',
            stroke: 'black',
            selectable: false,
            originX: 'center',
            originY: 'center'
        })
        
        //canvas.add(this)
    }

    update(duration) {     
        // var animation = {
        //     angle: '+=3'
        // }

        // this.animate(animation, {
        //     duration: duration * 10,
        //     easing: utils.easing.linear
        // })
    }
}