import {
	SET_LOADER,
	CLOSE_LOADER,
	CREATE_ERRORS,
	
} from '../Types/PostTypes';
const initState = {
	loading: false,
	createErrors: [],
	
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
	 else {
		return state;
	}
};
