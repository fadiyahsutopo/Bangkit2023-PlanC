import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function LongCard(props) {
  return (
    <>
      <Link to={`/place/${props.placeID}`}>
        <Box
          minWidth="600px"
          height="200px"
          borderRadius="27px"
          overflow="hidden"
          backgroundImage={props.photos}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
            {props.placeName}
          </Text>
        </Box>
      </Link>
    </>
  );
}
