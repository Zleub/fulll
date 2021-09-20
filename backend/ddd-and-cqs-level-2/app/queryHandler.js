const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

exports.isVehicleRegisteredHandler = (fleetID, vehicleID) => {
    let fleet = Fleets.get(fleetID)

    return fleet.isVehicleRegistered(vehicleID)
}

exports.getLocationHandler = (locationID) => {
    return Locations.get(locationID)
}

exports.getVehicleByIndexHandler = (vehicleIndex) => {
    return Vehicles.get(vehicleIndex)
}

exports.getVehicleByIDHandler = (vehicleID) => {
    return Vehicles.getByID(vehicleID)
}

exports.getFleetHandler = (FleetID) => {
    return Fleets.get(FleetID)
}

exports.getVehicleLocationHandler = (vehicleID) => {
    let vehicle = Vehicles.get(vehicleID)

    return vehicle.location
}