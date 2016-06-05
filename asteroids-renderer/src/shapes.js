
const scale = (value, radius) => value / 10 * radius 

export const asteroid = (radius) => ([
    { x: scale(-10, radius), y: scale(0, radius)},
    { x: scale(-5, radius), y: scale(7, radius)},
    { x: scale(-3, radius), y: scale(4, radius)},
    { x: scale(1, radius), y: scale(10, radius)},
    { x: scale(5, radius), y: scale(4, radius)},
    { x: scale(10, radius), y: scale(0, radius)},
    { x: scale(5, radius), y: scale(-6, radius)},
    { x: scale(2, radius), y: scale(-10, radius)},
    { x: scale(-4, radius), y: scale(-10, radius)},
    { x: scale(-4, radius), y: scale(-5, radius)}
])

export const ship = (radius) => ([
    {x: scale(-5, radius), y: scale(4, radius)},
    {x: scale(0, radius), y: scale(-12, radius)},
    {x: scale(5, radius), y: scale(4, radius)}
])
