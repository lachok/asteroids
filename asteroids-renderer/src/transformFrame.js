

export default function transformFrame(frame, ratio, serverDimmensions) {
    const transformAsteroid = ([id, x, y, r]) => ({
        id, 
        x: x / ratio.WIDTH, 
        y: (serverDimmensions.HEIGHT - y) / ratio.HEIGHT, 
        r: r / ratio.WIDTH
    })

    const transformShip = ([id, x, y, r, angle, colour]) => ({
        id,
        x: x / ratio.WIDTH, 
        y: (serverDimmensions.HEIGHT - y) / ratio.HEIGHT, 
        r: r / ratio.WIDTH,
        angle: 360 - angle * (180 / Math.PI) + 90, // server measures angles conuterclockwise starting from 12 o'clock
        colour
    })

    const transformExplosion = ([x, y]) => ({
        x: x / ratio.WIDTH, 
        y: (serverDimmensions.HEIGHT - y) / ratio.HEIGHT
    })

    const transformBullet = ([id, x, y]) => ({
        id, 
        x: x / ratio.WIDTH, 
        y: (serverDimmensions.HEIGHT - y) / ratio.HEIGHT
    })

    return {
        asteroids: frame.a.map((a) => transformAsteroid(a)),
        ships: frame.s.map((s) => transformShip(s)),
        explosions: frame.x.map((x) => transformExplosion(x)),
        bullets: frame.b.map(b => transformBullet(b))
    }
}