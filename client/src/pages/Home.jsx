import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAuth } from "../../store/auth";
import Header from "../components/header/Header";
import { Box, Button, Text } from "@chakra-ui/react";
import FileUpload from "../components/file-upload/FileUpload";

function Home() {
  const { user, API } = useAuth();

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const email = user.email;
    try {
      const res = await fetch(`${API}/api/view-all/${email}`, {
        method: "GET",
      });
      if (res.ok) {
        const resData = await res.json();
        setData(resData);
        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box w={"100%"} h={"100vh"} flex={1} position={"absolute"}>
      <Header />
      <Box id="Home">
        <FileUpload />
        <Box
          id="Uploaded-links"
          w={"100%"}
          h={"100%"}
          bc={"#D76F30"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Text color={"White"} fontSize={20} fontWeight={"bolder"} mt={3}>
            Files you have uploaded{" "}
          </Text>
          {data.length > 0 ? (
            data.map((value, index) => {
              return (
                <Box
                  key={index}
                  bg="#e9ece7"
                  w={"75%"}
                  marginTop={10}
                  p={3}
                  borderRadius={10}
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                >
                  <Text textAlign={"start"}>
                    <strong>file name: </strong> {value.filename}
                  </Text>
                  <Button>Go to link</Button>
                </Box>
              );
            })
          ) : (
            <Text color="White" mt={3}>
              No files uploaded yet.
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
