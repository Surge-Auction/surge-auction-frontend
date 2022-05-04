import {
  Box,
  Button,
  Heading,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Stack,
  Spacer,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import React, { useState, useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

function Simulate(): JSX.Element {
  /* Equation values */
  const [floorPriceValue, setFloorpriceValue] = useState(10);
  // Have maxima default to result of tValue
  const [maximaValue, setMaximaValue] = useState(20);
  // Surge amount as a percentage.  Cannot exceed 100% (maxima)
  const [surgeAmount, setSurgeAmount] = useState(1);
  const [decayLength, setDecayLength] = useState(1);

  // How to calc t is yet to be known
  const [tValue, setTValue] = useState(maximaValue);

  // Final price
  const [price, setPrice] = useState(1);

  const [blockCounter, setBlockCounter] = React.useState(1);

  /* Slider Tooltip values */
  const [showTooltipMaxima, setShowTooltipMaxima] = useState(false);
  const [showTooltipSurgeAmount, setShowTooltipSurgeAmount] = useState(false);
  const [showTooltipDecayL, setShowTooltipDecayL] = useState(false);
  const [showTooltipTValue, setShowTooltipTValue] = useState(false);

  /* Buttons */
  // Bool for start/stop button
  const [startButton, setStartButton] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  /* FunctionPlot stuff */
  /* I really dislike how functionPlot is set here, 
  would rather it be a component */
  const ref = useRef(null);
  const inputRef = useRef(null);
  const contentsBounds = ref;
  let width: number;
  let height: number;
  const ratio: number = contentsBounds.width / width;
  width *= ratio;
  height *= ratio;

  useEffect(() => {
    functionPlot({
      target: '#graph',
      width,
      height,
      xAxis: { domain: [0, 50] },
      yAxis: { domain: [0, 100] },
      grid: true,
      data: [
        {
          fn: `${floorPriceValue}*sqrt(x/10)`
        },
        {
          fn: `${floorPriceValue}*sqrt(${maximaValue}/${tValue})`
        }
      ]
    });
  }, [floorPriceValue, maximaValue, tValue]);

  /* End of the function plot */

  useEffect(() => {
    let timer: any;
    if (startButton == true) {
      timer = blockCounter > 0 && setInterval(() => setBlockCounter(blockCounter + 1), 1000);

      if (resetButton == true) {
        setResetButton(false);
        setStartButton(false);
        setBlockCounter(1);
        // Not sure if return needed here
        return () => clearInterval(timer);
      }
      return () => clearInterval(timer);
    }

    if (resetButton == true) {
      setBlockCounter(1);
      clearInterval(timer);
      setResetButton(false);
    }
  }, [startButton, resetButton, blockCounter]);

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
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => setStartButton((event) => !event)}
              >
                Start
              </Button>
              <Button colorScheme="teal" variant="outline" onClick={() => setResetButton(true)}>
                Reset
              </Button>
              <Button colorScheme="teal" variant="outline">
                Simulate Mint
              </Button>
              <Spacer />
              <Box>
                <Text>Block {blockCounter}</Text>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Floor Price */}
        <Box pb={5}>
          <Text pb={2}>Floor Price</Text>
          {/* Number Input */}
          <NumberInput
            onChange={(val) => setFloorpriceValue(Number(val))}
            value={floorPriceValue}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          {/* Maxima */}
          <Box pb={5}>
            <Text pb={2}>Maxima</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setMaximaValue(Number(val))}
              value={maximaValue}
              min={1}
              max={50}
              pb={2}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {/* Slider */}
            <Slider
              aria-label="maxima"
              defaultValue={maximaValue}
              min={1}
              max={100}
              onChange={(val) => setMaximaValue(val)}
              onMouseEnter={() => setShowTooltipMaxima(true)}
              onMouseLeave={() => setShowTooltipMaxima(false)}
            >
              <SliderMark value={0} mt="1" ml="1" fontSize="sm">
                1
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

          {/* Slider */}
          <Box pb={5}>
            <Text pb={2}>T Value</Text>
            {/* Number Input */}
            <NumberInput onChange={(val) => setTValue(Number(val))} value={tValue} max={50}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {/* Slider */}
            <Slider
              aria-label="t value"
              defaultValue={tValue}
              min={1}
              max={100}
              onChange={(val) => setTValue(val)}
              onMouseEnter={() => setShowTooltipTValue(true)}
              onMouseLeave={() => setShowTooltipTValue(false)}
            >
              <SliderMark value={0} mt="1" ml="1" fontSize="sm">
                1
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
                isOpen={showTooltipTValue}
                label={`${tValue}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
          {/* Surge Amount */}
          <Box pb={5}>
            <Text pb={2}>Surge Amount</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setSurgeAmount(Number(val))}
              value={surgeAmount}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {/* Slider */}
            <Slider
              aria-label="Surge Amount"
              defaultValue={surgeAmount}
              min={0}
              max={100}
              onChange={(val) => setSurgeAmount(val)}
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
          {/* Decay Length */}
          <Box pb={5}>
            <Text pb={2}>Decay Length</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setDecayLength(Number(val))}
              value={decayLength}
              max={1000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              aria-label="Decay Length"
              defaultValue={decayLength}
              min={0}
              max={100}
              onChange={(val) => setDecayLength(val)}
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
          {/* End Inputs */}
        </Box>
        {/* End Container */}
        {/* v WHAT DOES THIS BOX LEAD TO v */}
      </Box>
    </Layout>
  );
}

export default Simulate;
