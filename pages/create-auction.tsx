import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Heading,
    Input,
    Text,
    Image
  } from '@chakra-ui/react'
  import { useEthers } from '@usedapp/core'
  import Layout from '../components/layout/Layout'
  
  function Simulate(): JSX.Element {
    const { library } = useEthers()

    return (
      <Layout>
        <Heading as="h1" mb="12">
          Create An Auction
        </Heading>
        <Box maxWidth="container.sm">
         
        </Box>
        <Box>
         </Box>
      </Layout>
    )
  }
  
  export default Simulate
  