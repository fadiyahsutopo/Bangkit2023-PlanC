import { Box, Image, Text } from '@chakra-ui/react';

export function Category() {
  return (
    <Box width="200px" 
    height="200px" 
    borderRadius="27px" 
    overflow="hidden" 
    backgroundImage={require('../../../assets/images/beautiful.jpg')}
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundPosition="center"
    backgroundRepeat="no-repeat">
      
        <Text fontWeight="bold" fontSize="25pt" mb="2" color="white">
          Pantai
        </Text>
      
    </Box>
  );
}

