import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSessions, logoutUsers } from '../../features/userSlice.action';
import { useNavigate } from 'react-router-dom';

const SessionsList = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const {unauthorized}= useSelector((state)=>state.user)
    useEffect(()=>{
      dispatch(getSessions());
      if (unauthorized) {  
        console.log("aaya")
        navigate("/login")
      }
    },[unauthorized])
  return (
    <div>
        SessionList
        <button className='bg-red-500  rounded-md p-2 m-2 left-0' onClick={()=>dispatch(logoutUsers())}>LogOut</button>
    </div>
  )
}

export default SessionsList