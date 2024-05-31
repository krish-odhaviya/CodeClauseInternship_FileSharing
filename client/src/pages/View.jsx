import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Input,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../store/auth";

function View() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const { API } = useAuth();

  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/view/${id}`, {
        method: "GET",
      });
      if (res.ok) {
        const resData = await res.json();
        setData(resData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (e) => {
    if (password == data.password) {
      const path = data.filepath.replace("uploads", "").trim();
      window.location.href = `${API}/api/download?path=${path}`;
    } else {
      toast({
        title: "Password is incorrect",
        description: "Please reach out uploader of this file",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        //   display={"absolute"}
        w={"100%"}
        h={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"absolute"}
        bg={"#172D13"}
      >
        <Box w={"50%"} bg="white" borderRadius="md" boxShadow="lg" p={8}>
          {loading ? (
            <Center h="100%">
              <Spinner size="xl" color="blue.500" />
            </Center>
          ) : (
            <VStack spacing={5} align="stretch">
              <Heading as="h1" size="lg" textAlign="center" color="teal.500">
                File Details
              </Heading>
              <Text fontSize="xl">
                <strong>File Name:</strong> {data.filename}
              </Text>
              <Text fontSize="xl">
                <strong>File Type:</strong> {data.filetype}
              </Text>
              <Text fontSize="xl">
                <strong>Expiry Date:</strong> {data.expirydate}
              </Text>
              <Text fontSize="xl">
                <strong>Uploaded By:</strong> {data.email}
              </Text>

              <Text fontSize="xl">
                <strong>File Size:</strong> {(data.filesize / 1024).toFixed(2)}{" "}
                {(data.filesize / 1024).toFixed(2) > 1024 ? "MB" : "KB"}
              </Text>
              {data.password && (
                <HStack>
                  <Text fontSize="xl">
                    <strong>Password:</strong>
                  </Text>
                  <Input
                    placeholder="Enter file password"
                    bg="gray.200"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </HStack>
              )}

              {data.expirydate ||
              new Date(data.expirydate).getTime() - new Date().getTime() >=
                0 ? (
                <Button
                  disabled
                  colorScheme="teal"
                  size="lg"
                  alignSelf="center"
                  onClick={(e) => downloadFile(e)}
                >
                  Download
                </Button>
              ) : (
                ""
              )}
              {data.expirydate &&
                new Date(data.expirydate).getTime() - new Date().getTime() <
                  0 && (
                  <Box color={"red"} fontWeight={"bold"}>
                    <h3>Link has been expired</h3>
                  </Box>
                )}
            </VStack>
          )}
        </Box>
      </Box>
    </>
  );
}

export default View;
