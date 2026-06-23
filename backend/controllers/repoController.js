const mongoose=require('mongoose');
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel");



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
const repository= await Repository.findById({_id:repoID}).populate("owner").populate("issues");
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
const userId=req.params.userId; //login user ka token and id stored in brwoser local storage
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
const {id}=req.params;
const {name, description, visibility}=req.body;
try{
const repoToUpdate=await Repository.findById(id);
if(!repoToUpdate){
     return res.status(404).json({error:"Repository not found"});
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

repoToUpdate.visibility=!repoToUpdate.visibility; //overwrite
const updatedRepo=await repoToUpdate.save();
res.jsom({
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
const repoTodlt=await Repository.findByIdAndDelete(id);
if(!repoTodlt){
     return res.status(404).json({error:"Repository not found"});
}
res.json({message:"Repository deleted successfully !"  });
}catch(err){
     console.error("Error during deleting  user's repository: ",err.message);
    res.status(500).send("Server Error!"); 
}
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