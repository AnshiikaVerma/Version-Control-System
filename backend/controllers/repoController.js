

const getAllRepositories=(req,res)=>{
res.send("all repo fetched");
};

const fetchRepositoryById=(req,res)=>{
res.send("repo fetched");
};

const fetchRepositoryByName=(req,res)=>{
res.send("repo fetched by name");
};
//auth routes -only logged in user perform

const createRepository=(req,res)=>{ 
    res.send("repo created ");
};
const fetchRepositoriesForCurrentUser=(req,res)=>{ 
res.send("repo  for logged in user fetched");
};

const UpdateRepositoryById=(req,res)=>{ 
res.send(" udpaded repo ");
}; 
const toggleVisibilityById=(req,res)=>{  
res.send("repo toggled btw pvt and public");
};
const deleteRepositoryById=(req,res)=>{
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