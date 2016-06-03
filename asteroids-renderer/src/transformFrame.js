

const transformAsteroid = ([id, x, y, r], ratio) => ({
    id, 
    x: x / ratio.WIDTH, 
    y: y / ratio.HEIGHT, 
    r: r / ratio.WIDTH
})

const transformShip = ([id, x, y, r, angle, colour], ratio) => ({
    id,
    x: x / ratio.WIDTH, 
    y: y / ratio.HEIGHT, 
    r: r / ratio.WIDTH,
    angle: (angle - Math.PI / 2) / (Math.PI / 180), colour}
)

const transformExplosion = ([x, y]) => ({x, y})

export default function transformFrame(frame, ratio) {
    return {
        asteroids: frame.a.map((a) => transformAsteroid(a, ratio)),
        ships: frame.s.map((s) => transformShip(s, ratio)),
        explosions: frame.x.map((x) => transformExplosion(x, ratio))
    }
}