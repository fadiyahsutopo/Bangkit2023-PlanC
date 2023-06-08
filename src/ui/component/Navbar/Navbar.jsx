import { Box, Flex, Spacer, Heading, Input, InputGroup, InputRightElement, Button, HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export function Navbar() {
  return (
    <Box bg="#180E55" py={4} px={6} color="white">
      <Flex alignItems="center">
        <Heading size="md">Plan C</Heading>
        <InputGroup maxW="sm" mr={4} ml={10}>
          <Input placeholder="Search..." />
          <InputRightElement>
            <Button colorScheme="#180E55" size="sm">
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <HStack gap={'10px'}>       
          <Button colorScheme="whiteAlpha">Home</Button>
          <Button colorScheme="whiteAlpha">About</Button>
          <Button colorScheme="whiteAlpha">Contact</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
