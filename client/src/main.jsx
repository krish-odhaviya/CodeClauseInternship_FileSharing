import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { colors } from "./assets/colors/Colors.js";
import "./index.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { AuthProvider } from "../store/auth.jsx";
const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </AuthProvider>
);
