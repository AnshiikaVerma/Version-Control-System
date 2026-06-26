const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
       createdBy: req.user.id, //JWT se automatically milega.
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    console.error("Error during issue creation : ", err.message);
    res.status(500).send("Server error");
  }
}

async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const issueToupdate = await Issue.findById(id);

    // Find the repository to which this issue belongs 
    const repository = await Repository.findById( issueToupdate.repository );

    if (!issueToupdate) {
      return res.status(404).json({ error: "Issue not found!" });
    }
    
    // Only repository owner can update issue 
     if (repository.owner.toString() !== req.user.id) { 
      return res.status(403).json({ message: "You are not authorized to update this issue.", });
    }


   issueToupdate.title = title;
    issueToupdate.description = description;
    issueToupdate.status = status;

    await issueToupdate.save();

    res.json( { message: "Issue updated",
        issue:issueToupdate
     });
  } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server error");
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params;

  try {
    const issueTodlt = await Issue.findById(id);
 // Find the repository to which this issue belongs 
    const repository = await Repository.findById(  issueTodlt.repository );
    if (!issueTodlt) {
      return res.status(404).json({ error: "Issue not found!" });
    }
     
    // Only repository owner can update issue 
     if (repository.owner.toString() !== req.user.id) { 
      return res.status(403).json({ message: "You are not authorized to update this issue.", });
    }
    await Issue.findByIdAndDelete(issueTodlt);
 res.json({
    message:"Issue deleted successfully" ,
    issue:issueTodlt,
})
  } catch (err) {
    console.error("Error during issue deletion : ", err.message);
    res.status(500).send("Server error");
  }
}


async function getAllIssues(req, res) {
  const { id } = req.params;

  try {
    const issues = await Issue.find({
      repository: id,
    });

    res.status(200).json(issues);

  } catch (err) {
    console.error(
      "Error during issue fetching:",
      err.message
    );
    res.status(500).send("Server error");
  }
}


async function getIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    res.json(issue);
  } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};