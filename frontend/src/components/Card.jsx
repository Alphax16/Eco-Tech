import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
//   Link,
  useColorModeValue,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

const Card = ({ title, imageSrc, description, linkTo }) => {
    return (
        <MotionBox
        py={6}
        initial={{ x: "-70vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, origin: 1, delay: 0.3 }}
        >
        <Link to={linkTo}>
            <Box
            maxW={'345px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
            >
            <Box h={'210px'} overflow={'hidden'} bg={'gray.100'} mt={-6} mx={-6} mb={6} display={'block'}>
                <Image src={imageSrc} width={'345px'} height={'230px'} alt="Example" />
            </Box>
            <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} width={'110%'} fontFamily={'body'}>
                {title}
            </Heading>
            <Text color={'gray.500'}>
                {description}
            </Text>
            </Box>
        </Link>
        </MotionBox>
    );
};
  

export default Card;
