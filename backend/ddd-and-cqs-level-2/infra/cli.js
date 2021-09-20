const { Command } = require('commander')
const { createFleet,
    createVehicle,
    registerVehicleInFleet,
    parkVehicleFromFleetAtLocation } = require('#commands')

const programs = {
    'fleet': new Command(),
    'vehicle': new Command()
}

programs.vehicle.command('create <vehicleID>')
    .description('Create a vehicle with a specific ID')
    .action(async (vehicleID) => console.log(await createVehicle({ id: vehicleID })))

programs.fleet.command('create <userID>')
    .description('Create a fleet for a specific user')
    .action(async (userID) => console.log(await createFleet({ userID })))

programs.fleet.command('register-vehicle <fleetId> <vehiclePlateNumber>')
    .description('Register a into a specific fleet')
    .action(async (fleetId, vehiclePlateNumber) => console.log(await registerVehicleInFleet(fleetId, vehiclePlateNumber)))

programs.fleet.command('localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]')
    .description('Register a location for a specific vehicle in a specific fleet')
    .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => console.log(await parkVehicleFromFleetAtLocation(fleetId, vehiclePlateNumber, lat, lng, alt)))

programs.fleet.showHelpAfterError()

const main = new Command()
Object.keys(programs).forEach(k => {
    main.command(`./${k} <subcommand> [arguments...]`)
        .description(`${k} related commands`)
        .action((subcommand, arguments) => {
            let args = [subcommand, ...arguments]
            programs[k].parse([...process.argv, ...args])
        })
})

main.showHelpAfterError()

const readline = require('readline')
const { inspect } = require('util')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

rl.on('line', function (line) {
    let args = line.split(/\s+/)
    main.parse([...process.argv, ...args])
})

rl.on('close', function (line) {
    let repo = require('./SystemRepository.js')

    console.log(require('util').inspect(repo, false, null, true))
})

