import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './createStore'
import { updateScore } from './actions'

import App from './App'
import AsteroidsClient from './AsteroidsClient'

import './main.less'
import 'file?name=[name].[ext]!./index.html'

const store = createStore()

const scoreClient = new AsteroidsClient()

scoreClient.connect('ws://ec2-52-28-1-127.eu-central-1.compute.amazonaws.com/news')

const teams = [
    {
        name: 'Team 1',
        players: ['XYZ', 'ABC'] 
    },
    {
        name: 'Team 2',
        players: ['OTH'] 
    }
]

const areFriends = (killer, victim, teams) => {
    for(let i = 0; i < teams.length; i++) {
        const players = teams[i].players
        if(players.includes(killer) && players.includes(victim))
            return true
    }
    return false
}

scoreClient.on('frame', (frame) => {
    let firesRegex = /([A-Z]{3}) fires/
    let shotAsteroidRegex = /([A-Z]{3}) shot ASTEROID/
    let hitByAsteroidRegex = /ASTEROID hit ([A-Z]{3})/
    let killedRegex = /([A-Z]{3}) killed ([A-Z]{3})/

    if (frame && frame.length > 0) {
        let [, firesMatch] = firesRegex.exec(frame) || []
        let [, shotAsteroidMatch] = shotAsteroidRegex.exec(frame) || []
        let [, hitByAsteroidMatch] = hitByAsteroidRegex.exec(frame) || []
        let [, killedByMatch, killedMatch] = killedRegex.exec(frame) || []
        
        if(firesMatch) {
            store.dispatch(updateScore(firesMatch, 'fired'))
        }
        if(shotAsteroidMatch) {
            store.dispatch(updateScore(shotAsteroidMatch, 'shotAsteroid'))
        }
        if(hitByAsteroidMatch) {
            store.dispatch(updateScore(hitByAsteroidMatch, 'hitByAsteroid'))
        }
        if(killedMatch) {
            store.dispatch(updateScore(killedMatch, 'died'))
        }
        if(killedByMatch) {
            store.dispatch(updateScore(killedByMatch, 'killed' + (areFriends(killedMatch, killedByMatch, teams) ? 'Friend' : 'Enemy')))
        }
    }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)