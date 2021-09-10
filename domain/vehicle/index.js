const { ValueObject, deepEquals } = require('../lib')

const VehicleData = {
    id: Number,
    type: String
}

exports.Vehicle = class extends ValueObject {
    constructor(opt) { super(VehicleData, opt) }

    get id() { return this._data.id }
    get type() { return this._data.type }

    equals(o) { return deepEquals(VehicleData).call(null, this, o) }

    toString() {
        return JSON.stringify(this._data)
    }
}

