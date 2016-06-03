

const transformAsteroid = ([id, x, y, r]) => ({id, x, y, r})

const transformShip = ([id, x, y, r, angle, colour]) => (
    {id, x, y, r, angle: (angle - Math.PI / 2) / (Math.PI / 180), colour}
)

const transformExplosion = ([x, y]) => ({x, y})

export default function transformFrame(frame) {
    return {
        asteroids: frame.a.map(transformAsteroid),
        ships: frame.s.map(transformShip),
        explosions: frame.x.map(transformExplosion)
    }
}