import fakeServer from './fakeServer'
import Renderer from './Renderer'
import transformFrame from './transformFrame'

// console.log('fabric', fabric)
// console.log('window.fabric', window.fabric);

const serverDimensions = {WIDTH: 4000, HEIGHT: 2250}
const clientDimensions = {WIDTH: 1920, HEIGHT: 1080}

//const server = new fakeServer(serverDimensions)
const renderer = new Renderer({...clientDimensions, FRAME_RATE: 1})

const transformRatio = {
    WIDTH: serverDimensions.WIDTH / clientDimensions.WIDTH,
    HEIGHT: serverDimensions.HEIGHT / clientDimensions.HEIGHT
}
    
    
  var my = {},
    websocket,
    messages = 0;
    

function connect() {
    websocket = new WebSocket('ws://localhost:8065/websocket');
    websocket.onopen = function(evt) { onOpen(evt) }; 
    websocket.onclose = function(evt) { onClose(evt) }; 
    websocket.onmessage = function(evt) { onMessage(evt) }; 
};  

  function onMessage(evt) { 
    //console.log(evt.data);
    let message = JSON.parse(evt.data);
    message.s = []
    message.x = []
    renderer.update(transformFrame(message, transformRatio))
  }; 
  
function onOpen(evt) { 
    //updateStatus('<span style="color: green;">CONNECTED </span>'); 
};
  
function onClose(evt) { 
    //updateStatus('<span style="color: red;">DISCONNECTED </span>');
};  
  
  
  function disconnect() {
    websocket.close();
  }; 

//server.start()
renderer.start()
connect()
//server.on('frame', (frame) => renderer.update(transformFrame(frame, transformRatio)))
