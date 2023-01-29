import React from 'react'
import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react"
import { TiSocialFacebookCircular, TiSocialTwitterCircular } from "react-icons/ti"
import { DiGithub } from "react-icons/di"

const Footer = () => {
    return (
        <Box padding={"4"} bg={"blackAlpha.900"} minH={"10vh"}>
            <Stack direction={["column", "row"]}>
                <VStack alignItems={["center", "flex-start"]} width={"full"}>
                    <Heading
                        children="Thuộc bản quyền bởi"
                        color={"white"}
                    />
                    <Heading
                        size={"sm"}
                        fontFamily={"body"}
                        children="@Dương Văn Tuân"
                        color={"blue.400"}
                    />
                </VStack>
                <HStack
                    spacing={["2", "10"]}
                    justifyContent="center"
                    fontSize={50}
                    color={'white'}
                >
                    <a href="https://www.facebook.com/dvt372/"
                        target={"_blank"} rel="noreferrer"
                    >
                        <TiSocialFacebookCircular />
                    </a>
                    <a href="https://twitter.com/dvt_372"
                        target={"_blank"} rel="noreferrer"
                    >
                        <TiSocialTwitterCircular />
                    </a>
                    <a href="https://github.com/tkdvt372"
                        target={"_blank"} rel="noreferrer"
                    >
                        <DiGithub />
                    </a>
                </HStack>
            </Stack>
        </Box>
    )
}

export default Footer