import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Hero } from "../../component/Hero/Hero";
import { LongCard } from "../../component/LongCard/LongCard";
import { Category } from "../../component/Categories/Category";

export function Home() {
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
          <Category />
        </HStack>
        <Text fontWeight={"bold"}>Our Reccomendations</Text>
        <HStack alignItems={"flex-start"} spacing={10}>
          <LongCard />
        </HStack>
        <Text fontWeight={"bold"} mt={10}>
          Near You
        </Text>
        <HStack alignItems={"flex-start"} spacing={10}>
          <LongCard />
        </HStack>
      </VStack>
    </Box>
  );
}
