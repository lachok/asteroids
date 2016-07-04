import fakeServer from './fakeServer'
import Server from './Server'
import Renderer from './Renderer'
import transformFrame from './transformFrame'

// console.log('fabric', fabric)
// console.log('window.fabric', window.fabric);

const serverDimensions = {WIDTH: 4000, HEIGHT: 2250}
const clientDimensions = {WIDTH: 800, HEIGHT: 600}


const renderer = new Renderer({...clientDimensions, FRAME_RATE: 24})
//const server = new fakeServer(serverDimensions)
const server = new Server()

server.on('frame', (frame) => renderer.update(transformFrame(frame, transformRatio, serverDimensions)))

const transformRatio = {
    WIDTH: serverDimensions.WIDTH / clientDimensions.WIDTH,
    HEIGHT: serverDimensions.HEIGHT / clientDimensions.HEIGHT
}

renderer.start()
server.connect()

// check if HMR is enabled
if(module.hot) {

    // accept itself
    module.hot.accept('./Renderer', () => {
        const nextRenderer = require('./Renderer').default
        const newRenderer = new nextRenderer({...clientDimensions, FRAME_RATE: 24})
        server.off('frame')
        server.on('frame', (frame) => newRenderer.update(transformFrame(frame, transformRatio, serverDimensions)))
        newRenderer.start()
    })

    // dispose handler
    module.hot.dispose(function() {
        // revoke the side effect
        console.log('dispose')
        renderer.dispose();
    });
}