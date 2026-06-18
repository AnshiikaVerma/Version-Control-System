const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=  new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
    },
    repositories:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository"
        }
    ],
    followeduser:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
     StarRepositories:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository"
        }
    ],
})


const User=mongoose.model("User",UserSchema);
module.exports= User;