import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default class Asteroid extends fabric.Polygon {
    constructor({id, x, y, r},  canvas) {
        
        super(shapes.asteroid, {
            left: x,
            top: y,
            fill: 'transparent',
            stroke: 'black',
            selectable: false,
            originX: 'center',
            originY: 'center',
            scaleX: r / 10,
            scaleY: r / 10
        })
        
        this.text = new fabric.Text(id + '', {
            fontFamily: 'Courier New',
            left: x,
            top: y,
            fontSize: 16,
            fill: '#000000'
        })
        
        this.id = id
        
        canvas.add(this)
        canvas.add(this.text)
    }
    
    update({x, y}, duration) {
        let animation = {
            left: x,
            top: y,
            angle: '+=20'
        }
        
        let textAnimation = { left: this.left - 15, top: this.top - 25 }
        let animationSettings = { duration: duration, easing: utils.easing.linear }
        
        if(Math.abs(this.left - x) > 100) {
            this.set('left', x)
            this.text.set('left', x)
        }
        if(Math.abs(this.top - y) > 100) {
            this.set('top', y)
            this.text.set('top', y)
        }
        this.animate(animation, animationSettings)
        this.text.animate(textAnimation, animationSettings)
    }
}