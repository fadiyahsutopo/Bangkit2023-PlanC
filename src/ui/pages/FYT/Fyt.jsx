import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import Plus from "../../../assets/images/plus.svg";
import Camera from "../../../assets/images/camera.svg";
import Beautiful from "../../../assets/images/beautiful.jpg";

export function Fyt() {
  return (
    <>
      <HStack
        justifyContent={"flex-end"}
        alignItems={"center"}
        w="full"
        p="5"
        mr="10"
        spacing={"5"}
      >
        <Image src={Plus} />
        <Image src={Camera} />
      </HStack>
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
