import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course.js';
import Loader from '../Layout/Loader/Loader';
const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();
  const { lectures, loading } = useSelector(state => state.course);
  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);
  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to="/subscribe" />;
  }
  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures.length === 0 ? (
        <Heading alignSelf={"center"} justifySelf={"center"} children="Chưa có bài giảng nào..." />
      ) : (
        <Box>
          <video
            width={'100%'}
            src={lectures[lectureNumber].video.url}
            autoPlay={true}
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          ></video>
          <Heading
            m="4"
            children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
          />
          <Heading m={'4'} children="Mô tả" />
          <Text m={4} children={lectures[lectureNumber].description} />
        </Box>
      )}

      <VStack>
        {lectures.map((element, index) => (
          <Button
            onClick={() => setLectureNumber(index)}
            key={element._id}
            css={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rbga(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {element.title}
            </Text>
          </Button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
