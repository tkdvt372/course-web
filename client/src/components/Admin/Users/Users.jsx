import React from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
const Users = () => {
  const users = [
    {
      _id: 'dvt',
      name: 'Duong Van Tuan',
      role: 'admin',
      subscription: {
        status: 'active',
      },
      email: 'duongvantuan372@gmail.com',
    },
  ];
  const updateHandler = (userId)=>{
      console.log(userId);
  }
  const deleteHandler = (userId)=>{
    console.log(userId);
}
  return (
    <Grid
      css={{
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '1fr 5fr']}
    >
      <Sidebar />
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="Tất cả tài khoản"
          textAlign={['center', 'left']}
          mb={5}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>
              Tất cả tài khoản có sẵn trong cơ sở dữ liệu
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th></Th>
                <Th>Tiêu đề</Th>
                <Th>Danh mục</Th>
                <Th>Tác giả</Th>
                <Th isNumeric>Hoạt động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(item => (
                <Row updateHandler={updateHandler} deleteHandler={deleteHandler} key={item._id} item={item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription.status === 'active' ? 'Kích hoạt' : 'Chưa kích hoạt'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button onClick={()=>updateHandler(item._id)} variant={'outline'}>Phân quyền</Button>
          <Button onClick={()=>deleteHandler(item._id)} color={'purple.500'}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
