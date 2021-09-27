import { createStore,applyMiddleware,combineReducers } from "redux";
import  thunkMiddleware  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducers from "./reducers/authReducers";
import {PostReducers,FetchPost} from "./reducers/Postreducer";
const rootReducers=combineReducers({

    AuthReducers,PostReducers,FetchPost
})

const middleware =[thunkMiddleware]; // if zayda middelware then it helps
const Store=createStore(rootReducers,composeWithDevTools(applyMiddleware(...middleware))); // ... for make copy of all reducers
export default Store;