const express=require('express');
const repoController=require("../controllers/repoController");

const repoRouter=express.Router();
//authentication
const authMiddleware = require("../middleware/authMiddleware");
//app.get()...  

repoRouter.post(
 "/repo/create",
 authMiddleware,
 repoController.createRepository
);
repoRouter.get("/repo/all",repoController.getAllRepositories);
repoRouter.get("/repo/:id",repoController.fetchRepositoryById);
repoRouter.get("/repo/name/:name",repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userId",repoController.fetchRepositoriesForCurrentUser);
repoRouter.put(
 "/repo/update/:id",
 authMiddleware,
 repoController.UpdateRepositoryById
);

repoRouter.delete(
 "/repo/delete/:id",
 authMiddleware,
 repoController.deleteRepositoryById
);

repoRouter.patch(
 "/repo/toggle/:id",
 authMiddleware,
 repoController.toggleVisibilityById
);


module.exports=repoRouter; 