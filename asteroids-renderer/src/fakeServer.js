

function getRandomIntBounded(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default function fakeServer({WIDTH, HEIGHT}) {
    var that = this;
    this.subscribers = {};
    this.FRAME_RATE = 10;
    
    function generateAsteroid(id) {
        return [id, getRandomIntBounded(WIDTH), getRandomIntBounded(HEIGHT), Math.random() * 50]
    }
    
    function generateShip(id) {
        return [id, getRandomIntBounded(WIDTH), getRandomIntBounded(HEIGHT), 20, 0, 'ffffff']
    }
    
    function generateExplosion() {
        return [getRandomIntBounded(WIDTH), getRandomIntBounded(HEIGHT)]
    }
    
    function moveAsteroid([id, x, y, r]) {
        return [id, x > WIDTH ? 0 : x + 3, y > HEIGHT ? 0 : y + 3, r]
    }
    
    function rotateShip([id, x, y, r, t, col]) {
        return [id, x, y, r, t + Math.random() - 0.5, col]
    }
    
    this.state = {
        a: [
            generateAsteroid(1),
            generateAsteroid(2),
            generateAsteroid(3),
            generateAsteroid(4),
            generateAsteroid(5),
            generateAsteroid(6)
        ],
        s: [
            generateShip(1),
            generateShip(2),
            generateShip(3),
            generateShip(4),
            generateShip(5),
            generateShip(6)
        ],
        x: []
    };
    
    const stateReducer = (state) => {
        return {
            ...state,
            a: state.a.map(moveAsteroid),
            s: state.s.map(rotateShip),
            x: [generateExplosion()]
        }
    }
    
    this.getNextFrame = function () {
        this.state = stateReducer(this.state)
        
        //console.table(this.state.asteroids);
        return this.state
    }
    
    this.on = function(event, callback) {
        that.subscribers[event] = that.subscribers[event] || [];
        that.subscribers[event].push(callback);
    }
    
    this.connect = function() {
        function render(frame) {
            if(that.subscribers['frame']) {
                that.subscribers.frame.forEach(callback => callback(frame))
            }
            
            setTimeout(function() {
                render(that.getNextFrame())
            }, 1000 / that.FRAME_RATE)
        }

        render(that.getNextFrame())
    }
    
    return this;
};