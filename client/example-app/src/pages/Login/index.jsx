import React, { useEffect } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../features/userSlice';
import { Snackbar } from '../../components/SnackBar/SnackBar';
const Login = ({socket}) => {
  const showSnackbar = Snackbar();
  const dispatch = useDispatch();
  const {message, type}= useSelector((state)=>state.user)
  const loggedinId=123;
  useEffect(()=>{
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
    }
  },[message])

  function showAlert(otp){
    alert(`Your otp is ${otp}`);
    // console.log(doc)
  }
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default Login