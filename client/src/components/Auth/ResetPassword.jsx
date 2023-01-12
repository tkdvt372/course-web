import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const params = useParams()
    console.log(params.token);
    return (
        <Container py={"16"} h={"90vh"}>
            <form>
                <Heading children="TẠO MẬT KHẨU MỚI" my="16" textTransform={"uppercase"} textAlign={"center"} />
                <VStack spacing={"8"}>
                    <Input required id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        type={"password"}
                        focusBorderColor="blue.500"
                    />
                    <Button type="submit" w="full" colorScheme={"blue"}>
                        Cập nhật
                    </Button>
                </VStack>
            </form>
        </Container >
    )
}

export default ResetPassword