
const scale = (size, factor, radius) => size / factor * radius 

export const asteroid = (radius) => ([
    { x: scale(-10, 10, radius), y: scale(0, 10, radius)},
    { x: scale(-5, 10, radius), y: scale(7, 10, radius)},
    { x: scale(-3, 10, radius), y: scale(4, 10, radius)},
    { x: scale(1, 10, radius), y: scale(10, 10, radius)},
    { x: scale(5, 10, radius), y: scale(4, 10, radius)},
    { x: scale(10, 10, radius), y: scale(0, 10, radius)},
    { x: scale(5, 10, radius), y: scale(-6, 10, radius)},
    { x: scale(2, 10, radius), y: scale(-10, 10, radius)},
    { x: scale(-4, 10, radius), y: scale(-10, 10, radius)},
    { x: scale(-4, 10, radius), y: scale(-5, 10, radius)}
])

export const ship = (radius) => ([
    {x: scale(-5, 10, radius), y: scale(4, 10, radius)},
    {x: scale(0, 10, radius), y: scale(-12, 10, radius)},
    {x: scale(5, 10, radius), y: scale(4, 10, radius)}
])
