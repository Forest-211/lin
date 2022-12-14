const { Command } = require('commander');
const { chalk, semver } = require('@clin211/cli-utils');
const pkgs = require('../package.json');
const version = require('./version');
const config = require('./config');
const crn = require('./crn');
const translate = require('./translate');
const image = require('./images');
const time = require('./time');
const calculate = require('./calculate');

const { name, engines } = pkgs;

// check the node Version
const isMatches = semver.satisfies(process.version, engines.node, {
    includePrerelease: true,
});

if (!isMatches) {
    console.log(
        chalk.red(
            `You are using Node ${process.version}, but this version of ${name} requires Node ${engines.node}.\n\nPlease upgrade your Node version!`,
        ),
    );
    process.exit(1);
}

function run() {
    const program = new Command('lin');
    // version
    version(program);

    // register the config command
    program.addCommand(config());

    // create react native
    crn(program);

    // translate
    translate(program);

    // calculate
    calculate(program);

    // image
    program.addCommand(image());

    // time
    program.addCommand(time());

    program.parse(process.argv);
}

module.exports = run;
