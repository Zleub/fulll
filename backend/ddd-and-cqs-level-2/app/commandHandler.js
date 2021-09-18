const { Fleet } = require("#fleet");
const { Vehicle } = require("#vehicle");
const { Location } = require("#location");
const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

exports.createFleetHandler = () => Fleets.insert(new Fleet())
exports.createVehicleHandler = opt => Vehicles.insert(new Vehicle(opt))
exports.createLocationHandler = opt => Locations.insert(new Location(opt))

exports.registerVehicleInFleetHandler = (fleetID, vehicleID) => {
    let fleet = Fleets.get(fleetID)

    return fleet.registerVehicle(vehicleID)
}

exports.parkVehicleAtLocationHandler = (vehicleID, locationID) => {
    let vehicle = Vehicles.get(vehicleID)

    return vehicle.parkAt(vehicleID)
}