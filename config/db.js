const mongoose= require("mongoose");
require('dotenv').config()
module.exports=connect=async()=>{
   
    try {
        
        const response = await mongoose.connect("mongodb+srv://mern:mern@cluster0.lk4lx.mongodb.net/blog?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		
		}); 
        
        console.log("Connection Created");
    } catch (error) {
        console.log(error);
    }
}
