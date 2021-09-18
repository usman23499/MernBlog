// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
require('dotenv').config();

// for add valodation rule

// Add user form user.js models

// const user = require('../models/User');



const createToken=(user)=>{
   return jwt.sign({user},"mystrongjwt",
       {
           expiresIn:'7d'
       }
       
       );
}

module.exports.registerValidations=[
    // add vlidation rule
    // trim use to remove spaces

    body("name").not().isEmpty().trim().withMessage("Name is requied"),
    body("email").not().isEmpty().trim().withMessage("Name is requied"),
    body("password").isLength({min:6}).withMessage("Password must be 6 digit long"),

]


module.exports.register=async (req,res)=>{
    // res.send("Hello register");
    // res.json(req.body); // now data come form middle ware 
    // ab ye data us ke request pe aae ga ye cheez chale ge
    const {name,email,password}=req.body;
   // res.send(name); // get only name

   const error = validationResult(req);
   if(!error.isEmpty()){ //mean if error hai
    // res.json(error.array())  // error ke list show kardo
    return res.status(400).json({errors:error.array()});  // 400 for erro code
}

//  else{
//      res.json("Your data is correct");
//  }
    try {
        const checkUser=await User.findOne({email});// check email phele se tu registed nahi hai 
        // sarif email is lea ke schema and uper donon jaga email tha waran email:email
        if(checkUser){
            return res.status(400).json({errors: [{msg:"Email is already taken"}]})
        }
        // before save in database hash and salt the password

        const salt = await bcrypt.genSalt(10); // 10 ye stander hai to more secure password
        const hash = await bcrypt.hash(password,salt);
        
        try {
            
            const user=await User.create({
                name,
                email,
                password:hash
            })
            // const token = jwt.sign({user},"mystrongjwt",
            //     {
            //         expiresIn:'7d'
            //     }
                
            //     ); // add secret key and expire in 7 days
            // make function of token

                const token = createToken(user);

                return res.status(200).json({msg:"Your account has been created",token});

        } catch (error) {
        return res.status(500).json({errors:error});
            
        }


    } catch (error) {
        return res.status(500).json({errors:error});
    }

}




// LOgin
module.exports.loginValidations=[
    // add vlidation rule
    // trim use to remove spaces

    body("password").not().isEmpty().trim().withMessage("Name is requied"),
    body("email").not().isEmpty().trim().withMessage("Name is requied"),

]


module.exports.login=async (req,res)=>{
    // res.send("Hello register");
    // res.json(req.body); // now data come form middle ware 
    // ab ye data us ke request pe aae ga ye cheez chale ge
    const {email,password}=req.body;
   // res.send(name); // get only name

   const error = validationResult(req);
   if(!error.isEmpty()){ //mean if error hai
    // res.json(error.array())  // error ke list show kardo
    return res.status(400).json({errors:error.array()});  // 400 for erro code
}

//  else{
//      res.json("Your data is correct");
//  }
    try {
        const user=await User.findOne({email});
        // ab user wale main full data hai password and email and also name
        if(user){
            const match=await bcrypt.compare(password,user.password); // compare password theek hai ya nahi
           if(match){
            const token = createToken(user);
                
                return res.status(200).json({msg:"Your have login sucessfully",token});
           }
           else{
            return res.status(401).json({msg:"Password not match"});
            // 401 mean unauthorize users
           }
        }
        else{
            return res.status(404).json({msg:"Email not found"});
        }

      
       


    } catch (error) {
        return res.status(500).json({errors:error});
    }

}


