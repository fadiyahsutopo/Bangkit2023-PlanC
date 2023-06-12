import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box bg="gray.200" py={4} px={6} mt={20}>
      <Text textAlign="center" fontSize="sm">
        © 2023 PlanC. All rights reserved.
      </Text>
    </Box>
  );
}
