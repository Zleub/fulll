const { Vehicle } = require('#vehicle')

const FleetData = [Vehicle]

exports.Fleet = class {
    constructor(...args) {
        this._fleet = []
        this._locations = new WeakMap()
        args.forEach(this.registerVehicle.bind(this))
    }

    get content() { return this._fleet }

    registerVehicle(v) {
        if (FleetData.find(e => v instanceof e) && !this.isVehicleRegistered(v))
            return this._fleet.push(v)
        return false
    }

    parkVehicle(vehicle, location) {
        if (this._locations[location] == vehicle)
            return false
        this._locations[location] = vehicle
        return location
    }

    isVehicleRegistered(o) {
        return this._fleet.includes(o)
    }

    getVehicleLocation(o) {
        return this._fleet.includes(o)
    }
}