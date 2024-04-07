import { Box, Flex } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Flex boxShadow='xs' h='50px' alignItems='center' p={4} justifyContent='space-between'>
        <Box fontSize={30} ml={1.5}>Coventry University</Box>
      </Flex>
    </>
  )
}

export default Header
