import { HStack, VStack, Box, Spinner, Button } from "@chakra-ui/react";
import { FYTPost } from "../../component/FYT/FYTPost";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export function Fyt() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fytData, setfytData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchDataNotLogin = async () => {
      try {
        const response = await fetch(`http://34.173.237.22:5000/fyt`);
        const jsonData = await response.json();
        setfytData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDataLogin = async () => {
      try {
        const response = await fetch(
          `http://34.173.237.22:5000/fyt/${Cookies.get("user_id")}`
        );
        const jsonData = await response.json();
        setfytData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (Cookies.get("access_token")) {
      console.log("Logged in");
      fetchDataLogin();
      setIsLoggedIn(true);
    } else {
      fetchDataNotLogin();
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);
      axios
        .post(
          `http://34.173.237.22:5000/upload/${Cookies.get("user_id")}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Image uploaded successfully");
          console.log(response);
          toast.success("File uploaded!");
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle error
          console.error("Image upload failed:", error);
          toast.error("File cannot be uploaded!");
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Box mt={5} />
      {isLoggedIn && (
        <HStack
          justifyContent={"flex-end"}
          alignItems={"center"}
          w="full"
          p="5"
          mr="10"
          spacing={"5"}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button colorScheme="blue" onClick={handleImageUpload}>
            Upload Image
          </Button>
        </HStack>
      )}
      <VStack spacing={20} w={"full"}>
        {fytData && (
          <>
            {fytData.map((item) => (
              <FYTPost title={item.username} photo={item.photos} />
            ))}
          </>
        )}
      </VStack>
    </>
  );
}
