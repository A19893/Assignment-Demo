import React, { useEffect } from "react";
import SessionsList from "../../components/DashBoard";
import { Snackbar } from "../../components/SnackBar/SnackBar";
import { deleteMessage } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { otpSubmission } from "../../features/userSlice.action";
const DashBoard = ({ socket }) => {
  const dispatch = useDispatch();
  const showSnackbar = Snackbar();
  const userId= useSelector((state) => state.user?.users?._id);
  const tokenId = useSelector((state) => state.user?.users?.tokens[0]?._id);
  console.log(tokenId,"token")
  useEffect(() => {
    socket.on(tokenId, () => {
      showAlert();
    });
  }, [socket]);
  const { message, type, unauthorized } = useSelector((state) => state.user);
  function showAlert() {
    window.focus();
    let doc = prompt("Please enter your otp for login");
    dispatch(otpSubmission({userId,doc}))
    console.log(doc);
  }
  useEffect(() => {
    if (unauthorized) {
      showSnackbar(message, type);
      setTimeout(() => {
        dispatch(deleteMessage());
      }, 1000);
    }
  }, [message]);
  return (
    <div>
      <SessionsList />
    </div>
  );
};

export default DashBoard;
