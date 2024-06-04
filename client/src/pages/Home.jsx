import React, { useEffect, useState, useLayoutEffect } from "react";

//store
import { useAuth } from "../../store/auth";

//chakra ui
import { Box } from "@chakra-ui/react";

//components
import Header from "../components/header/Header";
import FileUpload from "../components/file-upload/FileUpload";
import ViewUploades from "../components/view-uploaded-files/ViewUploades";

function Home() {
  const { user } = useAuth();

  return (
    <Box w={"100%"} h={"100vh"} flex={1} position={"absolute"} pb={"10%"}>
      <Header />
      <Box id="Home">
        <FileUpload />
        <ViewUploades email={user.email} />
      </Box>
    </Box>
  );
}

export default Home;
