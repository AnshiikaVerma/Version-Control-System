const mongoose=require('mongoose');
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel");
const { res } = require('express');


async function  getAllRepositories(req,res){
  try{
    const repos=await Repository.find({}).populate("owner").populate("issues");
    res.json(repos);
  }catch(err){
    console.error("Error during fetching all repositories: ",err.message);
    res.status(500).send("Server Error!");
  }
};

async function  fetchRepositoryById(req,res){
    const repoID=req.params.id; 
try{
const repository= await Repository.find({_id:repoID}).populate("owner").populate("issues");
res.json(repository);
}catch(err){
    console.error("Error during fetching repository",err.message);
    res.status(500).send("Server Error!");
}
};

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
const {owner,name,issues,content,description,visibility} =req.body;
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
const userId=req.user; //login user ka token and id stored in brwoser local storage
try{
const repositories=await Repository.find({owner:userId});
if(!repositories||repositories.length==0){
    return res.status(404).json({error:"User Repositories not found"});
}
res.json({message:"Repositories found ",repositories});
}catch(err){
    console.error("Error during fetching all user's repositories: ",err.message);
    res.status(500).send("Server Error!");
}

};

async function  UpdateRepositoryById(req,res){ 
const id=req.params;
const {content,description}=req.body;
try{
const repoToUpdate=await Repository.findById(id);
if(!repoToUpdate){
     return res.status(404).json({error:"Repository not found"});
}
repoToUpdate.content.push(content); //array
repoToUpdate.description=description; //overwrite
}
catch(err){
    console.error("Error during updating  user's repository: ",err.message);
    res.status(500).send("Server Error!");
}
}; 
async function  toggleVisibilityById(req,res){  
res.send("repo toggled btw pvt and public");
};
async function  deleteRepositoryById(req,res){
res.send("repo deleted");
};


module.exports={
    deleteRepositoryById,
    toggleVisibilityById,
    UpdateRepositoryById,
    fetchRepositoriesForCurrentUser,
    createRepository,
    fetchRepositoryByName,
    fetchRepositoryById,
    getAllRepositories
}