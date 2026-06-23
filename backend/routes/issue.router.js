const express=require('express');
const issueController=require("../controllers/issueController");

const issueRouter=express.Router();

//app.get()...  s

issueRouter.post("/issue/create",issueController.createIssue);
issueRouter.post("/issue/create/:id",issueController.createIssue);
issueRouter.get("/issue/all/:id",issueController.getAllIssues);
issueRouter.put("/issue/update/:id",issueController.updateIssueById);
issueRouter.delete("/issue/delete/:id",issueController.deleteIssueById);


module.exports=issueRouter; 