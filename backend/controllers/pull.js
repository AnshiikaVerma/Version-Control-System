
const fs=require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require("../config/aws-config");

async function pullRepo(){
    const repoPath=path.resolve(process.cwd(),".myGit");
    const commitPaths=path.join(repoPath,"commits");
    try{
   const data=await s3.listObjectsV2({Bucket:S3_BUCKET,  
    Prefix:"commits/" //konse folder ko read krna h
   }) .promise();  //data is userdefined ,listObjectV2->aws ka method h to read all data prsnt in s3
   
   const objects=data.Contents;  //list of files and folder within bucket
   for(const object of objects){
    const key=object.Key;
    const commitDir=path.join(commitPaths,path.dirname(key).split("/").pop());  //formatting to extract the key 
   
    await fs.mkdir(commitDir,{recursive:true});
    const params={
        Bucket:S3_BUCKET,
        Key:key,
    };
    const fileContent=await s3.getObject(params).promise();
    await fs.writeFile(path.join(repoPath,key),fileContent.Body);

    }
    console.log("All commits Pulled from S3")
    }catch(err){
        console.log("Unable to pull : ", err)
    }
}
module.exports = { pullRepo };