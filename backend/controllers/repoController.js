const mongoose=require('mongoose');
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel");

const { s3, S3_BUCKET } = require("../config/aws-config");
const path = require("path");

async function  getAllRepositories(req,res){
  try{
    const repos=await Repository.find({}).populate("owner").populate("issues");   //    visibility: true  Dashboard me Suggested Repositories me sirf public repositories aayengi.
    res.json(repos);
  }catch(err){
    console.error("Error during fetching all repositories: ",err.message);
    res.status(500).send("Server Error!");
  }
};


async function fetchRepositoryById(req,res){
    const repoID = req.params.id;

    try{
        const repository = await Repository.findById(repoID)
            .populate("owner")
            .populate("issues");

    //   if (repository.visibility === false &&repository.owner._id.toString() !== req.user?.id)
    //      {
    //       return res.status(403).json({
    //             message: "This repository is private."
    //         });
    //      }  


        res.json(repository);
    }
    catch(err){
        console.error("Error during fetching repository", err.message);
        res.status(500).send("Server Error!");
    }
}

async function  fetchRepositoryByName(req,res){
    const repoName=req.params.name; 
try{
const repository= await Repository.find({name:repoName}).populate("owner").populate("issues");
res.json(repository);
}catch(err){
    console.error("Error during fetching repository",err.message);
    res.status(500).send("Server Error!");
}
};
//auth routes -only logged in user perform

async function  createRepository(req,res){ 
const {name,issues,content,description,visibility} =req.body;
const owner=req.user.id;
console.log(req.user);
    try{
    if(!name){
        return res.status(400).json({error:"Repository name is required"});
    }
    if(!mongoose.Types.ObjectId.isValid(owner)){
    return res.status(400).json({error:"Invalid UserId"})
    }
    const newRepo=new Repository({  //mongoose syntax for creating new user u need to save it while in mongodb yoou need to insert it
        name,
        description,
        visibility,
        owner,
        content,
        issues,
    });

    const result=await newRepo.save(); //result me newRepo as obj form written hogi 

    res.status(201).json({
        message:"Repository created",
        repositoryID:result._id,
    });
    }
  catch(err){
   console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
  }
};

async function  fetchRepositoriesForCurrentUser(req,res){ 
const userId=req.params.userId; //login user ka token and id stored in brwoser local storage
try{
const repositories=await Repository.find({owner:userId});
// if(!repositories||repositories.length==0){
//     return res.status(404).json({error:"User Repositories not found"});
// }
res.json({message:"Repositories found ",repositories});
}catch(err){
    console.error("Error during fetching all user's repositories: ",err.message);
    res.status(500).send("Server Error!");
}

};

async function  UpdateRepositoryById(req,res){ 
const {id}=req.params;
const {name, description, visibility}=req.body;
try{
const repoToUpdate=await Repository.findById(id);
if(!repoToUpdate){
     return res.status(404).json({error:"Repository not found"});
}

if (repoToUpdate.owner.toString() !== req.user.id) {
    return res.status(403).json({
        message: "You are not authorized to update this repository."
    });
}

// repoToUpdate.content.push(content); //array
repoToUpdate.name=name;
repoToUpdate.description=description; //overwrite
repoToUpdate.visibility = visibility;
const updatedRepo=await repoToUpdate.save();
res.json({
    message:"Repository updated successfully!",
    repository:updatedRepo,
});
}
catch(err){
    console.error("Error during updating  user's repository: ",err.message);
    res.status(500).send("Server Error!");
}
}; 

async function  toggleVisibilityById(req,res){  
const {id}=req.params;  //id of repo which we want to update
try{
const repoToUpdate=await Repository.findById(id);
if(!repoToUpdate){
     return res.status(404).json({error:"Repository not found"});
}
if(repoToUpdate.owner.toString()!=req.user.id){
    return res.status(403).json({
        message:"You are not the owner of this repository"
    });
}

repoToUpdate.visibility=!repoToUpdate.visibility; //overwrite
const updatedRepo=await repoToUpdate.save();
res.json({
    message:"Visibility toggled  successfully!",
    repository:updatedRepo,
});
}
catch(err){
    console.error("Error during updating  user's repository: ",err.message);
    res.status(500).send("Server Error!");
}
};
async function  deleteRepositoryById(req,res){
const {id}=req.params; 
try{
// const repoTodlt=await Repository.findByIdAndDelete(id);
const repoTodlt = await Repository.findById(id);
if(!repoTodlt){
     return res.status(404).json({error:"Repository not found"});
}
if (repoTodlt.owner.toString() !== req.user.id) {
    return res.status(403).json({
        message: "You are not authorized to delete this repository."
    });
}
await Repository.findByIdAndDelete(id);
res.json({message:"Repository deleted successfully !"  });
}catch(err){
     console.error("Error during deleting  user's repository: ",err.message);
    res.status(500).send("Server Error!"); 
}
};


async function getRepositoryCommits(req, res) {
  const { id } = req.params;

  try {
    // Repository exists ya nahi
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }

    // S3 se us repository ke saare objects lao
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: `repositories/${id}/commits/`,
      })
      .promise();

    const objects = data.Contents || [];

    const commits = [];

    // Sirf commit.json files read karni hain
    for (const object of objects) {
      if (!object.Key.endsWith("commit.json")) continue;

      const file = await s3
        .getObject({
          Bucket: S3_BUCKET,
          Key: object.Key,
        })
        .promise();

      const commitData = JSON.parse(
        file.Body.toString()
      );

      const commitId = object.Key.split("/")[3];

      commits.push({
        id: commitId,
        message: commitData.message,
        date: commitData.date,
      });
    }

    res.json(commits);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Unable to fetch commits",
    });
  }
}
//to show commit files
async function getCommitFiles(req, res) {
    try {

        const { repoId, commitId } = req.params;

//temp

//         console.log("Repo ID:", repoId);
// console.log("Commit ID:", commitId);

// const prefix = `repositories/${repoId}/commits/${commitId}/`;

// console.log("Searching Prefix:", prefix);


        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: `repositories/${repoId}/commits/${commitId}/`
        }).promise();
// //temp
// console.log(data.Contents);
        
        const files = [];

        for (const object of data.Contents) {

            const key = object.Key;

            const fileName = key.split("/").pop();

            // if (fileName) {
            //     files.push(fileName);
            // }
if (fileName && fileName !== "commit.json") {
    files.push(fileName);
}
        }

        res.json(files);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable to fetch files"
        });

    }
}
module.exports={
    deleteRepositoryById,
    toggleVisibilityById,
    UpdateRepositoryById,
    fetchRepositoriesForCurrentUser,
    createRepository,
    fetchRepositoryByName,
    fetchRepositoryById,
    getAllRepositories,
    getRepositoryCommits,
    getCommitFiles
}



