import AsteroidsClient from './AsteroidsClient'

const scoreClient = new AsteroidsClient()

scoreClient.connect('ws://ec2-52-28-1-127.eu-central-1.compute.amazonaws.com/news')

scoreClient.on('frame', (frame) => {

    const updateScore = (score, player, metric) => {
        if(metric) {
            score[player][metric] = (score[player][metric] || 0) + 1
        } else {
            return score
        }
    }

    let score = {};
    // ABC fires
    // ABC shot ASTEROID
    // ASTEROID hit ABC
    // ABC killed ZYX

    // POINTS:
    // Rock = 5
    // Oponent = 1
    // Friend = -2

    let firesRegex = /([A-Z]{3}) fires/
    let shotAsteroidRegex = /([A-Z]{3}) shot ASTEROID/
    let hitByAsteroidRegex = /ASTEROID hit ([A-Z]{3})/
    let killedRegex = /([A-Z]{3}) killed ([A-Z]{3})/

    if (frame && frame.length > 0) {
        // let [, firesMatch] = firesRegex.exec(frame) || []
        // let [, shotAsteroidMatch] = shotAsteroidRegex.exec(frame) || []
        // let [, hitByAsteroidMatch] = hitByAsteroidRegex.exec(frame) || []
        // let [, killedByMatch, killedMatch] = killedRegex.exec(frame) || []

        // score = updateScore(score, firesMatch, 'fired')
        // score = updateScore(score, shotAsteroidMatch, 'shotAsteroid')
        // score = updateScore(score, hitByAsteroidMatch, 'hitByAsteroid')
        // score = updateScore(score, killedMatch, 'died')
        // score = updateScore(score, killedByMatch, 'killed')

        console.log(frame)
    }
})