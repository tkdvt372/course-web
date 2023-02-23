import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';




const AdminCourses = () => {
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { courses, lectures } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const courseDetailHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
    onOpen();
  };
  const deleteButtonHandler = async courseId => {
    await dispatch(deleteCourse(courseId));
  };
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses());
  }, [dispatch, message, error]);

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
                {/* <Th>ID</Th> */}
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
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          addLectureHandler={addLectureHandler}
          deleteLectureButtonHandler={deleteLectureButtonHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      {/* <Td>#{item._id}</Td> */}
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailHandler(item._id, item.title)}
            variant={'outline'}
          >
            Xem bài giảng
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.500'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
