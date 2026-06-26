const express=require('express');
const issueController=require("../controllers/issueController");

const issueRouter=express.Router();

const authMiddleware = require("../middleware/authMiddleware");

issueRouter.post("/issue/create",issueController.createIssue); 
issueRouter.post("/issue/create/:id", authMiddleware,issueController.createIssue);//any logged in user caan create issue
issueRouter.get("/issue/all/:id",issueController.getAllIssues);
issueRouter.put("/issue/update/:id",  authMiddleware,issueController.updateIssueById);
issueRouter.delete("/issue/delete/:id", authMiddleware,issueController.deleteIssueById); //


module.exports=issueRouter; 