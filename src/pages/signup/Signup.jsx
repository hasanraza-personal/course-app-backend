import { Link as ChakraLink, Container, Box, useToast, Stack, FormControl, FormLabel, Input, FormHelperText, Select, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (credentials.fullname.trim().length < 5) {
      toast({
        position: 'top',
        title: "Name should be atleast 5 characters long",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (credentials.username.trim().length < 5) {
      toast({
        position: 'top',
        title: "Username should be atleast 5 characters long",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (credentials.email.trim().length === 0) {
      toast({
        position: 'top',
        title: "Please provide an email",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (!isValidEmail(credentials.email)) {
      toast({
        position: 'top',
        title: "Please provide a valid email address",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (credentials.password.length < 6) {
      toast({
        position: 'top',
        title: "Password must contain atleast 6 characters",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (credentials.role.length !== 0) {
      toast({
        position: 'top',
        title: "Please select your role",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }
    setLoading(true)

    try {
      await axios({
        method: 'POST',
        url: '/auth/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          fullname: credentials.fullname,
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        }
      });
      navigate('/login')

      toast({
        position: 'top',
        title: "User has been registered successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        position: 'top',
        title: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Container shadow='xs' bg='#fff' mt='1px'>
        <Box p='15px 15px 20px 15px' borderRadius='15px'>
          <Box fontWeight='bold' fontSize='1.6rem' mb='5px'>Please register here!</Box>
          <Stack spacing='10px'>
            <FormControl isRequired>
              <FormLabel>Fullname</FormLabel>
              <Input placeholder='Fullname' name="fullname" onChange={onChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder='Username' name="username" onChange={onChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type='email' name="email" onChange={onChange} />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                name="password"
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select placeholder='Select role' name="role" onChange={onChange}>
                <option>admin</option>
                <option>student</option>
              </Select>
            </FormControl>
          </Stack>
          <Button colorScheme='blue' isLoading={loading} w="100%" mt={8} onClick={handleSubmit}>Register</Button>
          <Box mt={2}>
            <ChakraLink as={ReactRouterLink} to='/login'>
              Already have an account? Login
            </ChakraLink>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Signup
