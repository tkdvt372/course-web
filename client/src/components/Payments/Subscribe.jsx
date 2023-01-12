import React from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'


const Subscribe = () => {
  return (
    <Container h="90vh" p="16">
      <Heading children="Xin chào" my={8} textAlign={"center"} />
      <VStack boxShadow={"lg"} alignItems={"stretch"} borderRadius={"lg"} spacing={0}>
        <Box bg={"blue.400"} p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text  children={"Gói thành viên 5.999.999đ"} />
        </Box>
        <Box p={4} >
          <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
            <Text  children={`Đăng ký gói thành viên để có thể truy cập tất cả khoá học.`} />
            <Heading size={"md"} children={"Chỉ 5.999.999đ"}/>
          </VStack>
          <Button my={"8"} w={"full"} colorScheme={"blue"}  >
            Đăng ký ngay
          </Button>
          <Box bg={"blackAlpha.600"} p={"4"} css={{borderRadius:"0 0 8px 8px"}}>
          <Heading color={"white"} size={"sm"} children={"Mua một lần, học mãi mãi"}/>
          <Text fontSize="xs" color={"white"} children={"*Điều khoản và điều kiện áp dụng"}/>
          </Box>
        </Box>
      </VStack>
    </Container>  
  )
}

export default Subscribe