class Repository {
    constructor() {
        this._data = []
    }

    insert(e) {
        this._data.push(e)
        return this._data.indexOf(e)
    }

    get(i) {
        return this._data[i]
    }
}

exports.Fleets = new Repository()
exports.Vehicles = new Repository()
exports.Locations = new Repository()