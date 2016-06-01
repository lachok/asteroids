import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default class Asteroid extends fabric.Polygon {
    constructor(id, coords, canvas) {
        
        super(shapes.asteroid, {
            left: coords.x,
            top: coords.y,
            fill: 'transparent',
            stroke: 'black',
            selectable: false,
            originX: 'center',
            originY: 'center'
        })
        
        this.text = new fabric.Text(coords.id + '', {
            fontFamily: 'Courier New',
            left: coords.x,
            top: coords.y,
            fontSize: 16,
            fill: '#000000'
        });
        
        this.id = coords.id;
        
        canvas.add(this);
        canvas.add(this.text);
    }
    
    update(coords, duration) {
        var animation = {
            left: coords.x,
            top: coords.y,
            angle: '+=30'
        };
        if(Math.abs(this.left - coords.x) > 100) {
            delete animation.left;
            this.set('left', coords.x);
        }
        if(Math.abs(this.top - coords.y) > 100) {
            delete animation.top;
            this.set('top', coords.y);
        }
        this.animate(animation, {
            duration: duration,
            easing: utils.easing.linear
        });
        this.text.animate(
            { left: this.left - 15, top: this.top - 25 }, 
            { duration: 100, easing: utils.easing.linear }
        );
    }
}