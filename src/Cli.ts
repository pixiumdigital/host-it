#!/usr/bin/env node
import yargs, { Argv, command } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { HostIt } from './HostIt';
import { HostItConfiguration } from './types';
const argv = yargs(hideBin(process.argv)).options({
    directory: { type: 'string', demandOption: true },
    port: { type: 'number' },
    username: { type: 'string' },
    password: { type: 'string' }
}).parseSync();

let configuration: Partial<HostItConfiguration> = {}

if (argv.directory) {
    configuration.directory = argv.directory
} else {
    console.log(`You must specify a directory`)
    process.exit()
}
if (argv.port) {
    configuration.port = argv.port
}

if ((argv.username && !argv.password) || (!argv.username && argv.password)) {
    console.log(`You need to specify the username and password if you want to use basic auth`)
} else if (argv.username && argv.password) {
    configuration.security = {
        username: argv.username,
        password: argv.password
    }
}
HostIt(configuration as HostItConfiguration)

