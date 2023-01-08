import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react"
import "./Home.css"
import vg from '../../assets/images/logo2.png'
import vd from '../../assets/videos/intro.mp4'
import { CgGoogle, CgYoutube } from "react-icons/cg"
import { SiCoursera, SiUdemy } from "react-icons/si"
import { DiAws } from "react-icons/di"

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={["16", "56"]}
        >
          <VStack width={"full"} alignItems={["center", "flex-end"]}>
            <Heading children="HỌC HỎI TỪ CHUYÊN GIA" size={"2xl"} />
            <Text textAlign={["center", "left"]} fontSize={"2xl"} fontFamily="cursive" children="Giá trị khóa học ở mức hợp lý" />
            <Link to="/courses">
              <Button size={"lg"} colorScheme="blue">
                Khám phá ngay
              </Button>
            </Link>
          </VStack>
          <Image className="vector-graphics" boxSize={"md"} src={vg} objectFit="contain"></Image>
        </Stack>
      </div>
      <Box padding={'8'} bg="blackAlpha.800"  >
        <Heading textAlign={"center"} fontFamily="body" color="blue.400" children="THƯƠNG HIỆU CỦA CHÚNG TÔI" />
        <HStack className="brandsBanner" justifyContent={"space-evenly"} marginTop={"4"}>
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          src={vd}
          autoPlay={true}
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback>
        </video>
      </div>

    </section>
  )
}

export default Home