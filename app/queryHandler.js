const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

exports.isVehicleRegisteredHandler = (fleetID, vehicleID) => {
    let fleet = Fleets[fleetID]
    let vehicle = Vehicles[vehicleID]

    return fleet.isVehicleRegistered(vehicle)
}

exports.getLocationHandler = (locationID) => {
    return Locations[locationID]
}

exports.getVehicleLocationHandler = (vehicleID) => {
    let vehicle = Vehicles[vehicleID]

    return vehicle.location
}