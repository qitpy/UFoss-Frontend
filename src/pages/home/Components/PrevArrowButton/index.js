import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaAngleLeft } from 'react-icons/fa';

const PrevArrowButton = props => {
  const { onClick } = props;

  return (
    <Button
      onClick={onClick}
      pos="absolute"
      top="20%"
      left="-20px"
      rounded="full"
      fontSize="xl"
      variant="outline"
      colorScheme="telegram"
      zIndex="10"
      p="3"
    >
      <Icon as={FaAngleLeft} />
    </Button>
  );
};

export default PrevArrowButton;
