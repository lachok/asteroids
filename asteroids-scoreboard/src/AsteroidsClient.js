export default class AsteroidsClient {
    
    constructor() {
        this.subscribers = {};
    }
    
    connect(url = 'ws://localhost:8065/websocket') {        
        const onOpen = (event) => console.log('WebSocket: Open')
        const onClose = (event) => console.log('WebSocket: Closed') 
        
        this.websocket = new WebSocket(url)
        this.websocket.onopen = (event) => { onOpen(event) }
        this.websocket.onclose = (event) => { onClose(event) }
        this.websocket.onmessage = (event) => { this.onMessage(event) }
    }
    
    onMessage(event) {
        if(this.subscribers['frame']) {
            this.subscribers.frame.forEach(callback => callback(event.data))
        }
    }
    
    on(eventName, callback) {
        this.subscribers[eventName] = this.subscribers[event] || []
        this.subscribers[eventName].push(callback);
    }
    
    disconnect() {
        this.websocket.close()
    }
}