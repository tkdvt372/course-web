import React, { useState } from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { GiClick } from "react-icons/gi"
const Request = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [course, setCourse] = useState("")
    return (
        <Container
            h={"92vh"}
        >
            <VStack h={"full"} justifyContent={"center"} spacing={"16"}>
                <Heading children="Yêu cầu một khoá học" />
                <Text children="Không tìm thấy khoá học trên DVT? Hãy tạo một yêu cầu mới tại đây."/>
                <form style={{ width: "100%" }}>
                    <Box my={"4"}
                    >
                        <FormLabel htmlFor="name" children="Tên của bạn" />
                        <Input required id="name" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên của bạn"
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
                        <FormLabel htmlFor="course" children="Khoá học" />
                        <Textarea required id="course" value={course} onChange={(e) => setCourse(e.target.value)}
                            placeholder="Nhập tên khoá học.."

                            focusBorderColor="blue.500"
                        />
                    </Box>
                    <Button colorScheme="blue" my={"4"} type="submit">
                        Gửi
                    </Button>
                    <Box my={"4"} display="flex"  flexDirection={"row"} alignItems={"center"}>

                        <Link to="/courses">
                            <Button colorScheme="blue" variant={"link"} >
                                Đã tìm thấy khoá học &nbsp;
                                <GiClick size={"25"} />
                            </Button>

                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Request