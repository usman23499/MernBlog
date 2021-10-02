import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Sidebar = () => {
	const { push } = useHistory();
	return (
		<div className='sidebar'>
			<div className='sidebar__element'>
				<h3>Setting</h3>
			</div>
			<>
			<div className='sidebar__element' onClick={()=>push('/updatePassword')}>
				<span >Change Password</span>
			</div>
			</>
			<div className='sidebar__element'  onClick={()=>push('/updateName')} >
				<span>Change Name</span>
			</div>
		</div>
	);
};
export default Sidebar;
