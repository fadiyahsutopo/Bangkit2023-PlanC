import { HStack, Image, Text, VStack, Box, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export function Place(props) {
  const { id } = useParams();
  console.log(id);

  const [placeData, setPlaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://34.30.121.154:5000/destination/${id}`
        );
        const jsonData = await response.json();
        setPlaceData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <VStack
      border="2px solid black"
      borderRadius={"30px"}
      w="80%"
      p="10"
      mt="20"
    >
      {placeData && (
        <>
          <HStack w="full" alignItems={"flex-start"} mb={10}>
            <Image
              src={placeData[0].photos}
              w="50%"
              borderRadius={"30px"}
              mr={5}
            />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"32px"} fontWeight={"bold"}>
                {placeData[0].place_name}
              </Text>
              <Text fontSize={"24px"}>Rating: {placeData[0].rating}</Text>
              <Text fontSize={"24px"}>{placeData[0].address}</Text>
            </VStack>
          </HStack>
          <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
            <Text>{placeData[0].description}</Text>
          </VStack>
        </>
      )}
    </VStack>
  );
}
