import {
	CREATE_ERRORS,
	SET_MESSAGE,
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	REMOVE_ERRORS,
	REDIRECT_FALSE,
	SET_POST,
	SET_POSTS,
	POST_REQUEST,
	POST_RESET,
	SET_UPDATE_ERRORS,
	RESET_UPDATE_ERRORS,
	RESET_UPDATE_IMAGE_ERRORS,
	UPDATE_IMAGE_ERROR
	
} from '../Types/PostTypes';

const initState = {
	loading: false,
	createErrors: [],
	redirect:false,
	message:'',
	posts:[],
	perPage: 0,
	count: 0,
	post:{},
	postStatus:false,
	editErrors:[],
	updateImageErrors: [],

};
export const PostReducers = (state = initState, action) => {
	const { type, payload } = action;
	if (type === SET_LOADER) {
		return { ...state, loading: true };
	} else if (type === CLOSE_LOADER) {
		return { ...state, loading: false };
	} else if (type === CREATE_ERRORS) {
		return { ...state, createErrors: payload };
	} 
	else if (type === REDIRECT_TRUE) {
		return { ...state, redirect: true };
	} else if (type === REDIRECT_FALSE) {
		return { ...state, redirect: false };
	}
	else if(type=== SET_MESSAGE){
		return {...state,message:action.payload}
	}
	else if(type=== REMOVE_ERRORS){
		return {...state , message:''};
		// message remove after display
	}


	 else {
		return state;
	}
};

export const FetchPosts = (state = initState, action) => {
	const { type, payload } = action;
	
	if (type === SET_POSTS) {
		return { ...state, 
			posts: payload.response, 
			count: payload.count,
			perPage: payload.perPage,
		
		};
	} else {
		return state;

	}
};


export const FetchPost = (state = initState, action) => {
	const { type, payload } = action;
	if (type === SET_POST) {
		return { ...state, post: payload };
	} else if (type === POST_REQUEST) {
		return { ...state, postStatus: true };
	} else if (type === POST_RESET) {
		return { ...state, postStatus: false };
	} else {
		return state;
	}
};

export const UpdatePost = (state = initState, action) => {
	const { type, payload } = action;
	if (type === SET_UPDATE_ERRORS) {
		return { ...state, editErrors: payload };
	} else if (type === RESET_UPDATE_ERRORS) {
		return {
			...state,
			editErrors: [],
		};
	} else {
		return state;
	}
};

export const UpdateImage = (state = initState, action) => {
	const { payload, type } = action;
	if (type === UPDATE_IMAGE_ERROR) {
		return {
			...state,
			updateImageErrors: payload,
		};
	} else if (type === RESET_UPDATE_IMAGE_ERRORS) {
		return {
			...state,
			updateImageErrors: [],
		};
	} else {
		return state;
	}
};
