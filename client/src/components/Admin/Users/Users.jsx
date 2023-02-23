import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.admin);
  const updateHandler = async userId => {
    await dispatch(updateUserRole(userId));
  };
  const deleteHandler = userId => {
    dispatch(deleteUser(userId));
  };
  const { loading, error, message } = useSelector(state => state.admin);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, message]);

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
                {/* <Th>ID</Th> */}
                <Th>Họ tên</Th>
                <Th>Tiêu đề</Th>
                <Th>Chức quyền</Th>
                <Th>Tác giả</Th>
                <Th isNumeric>Hoạt động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map(item => (
                  <Row
                    loading={loading}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                    key={item._id}
                    item={item}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteHandler, loading }) {
  return (
    <Tr>
      {/* <Td>#{item._id}</Td> */}
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Đã đăng ký'
          : 'Chưa đăng ký'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
          >
            Phân quyền
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteHandler(item._id)}
            color={'purple.500'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
