import axios_api from "../axios";

const UserService = {

    registerUser: async function(formData, header){
        try{
            const response = axios_api.post('/user', formData, header);
            console.log("response=> ", response);
            return response? response: null;
        }
        catch(error){
            console.log("error in register user=> ", error);
        }
    },

    loginUser: async function(formData, header){
        try{
            const response = axios_api.post('/user/login', formData, header);
            console.log("response=> ", response);
            return response? response: null;
        }
        catch(error){
            console.log("error in login user=> ", error);
        }
    }

}

export default UserService