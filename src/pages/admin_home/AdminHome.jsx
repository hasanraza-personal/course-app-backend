import { Link as ChakraLink, Tabs, Tab, Container, TabList, TabPanels, TabPanel, Box, useToast, Stack, FormControl, FormLabel, Input, FormHelperText, Select, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import AllCourses from '../../components/allcourses/AllCourses';


const AdminHome = () => {
  return (
    <Container shadow='xs' bg='#fff' mt='1px'>
      <Tabs>
        <TabList>
          <Tab>All courses</Tab>
          <Tab>My courses</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllCourses />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default AdminHome
