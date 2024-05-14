import React, { useEffect, useState } from 'react';
import ChatService from '../services/ChatService';

function ChatPage() {
    const [chats, setChats] = useState([]);

    const fetchChats = async() => {
        console.log("hello");
        ChatService.getAllChats().then(
        (res) => {
            console.log("res in chatpage=> ", res?.data);
            setChats(res?.data);
        },
        (err) => {
            console.log("err=> ",err);
        }
    )
    .catch(error =>{
        console.error(error)
      });
        
    }

    useEffect(() => {
        fetchChats();
    }, [])

  return (
    <div>
        {
            chats.map(chat => 
            <div key={chat._id}
            >{chat.chatName}</div>
            )
        }
    </div>
  )
}

export default ChatPage