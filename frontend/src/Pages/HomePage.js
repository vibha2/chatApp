import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';


export default function HomePage(){

//    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        

        if(user){
            // navigate('/chats');
        }
    }, );

  return (
    <Container maxW='xl' centerContent>

        {/* heading */}
        <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
            <Text
            fontSize="3xl"
            fontFamily="Work sans"
            color='black'
            textAlign="center"
            >Chatting Application</Text>
        </Box>

        {/* login/ignup div */}
        <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        >

            <Tabs isFitted variant='soft-rounded'>
                <TabList mb='1em'>
                    <Tab>Login</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
  )
}

