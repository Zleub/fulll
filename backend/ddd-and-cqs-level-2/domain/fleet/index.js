const { Vehicle } = require('#vehicle')

const FleetData = [Vehicle]

exports.Fleet = class {
    constructor(...args) {
        this._fleet = []
        args.forEach(this.registerVehicle.bind(this))
    }

    get content() { return this._fleet }

    registerVehicle(v) {
        if (FleetData.find(e => v instanceof e) && !this.isVehicleRegistered(v))
            return this._fleet.push(v)
        return "Vehicle already registered"
    }

    isVehicleRegistered(o) {
        return this._fleet.includes(o)
    }
}