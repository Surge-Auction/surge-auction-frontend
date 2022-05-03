import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import Layout from '../components/layout/Layout'
import React, {useState} from 'react'

function Simulate(): JSX.Element {
  const { library } = useEthers()
  const [maximaValue, setMaximaValue] = useState(0)
  const [floorPriceValue, setFloorpriceValue] = useState(0)
  
  return (
    <Layout>
      <Heading as="h1" mb="12">
        Simulate A Surge Auction
      </Heading>
      <Box maxWidth="container.sm">
    <Box pb={5}>
      <Image src='/images/JustLikeInTheSimulations.jpg' alt='Just like in the simulations'/>
    
     {/* New Slider */}
     <Box pt={5} pb={5}>
    <InputGroup size='sm'>
    <InputLeftAddon children='Current Block' />
    <Input placeholder=''/>
  </InputGroup>
    <Slider aria-label='slider-ex-6' onChange={(val) => setFloorpriceValue(val)}>
    <SliderMark value={0} mt='1' ml='1' fontSize='sm'>
        0
      </SliderMark>

      <SliderMark value={88} mt='1' ml='1' fontSize='sm'>
      Block 1000
      </SliderMark>
      <SliderMark
        value={floorPriceValue}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
      >
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    </Box>
    </Box>
    
    <Box>
    <Box pb={5}>
    <Button colorScheme="teal" variant="outline">
          Simulate Mint
    </Button>
    </Box>
    {/* Sliders */}
    <Box pb={5}>
    <InputGroup size='sm'>
    <InputLeftAddon children='Floor Price' />
    <Input placeholder=''/>
  </InputGroup>
    <Slider aria-label='slider-ex-6' onChange={(val) => setFloorpriceValue(val)}>
    <SliderMark value={0} mt='1' ml='1' fontSize='sm'>
        0
      </SliderMark>

      <SliderMark value={88.7} mt='1' ml='1' fontSize='sm'>
      1000 ETH
      </SliderMark>
      <SliderMark
        value={floorPriceValue}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
      >
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    </Box>
   
      {/* New Slider */}
      <Box pb={5}>

      <InputGroup size='sm'>
    <InputLeftAddon children='Maxima' />
    <Input placeholder='' />
  </InputGroup>
 
      <Slider aria-label='slider-ex-6' onChange={(val) => setMaximaValue(val)}>
      <SliderMark value={0} mt='1' ml='1' fontSize='sm'>
        0
      </SliderMark>
      
      <SliderMark value={92} mt='1' ml='1' fontSize='sm'>
        10000
      </SliderMark>
      <SliderMark
        value={maximaValue}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
      >
        
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    </Box>
      </Box>
       {/* New Slider */}
    <Box pb={5}>
    <InputGroup size='sm'>
    <InputLeftAddon children='Surge Amount' />
    <Input placeholder=''/>
  </InputGroup>
    <Slider aria-label='slider-ex-6' onChange={(val) => setFloorpriceValue(val)}>
    <SliderMark value={0} mt='1' ml='1' fontSize='sm'>
        0
      </SliderMark>

      <SliderMark value={88.7} mt='1' ml='1' fontSize='sm'>
      1000 ETH
      </SliderMark>
      <SliderMark
        value={floorPriceValue}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
      >
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    </Box>
       {/* New Slider */}
    <Box pb={5}>
    <InputGroup size='sm'>
    <InputLeftAddon children='Decay Length' />
    <Input placeholder=''/>
  </InputGroup>
    <Slider aria-label='slider-ex-6' onChange={(val) => setFloorpriceValue(val)}>
    <SliderMark value={0} mt='1' ml='1' fontSize='sm'>
        0
      </SliderMark>
      <SliderMark value={87} mt='1' ml='1' fontSize='sm'>
      1000 Blocks
      </SliderMark>
      <SliderMark
        value={floorPriceValue}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
      >
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    </Box>
      </Box>
     
    </Layout>
  )
}

export default Simulate
