import { Route, Routes } from "react-router-dom";
import "./App.css";
import socketIO from 'socket.io-client'
import DashBoard from "./pages/DashBoard/DashBoard";
import Signup from "./pages/Signup/Signup";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { SnackbarProvider } from "notistack";
const socket = socketIO.connect("http://localhost:8080");
const App = () => {
  const signed_state = useSelector((state) => state.user.loggedInState);
  return (
    <SnackbarProvider>
      <Routes>
        {signed_state ? (
          <Route path="/" element={<DashBoard socket={socket}/>} />
        ) : (
          <>
            <Route index path="/" element={<Signup />} />
            <Route path="/login" element={<Login socket={socket}/>} />
          </>
        )}
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </SnackbarProvider>
  );
};

export default App;
