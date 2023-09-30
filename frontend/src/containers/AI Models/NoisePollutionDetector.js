import React, { useState, useRef } from "react";
import { Box, Button, Text, Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import AudioVisualizer from "../../components/AudioVisualizer";
import Swal from "sweetalert2";

const NoisePollutionDetector = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRecorderRef = useRef(null);
  const [showRecording, setShowRecording] = useState(true);
  const [showFileInput, setShowFileInput] = useState(true);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [year, setYear] = useState("");
  const [ampm, setAmPm]= useState("");
  const [areaType, setareaType]= useState("");
  
  const generateHourOptions = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, "0"));
    }
    return hours;
  };

  const generateMinuteOptions = () => {
    const minutes = [];
    for (let i = 0; i <= 59; i++) {
      minutes.push(i.toString().padStart(2, "0"));
    }
    return minutes;
  };



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
    const selectedDate = `${hour}:${minute} ${ampm}`;
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append('areaType', areaType)
      formData.append('dayTime', selectedDate)

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
        Swal.fire({
          title: response.data.url,
  
          icon: "success",
        }); 
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
         <Box textAlign={'center'}>
        <Text
          fontSize={{ base: "xl", lg: "4xl" }}
          fontWeight={"bold"}
          my={"4"}
          color={"#fff"}
        >
          Noise Pollution Detection
        </Text>
        </Box>
      <Flex direction="column" align="center">
        <Flex>
      <Box>
        <Select

          placeholder="Hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          color={'black'}
          background={'white'}
          
        >
          {generateHourOptions().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </Box>
      <Box mx={2}>
        <Select
          placeholder="Minute"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          color={'black'}
          background={'white'}
        >
          {generateMinuteOptions().map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </Box>
      <Box mx={2}>
        <Select
          placeholder="Time of day"
          value={ampm}
          onChange={(e) => setAmPm(e.target.value)}
          color={'black'}
          background={'white'}
        >
         
            <option value='am'>
              AM
            </option>
            <option value='pm'>
              PM
            </option>
        
        </Select>
      </Box>
      </Flex>
      <Box mx={2} my={'2'}>
        <Select
          placeholder="Area "
          value={areaType}
          onChange={(e) => setareaType(e.target.value)}
          color={'black'}
          background={'white'}
        >
         
            <option value='industrial'>
            Industrial
            </option>
            <option value='commercial'>
            Commercial
            </option>
            <option value='residential'>
            Residential
            </option>
        </Select>
      </Box>
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
           
          </>
        )}
        
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: "2px dashed #ccc",
            padding: "20px",
            marginTop: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
          
        >
           <Button
              colorScheme="teal"
              my={6}
              onClick={() => {
                setShowRecording(false);
                document.querySelector('input[type="file"]').click();
              }}
            >
              Choose Audio File
            </Button>
          Drag and drop an audio file here
        </div>
        {audioBlob && <AudioVisualizer link={URL.createObjectURL(audioBlob)} />}
        {audioBlob && (
          <Button colorScheme="teal" onClick={handleUpload} mt={2}>
            Upload Audio
          </Button>
        )}
        {/* {audioBlob && ( 
          <Button colorScheme="teal" onClick={handleDetect} mt={2}>
            Detect
          </Button>
        )} */}
      </Flex>
    </Box>
  );
};

export default NoisePollutionDetector;
