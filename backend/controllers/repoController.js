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

// async function  fetchRepositoryById(req,res){
//     const repoID=req.params.id; 
// try{
// const repository= await Repository.findById({_id:repoID}).populate("owner").populate("issues");
// res.json(repository);
// }catch(err){
//     console.error("Error during fetching repository",err.message);
//     res.status(500).send("Server Error!");
// }
// };

async function fetchRepositoryById(req,res){
    const repoID = req.params.id;

    try{
        const repository = await Repository.findById(repoID)
            .populate("owner")
            .populate("issues");

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




// const mongoose = require("mongoose");
// const Repository = require("../models/repoModel");
// const User = require("../models/userModel");
// const Issue = require("../models/issueModel");

// async function createRepository(req, res) {
//   const { owner, name, issues, content, description, visibility } = req.body;

//   try {
//     if (!name) {
//       return res.status(400).json({ error: "Repository name is required!" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(owner)) {
//       return res.status(400).json({ error: "Invalid User ID!" });
//     }

//     const newRepository = new Repository({
//       name,
//       description,
//       visibility,
//       owner,
//       content,
//       issues,
//     });

//     const result = await newRepository.save();

//     res.status(201).json({
//       message: "Repository created!",
//       repositoryID: result._id,
//     });
//   } catch (err) {
//     console.error("Error during repository creation : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function getAllRepositories(req, res) {
//   try {
//     const repositories = await Repository.find({})
//       .populate("owner")
//       .populate("issues");

//     res.json(repositories);
//   } catch (err) {
//     console.error("Error during fetching repositories : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function fetchRepositoryById(req, res) {
//   const { id } = req.params;
//   try {
//     const repository = await Repository.find({ _id: id })
//       .populate("owner")
//       .populate("issues");

//     res.json(repository);
//   } catch (err) {
//     console.error("Error during fetching repository : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function fetchRepositoryByName(req, res) {
//   const { name } = req.params;
//   try {
//     const repository = await Repository.find({ name })
//       .populate("owner")
//       .populate("issues");

//     res.json(repository);
//   } catch (err) {
//     console.error("Error during fetching repository : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function fetchRepositoriesForCurrentUser(req, res) {
//   console.log(req.params);
//   const { userID } = req.params;

//   try {
//     const repositories = await Repository.find({ owner: userID });

//     if (!repositories || repositories.length == 0) {
//       return res.status(404).json({ error: "User Repositories not found!" });
//     }
//     console.log(repositories);
//     res.json({ message: "Repositories found!", repositories });
//   } catch (err) {
//     console.error("Error during fetching user repositories : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function updateRepositoryById(req, res) {
//   const { id } = req.params;
//   const { content, description } = req.body;

//   try {
//     const repository = await Repository.findById(id);
//     if (!repository) {
//       return res.status(404).json({ error: "Repository not found!" });
//     }

//     repository.content.push(content);
//     repository.description = description;

//     const updatedRepository = await repository.save();

//     res.json({
//       message: "Repository updated successfully!",
//       repository: updatedRepository,
//     });
//   } catch (err) {
//     console.error("Error during updating repository : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function toggleVisibilityById(req, res) {
//   const { id } = req.params;

//   try {
//     const repository = await Repository.findById(id);
//     if (!repository) {
//       return res.status(404).json({ error: "Repository not found!" });
//     }

//     repository.visibility = !repository.visibility;

//     const updatedRepository = await repository.save();

//     res.json({
//       message: "Repository visibility toggled successfully!",
//       repository: updatedRepository,
//     });
//   } catch (err) {
//     console.error("Error during toggling visibility : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function deleteRepositoryById(req, res) {
//   const { id } = req.params;
//   try {
//     const repository = await Repository.findByIdAndDelete(id);
//     if (!repository) {
//       return res.status(404).json({ error: "Repository not found!" });
//     }

//     res.json({ message: "Repository deleted successfully!" });
//   } catch (err) {
//     console.error("Error during deleting repository : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// module.exports = {
//   createRepository,
//   getAllRepositories,
//   fetchRepositoryById,
//   fetchRepositoryByName,
//   fetchRepositoriesForCurrentUser,
//   updateRepositoryById,
//   toggleVisibilityById,
//   deleteRepositoryById,
// };