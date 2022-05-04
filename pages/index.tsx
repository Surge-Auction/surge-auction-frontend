import { Box, Divider, Text, Center } from '@chakra-ui/react';

import React from 'react';
import Layout from '../components/layout/Layout';

function HomeIndex(): JSX.Element {
  return (
    <Layout>
      <Center>
        <Text fontSize="8xl">Surge Auction</Text>
      </Center>
      <Box maxWidth="100%" p="8" mt="8">
        <Text>Getting Started</Text>
        <Divider my="8" borderColor="gray.400" w="100%" />
      </Box>
    </Layout>
  );
}

export default HomeIndex;
