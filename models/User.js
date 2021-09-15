const {model,Schema} = require("mongoose");

const userSchema=new Schema(
    {
        name: {
            type:String,
            required: true,
        },
        email: {
            type:String,
            required: true,
        },
        password: {
            type:String,
            required: true,
        }
        
    },
    {timestamps:true} // for save server time at the time user aaya hai

)
module.exports=model("user",userSchema);
