import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Category() {
  return (
    <Link to="/categories">
      <Box
        width="200px"
        height="200px"
        borderRadius="27px"
        overflow="hidden"
        backgroundImage={require("../../../assets/images/beautiful.jpg")}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          Pantai
        </Text>
      </Box>
    </Link>
  );
}