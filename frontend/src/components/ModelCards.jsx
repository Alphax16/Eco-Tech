// ModelCards.js
import React from 'react';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Cards from './Cards';


const ModelCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardData = [
    {
      title: "Water Potability Prediction",
      imageSrc: "assets/waterpollution.jpg",
      description: `The AI model focuses upon analyzing water samples to ensure safety for consumption. Machine learning assesses pH, turbidity, and minerals, aiding public health decisions.`,
      linkTo: "/models/water-potability-predictor"
    },
    {
      title: "Oil Spill Detection",
      imageSrc: "assets/OilSpill.jpg",
      description: `Its and Image Processing AI Model for detecting oil spills, safeguarding marine environments. Utilizes innovative methods to ensure prompt response and containment.`,
      linkTo: "/models/oil-spill-detector"
    },
    {
      title: "Noise Pollution Detection",
      imageSrc: "assets/NoisePollution.jpg",
      description: `A classic Mathematical approach based algorithm for detecting Noise Pollution levels using Audio Processing and then classifying it as a category of 'Noise' depending upon the region and time`,
      linkTo: "/models/noise-pollution-detector"
    },
    {
      title: "Fire Detection",
      imageSrc: "assets/fire.png",
      description: `State-of-the-art fire detection systems for early and accurate fire alerts. Utilizes AI and image processing for rapid response, minimizing damage and ensuring safety.`,
      linkTo: "/models/fire-detector"
    },
  ]
  

  return (
    <Box py={'16'} ref={ref} bg={'#12504B'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading py={'4'} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={'white'}>
          AI Models
        </Heading>
        <Text color={'white'} fontSize={{ base: 'sm', sm: 'lg' }}>
          These are the Machine Learning Models that will help us understand better about ecotech what we are doing wrong and what can be improved
        </Text>
      </Stack>

      <Cards cardData={cardData} />
    </Box>
  );
};

export default ModelCards;
