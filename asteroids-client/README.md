Asteroids Client
==================

Uses websockets to connect to [an asteroids game server](https://github.com/devstopfix/asteroids-server).

Usage
-----
```
npm install
npm start
```

Frame Protocol
-----------------------------
The server state is received as a `frame` event. The sample client applies a transformation function (`transformFrame`) which can be improved.

Server frame protocol:
```
 kby : String : Name of ship that last killed you
 rocks : Array : List of nearby rocks
  rock : Array : Rock details in the form [id, bearing, size, distance]
 ships : Array : List of nearby ships
  ship : Array : Ship details in the form [name, bearing, distance]
 status : Number : Server status
 tag : String : 3-letter client identifier
 theta : Number : Current client direction in radians (0..2PI)
```

Here is a sample server frame:
```
var sampleFrame = {
    "kby": "ABC",
    "rocks":[[375,2.80318484,30,871.4],[382,3.42608659,30,1623.2],[384,5.28487096,15,1517.2],[385,4.71548563,15,904.2],[403,5.44098398,30,348.7],[404,6.26705367,30,1611.8],[405,4.53969654,15,418.4],[406,5.4882665,15,1871.7],[408,0.42939734,15,788.8],[409,3.47910334,15,575.9]],
    "ships":[["WBH",5.0262324,1211.8]],
    "status":200,
    "tag":"LAK",
    "theta":0
}
```

Client message protocol:
```
 theta : Float : New client direction in radians (0..2PI) - bug - must be floar so add 0.001 to everything! e.g. 1.0 + 0.001 => 1.0001
 fire : Boolean : Whether the client is firing a bullet
```

Sample client messages:
```
{ "theta": 1.01, "fire": true }
```
```
{ "fire": true }
```
```
{ "theta": 1.01 }
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

Implement your client in `./src/app.js`.

Teams
-----
Clients are free to form and join teams. These could be pre-defined or dynamic. Each client is responsible for knowing whether another ship is on the same team or not, i.e. the server does not maintain or send teams and/or teammates.

