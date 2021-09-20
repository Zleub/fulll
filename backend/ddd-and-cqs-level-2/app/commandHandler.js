const { Fleet } = require("#fleet");
const { Vehicle } = require("#vehicle");
const { Location } = require("#location");
const { Fleets, Vehicles, Locations } = require("../infra/SystemRepository.js");

const { getFleet,
    getVehicleByID,
    getVehicleByIndex,
    isVehicleRegistered } = require('./Queries')
const { createLocation } = require('./Commands')

exports.createFleetHandler = opt => Fleets.insert(new Fleet(opt))
exports.createVehicleHandler = opt => Vehicles.insert(new Vehicle(opt))
exports.createLocationHandler = opt => Locations.insert(new Location(opt))

exports.registerVehicleInFleetHandler = async (fleetID, vehicleID) => {
    let fleet = await getFleet(fleetID)
    return fleet.registerVehicle(vehicleID)
}

exports.parkVehicleAtLocationHandler = async (vehicleID, locationID) => {
    let vehicle = await getVehicleByID(vehicleID)
    return vehicle.parkAt(locationID)
}

exports.parkVehicleFromFleetAtLocationHandler = async (fleetID, vehicleID, latitude, longitude, altitude) => {
    if (await isVehicleRegistered(fleetID, vehicleID)) {
        let vehicle = await getVehicleByID(vehicleID)
        if (!vehicle)
            return "Vehicle not in repository"

        let locationID = await require('./Commands').createLocation({ latitude, longitude, altitude })
        return vehicle.parkAt(locationID)
    } else {
        return "Vehicle not in fleet"
    }
}