const { ValueObject, deepEquals } = require('../lib')
const { Location } = require('#location')

const VehicleData = {
    id: Number,
    type: String,

    location: Location
}

exports.Vehicle = class extends ValueObject {
    constructor(opt) { super(VehicleData, opt) }

    get id() { return this._data.id }
    get type() { return this._data.type }
    get location() { return this._data.location }

    equals(o) {
        return o && this.id == o.id
            && this.type == o.type
            && this.location.equals(o.location)
    }

    parkAt(location) {
        if (location.equals(this.location))
            return "Vehicle already at that location"
        this._data = { ...this._data, location }
        return this.location
    }

    toString() {
        return JSON.stringify(this._data)
    }
}

