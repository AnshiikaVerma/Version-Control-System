const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {MongoClient, ReturnDocument}=require('mongodb');
const dotenv=require('dotenv');
var ObjectId=require('mongodb').ObjectId;

dotenv.config();
const uri=process.env.MONGODB_URL;

let client; //establish connection
async function connectClient(){
    if(!client){
        client=new MongoClient(uri);
        await client.connect();
    }
}


async  function getAllUsers(req,res){
  try{
   await connectClient();
  const db=client.db("githubClone"); 
  const usersCollection=db.collection("users");

  const users=await usersCollection.find({}).toArray();
  res.json(users);

  }catch(err){
   console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
  }
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
   const newUser={ //mongodb syntax
    username,
    password:hashedPassword,
    email,
    repositories:[],
    followedUsers:[],
    starRepos:[],
   }

  const result=await  usersCollection.insertOne(newUser); //user inserted
  const token=jwt.sign({id:result.insertid},process.env.JWT_SECRET_KEY,{expiresIn:"1h"}); //token
  res.json({token,userId:result.insertid});

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
async  function getUserProfile(req,res){
const currentID=req.params.id;
try{
 await connectClient();
  const db=client.db("githubClone"); 
  const usersCollection=db.collection("users");
  const user=await usersCollection.findOne({
    _id: new ObjectId(currentID)
  });
  if(!user){
        return res.status(400).json({message:"User Not found!"})

  }
res.send(user);
}catch(err){
 console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
}
};


async  function updateUserProfile(req,res){
const currentID=req.params.id;
const{email,password}=req.body;
try{
  await connectClient();
  const db=client.db("githubClone"); 
  const usersCollection=db.collection("users");
  let updateFields={email}; //email mandatory  to update
  if(password){ //if pasword also updted then re hashed it and add it to updated fields
   const salt=await bcrypt.genSalt(10); 
   const hashedPassword=await bcrypt.hash(password,salt);
     updateFields.password=hashedPassword;
  }

  const result=await usersCollection.findOneAndUpdate({
    _id: new ObjectId(currentID)
  },{$set:updateFields},{returnDocument:"after"}); //updated return krna h
  res.send(result);
}catch(err){
  console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
}

};
async  function deleteUserProfile(req,res){
const currentID=req.params.id;
try{
  await connectClient();
  const db=client.db("githubClone"); 
  const usersCollection=db.collection("users");
  const result=await usersCollection.deleteOne({ 
    _id: new ObjectId(currentID)
  });
   if(result.deleteCount==0){
    return res.status("404").json({message:"User not found!"});
   }
   res.json({message:"User profile deleted "});
}catch(err){
 console.error("Error during signup: ",err.message);
   res.status(500).send("Server Error!");
}
}
//star repos
async function starRepository(req,res){
const {userId,repoId}=req.body;

    try{
        await connectClient();
        const db=client.db("githubClone");
        const usersCollection=db.collection("users");
        const user = await usersCollection.findOne({
       _id: new ObjectId(userId)
});

if(!user){
    return res.status(404).json({
        message:"User not found"
    });
}

const alreadyStarred = user.starRepos?.some(
    id => id.toString() === repoId
);

if(alreadyStarred){
      await usersCollection.updateOne(
        {_id:new ObjectId(userId)},
        {
            $pull:{
                starRepos:repoId
            }
        }
    );


    return res.json({
        message:"Repository unstarred",
        starred:false
    });
}

// warna star karo
await usersCollection.updateOne(
    {_id:new ObjectId(userId)},
    {
        $push:{
            starRepos:repoId
        }
    }
);
   
        return res.json({
            message:"Repository starred",
            starred:true
             });

    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}



module.exports={
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    starRepository,
   
}