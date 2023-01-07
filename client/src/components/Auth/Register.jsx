import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import React, { useState } from 'react'

export const fileUploadCss = {
    cursor: "pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "#90cdf4",
    backgroundColor: "white"
}

const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss
}
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [imagePrev, setImagePrev] = useState("")
    const [image,setImage] = useState("")


    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result)
            setImage(file)
        }
    }
    return (
        <Container h={"95vh"}>
            <VStack h={"full"} justifyContent="center" spacing={"16"}>
                <Heading children="Đăng ký tài khoản" />
                <form style={{ width: "100%" }}>
                    <Box my={"4"} display={"flex"} justifyContent="center">
                        <Avatar src={imagePrev} size={"2xl"} />
                    </Box>
                    <Box my={"4"}
                    >
                        <FormLabel htmlFor="name" children="Học và tên" />
                        <Input required id="name" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên của bạn..."
                            type={"text"}
                            focusBorderColor="blue.500"
                        />
                    </Box>
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
                    <Box my={"4"}
                    >
                        <FormLabel htmlFor="chooseAvater" children="Chọn ảnh đại diện" />
                        <Input required id="chooseAvater"
                            accept='image/*'
                            type={"file"}
                            focusBorderColor="blue.500"
                            css={
                                fileUploadStyle
                            }
                            onChange={changeImageHandler}
                        />
                    </Box>
                    <Button colorScheme="blue" my={"4"} type="submit">
                        Đăng ký
                    </Button>
                    <Box my={"4"}>
                        Bạn đã   có tài khoản?{" "}
                        <Link to="/login">
                            <Button colorScheme="blue" variant={"link"}>
                                Đăng nhập
                            </Button>

                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Register