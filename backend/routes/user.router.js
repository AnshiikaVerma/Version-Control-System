const express=require('express');
const userController=require("../controllers/userController");

const userRouter=express.Router();
const authMiddleware = require("../middleware/authMiddleware");
//app.get()...  

userRouter.get("/allUsers",userController.getAllUsers);
userRouter.post("/signup",userController.signup);
userRouter.post("/login",userController.login);
// userRouter.put("/updateProfile/:id",userController.updateUserProfile); //, authMiddleware
// userRouter.delete("/deleteProfile/:id",userController.deleteUserProfile); //, authMiddleware
// userRouter.get("/userProfile/:id",userController.getUserProfile); //, authMiddleware
// userRouter.post("/user/starRepository",userController.starRepository); //, authMiddleware

userRouter.put(
 "/updateProfile/:id",
 authMiddleware,
 userController.updateUserProfile
);

userRouter.delete(
 "/deleteProfile/:id",
 authMiddleware,
 userController.deleteUserProfile
);

userRouter.get(
 "/userProfile/:id",
 authMiddleware,
 userController.getUserProfile
);

userRouter.post(
 "/user/starRepository",
 authMiddleware,
 userController.starRepository
);
// userRouter.post(
// "/user/unstarRepository",
// userController.unstarRepository
// );
module.exports=userRouter; 