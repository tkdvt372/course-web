import React, { useEffect } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(changePassword(oldPassword, newPassword));

  };
  const { loading, message, error } = useSelector(state => state.profile);
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

  return (
    <Container py={16} minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          children="Đổi mật khẩu"
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={8}>
          <Input
            required
            id="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ..."
            type={'password'}
            focusBorderColor="blue.500"
          />
          <Input
            required
            id="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới..."
            type={'password'}
            focusBorderColor="blue.500"
          />
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme={'blue'}
            type="submit"
          >
            Đổi
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
