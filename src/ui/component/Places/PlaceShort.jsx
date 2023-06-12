import { Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function PlaceShort() {
  return (
    <Link to="/place">
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
          Pantai Kuta
        </Text>
      </HStack>
    </Link>
  );
}
