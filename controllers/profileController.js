const User = require('../models/User'); // call user schema
const jwt=require('jsonwebtoken'); // for create new token when name is updated

module.exports.updateName = async (req, res) => {
    const {name,id}=req.body;
    if(name===""){
		return res.status(400).json({ errors: [{ msg: 'Name is required' }] });
    }
    else{
        try {
            const user = await User.findOneAndUpdate(
                {_id:id}, // this is used for match
                {name:name}, // this is used for update
                {new:true} // this is used to call updated user
            );
            console.log(user);
            const token = jwt.sign({ user },"mystrongjwt", 
            {
				expiresIn:'7d',
			}
            );
            console.log(token);
			return res.status(200).json({  msg: 'Your name has been updated',token });
		
        } catch (error) {
			return res.status(500).json({ errors });
            
        }
    }
    
};