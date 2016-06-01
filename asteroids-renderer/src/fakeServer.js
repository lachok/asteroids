

function getRandomIntBounded(max) {
    return Math.floor(Math.random() * (max + 1));
}


export default function fakeServer() {
    var that = this;
    this.subscribers = {};
    this.FRAME_RATE = 10;
    
    function generateAsteroid(id) {
        return {
            x: getRandomIntBounded(800),
            y: getRandomIntBounded(600),
            id: id
        }
    }
    
    function moveAsteroid(x, y, id) {
        return {
            x: x > 800 ? 0 : x + 3,
            y: y > 600 ? 0 : y + 3,
            id: id
        }
    }
    
    this.state = {
        asteroids: [
            generateAsteroid(1),
            generateAsteroid(2),
            generateAsteroid(3),
            generateAsteroid(4),
            generateAsteroid(5),
            generateAsteroid(6)
        ],
        explosions: [],
        ships: [{id:1, x: 250, y:250}]
    };
    
    const asteroidsReducer = (state) => state.map(
        (roid) => moveAsteroid(roid.x, roid.y, roid.id)
    )
    
    const stateReducer = (state) => {
        return {
            ...state,
            asteroids: asteroidsReducer(state.asteroids),
            ships: state.ships
        }
    }
    
    this.getNextFrame = function () {
        this.state = stateReducer(this.state)
        
        //console.table(this.state.asteroids);
        return this.state
    }
    
    this.on = function(event, callback) {
        that.subscribers[event] = callback;
    }
    
    this.start = function() {
        function render(frame) {
            if(that.subscribers['frame']) {
                that.subscribers.frame(frame)
            }
            
            setTimeout(function() {
                render(that.getNextFrame())
            }, 1000 / that.FRAME_RATE)
        }

        render(that.getNextFrame())
    }
    
    return this;
};