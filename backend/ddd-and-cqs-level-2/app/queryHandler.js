const { Fleet } = require('#fleet')
const { Fleets, Vehicles, Locations } = require("../infra/MongoRepository.js");

exports.isVehicleRegisteredHandler = async (fleetID, vehicleID) => {
    let fleet = await Fleets.get(fleetID)
    return fleet.isVehicleRegistered(vehicleID)
}

exports.getLocationHandler = (locationID) => {
    return Locations.get(locationID)
}

exports.getVehicleHandler = (vehicleID) => {
    return Vehicles.get(vehicleID)
}

exports.getFleetHandler = (FleetID) => {
    return Fleets.get(FleetID)
}

exports.getVehicleLocationHandler = async (vehicleID) => {
    let vehicle = await Vehicles.get(vehicleID)
    return vehicle.location
}