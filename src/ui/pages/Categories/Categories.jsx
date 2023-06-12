import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";

export function Categories() {
  return (
    <SimpleGrid columns={2} spacing={10} w="full" pt={20} pl={20}>
      <HStack gap={10}>
        <Box
          width="200px"
          height="200px"
          borderRadius="27px"
          overflow="hidden"
          backgroundImage={require("../../../assets/images/beautiful.jpg")}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        ></Box>
        <Text fontWeight="bold" fontSize="25pt" mb="2">
          Pantai
        </Text>
      </HStack>
      <HStack gap={10}>
        <Box
          width="200px"
          height="200px"
          borderRadius="27px"
          overflow="hidden"
          backgroundImage={require("../../../assets/images/beautiful.jpg")}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        ></Box>
        <Text fontWeight="bold" fontSize="25pt" mb="2">
          Pantai
        </Text>
      </HStack>
      <HStack gap={10}>
        <Box
          width="200px"
          height="200px"
          borderRadius="27px"
          overflow="hidden"
          backgroundImage={require("../../../assets/images/beautiful.jpg")}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        ></Box>
        <Text fontWeight="bold" fontSize="25pt" mb="2">
          Pantai
        </Text>
      </HStack>
    </SimpleGrid>
  );
}
