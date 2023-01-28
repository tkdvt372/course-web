import React from 'react'
import { Box, Grid } from "@chakra-ui/react"
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'


const AdminCourses = () => {
    return (
        <Grid css={{
            cursor: `url(${cursor}),default`
        }} minH={"100vh"} templateColumns={["1fr", "1fr 5fr"]}>
            <Sidebar />
            <Box boxSizing='border-box' py={16} px={["4", "0"]}>

            </Box>
        </Grid>
    )
}

export default AdminCourses