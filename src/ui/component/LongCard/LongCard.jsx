import { Box, Text } from "@chakra-ui/react";

export function LongCard() {
  return (
    <>
      <Box
        width="400px"
        height="200px"
        borderRadius="27px"
        overflow="hidden"
        backgroundImage={require("../../../assets/images/beautiful.jpg")}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          Pantai
        </Text>
      </Box>

      <Box
        width="400px"
        height="200px"
        borderRadius="27px"
        overflow="hidden"
        backgroundImage={require("../../../assets/images/beautiful.jpg")}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          Pantai
        </Text>
      </Box>

      <Box
        width="400px"
        height="200px"
        borderRadius="27px"
        overflow="hidden"
        backgroundImage={require("../../../assets/images/beautiful.jpg")}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          Pantai
        </Text>
      </Box>
    </>
  );
}
