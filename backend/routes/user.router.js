const express=require('express');
const userController=require("../controllers/userController");

const userRouter=express.Router();

//app.get()...  

userRouter.get("/allUsers",userController.getAllUsers);
userRouter.post("/signup",userController.signup);
userRouter.post("/login",userController.login);
userRouter.put("/updateProfile/:id",userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id",userController.deleteUserProfile);
userRouter.get("/userProfile/:id",userController.getUserProfile);
userRouter.post("/user/starRepository",userController.starRepository);
// userRouter.post(
// "/user/unstarRepository",
// userController.unstarRepository
// );
module.exports=userRouter; 