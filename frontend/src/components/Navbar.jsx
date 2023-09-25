import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, useDisclosure, Stack, Image, useToast, } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import { useEffect, useState, useRef } from "react";


const Links = [
    { name: "Home", path: "/" }, // Define routes and names
    { name: "Maps", path: "/forest-map" },
    { name: "Statistics", path: "/statistics" },
    { name: "Visualizations", path: "/visualizations" },
    // { name: 'ML Models', path: '/models' },
    { name: "ML Models", path: "/models" },
    { name: "Quiz", path: "/quiz" },
];

const Navbar = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation(); // Get the current route
    const [activeLink, setActiveLink] = useState("/"); // Initialize with the default route
    const [fact, setFact] = useState();
    const updateActiveLink = () => {
    const currentPath = location.pathname;
    setActiveLink(currentPath);
    };

    useEffect(() => {
    updateActiveLink();
    }, [location]);

    const getRandomFact = () => {
    console.log("clicked");
    fetch("/facts.json")
        .then((response) => response.json())
        .then((data) => {
        setFact(sufflefact(data));
        console.log(data);
        })
        .catch((error) => console.error("Error loading quiz data:", error));
    };

    const sufflefact = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    toast({
        title: data[randomIndex].fact,

        isClosable: true,
    });
    };

    return (
    <>
        <Box
        bg={"transparent"}
        className="navbox"
        px={{ lg: "32", md: "4", base: "4" }}
        position={"absolute"}
        zIndex={"100"}
        top={"0"}
        right={"0"}
        left={"0"}
        >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
            size={"sm"}
            icon={
                isOpen ? (
                <AiOutlineCloseCircle fontSize={"32"} />
                ) : (
                <GiHamburgerMenu fontSize={"32"} />
                )
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            bg={"gray.200"}
            onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
            <HStack
                as={"nav"}
                fontWeight={"bold"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
            >
                {Links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    style={{
                    textDecoration: "none",
                    backgroundColor:
                        activeLink === link.path ? "#C1E836" : "transparent",
                    color: activeLink === link.path ? "black" : "#fff",
                    padding: activeLink === link.path ? "5px" : "auto",
                    borderRadius: activeLink === link.path ? "20px" : "0px",
                    }}
                >
                    {link.name}
                </Link>
                ))}
            </HStack>
            </HStack>
            <Flex alignItems={"center"}>
            <Menu>
                <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                onClick={getRandomFact}
                minW={0}
                >
                <Avatar className="facts" size={"sm"} src={"assets/idea.png"} />
                </MenuButton>
            </Menu>
            </Flex>
        </Flex>

        {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    style={{
                    textDecoration: "none",
                    backgroundColor:
                        activeLink === link.path ? "#C1E836" : "transparent",
                    color: activeLink === link.path ? "black" : "#fff",
                    }}
                    p={2}
                    rounded={"md"}
                    _hover={{
                    textDecoration: "none",
                    backgroundColor: "#C1E836",
                    color: "black",
                    }}
                >
                    {link.name}
                </Link>
                ))}
            </Stack>
            </Box>
        ) : null}
        </Box>
    </>
    );
};

export default Navbar;
