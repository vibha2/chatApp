import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import ChatService from '../services/ChatService';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChat from '../components/miscellaneous/MyChat';
import ChatBox from '../components/miscellaneous/ChatBox';

const ChatPage = () => {
    const { user } = ChatState();
    console.log("user=> ", user)
  return (
    <div style={{ width: "100%" }}>
    
      {user && <SideDrawer /> }
      {/* <SideDrawer /> */}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      >
        { user && <MyChat /> }
        { user && <ChatBox /> }
        {/* <MyChat />
        <ChatBox /> */}
      </Box>
    </div>
  )
}

export default ChatPage