import { Box } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router";
import { Footer } from "../Footer/Footer";


export function Layout () {
    return (
        <>
        <Navbar />
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      

      <Outlet />

      
    </Box>
    <Footer />
    </>
    )
}