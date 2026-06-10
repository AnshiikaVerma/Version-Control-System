const fs =require('fs');
const path=require('path');
const {proisify, promisify}=require("util");

const readdir=promisify(fs.readdir);
const copyFile=promisify(fs.copyFile); //overwriting

async function revertRepo(commitID){
    const repoPath=path.resolve(process.cwd(),".myGit");
    const commitsPath=path.join(repoPath,"commits"); //all commits ka path

    try{
     const commitDir=path.join(commitsPath,commitID); //path creation of commitId provided by user
     const files=await readdir(commitDir);//usko read krne ki kosish ..if exists its all files stored in Files
    const parentDir=path.resolve(repoPath,"..") //if commit exists ..we create a path to the file that needs to be revert
    
    for(const file of files){
        await copyFile(path.join(commitDir,file),path.join(parentDir,file))
    }
    console.log(`Commit with a commitID: ${commitID} reverted successfully!`);
    }catch(err){
        console.log("Unable to revert: ",err)
    }
}
module.exports = { revertRepo };