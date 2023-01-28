import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { RiDeleteBin7Fill } from "react-icons/ri"

const Profile = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const user = {
        name: "Dương Văn Tuân",
        email: "duongvantuan372@gmail.com",
        CreateAt: String(new Date().toISOString()),
        role: "user",
        subscriptions: {
            status: "undefined"
        },
        playlist: [
            {
                course: "dvt", poster: "https://img-b.udemycdn.com/course/240x135/3257380_c043_3.jpg"
            },
            {
                course: "dvt2", poster: "https://img-b.udemycdn.com/course/240x135/3257380_c043_3.jpg"
            },
            {
                course: "dvt3", poster: "https://img-b.udemycdn.com/course/240x135/3257380_c043_3.jpg"
            }
        ]
    }

    const removeFromPlaylistHandler = () => {
        console.log("remove success!")
    }

    const changeImageSubmitHandler = (e, image) => {
        e.preventDefault()
        console.log(image);
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
                    <Button onClick={onOpen} colorScheme={"blue"} variant={"ghost"}>
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
                        <Link to="/update-profile">
                            <Button>Sửa thông tin</Button>
                        </Link>
                        <Link to="/change-password">
                            <Button>Sửa mật khẩu</Button>
                        </Link>
                    </Stack>
                </VStack>
            </Stack>
            <Heading children="Danh sách yêu thích" size="md" />
            {
                user.playlist.length > 0 && (
                    <Stack direction={["column", "row"]} alignItems="center" flexWrap={'wrap'} p="4">
                        {
                            user.playlist.map((elemnet, index) => (
                                <VStack w={48} m="2" key={elemnet.course}>
                                    <Image boxSize={"full"} objectFit={"contain"} src={elemnet.poster} />
                                    <HStack>
                                        <Link to={`/course/${elemnet.course}`}>
                                            <Button variant={"ghost"} colorScheme={"blue"}>Xem ngay</Button>
                                        </Link>
                                        <Button onClick={() => removeFromPlaylistHandler(elemnet.course)}>
                                            <RiDeleteBin7Fill />
                                        </Button>
                                    </HStack>
                                </VStack>
                            ))
                        }
                    </Stack>
                )
            }


            <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
        </Container>
    )
}

export default Profile


function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
    const [image, setImage] = useState("")
    const [imagePrev, setImagePrev] = useState("")

    const fileUploadCss = {

    }
    const changeImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result)
            setImage(file)
        }
    }
    const closeHandler = () => {
        onClose()
        setImagePrev("")
        setImage("")
    }
    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent >
                <ModalHeader>
                    Thay ảnh đại diện
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container>
                        <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
                            <VStack spacing={"8"}>
                                {
                                    imagePrev && <Avatar src={imagePrev} boxSize={"48"} />
                                }
                                <Input type="file" css={{ "&::file-selector-button": fileUploadCss }}
                                    onChange={changeImage}
                                />
                                <Button w="full" colorScheme={"blue"} type="submit">Thay đổi</Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={closeHandler}>Huỷ</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}