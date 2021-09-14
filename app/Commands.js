const { Duplex } = require('stream');
const EventEmitter = require('events');

const { createFleetHandler } = require('./commandHandler.js');

let commandStream = new Duplex({ objectMode: true, read() { } })

commandStream.on('data', e => {
    console.log('push in command stream')
    let i = e.handler()
    e.e.emit('done', i)
})

const createCommand = (handler) => new Promise((res, rej) => {
    let e = new EventEmitter()
    e.on('done', (e) => res(e))
    e.on('error', (e) => rej(e))

    commandStream.push({ handler, e })
})

exports.createFleet = () => createCommand(createFleetHandler)
exports.createFleet = () => createCommand(createFleetHandler)
