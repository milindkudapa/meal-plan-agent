'use client';

import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Progress,
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  max: number;
  icon?: React.ReactElement;
}

function MetricCard({ title, value, max }: MetricCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <VStack spacing={3} align="start">
        <Text fontSize="lg" fontWeight="medium">
          {title}
        </Text>
        <Progress
          value={value}
          max={max}
          w="100%"
          colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}
          borderRadius="full"
        />
        <Text color="gray.500">
          {value} / {max}
        </Text>
      </VStack>
    </Box>
  );
}

export default function DailyLog() {
  const [sleepScore, setSleepScore] = useState(70);
  const [heartRate, setHeartRate] = useState(65);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Add your API call here
      console.log({
        sleep_score: sleepScore,
        resting_heart_rate: heartRate,
        expected_activity_level: activityLevel,
      });
    } catch (error) {
      console.error('Error submitting daily log:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="main" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navigation />
      
      <Container maxW="container.xl" pt={24} pb={20}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={2} align="center" textAlign="center">
            <Heading size="xl">Daily Health Log</Heading>
            <Text color="gray.600" maxW="2xl">
              Track your daily metrics to get personalized meal plans and health insights
            </Text>
          </VStack>

          {/* Metrics Display */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <MetricCard title="Sleep Quality" value={sleepScore} max={100} />
            <MetricCard title="Resting Heart Rate" value={heartRate} max={100} />
            <MetricCard title="Activity Level" value={80} max={100} />
          </SimpleGrid>

          {/* Form */}
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            shadow="sm"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Sleep Score (0-100)</FormLabel>
                <NumberInput
                  value={sleepScore}
                  onChange={(_, value) => setSleepScore(value)}
                  min={0}
                  max={100}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Resting Heart Rate (BPM)</FormLabel>
                <NumberInput
                  value={heartRate}
                  onChange={(_, value) => setHeartRate(value)}
                  min={30}
                  max={200}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Expected Activity Level</FormLabel>
                <Select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </Select>
              </FormControl>

              <Button
                variant="solid"
                size="lg"
                width="full"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Save Daily Log
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 