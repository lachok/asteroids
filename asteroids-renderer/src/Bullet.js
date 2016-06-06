import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default function Explosion({x, y}, canvas) {
    var line = new fabric.Line([0, 0, 1, 1], {
        left: x,
        top: y,
        fill: 'transparent',
        stroke: 'white',
        selectable: false,
        originX: 'left',
        originY: 'top'
    })
    canvas.add(line)
  
    setTimeout(function() {canvas.remove(line)}, 150)
}