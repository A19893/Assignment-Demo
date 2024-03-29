import React, { useEffect } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { useDispatch, useSelector } from 'react-redux';
import { addLoggedInId, deleteMessage } from '../../features/userSlice';
import { Snackbar } from '../../components/SnackBar/SnackBar';
import { generateShortUuid, showAlert } from '../../utils';
const Login = ({socket}) => {
  const showSnackbar = Snackbar();
  const dispatch = useDispatch();
  const {message, type}= useSelector((state)=>state.user)
  const loggedinId=generateShortUuid();
  useEffect(()=>{
    dispatch(addLoggedInId(loggedinId));
    socket.on(loggedinId,(otp)=>{
      showAlert(otp);
    })
  },[socket])
  
  useEffect(()=>{
    if (message !== "") {  
      showSnackbar(message, type);
      setTimeout(() => {
        dispatch(deleteMessage());
      }, 1000);
      return;
    }
  },[message])
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default Login