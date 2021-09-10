exports.ValueObject = class {
    constructor(data, opt) {
        let _data = {}
        for (const p in data)
            _data[p] = opt[p]
        this._data = Object.freeze(_data)
    }
}

exports.deepEquals = (dataModel) => (a, b) =>
    Object.keys(dataModel).reduce((p, k) => p && a._data[k] == b._data[k], true)
