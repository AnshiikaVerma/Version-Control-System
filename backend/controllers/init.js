 const fs = require('fs').promises;
const path = require('path');

 async function initRepo(){ //folder creation takes longer time
const repoPath = path.resolve(process.cwd(), '.myGit'); //hidden folder .myGit will be created in current working directory
const commitsPath = path.join(repoPath, 'commits'); 
// console.log("init command executed");
try{
await fs.mkdir(repoPath,{ recursive:  true }); 
await fs.mkdir(commitsPath,{ recursive: true });
await fs.writeFile(path.join(repoPath,"config.json"),JSON.stringify({bucket:process.env.S3_BUCKET_NAME}));
console.log("Repository initialized successfully.");
}catch(err){
    console.error("Error initializing repository:", err);
}
 }
module.exports = { initRepo };