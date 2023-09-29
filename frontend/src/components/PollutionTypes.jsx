import { Box, Flex, Text, Center,useColorModeValue,Image,useMediaQuery,Stack, Heading } from "@chakra-ui/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const IMAGE = "/assets/Pollution Types Images/Slate Background Image.jpg"


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
      h="600px"
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
            src={card.url}
            alt="/"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text> */}
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {card.title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            {/* <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}
            <Text color={'gray.600'}>
              {card.desc}
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
    id: 1,
    url: "/assets/Pollution Types Images/Air Pollution.jpg",
    title: "Air Pollution",
    desc: `Air pollution is the presence of harmful particles and gases in the atmosphere, from human activities like industry and transportation, which poses risks and damages the environment.`,
  },
  {
    id: 2,
    url: "/assets/Pollution Types Images/Water Pollution.jpg",
    title: "Water Pollution",
    desc: `Water pollution is the contamination of water bodies, such as rivers and oceans, by chemicals, sewage, and waste, harming aquatic life and threatening human health`,
  },
  {
    id: 3,
    url: "/assets/Pollution Types Images/Land Pollution.jpg",
    title: "Land Pollution",
    desc: `Land pollution is the degradation of the Earth's surface due to the accumulation of harmful chemicals, waste, and contaminants, impacting soil quality, ecosystems, and human health`,
  },
  {
    id: 4,
    url: "/assets/Pollution Types Images/Noise Pollution.jpg",
    title: "Noise Pollution",
    desc: `Noise pollution is the excessive, disruptive presence of sound in the environment, often caused by traffic, industry, and construction, leading to stress and health problems`,
  },
  {
    id: 5,
    url: "/assets/Pollution Types Images/Radioactive Pollution.jpg",
    title: "Radioactive Pollution",
    desc: `Radioactive pollution results from the release of radioactive materials, like nuclear accidents or improper disposal, posing severe health risks and environmental contamination`,
  },

];
