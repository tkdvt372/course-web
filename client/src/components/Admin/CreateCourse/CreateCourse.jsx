import React, { useState } from 'react';
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
  const [createBy, setCreateBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
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
      <Container py="16">
        <form>
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
              placeholder="Tiêu đề"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createBy}
              onChange={e => setCreateBy(e.target.value)}
              placeholder="Tiêu đề"
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
              <Image src={imagePrev} boxSize={64} objectFit={"contain"}/>
            )}
            <Button w={"full"} colorScheme={"purple"} type="submit">Tạo</Button>
          </VStack>
        </form>
      </Container>
    </Grid>
  );
};

export default CreateCourse;
