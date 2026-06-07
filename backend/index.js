//start file --controller code ->konse command pe kha redirect krna hai
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");



yargs(hideBin(process.argv))
.command('init', 'Initialize a new repository',{},initRepo) 
.command('add <file>', 'Add a file to a repository ',(yargs)=>{    
yargs.positional('file',{  // named parameter also called as positional argument
    describe:"file to be added to staging area",
    type:"string",
});
},(argv)=>{
    addRepo(argv.file); 
})
.command('commit <message>', 'Commit changes to the repository',(yargs)=>{
    yargs.positional('message',{
        describe:"commit message",
        type:"string"
    })
},commitRepo) 
.command('push', 'Push changes to the S3',{},pushRepo) 

.command('pull', 'Pull changes from the S3',{},pullRepo) 

.command('revert <commitID>', 'Revert  specific commits',(yargs)=>{
    yargs.positional('commitID',{
        describe:"commit ID to revert",
        type:"string"
    })
},revertRepo) 
.demandCommand(1,"Please specify a command").help().argv;  //atleast 1 command dena jaruri hai nahi to help show hoga
 