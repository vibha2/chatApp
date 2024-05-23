import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router';
import  UserService  from '../../services/UserService';
import ChatLoading from '../ChatLoading';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user } = ChatState()
    console.log("user=> ", user.data);
    const navigate = useNavigate();

    const logoutHanndler = () => {
        localStorage.removeItem("userInfo");
        navigate('/')
    }

    const toast = useToast();

    const handleSearch = () => {
        if(!search)
        {
         toast({
          title: 'Please Enter something in search',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        return;
        }

        try{
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                }
            };

            UserService.searchUser(search, config)
            .then(
                data => {
                    console.log("User Searched Successfully=> ", data.data.user);

                    setSearchResult(data.data.user);
                    setLoading(false);
                    
                }
            ).catch(error =>{

                toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
                });
                setLoading(false);
                console.error(error)
        });

            

        }catch(error){
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
                });
                setLoading(false);
                console.error(error)
           }
    };

  return (
    <>
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        >
        <Tooltip label="Search Users to Chat" 
        hasArrow
        placement="bottom-end"
        >
        <Button variant="ghost" onClick={onOpen} >
            <i class="fas fa-search"></i>
            <Text display={{base:"none", md:"flex"}} px="4" >
                Search User
            </Text>
        </Button>

        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans" >
            Chat App
        </Text>

        <div>
            <Menu>
                <MenuButton p={1} >
                    <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
                {/* <MenuList>

                </MenuList> */}
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                    <Avatar 
                    size='sm' 
                    cursor="pointer" 
                    name={user.data.name} 
                    src={user.data.pic}
                      />
                </MenuButton>
                <MenuList>
                    <ProfileModel user={user} >
                         <MenuItem>My Profile</MenuItem>
                    </ProfileModel>
                    <MenuDivider />
                    <MenuItem  onClick={logoutHanndler} >Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>

        </Box>

        {/* side Drawer */}
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" >Search Users</DrawerHeader>

          <DrawerBody>
           <Box
           display="flex"
           pb={2}
           >
           <Input
            placeholder='Search by name or email'
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <Button 
            onClick={handleSearch} 
            >Go</Button>
           </Box>

           { loading? <ChatLoading />: ( 
             <span>result</span>
              /* searchResult?.map((user) => (
                 <UserListItem
                 key={user._id}
                 user={user}
                 handleFunction={()=> accessChat(user._id)}

                /> 
             ))  */
            )
           }
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>

        </Drawer>
    </>
  )
}

export default SideDrawer