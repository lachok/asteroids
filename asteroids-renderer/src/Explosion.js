import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default function Explosion({x, y}, canvas) {
  let lines = [];
    for (var i = 0; i < 10; i++) {
      // var x1 = Math.cos(rad)// * Math.random()
      // var y1 = Math.sin(rad)// * Math.random()
      var line = new fabric.Line([-2, -2, 2, 2], {
          left: x,
          top: y,
          fill: 'transparent',
          stroke: 'yellow',
          selectable: false,
          originX: 'left',
          originY: 'top',
          angle: 360 * Math.random()
      })
      canvas.add(line)
      lines.push(line)
    }
    
    lines.forEach((line) => {
      line.animate({
        left: line.get('left') + 20 * Math.cos(line.get('angle') * Math.PI / 180),
        top: line.get('top') + 20 * Math.sin(line.get('angle') * Math.PI / 180)
        // scaleX: 0,
        // scaleY: 0,
        // width: 0,
        // height: 0
        // angle: 720 * (Math.random() - 0.5)
      }, {
        duration: 500,
        easing: utils.easing.linear,
        onComplete: () => canvas.remove(line)
      })
    })
}