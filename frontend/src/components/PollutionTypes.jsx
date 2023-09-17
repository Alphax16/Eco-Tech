import { Box, Flex, Text, Center,useColorModeValue,Image,useMediaQuery,Stack, Heading } from "@chakra-ui/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

const PollutionTypes = () => {

  
  return (
    <Box bg="url('/assets/pollution_green.jpg')" bgPos={'center'} bgRepeat={'no-repeat'}  backgroundSize="cover">
   {/* <Box bg={''}>  */}

      <HorizontalScrollCarousel />
    
    </Box>
  );
};

const HorizontalScrollCarousel = () => {
  const [isLargeScreen] = useMediaQuery("(max-width: 1024px)");
  const [isExtraLargeScreen] = useMediaQuery("(min-width: 1280px)");

    const MotionBox = motion(Box);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, isLargeScreen ? 1 : 2], ["1%","-96%"]);


  return (
    <Box pos="relative" ref={targetRef}  h={{base:'180vh' ,lg:"140vh"}} >
        <Center py={'5'}>
          <Text fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }} color={'#fff'} fontWeight={'bold'}>
    Types of Pollution
    </Text>
  </Center>
      <Flex pos="sticky" top="0" h="60%" align="center" overflow="hidden">
        <MotionBox style={{ x }} display="flex" gap="4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </MotionBox>
      </Flex>
    </Box>
  );
};

const Card = ({ card }) => {
  return (
    <Box
      key={card.id}
      h="450px"
      w="450px"
      overflow="hidden"
      bg="neutral.200"
      pos="relative"
      className="group"
    >
      <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Nice Chair, pink
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
    </Box>
  );
};

export default PollutionTypes;

const cards = [
  {
    url: IMAGE,
    title: "Title 1",
    id: 1,
  },
  {
    url: IMAGE,
    title: "Title 2",
    id: 2,
  },
  {
    url: IMAGE,
    title: "Title 3",
    id: 3,
  },
  {
    url: IMAGE,
    title: "Title 4",
    id: 4,
  },
  {
    url: IMAGE,
    title: "Title 5",
    id: 5,
  },

];
