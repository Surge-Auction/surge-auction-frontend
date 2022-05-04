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
  Stack,
  Flex,
  Spacer,
  useControllableProp,
  useControllableState,
  Tooltip
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import Layout from '../components/layout/Layout';
import React, { useState, useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

function Simulate(): JSX.Element {
  const { library } = useEthers();
  /* Equation values */
  const [maximaValue, setMaximaValue] = useState(0);
  const [floorPriceValue, setFloorpriceValue] = useState(0);
  const [surgeAmount, setSurgeAmount] = useState(0);
  const [decayLength, setDecayLength] = useState(0);

  const [tValue, setTValue] = useState(0);

  const [showTooltipFloorPrice, setShowTooltipFloorPrice] = useState(false);
  const [showTooltipMaxima, setShowTooltipMaxima] = useState(false);
  const [showTooltipSurgeAmount, setShowTooltipSurgeAmount] = useState(false);
  const [showTooltipDecayL, setShowTooltipDecayL] = useState(false);

  /* Bool for start/stop button */
  const [start, setStart] = useState(false);

  /* FunctionPlot stuff */
  /* I really dislike how functionPlot is set here, 
  would rather it be a component */
  const ref = useRef(null);
  const inputRef = useRef(null);
  const contentsBounds = ref;
  let width = 1000;
  let height = 800;
  const ratio = contentsBounds.width / width;
  width *= ratio;
  height *= ratio;

  useEffect(() => {
    functionPlot({
      target: '#graph',
      width,
      height,
      yAxis: { domain: [-1, 50] },
      grid: true,
      data: [
        {
          fn: `${10}*sqrt(x/10)`
        },
        {
          fn: `${floorPriceValue}*sqrt(${maximaValue}/10)`
        }
      ]
    });
  }, [floorPriceValue, maximaValue]);

  /* End of the function plot */

  return (
    <Layout>
      <Heading as="h1" mb="12">
        Simulate A Surge Auction
      </Heading>
      <Box maxWidth="container.sm">
        <Box pb={5}>
          <Stack align="center">
            <div ref={ref} id="graph"></div>
          </Stack>
          <Box pt={5}>
            <Stack spacing={4} direction="row" align="center">
              {/* Start/Stop */}
              <Button colorScheme="teal" variant="outline">
                Start
              </Button>
              <Button colorScheme="teal" variant="outline">
                Reset
              </Button>
              <Button colorScheme="teal" variant="outline">
                Simulate Mint
              </Button>
              <Spacer />
              <Box>
                <Text># Block</Text>
              </Box>
            </Stack>
          </Box>
          {/* New Slider */}
        </Box>

        <Box>
          {/* Sliders */}
          <Box pb={5}>
            <InputGroup size="sm">
              <InputLeftAddon children="Floor Price" />
              <Input placeholder="" />
              <InputRightAddon children="ETH" />
            </InputGroup>
            <Slider
              aria-label="slider-ex-6"
              onChangeEnd={(val) => setFloorpriceValue(val)}
              onMouseEnter={() => setShowTooltipFloorPrice(true)}
              onMouseLeave={() => setShowTooltipFloorPrice(false)}
            >
              <SliderMark value={0} mt="1" ml="1" fontSize="sm">
                0
              </SliderMark>
              <SliderMark value={93.5} mt="1" ml="1" fontSize="sm">
                1000
              </SliderMark>
              <SliderMark
                value={floorPriceValue}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              ></SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                isOpen={showTooltipFloorPrice}
                label={`${floorPriceValue}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>

          {/* New Slider */}
          <Box pb={5}>
            <InputGroup size="sm">
              <InputLeftAddon children="Maxima" />
              <Input placeholder="" />
              <InputRightAddon children="#" />
            </InputGroup>

            <Slider
              aria-label="slider-ex-6"
              onChange={(val) => setMaximaValue(val)}
              onMouseEnter={() => setShowTooltipMaxima(true)}
              onMouseLeave={() => setShowTooltipMaxima(false)}
            >
              <SliderMark value={0} mt="1" ml="1" fontSize="sm">
                0
              </SliderMark>

              <SliderMark value={92.5} mt="1" ml="1" fontSize="sm">
                10000
              </SliderMark>
              <SliderMark
                value={maximaValue}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              ></SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                isOpen={showTooltipMaxima}
                label={`${maximaValue}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
        </Box>
        {/* New Slider */}
        <Box pb={5}>
          <InputGroup size="sm">
            <InputLeftAddon children="Surge Amount" />
            <Input placeholder="" />
            <InputRightAddon children="%" />
          </InputGroup>
          <Slider
            aria-label="slider-ex-6"
            onChange={(val) => setFloorpriceValue(val)}
            onMouseEnter={() => setShowTooltipSurgeAmount(true)}
            onMouseLeave={() => setShowTooltipSurgeAmount(false)}
          >
            <SliderMark value={0} mt="1" ml="1" fontSize="sm">
              0
            </SliderMark>

            <SliderMark value={93} mt="1" ml="1" fontSize="sm">
              100%
            </SliderMark>
            <SliderMark
              value={floorPriceValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            ></SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltipSurgeAmount}
              label={`${surgeAmount}%`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>
        {/* New Slider */}
        <Box pb={5}>
          <InputGroup size="sm">
            <InputLeftAddon children="Decay Length" />
            <Input placeholder="" />
            <InputRightAddon children="Blocks" />
          </InputGroup>
          <Slider
            aria-label="slider-ex-6"
            onChange={(val) => setFloorpriceValue(val)}
            onMouseEnter={() => setShowTooltipDecayL(true)}
            onMouseLeave={() => setShowTooltipDecayL(false)}
          >
            <SliderMark value={0} mt="1" ml="1" fontSize="sm">
              0
            </SliderMark>
            <SliderMark value={93.5} mt="1" ml="1" fontSize="sm">
              1000
            </SliderMark>
            <SliderMark
              value={floorPriceValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            ></SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltipDecayL}
              label={`${decayLength}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>
      </Box>
    </Layout>
  );
}

export default Simulate;
