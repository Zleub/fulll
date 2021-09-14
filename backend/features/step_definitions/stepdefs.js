const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const {
    createFleet,
    createVehicle,
    createLocation,
    registerVehicleInFleet,
    parkVehicleAtLocation } = require('../../app/Commands')

const {
    isVehicleRegistered,
    getLocation,
    getVehicleLocation } = require('../../app/Queries')

Given('my fleet', async function () {
    this.fleet = await createFleet()
});

Given('a vehicle', async function () {
    this.vehicle = await createVehicle({ type: 'car' })
});

When('I register this vehicle into my fleet', async function () {
    registerVehicleInFleet(this.fleet, this.vehicle)
});

Then('this vehicle should be part of my vehicle fleet', async function () {
    assert(await isVehicleRegistered(this.fleet, this.vehicle))
});

Given('I have registered this vehicle into my fleet', function () {
    registerVehicleInFleet(this.fleet, this.vehicle)
});

When('I try to register this vehicle into my fleet', async function () {
    this.response = await registerVehicleInFleet(this.fleet, this.vehicle)
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.equal(this.response, "Vehicle already registered")
});

Given('the fleet of another user', async function () {
    this.another_fleet = await createFleet()
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
    registerVehicleInFleet(this.another_fleet, this.vehicle)
});

Given('a location', async function () {
    this.location = await createLocation({ latitude: 48.864716, longitude: 2.349014 })
});

When('I park my vehicle at this location', function () {
    parkVehicleAtLocation(this.vehicle, this.location)
});

Then('the known location of my vehicle should verify this location', async function () {
    let know_location = await getLocation(this.location)
    let vehicle_location = await getVehicleLocation(this.vehicle)

    assert.deepEqual(know_location, vehicle_location)
});

Given('my vehicle has been parked into this location', function () {
    parkVehicleAtLocation(this.vehicle, this.location)
});

When('I try to park my vehicle at this location', async function () {
    this.location = await parkVehicleAtLocation(this.vehicle, this.location)
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.equal(this.location, "Vehicle already at that location")
});