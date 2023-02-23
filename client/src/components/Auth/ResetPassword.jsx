import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../../redux/actions/profile';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(state => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate("/login")
    }
  }, [dispatch, error, message,navigate]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };
  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="TẠO MẬT KHẨU MỚI"
          my="16"
          textTransform={'uppercase'}
          textAlign={'center'}
        />
        <VStack spacing={'8'}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            type={'password'}
            focusBorderColor="blue.500"
          />
          <Button
            isLoading={loading}
            type="submit"
            w="full"
            colorScheme={'blue'}
          >
            Cập nhật
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
