
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {REDIRECT_FALSE,REMOVE_MESSAGE} from '../Store/Types/PostTypes';
import { fetchPosts } from '../Store/asyncMethods/PostMethods';
import { BsPencil, BsArchive } from 'react-icons/bs';
import { Link,useParams } from 'react-router-dom';
import Loader from './Loader';
import Slidebar from './Slidebar';
import Pagination from './Pagination';

const Dashbord=()=> {
    const {redirect,message,loading} = useSelector((state)=>state.PostReducers);
    const {
      user: { _id },
     
    } = useSelector((state) => state.AuthReducers);
    const { posts,count,perPage } = useSelector((state) => state.FetchPosts);
	let { page } = useParams();
	if (page === undefined) {
		page = 1;
	}
    // console.log(posts);

    const dispatch = useDispatch();
    useEffect(()=>{
      if(redirect){
        dispatch({type:REDIRECT_FALSE});
      }
      if(message){
        toast.success(message);
        dispatch({type:REMOVE_MESSAGE});
      }
      dispatch(fetchPosts(_id,page));
    },[page]);
    return (
      <>
      		<Helmet>
      <title>Dashbord</title>
      <meta name="description" content="The is the user Dashbord" />
      
    </Helmet>
    <Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{
					style: {
						fontSize: '14px',
					},
				}}
			/>
     	<div className='container mt-100'>
				<div className='row ml-minus-15 mr-minus-15'>
					<div className='col-3 p-15'>
						<Slidebar />
					</div>
					<div className='col-9 p-15'>
						{!loading ? (
							posts.length > 0 ? (
								posts.map((post) => (
									<div className='dashboard__posts' key={post._id}>
										<div className='dashboard__posts__title'>
											<Link to={`/details/${post.slug}`}>{post.title}</Link>
											
										</div>
										<div className='dashboard__posts__links'>
											<Link to={`/edit/${post._id}`}>
												<BsPencil className='icon' />
											</Link>
											<Link to={`/`}>
												<BsArchive className='icon' />
											</Link>
										
										</div>
									</div>
								))
							) : (
								'You dont have any post'
							)
						) : (
							<Loader />
						)}
							<Pagination
							path='dashbord'
							page={page}
							perPage={perPage}
							count={count}
						/>
					</div>
				</div>
			</div>
      </>
    );
  }
  
  export default Dashbord;
  