import { Container, Heading } from '@chakra-ui/react';
import React from 'react';

const NotFound = () => {
  return (
    <Container bgColor="white">
      <Heading color="red.400" textAlign="center" mt="5rem">
        404 Not Found!!
      </Heading>
    </Container>
  );
};

export default NotFound;
