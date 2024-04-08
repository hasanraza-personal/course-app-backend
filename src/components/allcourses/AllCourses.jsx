import { Box, useToast, Stack, Card, Link, Flex, Heading, CardBody, StackDivider, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FileEarmarkPdfFill } from 'react-bootstrap-icons';

const AllCourses = () => {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('courses: ', courses);

  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'POST',
        url: '/courses/deletecourse',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          courseid: id
        }
      });

      let updatedCourses = courses.filter((course) => course._id !== id)
      setCourses(updatedCourses);

      toast({
        position: 'top',
        title: "Course deleted successfull",
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

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'courses/showcourses',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        toast({
          position: 'top',
          title: error.response.data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    getAllCourses();
  }, [])
  return (
    <>
      {courses.map((course, id) => (
        <Card key={id} mb={5}>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Course Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {course.coursename}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Auther Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {course.adminname}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Course Description
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {course.coursedesc}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  PDF File
                </Heading>
                {course.adminid === localStorage.getItem("user") ? <>
                  <Flex alignItems="center" gap={2}>
                    <FileEarmarkPdfFill />
                    <Text pt='2' fontSize='sm'>
                      <Link href={course.pdf} isExternal>
                        Click to view
                      </Link>
                    </Text>
                  </Flex>
                </> : <>
                  <Text pt='2' fontSize='sm'>
                    Only authorized admin can see their PDF document
                  </Text>
                </>}
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Delete this course
                </Heading>
                <Button isLoading={loading} colorScheme='red' size='xs' mt="2" onClick={() => handleDelete(course._id)}>Delete</Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  )
}

export default AllCourses
