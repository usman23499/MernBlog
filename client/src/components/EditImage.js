import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { updateImageAction } from '../Store/asyncMethods/PostMethods';
import { RESET_UPDATE_IMAGE_ERRORS } from '../Store/Types/PostTypes';

const EditImage = () => {
	const { id } = useParams();
	const { push } = useHistory();
	const dispatch = useDispatch();

	const { updateImageErrors } = useSelector((state) => state.UpdateImage);
	const { redirect } = useSelector((state) => state.PostReducers);

	const [state, setState] = useState({
		image: '',
		imagePreview: '',
		imageName: 'Choose image',
	});
	const fileHandle = (e) => {
		if (e.target.files.length !== 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setState({
					...state,
					imagePreview: reader.result,
					image: e.target.files[0],
					imageName: e.target.files[0].name,
				});
			};
			reader.readAsDataURL(e.target.files[0]); // Buitin function of js
		}
	};


	const updateImage = (e) => {
		e.preventDefault();
		const formData = new FormData(); // to send image in server
		formData.append('id', id);
		formData.append('image', state.image);
		dispatch(updateImageAction(formData));
	};
	useEffect(() => {
		
		if (updateImageErrors.length !== 0) {
			updateImageErrors.map((error) => toast.error(error.msg));
			dispatch({ type: RESET_UPDATE_IMAGE_ERRORS });
		}
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateImageErrors]);
	useEffect(() => {
		if (redirect) {
			push('/dashbord');
		}
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [redirect]);

	return (
		<div className='container mt-100'>
			<Helmet>
				<title>Update image</title>
				<meta name='description' content='Update image' />
			</Helmet>
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					style: {
						fontSize: '14px',
					},
				}}
			/>
			
			<div className='row'>
				<div className='col-6'>
					<div className='card'>
						<h3 className='card__h3'>Update Post Image</h3>
						<form  onSubmit={updateImage} >
							<div className='group'>
								<label htmlFor='image' className='image__label'>
									{state.imageName}
								</label>
								<input
									type='file'
									name='image'
									id='image'
									onChange={fileHandle}
								/>
							</div>
							<div className='group'>
								<div className='imagePreivew'>
									{state.imagePreview ? <img src={state.imagePreview} alt="img" /> : ''}
								</div>
							</div>
							<div className='group'>
								<input
									type='submit'
									value='Update image'
									className='btn btn-default btn-block'
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default EditImage;
