const createIssue=(req,res)=>{
    res.send("Issue Created");
};

const updateIssueById=(req,res)=>{
    res.send("Issue update");
};
const deleteIssueById=(req,res)=>{
    res.send("Issue deleted");
};

const getAllIssues=(req,res)=>{  //ek repo k saare issue
    res.send(" All Issue fetched");
};

const getIssueById=(req,res)=>{
    res.send(" particular issue is fetched");
};

module.exports={
    getIssueById,
    getAllIssues,
    deleteIssueById,
    updateIssueById,
    createIssue,
};