import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Category(props) {
  return (
    <Link to={`/category/${props.type}`}>
      <Box
        width="200px"
        height="200px"
        borderRadius="27px"
        overflow="hidden"
        backgroundImage={props.photo}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          {props.type}
        </Text>
      </Box>
    </Link>
  );
}
