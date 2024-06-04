import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  useDisclosure,
  Alert,
  AlertIcon,
  useToast,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Badge,
  HStack,
  Spinner,
} from "@chakra-ui/react";

import { useAuth } from "../../../store/auth";

function ViewUploads({ email }) {
  const { API, FR_API } = useAuth();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const panelBg = useColorModeValue("white", "gray.700");
  const itemBg = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  useLayoutEffect(() => {
    if (email) {
      fetchData(email);
    }
  }, [email]);

  const deleteFile = async (value) => {
    try {
      const data = {
        fileId: value._id.toString(),
        path: value.filepath,
      };
      const res = await fetch(`${API}/api/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      fetchData();
      if (res.ok) {
        toast({
          title: "File deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "deletation unsuccessful",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/api/view-all/${email}`, {
        method: "GET",
      });
      const resData = await res.json();

      if (res.ok) {
        setData(resData);
      } else {
        toast({
          title: "Error",
          description: "Data not found or an error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      id="Uploaded-links"
      w="100%"
      h="100%"
      flexDirection="column"
      alignItems="center"
      p={[4, 6, 8]} // responsive padding
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Heading color={headingColor} mb={5} fontSize={["2xl", "3xl", "4xl"]}>
        Files you have uploaded
      </Heading>

      {isLoading && (
        <>
          <HStack>
            <Spinner size={["sm", "md", "lg"]} />
            <Text fontSize={["sm", "md", "lg"]}>Loading...</Text>
          </HStack>
        </>
      )}

      {!isLoading && data.length === 0 ? (
        <Alert status="warning" mt={4} w="90%">
          <AlertIcon />
          No files uploaded yet.
        </Alert>
      ) : (
        <Accordion allowToggle w="90%">
          {data.map((value, index) => (
            <AccordionItem
              key={index}
              borderRadius="md"
              overflow="hidden"
              mb={4}
              boxShadow="md"
              bg={itemBg}
            >
              <AccordionButton>
                <Flex alignItems="center" flex={1}>
                  <Text
                    ml={3}
                    flex={1}
                    color={headingColor}
                    fontWeight="semibold"
                    fontSize={["sm", "md", "lg"]}
                    noOfLines={1}
                  >
                    {value.filename}
                  </Text>
                  <Spacer />
                  {value.expirydate && (
                    <Badge
                      colorScheme="purple"
                      variant="outline"
                      ml={2}
                      fontSize={["xs", "sm"]}
                    >
                      Expires: {new Date(value.expirydate).toLocaleDateString()}
                    </Badge>
                  )}
                </Flex>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel bg={panelBg} p={[2, 4]}>
                <VStack align="start" spacing={3}>
                  <Text color={textColor} fontSize={["sm", "md"]}>
                    File id: {value._id}
                  </Text>
                  <Text color={textColor} fontSize={["sm", "md"]}>
                    File type: {value.filetype}
                  </Text>
                  <Text color={textColor} fontSize={["sm", "md"]}>
                    File size: {(value.filesize / 1024).toFixed(2)}{" "}
                    {(value.filesize / 1024).toFixed(2) > 1024 ? "MB" : "KB"}
                  </Text>
                  {value.password && (
                    <Text color={textColor} fontSize={["sm", "md"]}>
                      Password: {value.password}
                    </Text>
                  )}
                  <HStack>
                    <Button
                      colorScheme="red"
                      mt={2}
                      size={["sm", "md"]}
                      onClick={() => {
                        deleteFile(value);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      colorScheme="blue"
                      mt={2}
                      size={["sm", "md"]}
                      onClick={() => {
                        window.open(`/view/${value._id}`);
                      }}
                    >
                      Go to link
                    </Button>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Flex>
  );
}

export default ViewUploads;
