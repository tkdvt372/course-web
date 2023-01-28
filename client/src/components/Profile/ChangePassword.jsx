import React from 'react'
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from 'react'
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    return (
        <Container py={16} minH="90vh" >
            <form>
                <Heading children="Đổi mật khẩu" textTransform={"uppercase"} my="16" textAlign={["center", "left"]} />
                <VStack spacing={8}>
                    <Input
                        required
                        id='password'
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        placeholder="Nhập mật khẩu cũ..."
                        type={"password"}
                        focusBorderColor="blue.500"
                    />
                    <Input
                        required
                        id='password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới..."
                        type={"password"}
                        focusBorderColor="blue.500"
                    />
                    <Button w={"full"} colorScheme={"blue"} type="submit">Đổi</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ChangePassword