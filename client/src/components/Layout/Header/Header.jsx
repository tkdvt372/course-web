import React from 'react'
import "./Header.css"
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
// import { FaHome } from 'react-icons/fa'


const LinkButton = ({ url = "/", title = "Home" }) => (
    <Link to={url}>
        <Button variant={"ghost"}>{title}</Button>
    </Link>
);
const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAuthenticated = true;
    const user = {
        role: "admin"
    }
    const logoutHandler = ()=>{
        console.log("Logout");
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
                            <LinkButton url="/" title="Trang chủ" />
                            <LinkButton url="/courses" title="Khóa học" />
                            <LinkButton url="/request" title="Yêu cầu một khóa học" />
                            <LinkButton url="/contact" title="Liên hệ" />
                            <LinkButton url="/about" title="Thông tin" />
                        </VStack>
                        <HStack
                            justifyContent={"space-evenly"}
                            position="absolute"
                            bottom={"2rem"}
                            width="80%">
                            {isAuthenticated ? (<>
                                <VStack>
                                    <HStack>
                                        <Link to="/profile">
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
                                        user && user.role === "admin" && <Link to="/admin/dashboard">
                                            <Button colorScheme={"purple"} variant="ghost">
                                                <RiDashboardFill style={{ margin: "4px" }} />
                                                Bảng điều khiển
                                            </Button>
                                        </Link>
                                    }
                                </VStack>

                            </>) :
                                (<>
                                    <Link to="/login">
                                        <Button colorScheme={"blue"}>Đăng nhập</Button>
                                    </Link>
                                    <p>hoặc</p>
                                    <Link to="/signup">
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

