import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = () => {
    console.log("Login dengan username:", loginUsername);
    console.log("Password:", loginPassword);
  };

  const handleSignUp = () => {
    console.log("Sign up dengan input manual");
    console.log("Username:", signupUsername);
    console.log("Email:", signupEmail);
    console.log("Password:", signupPassword);
  };

  return (
    <Box p={4} textAlign="center">
      <Box
        display="inline-block"
        p={4}
        border="2px solid purple"
        borderRadius="md"
        bg="white"
      >
        <Box fontSize="2xl" fontWeight="bold" mb={4}>
          {isSignUp ? "Sign Up" : "Login"}
        </Box>
        <VStack spacing={4} width="300px" mx="auto">
          {isSignUp ? (
            <>
              <FormControl id="signup-username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setSignupUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="signup-email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="signup-password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="purple" onClick={handleSignUp}>
                Sign Up
              </Button>
              <Button
                colorScheme="purple"
                variant="link"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <FormControl id="login-username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="login-password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="purple" onClick={handleLogin}>
                Log In
              </Button>
              <Button
                colorScheme="purple"
                variant="link"
                onClick={() => setIsSignUp(true)}
              >
                Don't have an account? Sign Up
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
