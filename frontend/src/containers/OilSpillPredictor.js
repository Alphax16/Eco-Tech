import React, { useState } from "react";
import { Box, Button, Center, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
const OilSpillPredictor = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [file, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  //   const handleFileUpload = (file) => {
  //     // Handle the file upload logic here
  //     console.log("File uploaded:", file);
  //     setSelectedImage(URL.createObjectURL(file)); // Set the selected image for preview
  //   };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (file) {
      handleSubmit();
      closeModal();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const chooseImageButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/oilSpillPredictor",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded:", response.data);
      alert(response.data.success);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box p={"32"} h={"100vh"} bg={"#12504B"} color={"#fff"}>
      <Box bg={"white.200"} height={"max-content"}>
        <Center>
          <Box
            w={"300px"}
            h={{ base: "150px", lg: "250px" }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            //   style={{
            //     width: "200px",
            //     height: "200px",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     flexDirection: "column",
            //   }}
          >
            {imagePreview ? (
              <Image
                maxW={"100%"}
                maxH={"100%"}
                src={imagePreview}
                alt="Preview"
              />
            ) : (
              <>
                <img src="/assets/Dropboxlogo.png" alt="No-Img" />
                <Text textAlign={"center"} mt={"6"}>
                  Drag and drop your image here
                </Text>
              </>
            )}
          </Box>
        </Center>
        <Text textAlign={"center"}>Or</Text>
        <Center>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
            display={"none"}
          />
          {imagePreview ? (
            <Button
              colorScheme="teal"
              my={"6"}
              onClick={chooseImageButtonClick}
            >
              Choose Again
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              my={"6"}
              onClick={chooseImageButtonClick}
            >
              Choose Image
            </Button>
          )}
        </Center>
        {file && (
          <div>
            <p style={{ textAlign: "center" }}>Selected Image: {file.name}</p>
            <Button
              colorScheme="teal"
              onClick={handleUpload}
              style={{ display: "block", margin: "0 auto" }}
            >
              Upload
            </Button>
          </div>
        )}
      </Box>
    </Box>
    // <Box p={"16"}>
    //   <form onSubmit={handleSubmit}>
    //     {!file ? <span>Upload a file</span> : file.name}
    //     <input
    //       id="file-upload"
    //       name="file-upload"
    //       type="file"
    //       onChange={handleFileChange}
    //     />
    //     <Button type="submit">Upload</Button>
    //   </form>
    // </Box>
  );
};

export default OilSpillPredictor;
