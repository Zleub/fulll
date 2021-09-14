const EventEmitter = require('events');

exports.create = (stream) => (handler) => (...args) => new Promise((res, rej) => {
    let publisher = new EventEmitter()
    publisher.on('done', res)
    publisher.on('error', rej)

    stream.push({ handler: () => handler(...args), publisher })
})