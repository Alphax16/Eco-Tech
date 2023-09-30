import React, { useState, useRef } from "react";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import AudioVisualizer from "../../components/AudioVisualizer";


const NoisePollutionDetector = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRecorderRef = useRef(null);
  const [showRecording, setShowRecording] = useState(true);
  const [showFileInput, setShowFileInput] = useState(true);

  const startRecording = async () => {
    setIsRecording(true);
    setShowFileInput(false);
  
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      if (audioRecorderRef.current) {
        audioRecorderRef.current.stop();
      }
  
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mediaRecorder = new MediaRecorder(mediaStream);
  
      const audioChunks = [];
  
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };
  
      mediaRecorder.onstop = () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
  
        audioContext.close();
      };
  
      const audioSource = audioContext.createMediaStreamSource(mediaStream);
      audioSource.connect(audioContext.destination);
  
      mediaRecorder.start();
      audioRecorderRef.current = mediaRecorder;
    } catch (err) {
      console.error("Error accessing the microphone:", err);
    }
  };
  
  
  
  

  const stopRecording = () => {
    audioRecorderRef.current.stop();
  };

  const handleUpload = async () => {
    
      const formData = new FormData();
      formData.append("audio", audioBlob);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/ai/noise-pollution-detector",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Audio uploaded:", response.data);
        alert(response.data.success);
      } catch (err) {
        console.error("Error uploading audio:", err);
      }
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type.startsWith("audio/")) {
      setAudioBlob(file);
    } else {
      alert("Unsupported file type. Please upload an audio file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.type.startsWith("audio/")) {
      setAudioBlob(file);
    } else {
      alert("Unsupported file type. Please upload an audio file.");
    }
  };

  const handleDetect = () => {
    return;
  };

  return (
    <Box p={32} h="max-content" bg="#12504B" color="#fff">
      <Flex direction="column" align="center">
       
        {showRecording && isRecording && (
          <>
            <Button colorScheme="red" onClick={stopRecording} mt={2}>
              Stop Recording
            </Button>
            
          </>
        )}
        {showFileInput && (
          <>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              colorScheme="teal"
              mt={2}
              onClick={() => {
                setShowRecording(false);
                document.querySelector('input[type="file"]').click();
              }}
            >
              Choose Audio File
            </Button>
          </>
        )}
        {!showRecording && !showFileInput && audioBlob && (
          <Button colorScheme="teal" onClick={handleUpload} mt={2}>
            Upload Audio
          </Button>
        )}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            marginTop: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Drag and drop an audio file here
        </div>
        {audioBlob && <AudioVisualizer link={URL.createObjectURL(audioBlob)} />}
        {audioBlob && (
          <Button colorScheme="teal" onClick={handleDetect} mt={2}>
            Detect
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default NoisePollutionDetector;
