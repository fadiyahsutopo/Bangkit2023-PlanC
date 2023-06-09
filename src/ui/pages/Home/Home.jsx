import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Hero } from "../../component/Hero/Hero";
import { LongCard } from "../../component/LongCard/LongCard";
import { Category } from "../../component/Categories/Category";


export function Home() {
    return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Hero />
      <VStack
        flex="1"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        pl={10}
        pt={20}
      >
        <HStack mb={10}>
          <Category />
        </HStack>
        <Text fontWeight={"bold"}>Our Reccomendations</Text>
        <HStack alignItems={"flex-start"}>
          
          <LongCard />
        </HStack>

        <Text fontWeight={"bold"}>Near You</Text>
        <HStack alignItems={"flex-start"} mt={5}>
          <LongCard />
        </HStack>
      </VStack>
    </Box>
    )
}