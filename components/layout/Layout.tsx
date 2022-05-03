import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Text,
  ColorModeScript
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import { useEthers, useNotifications } from '@usedapp/core';
import blockies from 'blockies-ts';
import NextLink from 'next/link';
import React from 'react';
import Balance from '../Balance';
import ConnectWallet from '../ConnectWallet';
import Head, { MetaProps } from './Head';
import Theme from './Theme';

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any;
  }
}

/**
 * Constants & Helpers
 */

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed'
};

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...');
}

/**
 * Prop Types
 */
interface LayoutProps {
  children: React.ReactNode;
  customMeta?: MetaProps;
}

/**
 * Component
 */
const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, deactivate } = useEthers();
  const { notifications } = useNotifications();
  const { colorMode, toggleColorMode } = useColorMode();

  let blockieImageSrc;
  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account }).toDataURL();
  }

  return (
    <>
      <Head customMeta={customMeta} />
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <header>
        <Flex minWidth="max-content">
          <Container minWidth="max-content" alignItems="center" flex="">
            <SimpleGrid
              columns={[1, 1, 1, 2]}
              alignItems="center"
              justifyContent="space-between"
              py="8"
            >
              <Flex>
                <Flex pt={0.65}>
                  <NextLink href="/" passHref>
                    <Link px="4" py="1">
                      Home
                    </Link>
                  </NextLink>
                  <NextLink href="/create-auction" passHref>
                    <Link px="4" py="1">
                      Create Auction
                    </Link>
                  </NextLink>
                  <NextLink href="/simulate" passHref>
                    <Link px="4" py="1">
                      Simulate
                    </Link>
                  </NextLink>
                  <NextLink href="https://abrandecarlo.gitbook.io/surge-auction/" passHref>
                    <Link px="4" py="1">
                      Docs
                    </Link>
                  </NextLink>
                </Flex>
                {account ? (
                  <Flex justifyContent={'flex-end'}>
                    <Menu placement="bottom-end">
                      <MenuButton as={Button} ml="4">
                        {truncateHash(account)}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={deactivate}>Disconnect</MenuItem>
                      </MenuList>
                    </Menu>
                    <IconButton ml="4" aria-label="Toggle Mode" onClick={toggleColorMode}>
                      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </IconButton>
                  </Flex>
                ) : (
                  <Flex justifyContent={'flex-end'}>
                    <ConnectWallet />
                    <Flex
                      order={[-1, null, null, 2]}
                      alignItems={'center'}
                      justifyContent={'flex-end'}
                    >
                      <IconButton ml="4" aria-label="Toggle Mode" onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                      </IconButton>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </SimpleGrid>
          </Container>
        </Flex>
      </header>
      <main>
        <Container maxWidth="container.xl">
          {children}
          {notifications.map((notification) => {
            if (notification.type === 'walletConnected') {
              return null;
            }
            return (
              <Alert
                key={notification.id}
                status="success"
                position="fixed"
                bottom="8"
                right="8"
                width="400px"
              >
                <AlertIcon />
                <Box>
                  <AlertTitle>{TRANSACTION_TITLES[notification.type]}</AlertTitle>
                  <AlertDescription overflow="hidden">
                    Transaction Hash: {truncateHash(notification.transaction.hash, 61)}
                  </AlertDescription>
                </Box>
              </Alert>
            );
          })}
        </Container>
      </main>

      <footer>
        <Flex minWidth="max-content">
          <Container minWidth="max-content" alignItems="center" flex="">
            <SimpleGrid
              columns={[1, 1, 1, 2]}
              alignItems="center"
              justifyContent="space-between"
              py="8"
            >
              <Flex>
                <Text px="4" py="1">
                  Built by <Link href="https://twitter.com/abran_decarlo">Abran DeCarlo</Link>
                </Text>
                <Spacer />
                <Link px="4" py="1">
                  Github
                </Link>
              </Flex>
            </SimpleGrid>
          </Container>
        </Flex>
      </footer>
    </>
  );
};

export default Layout;
