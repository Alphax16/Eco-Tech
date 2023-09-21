import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";


const OilSpillDetector = () => {
  const [file, setFile] = useState(null);
  const [resImgURL, setResImgURL] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

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
      setResImgURL(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box p={"16"}>
      <form onSubmit={handleSubmit}>
        {!file ? <span>Upload a file</span> : file.name}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button type="submit">Upload</Button>
      </form>
      {
        resImgURL &&
        (<img src={resImgURL} alt='No Response-Img' />)
      }
    </Box>
  );
};

export default OilSpillDetector;
