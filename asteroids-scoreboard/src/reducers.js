let initialState = {}


// ABC fires
// ABC shot ASTEROID
// ASTEROID hit ABC
// ABC killed ZYX

// POINTS:
// Rock = 5
// Oponent = 1
// Friend = -2

export const score = (state = initialState, {type, payload, error}) => {
  if(error === true) {
    console.log('error', payload)
    return state
  } else {
    switch (type) {
      case 'UPDATE_SCORE': return updateScore(state, payload.player, payload.event)
      default:
        return state;
    }
  }
};

const pointsByEvent = {
    shotAsteroid: 5,
    killedEnemy: 1,
    killedFriend: -2
}

const increment = (value = 0, incrementBy = 0) => {
    return value + incrementBy
}

const withScore = (currentScore = 0, event) => {
    return currentScore + pointsByEvent[event]
}

const withPlayerScore = (playerScore = {}, withEvent, event) => {
    return {
        ...playerScore,
        score: increment(playerScore.score, pointsByEvent[event]),
        [event]: withEvent(playerScore[event], 1)
    }
}

const updateScore = (score = {}, player, event) => {
    if(player) {
        return {
            ...score,
            [player]: withPlayerScore(score[player], increment, event)
        }
    }
    return score;
}

export default updateScore