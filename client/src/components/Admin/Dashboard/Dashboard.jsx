import React from 'react';
import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { DoughnutChart, LineChart } from './Chart';

const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading size={'sm'} children={title} mb={'2'} />
    <HStack w="full" alignItems={'center'}>
      <Text children={profit ? '0%' : `-${value}%`} />
      <Progress w="full" value={profit ? value : 0} colorScheme={'purple'} />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const DataBox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />
      <HStack>
        <Text children={`${qtyPercentage} %`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text children={'Kể từ tháng trước'} opacity={0.6} />
  </Box>
);
const Dashboard = () => {
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '1fr 5fr']}
    >
      <Sidebar />
      <Box>
        <Text
          textAlign={'center'}
          opacity={0.5}
          children={`Thay đổi cuối lúc ${format(new Date(), 'dd/MM/yyyy')}`}
        />
        <Heading
          children="Bảng điều khiển"
          ml={['0', '16']}
          mb="16"
          textAlign={['center', 'left']}
        />
        <Stack
          direction={['column', 'row']}
          minH={'24vh'}
          justifyContent="space-evenly"
        >
          <DataBox
            title="Lượt xem"
            qty={123}
            qtyPercentage={30}
            profit={true}
          />
          <DataBox
            title="Người dùng"
            qty={23}
            qtyPercentage={78}
            profit={true}
          />
          <DataBox title="Đăng ký" qty={25} qtyPercentage={45} profit={false} />
        </Stack>
        <Box
          m={['0', '16']}
          borderRadius={'lg'}
          p={['0', '16']}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            textAlign={['center', 'left']}
            size="md"
            children="Xem đồ thị"
            pt={['8', '0']}
            ml={['0', '16']}
          />
          {<LineChart />}
        </Box>
        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p="4">
            <Heading
              textAlign={['center', 'left']}
              size="md"
              children="Tiến trình"
              ml={['0', '16']}
            />
            <Box>
              <Bar profit={true} title="Lượt xem" value={30} />
              <Bar profit={true} title="Người dùng" value={78} />
              <Bar profit={false} title="Đăng ký" value={20} />
            </Box>
          </Box>

          <Box p={['0', '16']} boxSizing="border-box" py="4">
            <Heading
              textAlign="center"
              size={'md'}
              mb={'4'}
              children="Người dùng"
            />
            {<DoughnutChart />}
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Dashboard;
