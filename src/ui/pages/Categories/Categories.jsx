import { SimpleGrid } from "@chakra-ui/react";
import { PlaceShort } from "../../component/Places/PlaceShort";

export function Categories() {
  return (
    <SimpleGrid columns={2} spacing={10} w="full" pt={20} pl={20}>
      <PlaceShort />
      <PlaceShort />
      <PlaceShort />
      <PlaceShort />
    </SimpleGrid>
  );
}
