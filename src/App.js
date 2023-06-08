import Category from "./ui/component/Categories/Category";
import { Footer } from "./ui/component/Footer/Footer";
import Hero from "./ui/component/Hero/Hero";
import LongCard from "./ui/component/LongCard/LongCard";
import { Navbar } from "./ui/component/Navbar/Navbar";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
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
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Our Reccomendations</Text>
          <LongCard />
        </VStack>
        <VStack alignItems={"flex-start"} mt={5}>
          <Text fontWeight={"bold"}>Near You</Text>
          <LongCard />
        </VStack>
      </VStack>
      <Footer />
    </Box>
  );
}

export default App;
