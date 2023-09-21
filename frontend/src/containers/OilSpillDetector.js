import React, { useState } from "react";
import { Box, Button, Center, Image, Input, Text, Flex } from "@chakra-ui/react";
import axios from "axios";

const OilSpillDetector = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [file, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resImgURL, setResImgURL] = useState('');

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
        "http://localhost:5000/api/ai/oil-spill-detector",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded:", response.data);
      alert(response.data.success);
      
      setResImgURL(response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box p={32} h="100vh" bg="#12504B" color="#fff">
      <Center>
        <Flex direction="column" align="center">
          <Box
            w="300px"
            h={{ base: "150px", lg: "250px" }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            mt={4} // Add margin-top to create spacing
          >
            {imagePreview ? (
              <Image maxW="100%" maxH="100%" src={imagePreview} alt="Preview" />
            ) : (
              <>
                <img src="/assets/Dropboxlogo.png" alt="No-Img" />
                <Text textAlign="center" mt={2}> {/* Adjust the margin-top */}
                  Drag and drop your image here
                </Text>
              </>
            )}
          </Box>
          <Text textAlign="center" mt={2}>Or</Text> {/* Adjust the margin-top */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
            display="none"
          />
          {imagePreview ? (
            <Button colorScheme="teal" mt={2} onClick={chooseImageButtonClick}>
              Choose Again
            </Button>
          ) : (
            <Button colorScheme="teal" mt={2} onClick={chooseImageButtonClick}>
              Choose Image
            </Button>
          )}
          {file && (
            <div>
              <p style={{ textAlign: "center", margin: "2rem 0" }}> {/* Adjust the margin */}
                Selected Image: {file.name}
              </p>
              <Button
                colorScheme="teal"
                onClick={handleUpload}
                style={{ display: "block", margin: "0 auto" }}
              >
                Upload
              </Button>
            </div>
          )}
          {resImgURL && (
            <div>
              <img src={resImgURL} alt="No Response-Img" style={{ margin: "2rem auto" }} /> {/* Adjust the margin */}
            </div>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default OilSpillDetector;
