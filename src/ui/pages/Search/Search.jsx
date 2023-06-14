import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { PlaceShort } from "../../component/Places/PlaceShort";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";

export function Search() {
  const { query } = useParams();
  console.log(query);

  const [searchData, setsearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/search/${query}`);
        const jsonData = await response.json();
        setsearchData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <SimpleGrid columns={2} spacing={10} w="full" pt={20} pl={20}>
      {searchData && (
        <>
          {searchData.map((item) => (
            <PlaceShort
              id={item.place_id}
              name={item.place_name}
              photo={item.photos}
            />
          ))}
        </>
      )}
    </SimpleGrid>
  );
}
