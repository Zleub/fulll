const { Duplex } = require('stream');
const { create } = require('./lib')

const {
    isVehicleRegisteredHandler,
    getLocationHandler,
    getVehicleLocationHandler } = require('./queryHandler')

const queryStream = new Duplex({ objectMode: true, read() { } })

queryStream.on('data', cmd => {
    cmd.publisher.emit('done', cmd.handler())
})

const createQuery = create(queryStream)

exports.isVehicleRegistered = createQuery(isVehicleRegisteredHandler)

exports.getLocation = createQuery(getLocationHandler)
exports.getVehicleLocation = createQuery(getVehicleLocationHandler)