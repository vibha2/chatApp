import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async() => {

      setLoading(true);

      if(!email || !password){
        toast({
          title: 'Please Fill all the Fields',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      
      const data = {
      email,
      password
      }
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

    // Api call
      try{
      UserService.loginUser(data,config)
      .then(
        data => {
          console.log("Login User Successfully", data);

          toast({
          title: 'Login Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom",
          });

          localStorage.setItem("user", JSON.stringify(data));
          setLoading(false);
          navigate('/chat');
        }
      )
      .catch(error =>{
          toast({
          title: 'Error Occured!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom",
          });
          setLoading(false);
          console.error(error)
        });

    }catch(error){
        console.log("Failed to login user:", error);
        toast({
          title: 'Error Occured!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom",
          });
          setLoading(false);
        
      }


    
    }

  return (
    <VStack spacing='18px'>

       <FormControl id='email' isRequired >
       <FormLabel>Email</FormLabel>
        <Input
        value={email}
        placeholder='Enter Your Email'
        onChange={(e) => setEmail(e.target.value) }
         />
       </FormControl>

       <FormControl id='password' isRequired >
       <FormLabel>Password</FormLabel>
       <InputGroup>
            <Input
            type={show ? "text" : "password"}
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            />

            <InputRightElement width='4.5rem'>
                <Button h="1.75rem" size="sm" onClick={handleClick} >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
       </FormControl>


       <Button
       colorScheme='blue'
       width="100%"
       color="white"
       style={{ marginTop: 15}}
       onClick={submitHandler}
       >
        Login
       </Button>

        <Button
        variant="solid"
        colorScheme='red'
        width="100%"
        onClick={()=> {
            setEmail("abc@gmail.com");
            setPassword("123456")
        }}
       >
        Get Guest User Credentials
       </Button>

    </VStack>
  )
}

export default Login