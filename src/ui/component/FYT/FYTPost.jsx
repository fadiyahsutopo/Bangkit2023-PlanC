import { Text, VStack, Image } from "@chakra-ui/react";
import Beautiful from "../../../assets/images/beautiful.jpg";

export function FYTPost() {
  return (
    <>
      <VStack w="full">
        <VStack w="80%">
          <Text alignSelf={"flex-start"} fontWeight={"bold"} fontSize={"30px"}>
            salsaselasa
          </Text>
          <Image src={Beautiful} w="full" />
        </VStack>
      </VStack>
    </>
  );
}
