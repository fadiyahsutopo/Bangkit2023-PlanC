import { Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function PlaceShort(props) {
  return (
    <Link to={`/place/${props.id}`}>
      <HStack gap={10}>
        <Box
          width="200px"
          height="200px"
          borderRadius="27px"
          overflow="hidden"
          backgroundImage={props.photo}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        ></Box>
        <Text fontWeight="bold" fontSize="25pt" mb="2">
          {props.name}
        </Text>
      </HStack>
    </Link>
  );
}
