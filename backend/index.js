

//start file --controller code ->konse command pe kha redirect krna hai
const express=require('express');
const  dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const http=require('http');
const{Server}=require('socket.io')

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

dotenv.config();   

yargs(hideBin(process.argv))
.command('init', 'Initialize a new repository',{},initRepo) 
.command('add <file>', 'Add a file to a repository ',(yargs)=>{    
yargs.positional('file',{  // named parameter also called as positional argument
    describe:"file to be added to staging area",
    type:"string",
});
},(argv)=>{
    addRepo(argv.file); 
})
.command('commit <message>', 'Commit changes to the repository',(yargs)=>{
    yargs.positional('message',{
        describe:"commit message",
        type:"string"
    })
},(argv)=>{
commitRepo(argv.message); //agrv k andr additional parameters jo cmd k sth user send krta h store hote h 
}) 
.command('push', 'Push changes to the S3',{},pushRepo) 

.command('pull', 'Pull changes from the S3',{},pullRepo) 

.command('revert <commitID>', 'Revert  specific commits',(yargs)=>{
    yargs.positional('commitID',{
        describe:"commit ID to revert",
        type:"string"
    })
},(argv)=>{
    revertRepo(argv.commitID);
})
.command('start',"Starts a new server",{},startServer) 
.demandCommand(1,"Please specify a command").help().argv;  //atleast 1 command dena jaruri hai nahi to help show hoga
 

function startServer(){

   const app=express();
   const port=process.env.PORT||3000;

   app.use(bodyParser.json());
   app.use(express.json());
   const mongoURI=process.env.MONGODB_URL;
   mongoose.connect(mongoURI).then(()=>{
    console.log("MOngoDB connected! ")
   }).catch((err)=>{
    console.error("Unable to connect MongoDB : ",err)
   });  //mongodb se connection stablish based on this url
    890

    app.use(cors({origin:'*'}));
    app.get("/",(req,res)=>{
        res.send("Welcome !")
    });

    let user="test"; //updated with logged in user
    const httpServer=http.createServer(app);
    //socket creation
    const io=new Server(httpServer,{cors:{
        origin:"*",
        methods:["GET","POST"]
    }},)

    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
        user=userID;
        console.log("===========");
        console.log(user);
        console.log("===========");
        socket.join(userID);
        })
    });
    const db=mongoose.connection;
    db.once("open",async()=>{
        console.log("CRUD operations called")
        //CRUD OPERATIONS
    });

    httpServer.listen(port,()=>{
        console.log(`Server is running on port: ${port}`);
    });
};
