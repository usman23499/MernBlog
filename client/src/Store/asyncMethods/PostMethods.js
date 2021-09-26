import axios from 'axios';
import {
	CREATE_ERRORS,
	SET_MESSAGE,
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	REMOVE_ERRORS,
	
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
