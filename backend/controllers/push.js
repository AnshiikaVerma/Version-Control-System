
const fs=require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require("../config/aws-config");


async function pushRepo(remote, branch){
    const repoPath=path.resolve(process.cwd(),".myGit");
    const commitPaths=path.join(repoPath,"commits"); 
    try{
      const commitDirs=await fs.readdir(commitPaths); //commits ->many dir of commit -->each dir  has many files
      for(const commitDir of commitDirs){
       const commitPath=path.join(commitPaths,commitDir); //maincommitdir->eachdir ka path
       const files=await fs.readdir(commitPath);
           for(const file of files){
             const filePath=path.join(commitPath,file); //each file inside each dir
             const fileContent=await fs.readFile(filePath);
             const params={
                Bucket: S3_BUCKET,
                Key:`commits/${commitDir}/${file}`, 
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