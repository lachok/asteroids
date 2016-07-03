import AsteroidsClient from './AsteroidsClient'
import transformFrame from './transformFrame'

const client = new AsteroidsClient()

client.on('frame', (frame) => {
    const serverState = transformFrame(frame)

    // TODO

    //client.send()
})

client.connect()