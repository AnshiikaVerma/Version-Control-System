//start file --controller code ->konse command pe kha redirect krna hai
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");

yargs(hideBin(process.argv)).command('init', 'Initialize a new repository',{},initRepo).demandCommand(1,"Please specify a command").help().argv;
