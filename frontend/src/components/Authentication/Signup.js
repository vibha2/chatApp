import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmPasword, setConfirmPasword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

     const navigate = useNavigate();
     const toast = useToast();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {

      setLoading(true);

      if(pics === undefined)
      {
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if(pics.type==="image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics );
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dfpprnbko")
        fetch("https://api.cloudinary.com/v1_1/dfpprnbko/image/upload", {
          method: 'post',
          body: data,
        }).then((res) => res.json({ })
          .then(data => {
            setPic(data.url.toString()); //this is cotaining url
            console.log("image uploaded successfully", data.url.toString());
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          })
      )
      }else{
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

    }

    const submitHandler = async() => {

      setLoading(true);
      if(!name || !email || !password || !confirmPasword){
        toast({
          title: 'Please Fill all the Fields!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      if(password !== confirmPasword){
        toast({
          title: 'Password do not match',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

    const data = {
      name,
      email,
      password,
      pic
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Api call
    try{
      UserService.registerUser(data,config)
      .then(
        data => {
          console.log("Signup User Successfully", data);

          toast({
          title: 'Registration Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom",
          });

          localStorage.setItem("userInfo", JSON.stringify(data));
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
        console.log("Failed to register user:", error);
        toast({
          title: 'Error Occured!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom",
          });
          setLoading(false);
        // toast.error("Item uploading failed");
      }
    


    }

  return (
    <VStack spacing='18px'>
       <FormControl id='first-name' isRequired >
       <FormLabel>Name</FormLabel>
        <Input
        placeholder='Enter Your Name'
        onChange={(e) => setName(e.target.value) }
         />
       </FormControl>

       <FormControl id='email' isRequired >
       <FormLabel>Email</FormLabel>
        <Input
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
            onChange={(e) => setPassword(e.target.value) }
            />

            <InputRightElement width='4.5rem'>
                <Button h="1.75rem" size="sm" onClick={handleClick} >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
       </FormControl>

       <FormControl id='confirm-password' isRequired >
       <FormLabel>Confirm Password</FormLabel>
       <InputGroup>
            <Input
            type={show ? "text" : "password"}
            placeholder='Enter Your confirmPasword'
            onChange={(e) => setConfirmPasword(e.target.value) }
            />

            <InputRightElement width='4.5rem'>
                <Button h="1.75rem" size="sm" onClick={handleClick} >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
       </FormControl>

       <FormControl id='pic' isRequired >
       <FormLabel>Upload your Picture</FormLabel>
            <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0]) }
            />
       </FormControl>

       <Button
       colorScheme='blue'
       width="100%"
       color="white"
       style={{ marginTop: 15}}
       onClick={submitHandler}
       isLoading = {loading}
       >
        Sign Up
       </Button>

    </VStack>
  )
}

export default Signup