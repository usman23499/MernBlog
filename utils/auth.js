const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const authHeaders=req.headers.authorization;
    //console.log(req.headers); //ye hedaer jo post methods main hader se token ja raha tha we can acess
    // console.log(authHeaders);
    var token=authHeaders.split('Bearer ')[1]; // ye split se 1 index pe toekn mele ga chaek console
    try {
        // console.log(token);
        jwt.verify(token,'mystrongjwt'); // ye form .env file
        next(); // when token verify tu aage jae 
    } catch (error) {
		return res.status(401).json({ errors: [{ msg: error.message }] });
        // 401 mean un authorize
    }
};