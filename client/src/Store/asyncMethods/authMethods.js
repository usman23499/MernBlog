// ye basically async handel ke lea bana hai i think
import axios from "axios";
import {SET_LOADER,
	CLOSE_LOADER,
	SET_TOKEN,
	REGISTER_ERRORS,
	LOGOUT,
	LOGIN_ERRORS,
} from "../Types/UserTypes";

export const postRegister =(state)=>{
    return async(dispatch)=>{
        const config={
            headers:{
                'Content-Type':"application/json", // ye line lazmi hai for hearder

            },
        };
        dispatch({type:SET_LOADER});
        
        try{
            const {data}=await axios.post('register',state,config);
            dispatch({type:CLOSE_LOADER}); // check kaoro inspect redux state change hore hoage
            localStorage.setItem("myToken",data.token);  
            dispatch({
                type:SET_TOKEN,
                payload:data.token, 
            })
        }
        catch(error){
            dispatch({type:"CLOSE_LOADER"});
            dispatch({
                type:REGISTER_ERRORS,
                payload:error.response.data.errors, // is main erros aarahe honge check response
            })
            console.log(error.response);
        }
    }
    }
