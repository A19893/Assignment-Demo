import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./pages/DashBoard/DashBoard";
import Signup from "./pages/Signup/Signup";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { SnackbarProvider } from "notistack";
const App = () => {
  const signed_state = useSelector((state) => state.user.loggedInState);
  return (
    <SnackbarProvider>
      <Routes>
        {signed_state ? (
          <Route path="/" element={<DashBoard />} />
        ) : (
          <>
            <Route index path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </SnackbarProvider>
  );
};

export default App;
