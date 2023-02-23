import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(state => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="QUÊN MẬT KHẨU"
          my="16"
          textTransform={'uppercase'}
          textAlign={'center'}
        />
        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@email.com"
            type={'email'}
            focusBorderColor="blue.500"
          />
          <Button
            isLoading={loading}
            type="submit"
            w="full"
            colorScheme={'blue'}
          >
            Xác nhận
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
