import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react"

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    return (
        <Container py={"16"} h={"90vh"}>
            <form>
                <Heading children="QUÊN MẬT KHẨU" my="16" textTransform={"uppercase"} textAlign={"center"} />
                <VStack spacing={"8"}>
                    <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="abc@email.com"
                        type={"email"}
                        focusBorderColor="blue.500"
                    />
                    <Button type="submit" w="full" colorScheme={"blue"}>
                        Xác nhận
                    </Button>
                </VStack>
            </form>
        </Container >
    )
}

export default ForgetPassword