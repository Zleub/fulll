const { Command } = require('commander')
const { createFleet, registerVehicleInFleet } = require('#commands')

const programs = {
    'fleet': new Command()
}

programs.fleet.command('create <userID>')
    .description('Create a fleet for a specific user')
    .action(async (userID) => console.log(await createFleet(userID)))

programs.fleet.command('register-vehicle <fleetId> <vehiclePlateNumber>')
    .description('Register a into a specific fleet')
    .action(async (fleetId, vehiclePlateNumber) => console.log(await registerVehicleInFleet(fleetId, vehiclePlateNumber)))

programs.fleet.command('localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]')
    .description('Register a location for a specific vehicle in a specific fleet')
    .action((fleetId, vehiclePlateNumber, lat, lng, alt) => console.log({ fleetId, vehiclePlateNumber, lat, lng, alt }))

programs.fleet.showHelpAfterError()

const main = new Command()
main.command('./fleet <subcommand> [arguments...]')
    .description('Fleet related commands')
    .action((subcommand, arguments) => {
        let args = [subcommand, ...arguments]
        programs.fleet.parse([...process.argv, ...args])
    })

main.showHelpAfterError()

var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

rl.on('line', function (line) {
    let args = line.split(/\s+/)
    main.parse([...process.argv, ...args])
})
