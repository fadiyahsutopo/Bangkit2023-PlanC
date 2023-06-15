import { Box, HStack, Text, VStack, Spinner } from "@chakra-ui/react";
import { Hero } from "../../component/Hero/Hero";
import { LongCard } from "../../component/LongCard/LongCard";
import { Category } from "../../component/Categories/Category";
import React, { useEffect, useState } from "react";

export function Home() {
  const [categoriesData, setCategoriesData] = useState(null);
  const [recommendationData, setRecommendationsData] = useState(null);
  const [nearYouData, setNearYouData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "http://34.173.237.22:5000/categories",
          "http://34.173.237.22:5000/recommend/12/5",
          "http://34.173.237.22:5000/nearest",
        ];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const jsonDatas = await Promise.all(
          responses.map((response) => response.json())
        );

        setCategoriesData(jsonDatas[0]);
        console.log(jsonDatas[0]);
        setRecommendationsData(jsonDatas[1]);
        console.log(jsonDatas[1]);
        setNearYouData(jsonDatas[2]);
        console.log(jsonDatas[2]);
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

  return (
    <Box minHeight="100vh" display="flex" width={"full"} flexDirection="column">
      <Hero />
      <VStack
        flex="1"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        pl={10}
        pt={20}
      >
        <Box overflowX="auto" w="100%">
          {categoriesData && (
            <HStack mb={5} spacing={10}>
              {categoriesData.map((item) => (
                <Category
                  key={item.types}
                  type={item.types}
                  photo={item.photos}
                />
              ))}
            </HStack>
          )}
        </Box>
        <Text fontWeight={"bold"} mt={10}>
          Our Recommendations
        </Text>
        <Box overflowX="auto" w="100%">
          {recommendationData && (
            <HStack mb={5} alignItems={"flex-start"} spacing={10}>
              {recommendationData.map((item) => (
                <LongCard
                  key={item.place_id}
                  placeName={item.place_name}
                  photos={item.photos}
                  placeID={item.place_id}
                />
              ))}
            </HStack>
          )}
        </Box>
        <Text fontWeight={"bold"} mt={10}>
          Near You
        </Text>
        <Box overflowX="auto" w="100%">
          {nearYouData && (
            <HStack mb={5} alignItems={"flex-start"} spacing={10}>
              {nearYouData.map((item) => (
                <LongCard
                  key={item.place_id}
                  placeName={item.place_name}
                  photos={item.photos}
                  placeID={item.place_id}
                />
              ))}
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
