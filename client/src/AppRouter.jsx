//Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import View from "./pages/View";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../store/auth";

function AppRouter() {
  const { isLogedin } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              isLogedin ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
