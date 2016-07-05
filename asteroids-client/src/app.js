import AsteroidsClient from './AsteroidsClient'

var sampleFrame = {
    "rocks":[[375,2.80318484,30,871.4],[382,3.42608659,30,1623.2],[384,5.28487096,15,1517.2],[385,4.71548563,15,904.2],[403,5.44098398,30,348.7],[404,6.26705367,30,1611.8],[405,4.53969654,15,418.4],[406,5.4882665,15,1871.7],[408,0.42939734,15,788.8],[409,3.47910334,15,575.9]],
    "ships":[["WBH",5.0262324,1211.8]],
    "status":200,
    "tag":"LAK",
    "theta":0,
    "s":[],
    "x":[]
}

const transformRock = (rock) => {
    return {id: rock[0], theta: rock[1], radius: rock[2], dist: rock[3]}
}

const transformShip = (ship) => {
    return {name: ship[0], theta: ship[1], dist: ship[2]}
}

const transformFrame = (frame) => {
    return {
        lastKilledBy: frame.kby,
        rocks: sortByDistance(frame.rocks.map(transformRock)),
        ships: sortByDistance(frame.ships.map(transformShip)),
        status: frame.status,
        tag: frame.tag,
        theta: frame.theta,
        s: frame.s,
        x: frame.x,
    }
}

const sortByDistance = (objects) => [...objects].sort((a, b) => a.dist - b.dist)

const client = new AsteroidsClient()

client.on('frame', (frame) => {
    const serverState = transformFrame(frame)

    //console.log(frame)
    //console.log(serverState)
    //console.log(serverState.theta)

    // TODO
    let targetShip = serverState.ships[0]
    let targetRock = serverState.rocks[0]


    if(targetShip) { //shoot the nearest ship
        client.send({theta: targetShip.theta})
        client.send({fire: true})
    } else if(targetRock) { //shoot the nearest rock
        client.send({theta: targetRock.theta})
        client.send({fire: true})
    } else { // turn and shoot
        let theta = (serverState.theta + 0.5 + 0.01) % (2 * Math.PI)
        client.send({theta: theta})
        client.send({fire: true})
    }
})

client.connect('ws://ec2-52-58-193-54.eu-central-1.compute.amazonaws.com/ship/LAK')