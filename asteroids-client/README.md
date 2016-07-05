Asteroids Client
==================

Uses websockets to connect to [an asteroids game server](https://github.com/devstopfix/asteroids-server).

Usage
-----
```
npm install
npm start
```

Implementation Ideas
--------------------
Not a lot can be done in 1 hour, but here are some ideas:
 - do not shoot others until they shoot at you
 - don't shoot your teammates
 - don't shoot an oponent if your teammate is between you and them
 - an asteroid will hit you if its [bearing](https://en.wikipedia.org/wiki/Bearing_(navigation)) (angle to you) does not shift significantly over successive frames
 - shoot the nearest asteroid
 - shoot the farthest asteroid
 - shoot the nearest ship
 - shoot the farthest ship
 - use finite state machines to switch between behaviour modes
 - monte carlo methods
 - "learning" to shoot: shoot randomly and keep track of when a target is hit and the associated "frame" from when the shot was fired. Use machine learning to "predict" the angle with highest probability of successful hit, based on the current frame and previous successfull frames. 

https://en.wikipedia.org/wiki/Machine_learning


Implement your client in `./src/app.js`. The server state is received as a `frame` event. The state protocol is described below. The client applies a minimal transformation (`./src/transformFrame.js`) which can be improved. 

Supported Game State Protocol
-----------------------------
Each server frame will look like
```
var sampleFrame = {
    "rocks":[[375,2.80318484,30,871.4],[382,3.42608659,30,1623.2],[384,5.28487096,15,1517.2],[385,4.71548563,15,904.2],[403,5.44098398,30,348.7],[404,6.26705367,30,1611.8],[405,4.53969654,15,418.4],[406,5.4882665,15,1871.7],[408,0.42939734,15,788.8],[409,3.47910334,15,575.9]],
    "ships":[["WBH",5.0262324,1211.8]],
    "status":200,
    "tag":"LAK",
    "theta":0,
    "s":[],
    "x":[]
}
```