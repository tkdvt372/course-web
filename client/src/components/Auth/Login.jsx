import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <Container h={"95vh"}>
            <VStack h={"full"} justifyContent="center" spacing={"16"}>
                <Heading children="Chào mừng tới DVT" />
                <form style={{ width: "100%" }}>
                    <Box my={"4"}
                    >
                        <FormLabel htmlFor="email" children="Địa chỉ email" />
                        <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="abc@email.com"
                            type={"email"}
                            focusBorderColor="blue.500"
                        />
                    </Box>
                    <Box my={"4"}
                    >
                        <FormLabel htmlFor="password" children="Mật khẩu" />
                        <Input required id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu của bạn.."
                            type={"password"}
                            focusBorderColor="blue.500"
                        />
                    </Box>
                    <Box>
                        <Link to="/forget-password">
                            <Button fontSize={"sm"} variant={"link"}>Quên mật khẩu</Button>
                        </Link>
                    </Box>
                    <Button colorScheme="blue" my={"4"} type="submit">
                        Đăng nhập
                    </Button>
                    <Box my={"4"}>
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register">
                            <Button colorScheme="blue" variant={"link"}>
                                Đăng ký
                            </Button>

                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Login