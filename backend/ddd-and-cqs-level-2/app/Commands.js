const { Duplex } = require('stream');
const { create } = require('./lib')

const {
    createFleetHandler,
    createVehicleHandler,
    createLocationHandler,
    registerVehicleInFleetHandler,
    parkVehicleAtLocationHandler } = require('./commandHandler.js');

const commandStream = new Duplex({ objectMode: true, read() { } })

commandStream.on('data', cmd => {
    // console.log('push in command stream')
    cmd.publisher.emit('done', cmd.handler())
})

const createCommand = create(commandStream)

exports.createFleet = createCommand(createFleetHandler)
exports.createVehicle = createCommand(createVehicleHandler)
exports.createLocation = createCommand(createLocationHandler)

exports.registerVehicleInFleet = createCommand(registerVehicleInFleetHandler)
exports.parkVehicleAtLocation = createCommand(parkVehicleAtLocationHandler)