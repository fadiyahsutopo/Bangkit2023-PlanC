import { Box, Image, Text } from '@chakra-ui/react';

function LongCard() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src="https://example.com/your-image.jpg" alt="Card Image" />
      <Box p="4">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          Card Title
        </Text>
      </Box>
    </Box>
  );
}

export default LongCard;
