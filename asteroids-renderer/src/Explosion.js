import { fabric } from 'fabric'
import * as shapes from './shapes'
import * as utils from './utils'

export default function Explosion({x, y}, canvas) {
  let lines = [];
    for (var i = 0; i < 50; i++) {
      // var x1 = Math.cos(rad)// * Math.random()
      // var y1 = Math.sin(rad)// * Math.random()
      var line = new fabric.Line([-5, -5, 5, 5], {
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
        left: line.get('left') + 80 * Math.random() * Math.cos(line.get('angle') * Math.PI / 180),
        top: line.get('top') + 80 * Math.random() * Math.sin(line.get('angle') * Math.PI / 180)
        //angle: 720 * (Math.random() - 0.5)
      }, {
        duration: 500,
        easing: utils.easing.linear,
        onComplete: () => canvas.remove(line)
      })
    })
}