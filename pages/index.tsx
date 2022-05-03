import { Box, Divider, Text, Center } from '@chakra-ui/react'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { providers } from 'ethers'
import React from 'react'
import { YourContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import Layout from '../components/layout/Layout'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const ROPSTEN_CONTRACT_ADDRESS = ''

function HomeIndex(): JSX.Element {
  const { account, chainId, library } = useEthers()

  const isLocalChain =
    chainId === ChainId.Localhost || chainId === ChainId.Hardhat

  const CONTRACT_ADDRESS =
    chainId === ChainId.Ropsten
      ? ROPSTEN_CONTRACT_ADDRESS
      : LOCAL_CONTRACT_ADDRESS

  // Use the localProvider as the signer to send ETH to our wallet
  const { sendTransaction } = useSendTransaction({
    signer: localProvider.getSigner(),
  })

  return (
    <Layout>
      <Center>
        <Text fontSize="8xl">
       Surge Auction
       </Text>
      </Center>
      <Box maxWidth="100%" p="8" mt="8">
       <Text>Getting Started</Text>
        <Divider my="8" borderColor="gray.400" w="100%" />
            </Box>
    </Layout>
  )
}

export default HomeIndex
