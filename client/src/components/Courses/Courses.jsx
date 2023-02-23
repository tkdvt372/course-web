import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Courses.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile.js';
import toast from 'react-hot-toast';

import { loadUser } from '../../redux/actions/user';
const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlayListHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        noOfLines={2}
        fontFamily={'sans-serif'}
        children={title}
        size="sm"
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text fontFamily={'body'} textTransform={'title'} children={creator} />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'sm'}
        children={`Bài giảng: ${lectureCount}`}
        textTransform="uppercase"
      />
      <Heading
        size={'xs'}
        children={`Lượt xem: ${views}`}
        textTransform={'uppercase'}
      />
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme={'blue'}>Xem ngay</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme={'blue'}
          onClick={() => addToPlayListHandler(id)}
        >
          Yêu thích
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const addToPlayListHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
  const dispatch = useDispatch();
  const categories = [
    'web development',
    'Khoa học dữ liệu',
    'Phát triển ứng dụng di động',
    'Kỹ thuật phần mềm',
    'Kiểm tra phần mềm',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, message, error]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="Tất cả khóa học" m={'8'} />
      <Input
        type={'text'}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder={'Nhập tên khóa học...'}
        focusBorderColor={'blue.500'}
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlayListHandler={addToPlayListHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading
            opacity={0.5}
            mt={4}
            children="Hiện tại chưa có khoá học nào"
          />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
