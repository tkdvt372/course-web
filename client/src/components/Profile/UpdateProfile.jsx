import React, { useEffect } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = ({user}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser())
    navigate("/profile")
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
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme={'blue'}
            type="submit"
          >
            Cập nhật
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
