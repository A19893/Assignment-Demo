import React, { useRef, useState } from "react";
import { checkValidaData } from "../../utils";
import { useNavigate } from "react-router-dom";
import { loginUsers } from "../../features/userSlice.action";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const dispatch=useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate= useNavigate();
  const handleButtonClick = () => {
    // Validate the form Data
    const message = checkValidaData(
      email.current.value,
      password.current.value
    );
    message && setErrorMessage(message);
    if (message) return;
    dispatch(loginUsers({email:email.current.value,password:password.current.value,loggedinId:123}))
    navigate("/")
  };
  return (
    <div>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="w-3/12 bg-blue-400  p-12 my-40 mx-auto right-0 left-0 text-black bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
           Sign In
        </h1>
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-4  bg-white w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4  bg-white w-full"
        />
        <p className="tex-white py-2 font-normal text-center">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="py-4 my-4 bg-red-600 w-full rounded-md"
        >
           Sign In
        </button>
        <p
          className="p-2 m-2 text-center cursor-pointer text-red-600"
          onClick={() => navigate('/signup')}
        >
        Already a Registered User?
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
