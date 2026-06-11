const getAllUsers=(req,res)=>{
    res.send("All USers fetched");
};

const signup=(req,res)=>{
    res.send("Signing up");
};


const login=(req,res)=>{
    res.send("logging in");
};

//CRUD
const getUserProfile=(req,res)=>{
res.send("Profile fetched");
};
const updateUserProfile=(req,res)=>{
res.send("Profile updated");
};
const deleteUserProfile=(req,res)=>{
res.send("Profile deleted");
}

module.exports={
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}