const { Fleet } = require("#fleet");
const { Vehicle } = require("#vehicle");
const { Location } = require("#location");
const { Fleets, Vehicles, Locations } = require("../infra/MongoRepository.js");

const { getFleet,
    getVehicle,
    isVehicleRegistered } = require('./Queries')

exports.createFleetHandler = async opt => await Fleets.insert(new Fleet(opt))
exports.createVehicleHandler = async opt => await Vehicles.insert(new Vehicle(opt))
exports.createLocationHandler = async opt => await Locations.insert(new Location(opt))

exports.registerVehicleInFleetHandler = async (fleetID, vehicleID) => {
    try {
        let fleet = await getFleet(fleetID)
        let res = fleet.registerVehicle(vehicleID)
        await Fleets.update(fleetID, fleet)
        return res
    } catch (e) {
        return e
    }
}

exports.parkVehicleAtLocationHandler = async (vehicleID, locationID) => {
    try {
        let vehicle = await getVehicle(vehicleID)
        let _ = vehicle.parkAt(locationID)
        Vehicles.update(vehicleID, vehicle)
        return _
    } catch (e) {
        return e
    }
}

exports.parkVehicleFromFleetAtLocationHandler = async (fleetID, vehicleID, latitude, longitude, altitude) => {
    const { createLocation, parkVehicleAtLocation } = require('#commands')
    try {
        if (await isVehicleRegistered(fleetID, vehicleID)) {
            let locationID = createLocation({ latitude, longitude, altitude })
            parkVehicleAtLocation(vehicleID, locationID)
        } else {
            return "Vehicle not in fleet"
        }
    } catch (e) {
        return e
    }
}