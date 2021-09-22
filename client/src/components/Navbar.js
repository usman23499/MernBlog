import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../Store/Types/UserTypes';

const Navbar = () => {
	const {user}=useSelector(state=>state.AuthReducers);
	const dispatch = useDispatch();
	const logout = () => {
		localStorage.removeItem('myToken');
		dispatch({ type: LOGOUT });
	};
	const Links = user ? (
		<div className='navbar__right'>
			<li>
				<Link to='/create'>Create Post</Link>
			</li>
			<li>
				<Link to='/dashbord'>{user.name}</Link>
			</li>
			<li>
				<span onClick={logout}>Logout</span>
			</li>
		</div>
	) : (
		<div className='navbar__right'>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/registration'>Register</Link>
			</li>
		</div>
	)
	return (
		<nav className='navbar'>
			<div className='container'>
				<div className='navbar__row'>
					<div className='navbar__left'>
						<Link to='/'>
							<img src='/images/logo.png' alt='' />
						</Link>
					</div>
                         {Links}
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
