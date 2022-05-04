import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import React, { useState, useEffect, useRef } from 'react'
import functionPlot from 'function-plot'

function Simulate(): JSX.Element {
  /* Equation values */
  const [floorPriceValue, setFloorpriceValue] = useState(10)
  // Have maxima default to result of tValue
  const [maximaValue, setMaximaValue] = useState(20)
  // Surge amount as a percentage.  As the maxima is >= 1, surge amount cannot exceed 100%
  const [surgeAmount, setSurgeAmount] = useState(0)
  const [decayLength, setDecayLength] = useState(1)

  // How to calc t is yet to be known
  const [tValue, setTValue] = useState(maximaValue)

  // Final price
  const [priceValue, setPriceValue] = useState(1)

  // Block Countin'
  const [blockCounter, setBlockCounter] = React.useState(1)

  /* Buttons */
  // Bool for start/stop button
  const [startButton, setStartButton] = useState(false)
  const [resetButton, setResetButton] = useState(false)

  /* Parse numba to numba with % */
  const format = (val) => val + `%`
  const parse = (val) => val.toString().replace(/^\$/, '')

  /* FunctionPlot stuff */
  const ref = useRef(null)
  const inputRef = useRef(null)
  const contentsBounds = ref
  let width: number
  let height: number
  const ratio: number = contentsBounds.width / width
  width *= ratio
  height *= ratio

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
    })
  }, [floorPriceValue, maximaValue, tValue])

  /* End of the function plot */

  /* Block Counter */
  // 1 block every ~sec
  useEffect(() => {
    let timer: any
    if (startButton == true) {
      timer = blockCounter > 0 && setInterval(() => setBlockCounter(blockCounter + 1), 1000)

      if (resetButton == true) {
        setResetButton(false)
        setStartButton(false)
        setBlockCounter(1)
      }
      return () => clearInterval(timer)
    }

    if (resetButton == true) {
      setBlockCounter(1)
      clearInterval(timer)
      setResetButton(false)
    }
  }, [startButton, resetButton, blockCounter])

  /* Update final price */
  useEffect(() => {
    let priceIsWright: number = floorPriceValue * Math.sqrt(maximaValue / tValue)
    setPriceValue(priceIsWright)
  }, [floorPriceValue, maximaValue, tValue])

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

              {startButton ? (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => setStartButton((event) => !event)}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => setStartButton((event) => !event)}
                >
                  Start
                </Button>
              )}

              <Button colorScheme="teal" variant="outline" onClick={() => setResetButton(true)}>
                Reset
              </Button>
              <Button colorScheme="teal" variant="outline">
                Simulate Mint
              </Button>
              <Spacer />
              <Box>
                <Text>
                  Price: {priceValue} Ξ | Block {blockCounter}
                </Text>
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
          <Box pt={3} pb={5}>
            <Text pb={2}>Maxima</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setMaximaValue(Number(val))}
              value={maximaValue}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box pb={5}>
            <Text pb={2}>T Value</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setTValue(Number(val))}
              value={tValue}
              min={1}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          {/* Surge Amount */}
          <Box pb={5}>
            <Text pb={2}>Surge Amount</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setSurgeAmount(parse(Number(val)))}
              value={format(surgeAmount)}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          {/* Decay Length */}
          <Box pb={5}>
            <Text pb={2}>Decay Length</Text>
            {/* Number Input */}
            <NumberInput
              onChange={(val) => setDecayLength(Number(val))}
              value={decayLength}
              min={1}
              max={1000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          {/* End Inputs */}
        </Box>
      </Box>
    </Layout>
  )
}

export default Simulate
