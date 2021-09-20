const { ValueObject } = require('../lib')
const { Vehicle } = require('#vehicle')

const FleetData = {
    fleet: [String],
    userID: String
}

exports.FleetData = FleetData

exports.Fleet = class extends ValueObject {
    constructor(opt = { fleet: [] }) { super(FleetData, opt) }

    get fleet() { return this._data.fleet }
    get userID() { return this._data.userID }

    registerVehicle(v) {
        if (!this.isVehicleRegistered(v))
            return this._data.fleet.push(v)
        return "Vehicle already registered"
    }

    isVehicleRegistered(o) {
        return this._data.fleet.includes(o)
    }
}