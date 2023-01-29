import React from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
const UpdateProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  return (
    <Container py={16} minH="90vh">
      <form>
        <Heading
          children="Thay đổi thông tin"
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={8}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            type={'text'}
            focusBorderColor="blue.500"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nhập email..."
            type={'email'}
            focusBorderColor="blue.500"
          />
          <Button w={'full'} colorScheme={'blue'} type="submit">
            Cập nhật
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
