import React, { useState } from 'react'
import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import vd from '../../assets/videos/intro.mp4'

const CoursePage = () => {
    const [lectureNumber, setLectureNumber] = useState(0);
    const lectures = [
        {
            _id: "dvt",
            title: "ReactJS cho người mới bắt đầu 2023",
            description: "Lý thuyết tinh gọn, đi thẳng vào vấn đề và vận dụng vào code dự",
            video: {
                url: "dvt",

            }
        },
        {
            _id: "dvt2",
            title: "Redux Ultimate - Redux Siêu Dễ Cho Beginners Từ Z đến A",
            description: " Gánh Team Tất Cả Version của Redux (Redux & Redux Toolkit) Kết Hợp React.JS",
            video: {
                url: "dvt",

            }
        }
    ]
    return (
        <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
            <Box>
                <video
                    width={"100%"}
                    src={vd}
                    // autoPlay={true}
                    controls
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback>
                </video>
                <Heading m="4" children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
                <Heading m={"4"} children="Mô tả" />
                <Text m={4} children={lectures[lectureNumber].description} />
            </Box>

            <VStack>
                {
                    lectures.map((element, index) => (
                        <Button
                            onClick={() => setLectureNumber(index)}
                            key={element._id}
                            css={{
                                width: "100%",
                                padding: "1rem",
                                textAlign: "center",
                                margin: 0,
                                borderBottom: "1px solid rbga(0,0,0,0.2)"
                            }}
                        >
                            <Text noOfLines={1}>
                                #{index + 1} {element.title}
                            </Text>
                        </Button>
                    ))
                }
            </VStack>
        </Grid>
    )
}

export default CoursePage