import React, { useEffect } from 'react'
import SessionsList from '../../components/DashBoard'
import { Snackbar } from '../../components/SnackBar/SnackBar';
import { deleteMessage } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const DashBoard = () => {
  const dispatch= useDispatch();
  const showSnackbar = Snackbar();
  const {message, type, unauthorized}= useSelector((state)=>state.user)
  useEffect(()=>{
    if (unauthorized) {  
      showSnackbar(message, type);
      setTimeout(() => {
        dispatch(deleteMessage());
      }, 1000);
    }
  },[message])
  return (
    <div>
        <SessionsList/>
    </div>
  )
}

export default DashBoard