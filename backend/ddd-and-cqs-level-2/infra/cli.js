const { Command } = require('commander')
const { argv } = require('process')

const programs = {
    'fleet': new Command(),
    'vehicle': new Command()
}

// programs.vehicle.usage('./vehicle <command> [options]')
programs.vehicle.command('test').action(console.log)

// programs.fleet.usage('./fleet <command> [options]')

programs.fleet.command('create <userID>')
    .description('Create a fleet for a specific user')
    .action((userID) => console.log(userID))

programs.fleet.command('register-vehicle <userID>')
    .description('Create a fleet for a specific user')
    .action((userID) => console.log(userID))

const main = new Command()
main.command('./fleet <command> <options...>').action((command, options) => {
    let args = [command, ...options]
    console.log(args)
    programs.fleet.parse([...process.argv, ...args])
})

var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

rl.on('line', function (line) {
    let args = line.split(/\s+/)
    main.parse([...process.argv, ...args])

    // let namespace = args[0].match(/\.?\/?(\w+)/)[1]
    // if (!programs[namespace])
    //     print_help()

    // let prog_args = [...args.slice(1)]
    // console.log(prog_args)
    // programs[namespace].parse(prog_args)
})
