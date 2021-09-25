
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {REDIRECT_FALSE,REMOVE_MESSAGE} from '../Store/Types/PostTypes';

const Dashbord=()=> {
    const {redirect,message} = useSelector((state)=>state.PostReducers)
    const dispatch = useDispatch();
    useEffect(()=>{
      if(redirect){
        dispatch({type:REDIRECT_FALSE});
      }
      if(message){
        toast.success(message);
        dispatch({type:REMOVE_MESSAGE});
      }
    },[]);
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
      <div >
        
        <h1>Dashbord</h1>
      </div>
      </>
    );
  }
  
  export default Dashbord;
  