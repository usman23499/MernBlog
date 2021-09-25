const {model,Schema}=require('mongoose');
const postSchema= new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        body:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        slug:{
            type:String,
            required:true,
        },
        userName:{
            type:String,
            required:true,
        },
        userId:{
            type:Schema.Types.ObjectId, // ye token hian jo object ke type ka hoga contatin all information
            ref:'user', // is lea use name USer.js ke file se lea hai
        }
    },
    {timestamps:true}
)
module.exports= model('post',postSchema);