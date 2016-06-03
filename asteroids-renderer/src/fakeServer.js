

function getRandomIntBounded(max) {
    return Math.floor(Math.random() * (max + 1));
}


export default function fakeServer() {
    var that = this;
    this.subscribers = {};
    this.FRAME_RATE = 10;
    
    function generateAsteroid(id) {
        return [id, getRandomIntBounded(800), getRandomIntBounded(600), 5]
    }
    
    function moveAsteroid(id, x, y, r) {
        return [id, x > 800 ? 0 : x + 3, y > 600 ? 0 : y + 3, r]
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
            [1, 250, 250, 5, 1, '000000']
        ],
        x: []
    };
    
    const asteroidsReducer = (state) => state.map(
        (roid) => moveAsteroid(roid[0], roid[1], roid[2], roid[3])
    )
    
    const stateReducer = (state) => {
        return {
            ...state,
            a: asteroidsReducer(state.a),
            s: state.s,
            x: state.x
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