export const updateScore = (player, event) => {
    return {
        type: 'UPDATE_SCORE',
        payload: {player, event}
    }
}