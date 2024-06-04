import { useStatStyles } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const isLogedin = !!token;

  const API = import.meta.env.VITE_APP_URI_API;
  const FR_API = import.meta.env.FR_API;

  const userAuthentication = async () => {
    try {
      const res = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error({ error: error, message: "Error fetching user data" });
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    return setToken(localStorage.getItem("token"));
  };

  const logoutUser = () => {
    setToken();
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        logoutUser,
        token,
        isLogedin,
        user,
        API,
        FR_API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider.");
  }
  return authContextValue;
};
