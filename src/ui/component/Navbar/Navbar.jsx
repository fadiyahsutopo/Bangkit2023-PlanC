import {
  Box,
  Flex,
  Spacer,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <Box bg="#180E55" py={4} px={6} color="white">
      <Flex alignItems="center">
        <Link to={"/"}>
          <Heading size="md">Plan C</Heading>
        </Link>
        <InputGroup maxW="sm" mr={4} ml={10}>
          <Input placeholder="Search..." />
          <InputRightElement>
            <Button colorScheme="#180E55" size="sm">
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <HStack gap={"10px"}>
          <Link to={"/"}>
            <Button colorScheme="whiteAlpha">Home</Button>
          </Link>
          <Link to={"/fyt"}>
            <Button colorScheme="whiteAlpha">FYT</Button>
          </Link>
          <Button colorScheme="whiteAlpha">Profile</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
