import axios_api from "../axios";

const ChatService = {

    getAllChats: async function(){
        try{
            const response = axios_api.get('/chat');
            console.log("response=> ", response);
            return response? response: null;
        }
        catch(error){
            console.log("error in getAllChats api call=> ", error);
        }
    }

}

export default ChatService