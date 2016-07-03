export default function transformFrame(frame) {
    return {
        asteroids: frame.a,
        ships: frame.s,
        explosions: frame.x,
        bullets: frame.b
    }
}