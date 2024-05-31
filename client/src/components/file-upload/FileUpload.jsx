// FileUpload.js
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { format, addDays } from "date-fns";
import { RWebShare } from "react-web-share";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";

import "./FileUpload.css";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const { user, API } = useAuth();
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const afterweek = format(addDays(new Date(), 7), "yyyy-MM-dd");

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState({});
  const [isPopupModal, setIsPopupModal] = useState(false);
  const [link, setLink] = useState("");
  const [data, setData] = useState({
    expirydate: "",
    email: "",
    password: "",
  });

  const uploadFile = async () => {
    if (file) {
      try {
        setData((value) => {
          return { ...value, email: user.email };
        });

        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${API}/api/upload?email=${user.email}&expirydate=${
            data.expirydate ? data.expirydate : afterweek
          }&password=${data.password}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: data,
          }
        );
        console.log(res.data);
        setData({
          expirydate: "",
          email: "",
          password: "",
        });

        setIsOpen((value) => !value);
        const link = window.location.href;
        const newLink = link.replace("home", "view");
        setLink(`${newLink}/${res.data.fileId}`);

        setIsPopupModal(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = await acceptedFiles[0];
    console.log(file);
    setFile(file);
    setIsOpen((value) => {
      return !value;
    });
  }, []);

  const changeHandler = (e) => {
    setData((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="file-upload-container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
      <Modal
        onClose={() => {
          setFile({});
          setIsOpen((value) => {
            return !value;
          });
        }}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>File name: {file.name}</Text>
            <Text>File type : {file.type}</Text>
            <Text>
              size : {(file.size / 1024).toFixed(2)}{" "}
              {(file.size / 1024).toFixed(2) > 1024 ? "mb" : "kb"}
            </Text>
            <br />
            <Text>Set expiry date (optional):</Text>
            <Input
              required
              name="expirydate"
              placeholder="Select Date and Time"
              size="md"
              min={tomorrow}
              onChange={(e) => {
                changeHandler(e);
              }}
              type="date"
            />
            <br />
            <br />
            <Text>Set passowd for your file (optional):</Text>
            <Input
              required
              name="password"
              placeholder="Enter password"
              size="md"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setFile({});
                setIsOpen((value) => {
                  return !value;
                });
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="ghost"
              onClick={() => {
                uploadFile();
              }}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        onClose={() => {
          setIsPopupModal((value) => {
            return !value;
          });
        }}
        isOpen={isPopupModal}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Share File Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2 color={"green"}>{link}</h2>
          </ModalBody>
          <ModalFooter>
            <RWebShare
              data={{
                text: file.name + "share link",
                url: link,
                title: "ShareEase",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button variant="ghost">Copy link</Button>
            </RWebShare>
            <Button
              colorScheme="blue"
              onClick={() => {
                window.open(link);
              }}
            >
              Go to link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUpload;
