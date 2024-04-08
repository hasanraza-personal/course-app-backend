import { Box, Flex, Button, Modal, useToast, Textarea, Stack, FormControl, FormLabel, ModalOverlay, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    coursename: "",
    coursedesc: "",
    pdf: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const selectPDF = (e) => {
    if (e.target.files[0]) {
      setCredentials({ ...credentials, [e.target.name]: e.target.files[0] });
    }
  }

  const handleSave = async () => {
    if (credentials.coursename.trim().length === 0) {
      toast({
        position: 'top',
        title: "Please provide course name",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (credentials.coursedesc.trim().length === 0) {
      toast({
        position: 'top',
        title: "Please provide coursedesc",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    if (!credentials.pdf) {
      toast({
        position: 'top',
        title: "Please provide course PDF",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('coursename', credentials.coursename);
    formData.append('coursedesc', credentials.coursedesc);
    formData.append('pdf', credentials.pdf);

    try {
      await axios({
        method: 'POST',
        url: '/courses/addcourse',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: formData
      });

      toast({
        position: 'top',
        title: "New course added successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    navigate('/')
  }

  return (
    <>
      {/* Modal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new course</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing='10px'>
              <FormControl>
                <FormLabel>Course name</FormLabel>
                <Input type='text' name="coursename" onChange={onChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Course description</FormLabel>
                <Textarea name="coursedesc" onChange={onChange} placeholder='Here is a sample placeholder' />
              </FormControl>
              <FormControl>
                <FormLabel>Course PDF</FormLabel>
                <Input type='file' name="pdf" onChange={selectPDF} />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave} isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose} isLoading={loading}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal */}

      <Flex boxShadow='xs' h='50px' alignItems='center' p={4} justifyContent='space-between'>
        <Box fontSize={30} ml={1.5}>Coventry University</Box>
        <Flex gap={4} alignItems="center">
          {localStorage.getItem('role') === "admin" &&
            <Button colorScheme='teal' variant='solid' alignItems="center" onClick={onOpen}>
              Add Course
            </Button>
          }
          <Button colorScheme='red' variant='outline' onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Header
