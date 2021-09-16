const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

exports.isVehicleRegisteredHandler = (fleetID, vehicleID) => {
    let fleet = Fleets[fleetID]

    return fleet.isVehicleRegistered(vehicleID)
}

exports.getLocationHandler = (locationID) => {
    return Locations[locationID]
}

exports.getVehicleLocationHandler = (vehicleID) => {
    let vehicle = Vehicles[vehicleID]

    return vehicle.location
}