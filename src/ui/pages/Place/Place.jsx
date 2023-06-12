import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import Beautiful from "../../../assets/images/beautiful.jpg";

export function Place() {
  return (
    <VStack
      border="2px solid black"
      borderRadius={"30px"}
      w="80%"
      p="10"
      mt="20"
    >
      <HStack w="full" alignItems={"flex-start"} mb={10}>
        <Image src={Beautiful} w="50%" borderRadius={"30px"} mr={5} />
        <VStack fontSize={"40px"} alignItems={"flex-start"} h="full">
          <Text>Pantai Kuta</Text>
          <Text>Rating</Text>
          <Text>Detail</Text>
        </VStack>
      </HStack>
      <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Text>Description</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra
          ex dui, quis elementum lectus mollis id. Integer eget dignissim
          mauris. Proin hendrerit velit nec enim rutrum volutpat. Vivamus tempor
          tincidunt nunc convallis rhoncus. Donec rutrum nisl ac nisl luctus,
          nec venenatis tortor pellentesque. Phasellus non nibh laoreet, posuere
          odio in, gravida sapien. Morbi eleifend sollicitudin quam ac rutrum.
          Sed ut facilisis metus. Nam at viverra risus. Sed id blandit sem, nec
          mollis lorem. Fusce efficitur, nibh et malesuada ornare, dolor mauris
          imperdiet risus, a maximus eros felis molestie ligula. Curabitur
          cursus vestibulum vestibulum. Sed tristique lacus sem, a commodo justo
          consequat non. Fusce at justo vitae felis pharetra egestas eget eu
          nisi. Phasellus convallis, arcu at cursus aliquet, justo augue
          scelerisque arcu, in lobortis augue ipsum a ante. Duis fermentum
          dignissim tellus sed laoreet. Aliquam lectus enim, gravida et quam
          sed, euismod lobortis purus. Donec in quam vitae urna scelerisque
          ultricies non et purus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque varius risus et magna commodo euismod.
          Curabitur blandit urna in nisl egestas bibendum vitae eu orci.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
          dignissim vehicula erat, ac scelerisque ligula posuere in. Aliquam
          sodales ultricies mauris a porta. Quisque a scelerisque arcu. Nam in
          vehicula nisi, eget dapibus sem. Morbi laoreet, justo in dapibus
          porttitor, nisi augue gravida ligula, nec ultricies elit ligula in
          sem. Morbi pretium quam et mauris pharetra auctor. Fusce et blandit
          massa. Donec tincidunt, justo a consequat elementum, dui justo
          tincidunt justo, eu lobortis metus nisi non nulla. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam auctor vel massa eu
          pretium. Morbi pellentesque purus sem, viverra lobortis nisl dignissim
          in. Phasellus eget varius lacus. Aliquam imperdiet risus leo, nec
          lacinia urna accumsan suscipit.
        </Text>
      </VStack>
    </VStack>
  );
}
