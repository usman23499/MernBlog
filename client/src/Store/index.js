import { createStore,applyMiddleware,combineReducers } from "redux";
import  thunkMiddleware  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducers from "./reducers/authReducers";
import {PostReducers,FetchPosts,FetchPost,UpdatePost,UpdateImage} from "./reducers/Postreducer";
import { updateName } from './reducers/ProfileReducer';

const rootReducers=combineReducers({

    AuthReducers,PostReducers,FetchPosts,FetchPost,UpdatePost,UpdateImage,updateName
    
})

const middleware =[thunkMiddleware]; // if zayda middelware then it helps
const Store=createStore(rootReducers,composeWithDevTools(applyMiddleware(...middleware))); // ... for make copy of all reducers
export default Store;