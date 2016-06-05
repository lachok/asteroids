import { fabric } from 'fabric'

export default class FpsCounter {
    
    constructor(canvas) {
        this.text = new fabric.Text('FPS: 0', {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 'white',
            fontWeight: 'bold',
            left: 5,
            top: 5,
            selectable: false
        })
        
        canvas.add(this.text)
        
        this.frames = 0
        this.startTime = Date.now()
        this.prevTime = this.startTime
    }
    
    update() {
        var time = Date.now()
        this.frames++

        if ( time > this.prevTime + 1000 ) {
            let fps = Math.round( ( this.frames * 1000 ) / ( time - this.prevTime ) )
            this.prevTime = time
            this.frames = 0

            this.text.setText("FPS: " + fps)
        }
    }
}