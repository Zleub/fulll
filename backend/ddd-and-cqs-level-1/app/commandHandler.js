const { Fleet } = require("#fleet");
const { Vehicle } = require("#vehicle");
const { Location } = require("#location");
const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

exports.createFleetHandler = () => Fleets.push(new Fleet()) - 1
exports.createVehicleHandler = opt => Vehicles.push(new Vehicle(opt)) - 1
exports.createLocationHandler = opt => Locations.push(new Location(opt)) - 1

exports.registerVehicleInFleetHandler = (fleetID, vehicleID) => {
    let fleet = Fleets[fleetID]

    return fleet.registerVehicle(vehicleID)
}

exports.parkVehicleAtLocationHandler = (vehicleID, locationID) => {
    let vehicle = Vehicles[vehicleID]

    return vehicle.parkAt(vehicleID)
}