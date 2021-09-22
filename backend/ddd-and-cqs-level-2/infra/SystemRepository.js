const { Fleet, FleetData } = require('#fleet')
const { Vehicle, VehicleData } = require('#vehicle')
const { Location, LocationData } = require('#location')

class Repository {
    constructor(name, data, _class) {
        this._data = []
        this.name = name
        this._class = _class
    }

    insert(e) {
        this._data.push(e._data)
        return this._data.indexOf(e)
    }

    async update(id, e) {
        this._data[id] = e._data
        return id
    }

    get(i) {
        return new this._class(this._data[i])
    }
}

exports.Fleets = new Repository('Fleet', FleetData, Fleet)
exports.Vehicles = new Repository('Vehicle', VehicleData, Vehicle)
exports.Locations = new Repository('Location', LocationData, Location)
