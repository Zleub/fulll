const mongoose = require('mongoose')

const { Fleet, FleetData } = require('#fleet')
const { Vehicle, VehicleData } = require('#vehicle')
const { Location, LocationData } = require('#location')

class Repository {
    constructor(name, data, _class) {
        this.name = name
        this._class = _class
        this.model = mongoose.model(name, new mongoose.Schema(data));
    }

    async insert(e) {
        const doc = new this.model(e)
        Object.assign(doc, e._data)
        // console.log(`${this.name}, insert`, e, doc)
        await doc.save()
        return doc._id
    }

    async update(id, e) {
        // console.log(`${this.name}, update`, id, e)
        await this.model.updateOne({ _id: id }, e._data)
        return id
    }

    async get(id) {
        let data = await this.model.findById(id)
        // console.log(`${this.name}, get`, data)
        return new this._class(data)
    }
}

exports.Fleets = new Repository('Fleet', FleetData, Fleet)
exports.Vehicles = new Repository('Vehicle', VehicleData, Vehicle)
exports.Locations = new Repository('Location', LocationData, Location)
