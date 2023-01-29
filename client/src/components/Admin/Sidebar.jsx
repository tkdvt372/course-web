import React from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import './Slidebar.css'
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';

const Sidebar = () => {
  const location = useLocation();

  return (
    <VStack
      spacing={'8'}
      p="16"
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      position={'relative'}
      pl={5}
    >
      <VStack id='slide-bar' alignItems={"flex-start"} position={'fixed'} mt={"5"} >
        <LinkButton
          Icon={RiDashboardFill}
          text="Bảng điều khiển"
          url="dashboard"
          active={location.pathname === '/admin/dashboard'}
        />
        <LinkButton
          Icon={RiAddCircleFill}
          text="Tạo khoá học"
          url="create-course"
          active={location.pathname === '/admin/create-course'}
        />
        <LinkButton
          Icon={RiEyeFill}
          text="Khoá học"
          url="admin-courses"
          active={location.pathname === '/admin/admin-courses'}
        />
        <LinkButton
          Icon={RiUser3Fill}
          text="Tài khoản"
          url="users"
          active={location.pathname === '/admin/users'}
        />
      </VStack>
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant="ghost"
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
