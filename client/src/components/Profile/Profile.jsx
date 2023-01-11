import React from 'react'
import { Link } from "react-router-dom";
import { Container, Heading } from "@chakra-ui/react"

const Profile = () => {
    return (
        <Container
            minH={"95vh"}
            maxW="container.lg"
            py={8}
        >
            <Heading  children="Hồ sơ" m="8" textTransform={"uppercase"}/>
        </Container>
    )
}

export default Profile