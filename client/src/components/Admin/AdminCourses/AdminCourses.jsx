import React from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const courses = [
    {
      _id: 'dvt',
      title: 'Khoá học ReactJs',
      category: 'web development',
      poster: {
        url: 'https://img-b.udemycdn.com/course/240x135/3257380_c043_3.jpg',
      },
      createBy: 'Duong Van Tuan',
      views: 123,
      numOfVideos: 12,
    },
  ];
  const courseDetailHandler = userId => {
    onOpen();
  };
  const deleteHandler = userId => {
    console.log(userId);
  };
  const deleteButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };
  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '1fr 5fr']}
    >
      <Sidebar />
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="Tất cả người dùng"
          textAlign={['center', 'left']}
          mb={5}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'md'}>
            <TableCaption>
              Tất cả khoá học có sẵn trong cơ sở dữ liệu
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Ảnh bìa</Th>
                <Th>Tiêu đề</Th>
                <Th>Danh mục</Th>
                <Th>Tác giả</Th>
                <Th isNumeric>Lượt xem</Th>
                <Th isNumeric>Bài giảng</Th>
                <Th isNumeric>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  courseDetailHandler={courseDetailHandler}
                  deleteHandler={deleteHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'dvt'}
          courseTitle={'Khoá học ReactJS'}
          addLectureHandler={addLectureHandler}
          deleteButtonHandler={deleteButtonHandler}
        />
      </Box>
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailHandler, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailHandler(item._id)}
            variant={'outline'}
          >
            Xem bài giảng
          </Button>
          <Button onClick={() => deleteHandler(item._id)} color={'purple.500'}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
