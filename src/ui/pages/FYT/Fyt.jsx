import { HStack, Image, VStack } from "@chakra-ui/react";
import Plus from "../../../assets/images/plus.svg";
import Camera from "../../../assets/images/camera.svg";
import { FYTPost } from "../../component/FYT/FYTPost";

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
      <VStack spacing={20} w={"full"}>
        <FYTPost />
        <FYTPost />
      </VStack>
    </>
  );
}
