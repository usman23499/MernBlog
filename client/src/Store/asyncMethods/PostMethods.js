import axios from 'axios';
import {
	CREATE_ERRORS,
	SET_MESSAGE,
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	REMOVE_ERRORS,
	SET_POST,
	SET_POSTS,
	POST_REQUEST,
	SET_UPDATE_ERRORS,
	UPDATE_IMAGE_ERROR

	
} from '../Types/PostTypes';
// const token = localStorage.getItem("myToken");

export const createAction = (postData) => {
	return async (dispatch,getState) => {
		// console.log(getState);
		const {
			AuthReducers: { token }, // auth reducer se destructure token
		} = getState();
		dispatch({ type: SET_LOADER });
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				// onUploadProgress: (data) => {

				// 	console.log(
				// 		'Your image upload progress: ',
				// 		Math.round((100 * data.loaded) / data.total)
				// 	);
				// },
			};
			const {data:{msg}} = await axios.post('/create_post', postData, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: REMOVE_ERRORS }); // this is for when job post tu purane wale erros remove hojen
			dispatch({ type: REDIRECT_TRUE }); // when submit post
			dispatch({ type: SET_MESSAGE, payload: msg });
		
		} catch (error) {
			console.log(error.response);
			const { errors } = error.response.data;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: CREATE_ERRORS, payload: errors });
		}
	};
};

export const fetchPosts = (id,page) => {
	return async (dispatch, getState) => {
		const {
			AuthReducers: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { response, count, perPage },
			} = await axios.get(`/posts/${id}/${page}`, config);
			// console.log(response);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_POSTS, payload: {response, count, perPage } });
			
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error.message);
		}
	};
};


export const fetchPost = (id) => {
	return async (dispatch, getState) => {
		const {
			AuthReducers: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { post },
			} = await axios.get(`/post/${id}`, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_POST, payload: post });
			dispatch({ type: POST_REQUEST });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error.message);
		}
	};
};



export const updateAction = (editData) => {
	return async (dispatch, getState) => {
		const {
			AuthReducers: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const { data } = await axios.post('/update', editData, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: REDIRECT_TRUE });
			dispatch({ type: SET_MESSAGE, payload: data.msg });
		} catch (error) {
			const {
				response: {
					data: { errors }, // response ko destructure in data and data in errors
				},
			} = error;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
			console.log(error.response);
		}
	};
};


export const updateImageAction = (updateData) => {
	return async (dispatch, getState) => {
		const {
			AuthReducers: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { msg },
			} = await axios.post('/updateImage', updateData, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: REDIRECT_TRUE });
			dispatch({ type: SET_MESSAGE, payload: msg });
		} catch (error) {
			const {
				response: {
					data: { errors },
				},
			} = error;
		
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
		}
	};
};


// Add method of home and use fetchpost puri wale hai
export const homePosts = (page) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { response, count, perPage },
			} = await axios.get(`/home/${page}`);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error);
		}
	};
};