import fakeServer from './fakeServer'
import Server from './Server'
import Renderer from './Renderer'
import transformFrame from './transformFrame'

// console.log('fabric', fabric)
// console.log('window.fabric', window.fabric);

const serverDimensions = {WIDTH: 4000, HEIGHT: 2250}
const clientDimensions = {WIDTH: 1920, HEIGHT: 1080}


const renderer = new Renderer({...clientDimensions, FRAME_RATE: 1})
//const server = new fakeServer(serverDimensions)
const server = new Server()

server.on('frame', (frame) => renderer.update(transformFrame(frame, transformRatio)))

const transformRatio = {
    WIDTH: serverDimensions.WIDTH / clientDimensions.WIDTH,
    HEIGHT: serverDimensions.HEIGHT / clientDimensions.HEIGHT
}

function onMessage(evt) { 
    //console.log(evt.data);
    renderer.update(transformFrame(message, transformRatio))
}; 

renderer.start()
server.connect()
