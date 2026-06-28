const fs=require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require("../config/aws-config");

async function pushRepo(){
    const repoPath=path.resolve(process.cwd(),".myGit");
    const commitPaths=path.join(repoPath,"commits"); 

const configPath = path.join(repoPath, "config.json");
const config = JSON.parse(await fs.readFile(configPath, "utf-8"));

if (!config.repoId) {
    console.log(
        "No repository is associated. Please run: node index.js init <repoId>"
    );
    return;
}

    try{
      const commitDirs=await fs.readdir(commitPaths); //commits ->many dir of commit -->each dir  has many files
      //new add
      if (commitDirs.length === 0) {
    console.log("No commits found to push.");
    return;
}
      for(const commitDir of commitDirs){
       const commitPath=path.join(commitPaths,commitDir); //maincommitdir->eachdir ka path
       const files=await fs.readdir(commitPath);
           for(const file of files){
             const filePath=path.join(commitPath,file); //each file inside each dir
             const fileContent=await fs.readFile(filePath);
             const params={
                Bucket: S3_BUCKET,
                // Key:`commits/${commitDir}/${file}`, 
                Key: `repositories/${config.repoId}/commits/${commitDir}/${file}`,
                Body:fileContent,
             };
             await s3.upload(params).promise();
             }
      }
      console.log("All commits pushed successfullly")
    }catch(err){
            console.log("Error in pushing to S3: " ,err)
    }
}
module.exports = { pushRepo };