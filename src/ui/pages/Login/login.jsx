import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login dengan username:", loginUsername);
    console.log("Password:", loginPassword);

    const payload = {
      username: loginUsername,
      password: loginPassword,
    };

    fetch("http://34.173.237.22:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        // Save the access token and user ID to cookies
        Cookies.set("access_token", data.access_token);
        Cookies.set("user_id", data.user_id.toString());
        navigate("/");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        toast.error("Login Failed!");
      });
  };

  const handleSignUp = () => {
    toast.warning("Feature not yet implemented!");
    console.log("Sign up dengan input manual");
    console.log("Username:", signupUsername);
    console.log("Email:", signupEmail);
    console.log("Password:", signupPassword);
  };

  return (
    <Box
      p={4}
      textAlign="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
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
