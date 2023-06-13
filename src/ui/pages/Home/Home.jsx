import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Hero } from "../../component/Hero/Hero";
import { LongCard } from "../../component/LongCard/LongCard";
import { Category } from "../../component/Categories/Category";
import React, { useEffect, useState } from "react";

export function Home() {
  const [categoriesData, setCategoriesData] = useState(null);
  const [recommendationData, setRecommendationsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "http://34.30.121.154:5000/categories",
          "http://34.30.121.154:5000/recommend/12/2",
        ];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const jsonDatas = await Promise.all(
          responses.map((response) => response.json())
        );

        setCategoriesData(jsonDatas[0]);
        console.log(jsonDatas[0]);
        setRecommendationsData(jsonDatas[1]);
        console.log(jsonDatas[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
        <HStack mb={10} spacing={10}>
          {categoriesData && (
            <>
              {categoriesData.map((item) => (
                <Category type={item.types} photo={item.photos} />
              ))}
            </>
          )}
        </HStack>
        <Text fontWeight={"bold"}>Our Recommendations</Text>
        {recommendationData && (
          <HStack alignItems={"flex-start"} spacing={10}>
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
        <Text fontWeight={"bold"} mt={10}>
          Near You
        </Text>
        <HStack alignItems={"flex-start"} spacing={10}>
          <LongCard />
          <LongCard />
        </HStack>
      </VStack>
    </Box>
  );
}
