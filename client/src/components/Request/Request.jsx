import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiClick } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';
const Request = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();
  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, stateMessage, error]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Yêu cầu một khoá học" />
        <Text children="Không tìm thấy khoá học trên DVT? Hãy tạo một yêu cầu mới tại đây." />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Tên của bạn" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              type={'text'}
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Địa chỉ email" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@email.com"
              type={'email'}
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="course" children="Khoá học" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Nhập tên khoá học.."
              focusBorderColor="blue.500"
            />
          </Box>
          <Button isLoading={loading} colorScheme="blue" my={'4'} type="submit">
            Gửi
          </Button>
          <Box
            my={'4'}
            display="flex"
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Link to="/courses">
              <Button colorScheme="blue" variant={'link'}>
                Đã tìm thấy khoá học &nbsp;
                <GiClick size={'25'} />
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
