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
        });
        
        this.id = id;
        
        canvas.add(this);
        canvas.add(this.text);
    }
    
    update({x, y}, duration) {
        var animation = {
            left: x,
            top: y,
            angle: '+=30'
        }
        if(Math.abs(this.left - x) > 100) {
            delete animation.left;
            this.set('left', x);
        }
        if(Math.abs(this.top - y) > 100) {
            delete animation.top;
            this.set('top', y);
        }
        this.animate(animation, {
            duration: duration,
            easing: utils.easing.linear
        })
        this.text.animate(
            { left: this.left - 15, top: this.top - 25 }, 
            { duration: 100, easing: utils.easing.linear }
        )
    }
}