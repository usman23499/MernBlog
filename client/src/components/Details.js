import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import htmlToFormattedText  from 'html-to-formatted-text';

import Helmet from 'react-helmet';
import { postDetails,postComment} from '../Store/asyncMethods/PostMethods';
import Loader from './Loader';
import Comments from './Comments';

const Details = () => {
	const { id } = useParams(); // is main we get slug
	const [comment, setComment] = useState('');

    const { user } = useSelector((state) => state.AuthReducers);
	const { loading, details,comments } = useSelector(
		(state) => state.PostReducers
	);
	const dispatch = useDispatch();
    const addComment = (e) => {
		e.preventDefault();
		dispatch(postComment({ id: details._id, comment, userName: user.name }));
		setComment('');
		dispatch(postDetails(id));
	};
	useEffect(() => {
		dispatch(postDetails(id));
		 // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	return (
		<div className='container'>
			<div className='row mt-100'>
				<div className='col-8'>
					{!loading ? (
						<div className='post__details'>
							<Helmet>
								<title>{details.title}</title>
							</Helmet>
							<div className='post__header'>
								<div className='post__header__avator'>
									{details.userName ? details.userName[0] : ''}
								</div>
								<div className='post__header__user'>
									<span>{details.userName}</span>
									<span>{moment(details.updatedAt).format('MMM Do YY')}</span>
								</div>
							</div>
							<div className='post__body'>
								<h1 className='post__body__title'>{details.title}</h1>
								<div className='post__body__details'>
									{htmlToFormattedText(details.body)}
								</div>
								<div className='post__body__image'>
									<img src={`/images/${details.image}`} alt={details.image} />
								</div>
							</div>
							{user ? (
								<>
									<div className='post__comment'>
										<form onSubmit={addComment}>
											<div className='group'>
												<input
													type='text'
													className='group__control'
													placeholder='Write a comment...'
													onChange={(e) => setComment(e.target.value)}
													value={comment}
												/>
											</div>
											<div className='group'>
												<input
													type='submit'
													value='Post comment'
													className='btn btn-default'
												/>
											</div>
										</form>
									</div>
									<Comments comments={comments} />
								</>
							) : (
								''
							)}
						</div>
					) : (
						<Loader />
					)}
				</div>
			</div>
		</div>
	);
};
export default Details;
