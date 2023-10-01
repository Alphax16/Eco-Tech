import React, { useState, useEffect } from "react";
import { Box, Button, Center, Image, Input, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";


const OilSpillDetector = () => {
  const [file, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resImgURL, setResImgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(null);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
      // setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (file) {
      setLoading(true);
      try {
        handleSubmit().then((response) => {
          setLoading(false);
          Swal.fire({
            title: "Segmentation successful!",
            icon: "success",
          });
        });
      } catch (err) {
        console.error("Error uploading file:", err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("Image preview updated:", imagePreview);
  }, [imagePreview]);

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
    setImagePreview(null);
    setResImgURL("");
    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
    fileInput.click();
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
      setResImgURL(response.data.url + `?timestamp=${Date.now()}`);
      // alert(response.data.success);

      // setResImgURL(response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const downloadResImage = () => {
    if (resImgURL) {
      fetch(resImgURL).then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "OilSpill_Segmented_Image.png";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }
  };

  return (
    
      <Box p={32} h="max-content" bg="#12504B" color="#fff">
        <Box textAlign={'center'}>
        <Text
          fontSize={{ base: "xl", lg: "4xl" }}
          fontWeight={"bold"}
          my={"4"}
          color={"#fff"}
        >
          Oil Spill Detection 
        </Text>
        </Box>
        <Center>
           
          <Box
            
            border="2px dashed #ccc"
            padding="40px"
            textAlign="center"
            cursor="pointer"
            maxWidth="400px"
            backgroundColor="#12504B"
            color="#fff"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Box
              w="300px"
              h={{ base: "150px", lg: "250px",md: "200px" }}
              mt={4}
            >
              {imagePreview ? (!resImgURL ? (
                <Image maxW="100%" maxH="100%" src={imagePreview} alt="Preview" />
              ) : (
                  <div>
                    <img src={resImgURL} alt="No Response-Img" style={{ margin: "2rem auto" }} />
                    <Button colorScheme="teal" mt={2} onClick={downloadResImage}>Download</Button>
                  </div>
              )) : (
                <>
                  <img src="/assets/Dropboxlogo.png" alt="No-Img" />
                  <Text textAlign="center" mt={2}>
                    Drag and drop your image here
                  </Text>
                </>
              )}
            </Box>
            <Text textAlign="center" mt={2}>
              Or
            </Text>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
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
                <p style={{ textAlign: "center", margin: "2rem 0" }}>
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
            {/* {resImgURL && (
              <div>
                <img
                  src={resImgURL}
                  alt="No Response-Img"
                  style={{ margin: "2rem auto" }}
                />
              </div>
            )} */}
            <LoadingSpinner isOpen={loading} />
          </Box>
        </Center>
      </Box>
   
  );
};

export default OilSpillDetector;
