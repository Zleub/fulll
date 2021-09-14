const { Fleet } = require("#fleet");
const { Fleets } = require("../infra/SystemRepository.js");

exports.createFleetHandler = () => Fleets.push(new Fleet())