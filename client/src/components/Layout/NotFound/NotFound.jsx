import React from 'react'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { RiErrorWarningFill } from "react-icons/ri"
const NotFound = () => {
  return (
    <Container h={"90vh"}>
      <VStack justifyContent={"center"} h="full" spacing={"4"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading>
          (404)Không tìm thấy trang
        </Heading>
        <Link to="/">
          <Button variant={"ghost"}>
            Trở lại trang chủ
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default NotFound