const { Duplex } = require('stream');
const { create } = require('./lib')

const {
    isVehicleRegisteredHandler,
    getLocationHandler,
    getVehicleByIndexHandler,
    getVehicleByIDHandler,
    getFleetHandler,
    getVehicleLocationHandler } = require('./queryHandler')

const queryStream = new Duplex({ objectMode: true, read() { } })

queryStream.on('data', async cmd => {
    try {
        cmd.publisher.emit('done', await cmd.handler())
    } catch (e) {
        cmd.publisher.emit('error', e)
    }
})

const createQuery = create(queryStream)

exports.isVehicleRegistered = createQuery(isVehicleRegisteredHandler)

exports.getLocation = createQuery(getLocationHandler)
exports.getVehicleByIndex = createQuery(getVehicleByIndexHandler)
exports.getVehicleByID = createQuery(getVehicleByIDHandler)
exports.getFleet = createQuery(getFleetHandler)
exports.getVehicleLocation = createQuery(getVehicleLocationHandler)