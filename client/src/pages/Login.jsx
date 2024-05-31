import React, { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

import { colors } from "../assets/colors/Colors";

import { useAuth } from "../../store/auth";

//ui elemets
import {
  Box,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const { storeTokenInLS, API } = useAuth();

  const [loginDetails, setLoginDetailes] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //storing user credential in local user state.
  const handleChange = (e) => {
    setLoginDetailes((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const res_data = await res.json();
      if (res.ok) {
        console.log(res_data);
        toast({
          title: "Loged in successfully",
          description: "you are now loged in ",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        storeTokenInLS(res_data.token);
        setLoginDetailes({
          email: "",
          password: "",
        });
        window.location.href = "/";
      } else {
        toast({
          title: res_data.message,
          description: res_data.extraDetailes,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log(res_data.message);
      }
    } catch (error) {
      console.error("fr : login :- " + error);
    }
  };

  return (
    <div className="root">
      <Flex className="login" bg={colors[300]}>
        <form className="login" onSubmit={(e) => handleLogin(e)}>
          <Stack spacing={5} w={"60%"}>
            <Box textAlign={"left"} mb={17}>
              <Heading as={"h4"}>Welecome to ShareEase</Heading>
              <Text numoflines={2}>
                Welcome back, Please Login to your Account
              </Text>
            </Box>
            <Input
              required
              name="email"
              value={loginDetails.email}
              bg={colors[100]}
              placeholder="Enter your Email"
              onChange={(e) => handleChange(e)}
            />
            <InputGroup>
              <Input
                required
                name="password"
                value={loginDetails.password}
                bg={colors[100]}
                placeholder="Enter your Password"
                onChange={(e) => handleChange(e)}
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack direction={"row"} mt={5}>
              <Button
                type="submit"
                bg={colors[500]}
                color={colors[100]}
                colorScheme="teal"
                variant="solid"
                w={"30%"}
              >
                Login
              </Button>
              <Button
                color={colors[500]}
                colorScheme="teal"
                variant="outline"
                w={"30%"}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Signup
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
      <Box className="logo" bg={colors[900]}>
        <img src={"images/share-ease-trp.png"} alt="Not found"></img>
      </Box>
    </div>
  );
}

export default Login;
