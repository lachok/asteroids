

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
        angle: (angle + Math.PI / 2) / (Math.PI / 180), colour}
    )

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