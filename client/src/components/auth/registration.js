import { useState, useEffect } from 'react';
import BgImage from './BgImage';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { postRegister } from './../../Store/asyncMethods/authMethods';
const Register = (props) => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { loading, registerErrors,user } = useSelector(
		(state) => state.AuthReducers   // is se jo response aarha hai jab bhi chnage in redux
	);

	const dispatch = useDispatch();
	const handleInputs = (e) => {
		setState({  // is se fyada har input ke lea we can only use this function
			...state,
			[e.target.name]: e.target.value,
		});
	};
	const userRegister = async (e) => {
		e.preventDefault();
		dispatch(postRegister(state)); // ye state ko authmethods main le kar ja raha hai for acha wra we can write here
	};
	useEffect(() => {
		console.log(registerErrors);
		if (registerErrors.length > 0) {
			registerErrors.map((error) => toast.error(error.msg));
		}
		if(user){
			props.history.push('/dashbord');
		}
	}, [registerErrors,user]); // ye only chale ga jab change in register Errror main change us ke hasab se error show
	return (
		<>
			<Helmet>
				<title>User Register</title>
				<meta name='description' content='User register form' />
			</Helmet>
			<div className='row mt-80'>
				<div className='col-8'>
					<BgImage />
					<Toaster  // for show errors
						position='top-right'
						reverseOrder={false}
						toastOptions={{
							style: {
								fontSize: '14px',
							},
						}}
					/>
				</div>
				<div className='col-4'>
					<div className='account'>
						<div className='account__section'>
							<form onSubmit={userRegister}>
								<div className='group'>
									<h3 className='form-heading'>Register</h3>
								</div>
								<div className='group'>
									<input
										type='text'
										name='name'
										className='group__control'
										placeholder='Enter Name'
										value={state.name}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										type='email'
										name='email'
										className='group__control'
										placeholder='Enter Email'
										value={state.email}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										type='password'
										name='password'
										className='group__control'
										placeholder='Create Password'
										value={state.password}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										type='submit'
										className='btn btn-default btn-block'
										value={loading ? '...' : 'Register'}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Register;
