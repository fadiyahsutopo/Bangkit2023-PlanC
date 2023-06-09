import { VStack, Text } from '@chakra-ui/react'
import React from 'react'

export function Hero ()  {
  return (
    <>
    <VStack w="full" height={'90vh'} backgroundImage='https://images.unsplash.com/photo-1589271755419-b813a577ad42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1809&q=80'>
        < VStack   
        width="100%"
        height="100%"
        backgroundColor="blackAlpha.600"
        justifyContent={'center'}
        >
                  <Text fontSize={'48px'} fontWeight={'800'} w='50%' color='white'>QUOTES BIJAK QUOTES BIJAK  QUOTES BIJAK  QUOTES BIJAK  QUOTES BIJAK </Text>
        </VStack>
    </VStack>
    </>
  )
}
