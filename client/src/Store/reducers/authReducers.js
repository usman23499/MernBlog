import jwt_decode from "jwt-decode"; // import this and this is expire in 7days
import {SET_LOADER,
	CLOSE_LOADER,
	SET_TOKEN,
	REGISTER_ERRORS,
	LOGOUT,
	LOGIN_ERRORS,
} from "../Types/UserTypes";

const initState={
    loading:false,
    registerErrors:[],
    loginErrors: [],
    token: "",
    user: ""
};

const verifyToken=(token)=>{
  
    const decodeToken=jwt_decode(token);     // decode token and get data
    // console.log(token);
    const expireIn=new Date(decodeToken.exp * 1000); // get 7d date
    if(new Date() > expireIn)// greater than mean expire hogaya
    {
        localStorage.removeItem('myToken');
        return null; // ye lazmi hai
    }
    else{
        // console.log(decodeToken)
        return decodeToken;
    }
}

const token= localStorage.getItem('myToken');
if(token){
    const decode=verifyToken(token);
  if(decode){
    initState.token=token;  
    const {user} = decode; // get user data form token
    initState.user=user;
  }
    
    // else{
    //     initState.token=token;  
    //     const {user} = decodeToken; // get user data form token
    //     initState.user=user;
    // }
}
const AuthReducers=(state=initState,actions)=>{
    if(actions.type===SET_LOADER){
        return {...state,loading:true}
    }
    else if(actions.type===CLOSE_LOADER){
        return {...state,loading:false}
    }
    else if(actions.type===REGISTER_ERRORS){
        return {...state,registerErrors:actions.payload}
    }
    else if(actions.type===SET_TOKEN){

        const decode= verifyToken(actions.payload);
       
        const {user} = decode;
       
        return {...state,token:actions.payload,user:user,loginErrors: [],
			registerErrors: []}
    }
    else if(actions.type===LOGOUT){
        return {...state,token:"",user:""}
    }
    else if (actions.type === LOGIN_ERRORS) {
		return {
			...state,
			loginErrors: actions.payload,
		};
	}
    else{
        return state;
    }
}
export default AuthReducers;
