import React from 'react'
import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import vd from '../../assets/videos/intro.mp4'
import { RiSecurePaymentFill } from "react-icons/ri"
import termsAndConditions from "../../assets/docs/termsAndCondition.js"

const VideoPlayer = () => (
    <Box>
        <video src={vd} autoPlay={true} controls controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture disableRemotePlayback muted>
        </video>
    </Box>
)

const Founder = () => (
    <Stack direction={["column", "row"]} spacing={["4", "16"]} padding="8">
        <VStack>
            <Avatar src='https://avatars.githubusercontent.com/u/74377815?v=4' boxSize={["40", "48"]} />
            <Text children={"Người sáng lập"} opacity={0.7} />
        </VStack>
        <VStack justifyContent={"center"} alignItems={["center", "flex-start"]}>
            <Heading children={"Dương Văn Tuân"} size={["md", "xl"]} />
            <Text textAlign={["center", "left"]} children={`Xin chào, tôi là một full-stack developer. Nhiệm vụ của tôi là cung cấp những khoá học với giá hợp lý cho cộng đồng IT Việt Nam.`} />
        </VStack>
    </Stack>
)

const TandC = ({ termsAndCondition }) => (
    <Box>
        <Heading
            size={'md'}
            children="Điều khoản và điều kiện"
            textAlign={['center', 'left']}
            my="4"
        />

        <Box h="sm" p="4" overflowY={'scroll'}>
            <Text
                fontFamily={'heading'}
                letterSpacing={'widest'}
                textAlign={['center', 'left']}
            >
                {termsAndCondition}
            </Text>
            <Heading
                my="4"
                size={'xs'}
                children="Chỉ áp dụng hoàn tiền nếu hủy trong vòng 7 ngày."
            />
        </Box>
    </Box>
);

const About = () => {
    return (
        <Container maxW={"container.lg"} padding="16" boxShadow={"lg"}>
            <Heading children={"Thông tin về chúng tôi"} textAlign={["center", "left"]} />
            <Founder />
            <Stack m="8" direction={["column", "row"]} alignItems="center">
                <Text fontFamily={"cursive"} m="8" textAlign={["center", "left"]}>
                    Chúng tôi có nhiều khoá học chất lượng cao về kiến thức đi làm dành cho thành viên đăng ký.
                </Text>
                <Link to={'/subscribe'}>
                    <Button variant={"ghost"} colorScheme={"blue"}>
                        Tham gia ngay
                    </Button>
                </Link>
            </Stack>
            <VideoPlayer />
            <TandC termsAndCondition={termsAndConditions} />
            <HStack my={4} padding="4">
                <RiSecurePaymentFill />
                <Heading size={"xs"} fontFamily="sans-serif" textTransform={"uppercase"} children={"Thanh toán được đảm bảo bởi ViettelPay"} />
            </HStack>
        </Container>
    )
}

export default About