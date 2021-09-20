const { Duplex } = require('stream');
const { create } = require('./lib')

const {
    createFleetHandler,
    createVehicleHandler,
    createLocationHandler,
    registerVehicleInFleetHandler,
    parkVehicleAtLocationHandler,
    parkVehicleFromFleetAtLocationHandler } = require('./commandHandler.js');

const commandStream = new Duplex({ objectMode: true, read() { } })

commandStream.on('data', async cmd => {
    try {
        cmd.publisher.emit('done', await cmd.handler())
    } catch (e) {
        cmd.publisher.emit('error', e)
    }
})

const createCommand = create(commandStream)

exports.createFleet = createCommand(createFleetHandler)
exports.createVehicle = createCommand(createVehicleHandler)
exports.createLocation = createCommand(createLocationHandler)

exports.registerVehicleInFleet = createCommand(registerVehicleInFleetHandler)
exports.parkVehicleAtLocation = createCommand(parkVehicleAtLocationHandler)
exports.parkVehicleFromFleetAtLocation = createCommand(parkVehicleFromFleetAtLocationHandler)