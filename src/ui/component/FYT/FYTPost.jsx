import { Text, VStack, Image } from "@chakra-ui/react";

export function FYTPost(props) {
  return (
    <>
      <VStack w="full">
        <VStack w="80%">
          <Text alignSelf={"flex-start"} fontWeight={"bold"} fontSize={"30px"}>
            {props.title}
          </Text>
          <Image src={props.photo} w="full" />
        </VStack>
      </VStack>
    </>
  );
}
