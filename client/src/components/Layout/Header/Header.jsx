import React from 'react'
import "./Header.css"
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { Link } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
// import { FaHome } from 'react-icons/fa'


const LinkButton = ({ url = "/", title = "Home", onClose }) => (
    <Link onClick={onClose} to={url}>
        <Button variant={"ghost"}>{title}</Button>
    </Link>
);
const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAuthenticated = true;
    const user = {
        role: "admin"
    }
    const logoutHandler = () => {
        console.log("Logout");
        onClose()
    }
    return (
        <>
            <ColorModeSwitcher />
            <Button
                colorScheme={"blue"}
                width="12"
                height="12"
                rounded={'full'}
                position={"fixed"}
                top={"6"}
                left={"6"}
                onClick={onOpen}
            >
                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay backdropFilter={"blur(1px)"} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}>KHÓA HỌC DVT</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={"4"} alignItems="flex-start">
                            <LinkButton url="/" title="Trang chủ" onClose={onClose} />
                            <LinkButton url="/courses" title="Khóa học" onClose={onClose} />
                            <LinkButton url="/request" title="Yêu cầu một khóa học" onClose={onClose} />
                            <LinkButton url="/contact" title="Liên hệ" onClose={onClose} />
                            <LinkButton url="/about" title="Thông tin" onClose={onClose} />
                        </VStack>
                        <HStack
                            justifyContent={"space-evenly"}
                            position="absolute"
                            bottom={"2rem"}
                            width="80%">
                            {isAuthenticated ? (<>
                                <VStack>
                                    <HStack>
                                        <Link onClick={onClose} to="/profile">
                                            <Button variant={"ghost"} colorScheme={"blue"}>Hồ sơ</Button>
                                        </Link>
                                        <Link to="/logout">
                                            <Button
                                                variant={"ghost"}
                                                colorScheme={"blue"}
                                                onClick={logoutHandler}
                                            >
                                                <RiLogoutBoxLine />
                                                Đăng xuất
                                            </Button>
                                        </Link>
                                    </HStack>
                                    {
                                        user && user.role === "admin" && <Link onClick={onClose} to="/admin/dashboard">
                                            <Button colorScheme={"purple"} variant="ghost">
                                                <RiDashboardFill style={{ margin: "4px" }} />
                                                Bảng điều khiển
                                            </Button>
                                        </Link>
                                    }
                                </VStack>

                            </>) :
                                (<>
                                    <Link onClick={onClose} to="/login">
                                        <Button colorScheme={"blue"}>Đăng nhập</Button>
                                    </Link>
                                    <p>hoặc</p>
                                    <Link onClick={onClose} to="/signup">
                                        <Button colorScheme={"blue"}>Đăng ký</Button>
                                    </Link>

                                </>)}
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header

