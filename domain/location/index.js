const { ValueObject, deepEquals } = require('../lib')

const LocationData = {
    latitude: Number,
    longitude: Number
}

exports.Location = class extends ValueObject {
    constructor(opt) { super(LocationData, opt) }

    get latitude() { return this._data.latitude }
    get longitude() { return this._data.longitude }

    equals(o) { return deepEquals(LocationData).call(null, this, o) }

    toString() {
        return JSON.stringify(this._data)
    }
}

