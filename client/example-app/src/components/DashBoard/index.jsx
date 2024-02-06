import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSessions, logoutUsers } from '../../features/userSlice.action';
// import { useNavigate } from 'react-router-dom';

const SessionsList = ({id}) => {

    const dispatch = useDispatch();
    const {sessions} = useSelector((state)=>state.user)
    useEffect(()=>{
      dispatch(getSessions(id));
    },[])
  return (
    <div>
        SessionList
        {
          sessions?.map((item)=>{
            console.log(item)
            return (
              <div key={item._id}>
                <h3 className='text-black'>{item._id}</h3>
               </div>
            )
          })
        }
        <button className='bg-red-500  rounded-md p-2 m-2 left-0' onClick={()=>dispatch(logoutUsers())}>LogOut</button>
    </div>
  )
}

export default SessionsList