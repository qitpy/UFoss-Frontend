import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaAngleRight } from 'react-icons/fa';

const NextArrowButton = props => {
  const { onClick } = props;

  return (
    <Button
      onClick={onClick}
      pos="absolute"
      top="20%"
      right="-20px"
      rounded="full"
      fontSize="xl"
      variant="outline"
      colorScheme="telegram"
      zIndex="10"
      p="3"
    >
      <Icon as={FaAngleRight} />
    </Button>
  );
};

export default NextArrowButton;
