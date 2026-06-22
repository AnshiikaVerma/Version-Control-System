const mongoose=require('mongoose');
const Repository=require("../models/repoModel");
const User=require("../models/userModel");
const Issue=require("../models/issueModel");
// const { res } = require('express');


async function createIssue(req,res){
   const {id}=req.params;
   const {title,description}=req.body;
try{
 const issue=new Issue({
    title,
    description,
    repository:id,

   });
   await issue.save();
   res.status(201).json(issue);
}catch(err){
   console.error("Error during issue creation: ",err.message);
   res.status(500).send("Server Error!");
}
  
};

async function updateIssueById(req,res){
    const { id}=req.params; //issue id
    const { title,status,description}=req.body;
    try{
    const issueToUpdate=await Issue.findById(id);
    if(!issueToUpdate){
        return res.status(404).json({error:"Issue Not found"});
    }
    issueToUpdate.title=title;
   issueToUpdate.status=status;
   issueToUpdate.description=description;
    await issueToUpdate.save();
    res.status(200).json(issueToUpdate);
    }catch(err){
         console.error("Error during issue updation: ",err.message);
          res.status(500).send("Server Error!");
    }
};
async function deleteIssueById(req,res){
     const {id}=req.params; 
     try{
   const issueTodlt=await Issue.findByIdAndDelete(id);
   if(!issueTodlt){
     return res.status(404).json({error:"Issue Not found"});
   }
//    res.json(issueTodlt,{message:"Issue deleted successfully !"  }); //res.json obj leta h
res.json({
    message:"Issue deleted successfully" ,
    issue:issueTodlt,
})
     }catch(err){
        console.error("Error during issue deletion: ",err.message);
          res.status(500).send("Server Error!");
     }
};

async function getAllIssues(req,res){  //ek repo k saare issue
    const {id}=req.params; //repo id whose issue we wanana fetch
    try{
const issues=await Issue.find({repository:id});
if(issues.length==0){ //issues ka array return hoga so !issue wrong h
return res.status(404).json({message:"Issues not found!"})
}
res.status(200).json(issues);
    }catch(err){
         console.error("Error during  fetching all issues : ",err.message);
          res.status(500).send("Server Error!");
    }
};

async function getIssueById(req,res){
    const {id}=req.params; //issue id
   
    try{
    const issue=await Issue.findById(id);
    if(!issue){
        return res.status(404).json({error:"Issue Not found"});
    }
    res.status(201).json(issue);
    }catch(err){
         console.error("Error during issue fetching by id: ",err.message);
          res.status(500).send("Server Error!");
    }

};

module.exports={
    getIssueById,
    getAllIssues,
    deleteIssueById,
    updateIssueById,
    createIssue,
};