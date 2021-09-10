const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const { Fleet } = require('#fleet');
const { Vehicle } = require('#vehicle');
const { Location } = require('#location');

const { timeStamp } = require('console');

Given('my fleet', function () {
    this.fleet = new Fleet()
});

Given('a vehicle', function () {
    this.vehicle = new Vehicle({ id: 1, type: 'car' })
});

When('I register this vehicle into my fleet', function () {
    this.fleet.registerVehicle(this.vehicle)
});

Then('this vehicle should be part of my vehicle fleet', function () {
    assert(this.fleet.isVehicleRegistered(this.vehicle), "vehicle not in my fleet")
});

Given('I have registered this vehicle into my fleet', function () {
    this.fleet.registerVehicle(this.vehicle)
});

When('I try to register this vehicle into my fleet', function () {
    this.response = this.fleet.registerVehicle(this.vehicle)
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.equal(this.response, false)
});

Given('the fleet of another user', function () {
    this.another_fleet = new Fleet()
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
    this.another_fleet.registerVehicle(this.vehicle)
});

Given('a location', function () {
    this.location = new Location({ latitude: 48.864716, longitude: 2.349014 })
});

When('I park my vehicle at this location', function () {
    this.known_location = this.fleet.parkVehicle(this.vehicle, this.location)
});

Then('the known location of my vehicle should verify this location', function () {
    assert(this.known_location, this.fleet.getVehicleLocation(this.vehicle))
});

Given('my vehicle has been parked into this location', function () {
    this.known_location = this.fleet.parkVehicle(this.vehicle, this.location)
});

When('I try to park my vehicle at this location', function () {
    this.known_location = this.fleet.parkVehicle(this.vehicle, this.location)
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.equal(this.known_location, false)
});