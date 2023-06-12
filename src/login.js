import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
  } from "@chakra-ui/react";
  
  function App() {
    return (
      <Box p={4}>
        <VStack spacing={4} width="300px" mx="auto">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="username" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="teal">Log In</Button>
        </VStack>
      </Box>
    );
  }
  
  export default App;
  