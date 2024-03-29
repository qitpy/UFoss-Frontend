import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react'

function CheckoutForm(props) {
  const { totalAmount, handleCheckout } = props;
  return (
    <Box>
      <Flex direction='column'>
        <Text textTransform='capitalize' fontSize='1.125rem' fontWeight='500' color='#686f7a' marginBottom='0.5rem'>
          total:
        </Text>
        <Text fontSize='2.5rem' fontWeight='700' color='#29303b' marginBottom='0.5rem'>
          ${totalAmount}
        </Text>
        <Box >
          <Button width='100%' height='3.5rem' color='#fff' colorScheme='red' onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default CheckoutForm
