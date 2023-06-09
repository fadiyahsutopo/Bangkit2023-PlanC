import { Box, Text, VStack } from "@chakra-ui/react";

export function Fyt() {
    return (
    <Box minHeight="100vh" maxWidth="60%" 
    display="flex" flexDirection="column" 
    justifyContent="center" alignItems="center">
      <VStack
        flex="1"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        pl={10}
        pt={20}
      >
    
        <Text fontWeight="bold" fontSize="xl" mb="2">
                salsaselasa
        </Text>
        <Box p="4"
            borderRadius="27px" 
            overflow="hidden" 
            backgroundImage={require('../../../assets/images/beautiful.jpg')}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover">
        </Box>
      </VStack>
    </Box>
    )
}