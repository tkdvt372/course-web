import React from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, Container, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"

const Profile = () => {
    const user = {
        name: "Dương Văn Tuân",
        email: "duongvantuan372@gmail.com",
        CreateAt: String(new Date().toISOString()),
        role: "user",
        subscriptions: {
            status: "undefined"
        }
    }
    return (
        <Container
            minH={"95vh"}
            maxW="container.lg"
            py={8}
        >
            <Heading children="Hồ sơ" m="8" textTransform={"uppercase"} />
            <Stack justifyContent={"flex-start"} direction={["column", "row"]} alignItems="center" spacing={["8", "16"]} padding={8}>
                <VStack>
                    <Avatar boxSize={"48"} />
                    <Button colorScheme={"blue"} variant={"ghost"}>
                        Chọn ảnh
                    </Button>
                </VStack>
                <VStack spacing={4} alignItems={["center", "flex-start"]}>
                    <HStack>
                        <Text children="Tên" fontWeight={"bold"} />
                        <Text children={user.name} />
                    </HStack>
                    <HStack>
                        <Text children="Email" fontWeight={"bold"} />
                        <Text children={user.email} />
                    </HStack>
                    <HStack>
                        <Text children="Được tạo" fontWeight={"bold"} />
                        <Text children={user.CreateAt} />
                    </HStack>
                    {
                        user.role !== "admin" && (
                            <HStack>
                                {
                                    user.subscriptions.status === "active" ? (
                                        <Button color={"blue.500"} variant="unstyled">Huỷ đăng ký</Button>
                                    ) : (
                                        <Link to="/subscribe">
                                            <Button colorScheme={"blue"}>Đăng ký</Button>
                                        </Link>
                                    )
                                }
                            </HStack>
                        )
                    }
                    <Stack direction={["column", "row"]} alignItems="center" >
                        <Link to="/update_profile">
                            <Button>Sửa thông tin</Button>
                        </Link>
                        <Link to="/change-password">
                            <Button>Sửa mật khẩu</Button>
                        </Link>
                    </Stack>
                </VStack>
            </Stack>
            <Heading children="Danh sách yêu thích" size="md"/>
        </Container>
    )
}

export default Profile