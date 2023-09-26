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
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
      linkTo: "/models/water-potability-predictor"
    },
    {
      title: "Oil Spill Detection",
      imageSrc: "assets/OilSpill.jpg",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
      linkTo: "/models/oil-spill-detector"
    },
    {
      title: "Noise Pollution Detection",
      imageSrc: "assets/NoisePollution.jpg",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
      linkTo: "/models/noise-pollution-detector"
    },
  ];

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
