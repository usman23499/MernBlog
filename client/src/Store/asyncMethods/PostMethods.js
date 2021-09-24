import axios from 'axios';
import {
	CREATE_ERRORS,
	
	SET_LOADER,
	CLOSE_LOADER,
	
} from '../Types/PostTypes';
const token = localStorage.getItem("myToken");

export const createAction = (postData) => {
	return async (dispatch) => {
		
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
			const {data} = await axios.post('/create_post', postData, config);
			dispatch({ type: CLOSE_LOADER });
		
		} catch (error) {
			console.log(error.response);
			const { errors } = error.response.data;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: CREATE_ERRORS, payload: errors });
		}
	};
};
