import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

import { colors } from "../assets/colors/Colors";

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
import { useAuth } from "../../store/auth";

// import { toast } from "../../utils/toast";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [registraionDetails, setRegistraionDetails] = useState({
    email: "",
    firstname: "",
    surname: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { API } = useAuth();

  //storing user credential in local user state.
  const handleChange = (e) => {
    setRegistraionDetails((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registraionDetails),
      });

      const res_data = await res.json();
      if (res.ok) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
        setRegistraionDetails({
          firstname: "",
          surname: "",
          email: "",
          password: "",
        });
        console.log(res_data);
      } else {
        console.log(res_data);
        toast({
          title: res_data.message,
          description: res_data.extraDetailes,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("fr : register :- " + error);
    }
  };

  return (
    <div className="root">
      <Flex className="login" bg={colors[300]}>
        <form className="login" onSubmit={(e) => handleRegister(e)}>
          <Stack spacing={5} w={"60%"}>
            <Box textAlign={"left"} mb={17}>
              <Heading as={"h4"}>Let's get you set up</Heading>
              <Text numoflines={2}>It should only take couple of minutes</Text>
            </Box>
            <InputGroup direction={"row"} gap={3}>
              <Box>
                <Text align={"start"}>Firstname :</Text>
                <Input
                  required
                  name="firstname"
                  bg={colors[100]}
                  placeholder="Enter your Firstname"
                  onChange={(e) => handleChange(e)}
                />
              </Box>
              <Box>
                <Text align={"start"}>Surname :</Text>
                <Input
                  required
                  name="surname"
                  bg={colors[100]}
                  placeholder="Enter your Surname"
                  onChange={(e) => handleChange(e)}
                />
              </Box>
            </InputGroup>
            <Box>
              <Text align={"start"}>Email :</Text>
              <Input
                required
                name="email"
                bg={colors[100]}
                placeholder="Enter your Email"
                onChange={(e) => handleChange(e)}
              />
            </Box>
            <Box>
              <Text align={"start"}>Password :</Text>
              <InputGroup>
                <Input
                  required
                  name="password"
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
            </Box>
            <Stack direction={"row"} mt={5}>
              <Button
                type="submit"
                bg={colors[500]}
                color={colors[100]}
                colorScheme="teal"
                variant="solid"
                w={"30%"}
              >
                Signup
              </Button>
              <Button
                color={colors[500]}
                colorScheme="teal"
                variant="outline"
                w={"30%"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
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

export default Register;
