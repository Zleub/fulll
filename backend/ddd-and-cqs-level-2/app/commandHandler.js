const { Fleet } = require("#fleet");
const { Vehicle } = require("#vehicle");
const { Location } = require("#location");
const { Fleets, Vehicles, Locations } = require("../infra/MongoRepository.js");

const { getFleet,
    getVehicleByID,
    getVehicleByIndex,
    isVehicleRegistered } = require('./Queries')
const { createLocation } = require('./Commands')

exports.createFleetHandler = async opt => await Fleets.insert(new Fleet(opt))
exports.createVehicleHandler = async opt => await Vehicles.insert(new Vehicle(opt))
exports.createLocationHandler = async opt => await Locations.insert(new Location(opt))

exports.registerVehicleInFleetHandler = async (fleetID, vehicleID) => {
    let fleet = await getFleet(fleetID)
    let res = fleet.registerVehicle(vehicleID)
    await Fleets.update(fleetID, fleet)
    return res
}

exports.parkVehicleAtLocationHandler = async (vehicleIndex, locationID) => {
    let vehicle = await getVehicleByIndex(vehicleIndex)
    let _ = vehicle.parkAt(locationID)
    Vehicles.update(vehicleIndex, vehicle)
    return _
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