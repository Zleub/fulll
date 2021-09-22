const assert = require('assert');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const mongoose = require('mongoose')

const {
    createFleet,
    createVehicle,
    createLocation,
    registerVehicleInFleet,
    parkVehicleAtLocation } = require('../../app/Commands')

const {
    isVehicleRegistered,
    getVehicleLocation } = require('../../app/Queries')

Before(async function () {
    this.mongoose = await mongoose.connect('mongodb://localhost:27017/test')
})

After(async function () {
    this.mongoose.connection.close()
})

Given('my fleet', async function () {
    this.fleet = await createFleet()
});

Given('a vehicle', async function () {
    let plateNumber = Math.floor(Math.random() * 120) + '-' + Math.floor(Math.random() * 4200)
    this.vehicleIndex = await createVehicle({ _id: plateNumber, type: 'car' })
});

When('I register this vehicle into my fleet', async function () {
    await registerVehicleInFleet(this.fleet, this.vehicleIndex)
});

Then('this vehicle should be part of my vehicle fleet', async function () {
    assert(await isVehicleRegistered(this.fleet, this.vehicleIndex))
});

Given('I have registered this vehicle into my fleet', async function () {
    await registerVehicleInFleet(this.fleet, this.vehicleIndex)
});

When('I try to register this vehicle into my fleet', async function () {
    this.response = await registerVehicleInFleet(this.fleet, this.vehicleIndex)
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.equal(this.response, "Vehicle already registered")
});

Given('the fleet of another user', async function () {
    this.another_fleet = await createFleet()
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
    await registerVehicleInFleet(this.another_fleet, this.vehicleIndex)
});

Given('a location', async function () {
    this.location = await createLocation({ latitude: 48.864716, longitude: 2.349014 })
});

When('I park my vehicle at this location', async function () {
    await parkVehicleAtLocation(this.vehicleIndex, this.location)
});

Then('the known location of my vehicle should verify this location', async function () {
    let vehicle_location = await getVehicleLocation(this.vehicleIndex)

    //tocheck
    assert.deepEqual(this.location.toString(), vehicle_location)
});

Given('my vehicle has been parked into this location', async function () {
    await parkVehicleAtLocation(this.vehicleIndex, this.location)
});

When('I try to park my vehicle at this location', async function () {
    this.location = await parkVehicleAtLocation(this.vehicleIndex, this.location)
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.equal(this.location, "Vehicle already at that location")
});