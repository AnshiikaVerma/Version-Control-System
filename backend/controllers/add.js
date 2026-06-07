const fs=require('fs').promises;
const path=require('path');

async function addRepo(filePath){
    const repoPath=path.resolve(process.cwd(),'.myGit');
    const stagingPath=path.join(repoPath,"staging"); //create
    try{
const fileName=path.basename(filePath);
await fs.mkdir(stagingPath,{recursive:true});
await fs.copyFile(filePath,path.join(stagingPath,fileName));
console.log(`File ${fileName} added to staging area successfully.`);
    }catch(err){
        console.error("Error adding file to staging area:",err);
    }
}

module.exports = { addRepo };

