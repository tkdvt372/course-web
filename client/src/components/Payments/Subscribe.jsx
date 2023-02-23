import React, { useEffect } from 'react';
import { Box, Button, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { buySubscription } from '../../redux/actions/user';
const Subscribe = () => {
  const list = [
    {
      title: 'Gói thành viên 3 tháng',
      price: 260,
      sku: '001',
    },
    {
      title: 'Gói thành viên 6 tháng',
      price: 450,
      sku: '002',
    },
    {
      title: 'Gói thành viên 12 tháng',
      price: 700,
      sku: '003',
    },
  ];
  const dispatch = useDispatch();
  const { loading, error, url } = useSelector(state => state.subscription);
  const subscribeHandler = async (price, title, sku) => {
    dispatch(buySubscription(price, title, sku));
  };
  const { error: courseError } = useSelector(state => state.course);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (url) {
      window.location.replace(url);
    }
  }, [loading, error, url, dispatch, courseError]);

  return (
    <>
      <Heading children="Xin chào" mt={10} textAlign={'center'} />
      <HStack h="90vh" mx={16} my={-19} gap={16}>
        {list.map((item, index) => (
          <VStack
            key={item.sku}
            boxShadow={'lg'}
            alignItems={'stretch'}
            borderRadius={'lg'}
            spacing={0}
          >
            <Box
              bg={'blue.400'}
              p={'4'}
              textAlign={'center'}
              css={{ borderRadius: '8px 8px 0 0' }}
            >
              <Text children={item.title} />
            </Box>
            <Box p={4}>
              <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
                <Text
                  children={`Đăng ký gói thành viên để có thể truy cập tất cả khoá học.`}
                />
                <Heading size={'xl'} children={`Chỉ ${item.price}$`} />
              </VStack>
              <Button
                my={'8'}
                w={'full'}
                colorScheme={'blue'}
                onClick={() =>
                  subscribeHandler(item.price, item.title, item.sku)
                }
              >
                Đăng ký ngay
              </Button>
              <Box
                bg={'blackAlpha.600'}
                p={'4'}
                css={{ borderRadius: '0 0 8px 8px' }}
              >
                <Text
                  fontSize="xs"
                  align={'center'}
                  color={'white'}
                  children={'*Điều khoản và điều kiện áp dụng'}
                />
              </Box>
            </Box>
          </VStack>
        ))}
      </HStack>
    </>
  );
};

export default Subscribe;
