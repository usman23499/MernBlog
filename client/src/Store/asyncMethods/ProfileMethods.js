import axios from 'axios';
import {
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	SET_MESSAGE,
} from '../Types/PostTypes';
import {
	// RESET_PROFILE_ERRORS,
	SET_PROFILE_ERRORS,
} from '../Types/ProfileTypes';
import { SET_TOKEN } from '../Types/UserTypes';
export const updateNameAction = (user) => {
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
			
			const { data } = await axios.post('/updateName', user, config);

			localStorage.setItem('myToken', data.token); // reset new token

			dispatch({ type: CLOSE_LOADER });
				
			dispatch({ type: SET_TOKEN, payload: data.token });  // now set token in reducer

			dispatch({ type: SET_MESSAGE, payload: data.msg }); 
			dispatch({ type: REDIRECT_TRUE });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			// console.log(error.response.data.errors);
			dispatch({
				type: SET_PROFILE_ERRORS,
				payload: error.response.data.errors,
			});
		}
	};
};
