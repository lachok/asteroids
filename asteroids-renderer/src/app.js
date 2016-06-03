import fakeServer from './fakeServer'
import Renderer from './Renderer'
import transformFrame from './transformFrame'

console.log('fabric', fabric)
console.log('window.fabric', window.fabric);

var server = new fakeServer()
var renderer = new Renderer({FRAME_RATE: server.FRAME_RATE})

server.start()
renderer.start()
server.on('frame', (frame) => renderer.update(transformFrame(frame)))

