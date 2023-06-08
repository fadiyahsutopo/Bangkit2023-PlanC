import { Box, Text, Link } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box bg="gray.200" py={4} px={6}>
      <Text textAlign="center" fontSize="sm">
        © 2023 My App. All rights reserved. | Built with{' '}
        <Link color="teal.500" href="https://chakra-ui.com" isExternal>
          Chakra UI
        </Link>
      </Text>
    </Box>
  );
}
