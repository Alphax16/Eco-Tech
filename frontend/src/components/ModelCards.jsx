import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  
  Center,

  
  
  Avatar,
  
  Image,

} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const MotionCenter = motion(Center);


const ModelCards = () => {
  return (
    <Box py={'16'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading py={'4'} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          ML Models
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          These are the Machine Learning Models that will help us understand better about ecotech what we are doing wrong and waht can be improved
        </Text>
      </Stack>

      <Container maxW={'90%'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
        <MotionCenter py={6}  initial={{  x: "-70vw" }}
              animate={{  x: 0 }}
              
              transition={{ duration: 1, origin: 1, delay: 0.3 }}>
                <Link to="/model/WaterPotabilityPredictor">
      <Box
        maxW={'345px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              'assets/waterpollution.jpg'
            }
            
            alt="Example"
          />
        </Box>
        <Stack>
         
          <Heading
          
          
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
           Water Potability Predictor
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
       
      </Box>
      </Link>
    </MotionCenter>
    <MotionCenter py={6}  initial={{  x: "-70vw" }}
              animate={{  x: 0 }}
              
              transition={{ duration: 1, origin: 1, delay: 0.3 }}>
                <Link to="/model/oilSpillPredictor">
      <Box
        maxW={'345px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            fill
            alt="Example"
          />
        </Box>
        <Stack>
        
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
        
      </Box>
      </Link>
    </MotionCenter>
    <MotionCenter py={6}  initial={{  x: "-70vw" }}
              animate={{  x: 0 }}
              
              transition={{ duration: 1, origin: 1, delay: 0.3 }}>
      <Box
        maxW={'345px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            fill
            alt="Example"
          />
        </Box>
        <Stack>
          
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
        
      </Box>
    </MotionCenter>
    <MotionCenter py={6}  initial={{  x: "-70vw" }}
              animate={{  x: 0 }}
              
              transition={{ duration: 1, origin: 1, delay: 1 }}>
      <Box
        maxW={'345px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            fill
            alt="Example"
          />
        </Box>
        <Stack>
         
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
        
      </Box>
  </MotionCenter>
  <MotionCenter py={6}  initial={{  x: "-70vw" }}
              animate={{  x: 0 }}
              
              transition={{ duration: 1, origin: 1, delay: 1 }}>
      <Box
        maxW={'345px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            fill
            alt="Example"
          />
        </Box>
        <Stack>
          
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </Text>
        </Stack>
      
      </Box>
   </MotionCenter>

        </Flex>
      </Container>
    </Box>
  )
}

export default ModelCards