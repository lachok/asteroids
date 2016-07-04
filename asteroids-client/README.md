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
```
{
  a:   [    [ id, x, y, r], ... ]           // List of asteroids
  s:   [    [ id, x, y, r, t, col], ... ]   // List of ships
  b:   [    [ id, x, y], ... ]              // List of bullets
  x:   [    [x, y], ... ]                   // List of explosions (only occur once)
  n:   integer                              // Incrementing frame number
  dim: [x, y]                               // The size of the play area (currently 4000.0 x 2250.0)
  hi:  [  [tag, score]  ]                   // Individual high score
  t:   [  [team, score]  ]                  // Team high score
}
```
				
Asteroid Definition
```					
id	integer 	id of rock, autoincrementing, never reused
x	float	metres from bottom left
y	float	metres from bottom left
r	float	radius in metres
```					
Ship Definition
```					
tag	String	3 unicode chars. unique
x	float	metres from bottom left
y	float	metres from bottom left
r	float	radius in metres
t	float	angle theta clockwise from x-axis in radians (0.. 2π)
col	string	color - six char hex code (e.g. FFFFFF for white)
```

Bullet Definition
```					
id	integer	
x	float	metres from bottom left
y	float	metres from bottom left
```					
eXplosion Definition
```					
x	float	metres from bottom left
y	float	metres from bottom left
```					
