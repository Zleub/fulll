const { createFleet, registerVehicleInFleet } = require('#commands')

const { Fleets } = require('../infra/SystemRepository.js')

const commands = {
    "create": createFleet,
    "register-vehicle": registerVehicleInFleet
}

const run = async (args) => {
    if (commands[args[0]]) {
        let answer = await commands[args[0]](args.slice(1))
        console.log(answer)
    }
}

if (!module.parent) {
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        let args = line.split(/\s+/)
        console.log(args)
        run(args)
    })
}