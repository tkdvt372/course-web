import React from 'react'
import { Link } from "react-router-dom"
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { RiCheckboxCircleFill } from "react-icons/ri"

const PaymentSuccess = () => {
  return (
    <Container h={"90vh"} p="16">
      <Heading my={8} textAlign={"center"}>Bạn đã là thành viên</Heading>
      <VStack
        boxShadow={"lg"}
        pb={16}
        alignItems={"center"}
        borderRadius="lg"
      >
        <Box
          w={"full"}
          bg="blue.400"
          p={4}
          css={{ borderRadius: "8px 8px 0 0" }}
        >
          <Text color={"black"}>
            Thanh toán thành công
          </Text>
        </Box>
        <Box
          p={"4"}
        >
          <VStack
            textAlign={"center"}
            px="8"
            mt={"4"}
            spacing={"8"}
          >
            <Text>
              Chúc mừng bạn đã đăng ký gói thành viên. Bạn có thể truy cập tất cả khoá học
            </Text>
            <Heading size={"4xl"}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button variant={"ghost"}>
            Hồ sơ
          </Button>
        </Link>
        <Heading size={"xs"}>
            Reference:dvt_372
        </Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess