import { HStack, VStack, Box, Spinner, Button } from "@chakra-ui/react";
import { FYTPost } from "../../component/FYT/FYTPost";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Fyt() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fytData, setfytData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
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
      const formData = new FormData();
      formData.append("image", selectedImage);

      axios
        .post("http://34.173.237.22:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle successful response
          console.log("Image uploaded successfully");
          console.log(response);
        })
        .catch((error) => {
          // Handle error
          console.error("Image upload failed:", error);
        });
    }
  };

  return (
    <>
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
