import fakeServer from './fakeServer'
import Renderer from './Renderer'
import transformFrame from './transformFrame'

console.log('fabric', fabric)
console.log('window.fabric', window.fabric);

const serverDimensions = {WIDTH: 4000, HEIGHT: 3400}
const clientDimensions = {WIDTH: 1920, HEIGHT: 1080}

const server = new fakeServer(serverDimensions)
const renderer = new Renderer({...clientDimensions, FRAME_RATE: server.FRAME_RATE})

const transformRatio = {
    WIDTH: serverDimensions.WIDTH / clientDimensions.WIDTH,
    HEIGHT: serverDimensions.HEIGHT / clientDimensions.HEIGHT
}
    

server.start()
renderer.start()
server.on('frame', (frame) => renderer.update(transformFrame(frame, transformRatio)))
