const { ValueObject } = require('../lib')
const { Location } = require('#location')

const VehicleData = {
    _id: String,
    type: String,
    location: String
}

exports.VehicleData = VehicleData

exports.Vehicle = class extends ValueObject {
    constructor(opt = {}) { super(VehicleData, opt) }

    get _id() { return this._data._id }
    get type() { return this._data.type }
    get location() { return this._data.location }

    equals(o) {
        return o && this._id == o._id
            && this.type == o.type
            && this.location == o.location
    }

    parkAt(location) {
        if (location == this.location)
            return "Vehicle already at that location"
        this._data = { ...this._data, location }
        return this.location
    }
}

