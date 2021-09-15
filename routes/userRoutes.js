const app=require('express');



const routers=app.Router();
const {register,registerValidations,login,loginValidations}=require('../controllers/userController');
//registerValidations ye add neche and uper karne lazmi nhai hia ye basically middel ware hi for validation

routers.post("/register",registerValidations ,register);

routers.post("/login",loginValidations ,login);




// localhots:5000/register
module.exports=routers;