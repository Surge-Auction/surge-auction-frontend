import { Box, Heading } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';

function CreateAuction(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" mb="12">
        Create An Auction
      </Heading>
      <Box maxWidth="container.sm"></Box>
      <Box></Box>
    </Layout>
  );
}

export default CreateAuction;
