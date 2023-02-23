import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin.js';
import toast from 'react-hot-toast';

const categories = [
  'Phát triển web',
  'Khoa học dữ liệu',
  'Phát triển ứng dụng di động',
  'Kỹ thuật phần mềm',
  'Kiểm tra phần mềm',
];
const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    console.log(category);
    dispatch(createCourse(myForm));
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
  }, [dispatch, error, loading, message]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '1fr 5fr']}
    >
      <Sidebar />
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Tạo một khoá học"
            textAlign={['center', 'left']}
            mb={5}
          />
          <VStack m={'auto'} spacing={8}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Tiêu đề"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Mô tả"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Tên giảng viên"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Input
              required
              accept="image/*"
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  cursor: 'pointer',
                  marginLeft: '-5%',
                  width: '110%',
                  border: 'none',
                  height: '100%',
                  color: 'purple',
                  backgroundColor: 'white',
                },
              }}
              onChange={changeImageHandler}
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize={64} objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              w={'full'}
              colorScheme={'purple'}
              type="submit"
            >
              Tạo
            </Button>
          </VStack>
        </form>
      </Container>
    </Grid>
  );
};

export default CreateCourse;
