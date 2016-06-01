import fakeServer from './fakeServer'
import Renderer from './Renderer'

console.log('fabric', fabric)
console.log('window.fabric', window.fabric);

var renderer = new Renderer()
var server = new fakeServer()

server.start()
renderer.start(server)
