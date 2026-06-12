const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {MongoClient}=require('mongodb');
const dotenv=require('dotenv');

dotenv.config();
const uri=process.env.MONGODB_URL;

let client; //establish connection
async function connectClient(){
    if(!client){
        client=new MongoClient(uri);
        await client.connect();
    }
}


const getAllUsers=(req,res)=>{
    res.send("All USers fetched");
};

 async function signup(req,res){
   const {username,password,email}=req.body;
   try{
   await connectClient();
   const db=client.db("githubClone"); //database's name
   const usersCollection=db.collection("users"); //collection name

   const user=await usersCollection.findOne({username}); //is user already exsits
   if(user){
    return res.status(400).json({message:"User already exists !"})
   }
   const salt=await bcrypt.genSalt(10); //user is unique -->password hashed
   const hashedPassword=await bcrypt.hash(password,salt);
   const newUser={
    username,
    password:hashedPassword,
    email,
    repositories:[],
    followedUsers:[],
    starRepos:[],
   }

  const result=await  usersCollection.insertOne(newUser); //user inserted
  const token=jwt.sign({id:result.insertid},process.env.JWT_SECRET_KEY,{expiresIn:"1h"}); //token
  res.json({token});

   }catch(err){
   console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
   }
};


async function login(req,res){
  const{email,password}=req.body;
  try{
  await connectClient();
  const db=client.db("githubClone"); 
  const usersCollection=db.collection("users");
  const user=await usersCollection.findOne({email}); //is user already exsits
   if(!user){
    return res.status(400).json({message:"Invalid Credentials!"})
   }
   const isMatch=await bcrypt.compare(password,user.password); //user.password->hashed form
   if(!isMatch){
     return res.status(400).json({message:"Invalid Credentials!"})
   }
   const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
   res.json({token,userId:user._id});
  }catch(err){
console.error("Error during login",err.message);
res.send("Server error!");
  }
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