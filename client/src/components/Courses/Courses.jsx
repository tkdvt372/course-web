import { Button, Container, Heading, HStack, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react'
import "./Courses.css"


const Course = ({ sold, title, imageSrc, id, addToPlayListHandler, creator, description, lectureCount }) => {
    return (
        <VStack
            
            className="course"
            alignItems={["center", "flex-start"]}
        >
            <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
            <Heading textAlign={["center", "left"]} maxW={"200px"} noOfLines={3} children={title} size="sm" />
            <Text noOfLines={2}  children={description} />
            <HStack>
                <Text fontFamily={"body"} textTransform={"title"} children={creator} />
            </HStack>
            <Heading textAlign={"center"} size={"sm"} children={`đ ${lectureCount}`} />
            <Heading size={"xs"} children={`Đã bán: ${sold}`} textTransform={"uppercase"} />
            <Stack direction={["column", "row"]} alignItems={"center"}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme={"blue"}>Xem ngay</Button>
                </Link>
                <Button variant={"ghost"} colorScheme={"blue"}
                    onClick={() => addToPlayListHandler(id)}
                >Thêm giỏ hàng</Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const categories = [
        "Phát triển web",
        "Khoa học dữ liệu",
        "Phát triển ứng dụng di động",
        "Kỹ thuật phần mềm",
        "Kiểm tra phần mềm"
    ]

    const addToPlayListHandler = () => {
        console.log("Them thanh cong")
    }

    return (
        <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
            <Heading children="Tất cả khóa học" m={'8'} />
            <Input
                type={"text"}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={"Nhập tên khóa học..."}
                focusBorderColor={"blue.500"}
            />
            <HStack overflowX={"auto"} paddingY={"8"} css={{
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}
            >
                {categories.map((item, index) => (
                    <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
                        <Text children={item} />
                    </Button>
                ))}
            </HStack>
            <Stack
                direction={["column", "row"]}
                flexWrap={"wrap"}
                justifyContent={["flex-start", "space-evenly"]}
                alignItems={["center", "flex-start"]}
            >
                <Course
                    title={"ReactJS cho người mới bắt đầu 2023"}
                    description={"Lý thuyết tinh gọn, đi thẳng vào vấn đề và vận dụng vào code dự án thực tế"}
                    sold={23}
                    imageSrc={"https://img-b.udemycdn.com/course/240x135/3257380_c043_3.jpg"}
                    id={"dvt"}
                    creator={"Dương Văn Tuân"}
                    lectureCount={200000}
                    addToPlayListHandler={addToPlayListHandler}
                />
            </Stack>
        </Container>
    )
}

export default Courses