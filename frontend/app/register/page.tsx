'use client';

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  useToast,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface RegistrationData {
  height: number;
  weight: number;
  age: number;
  activity_level: string;
  desired_weight: number;
  goal_time_period: number;
  geographical_region: string;
  food_preferences: {
    diet_type: string;
    allergies: string[];
    preferred_cuisine: string[];
  };
}

export default function Register() {
  const [formData, setFormData] = useState<RegistrationData>({
    height: 170,
    weight: 70,
    age: 30,
    activity_level: 'moderate',
    desired_weight: 65,
    goal_time_period: 12,
    geographical_region: 'North America',
    food_preferences: {
      diet_type: 'balanced',
      allergies: [],
      preferred_cuisine: [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      toast({
        title: 'Profile created successfully',
        status: 'success',
        duration: 3000,
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navigation />
      
      <Container maxW="container.md" pt={20} pb={10}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading size="xl">Complete Your Profile</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
              Help us create a personalized health and diet plan tailored to your needs
            </Text>
          </VStack>

          <Box
            as="form"
            onSubmit={handleSubmit}
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            shadow="base"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Height (cm)</FormLabel>
                  <NumberInput
                    value={formData.height}
                    onChange={(_, value) => setFormData({ ...formData, height: value })}
                    min={100}
                    max={250}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Current Weight (kg)</FormLabel>
                  <NumberInput
                    value={formData.weight}
                    onChange={(_, value) => setFormData({ ...formData, weight: value })}
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

                <FormControl isRequired>
                  <FormLabel>Age</FormLabel>
                  <NumberInput
                    value={formData.age}
                    onChange={(_, value) => setFormData({ ...formData, age: value })}
                    min={18}
                    max={100}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Target Weight (kg)</FormLabel>
                  <NumberInput
                    value={formData.desired_weight}
                    onChange={(_, value) => setFormData({ ...formData, desired_weight: value })}
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
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Activity Level</FormLabel>
                  <Select
                    value={formData.activity_level}
                    onChange={(e) => setFormData({ ...formData, activity_level: e.target.value })}
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very_active">Very Active</option>
                  </Select>
                  <FormHelperText>Your typical daily activity level</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Goal Time Period (weeks)</FormLabel>
                  <NumberInput
                    value={formData.goal_time_period}
                    onChange={(_, value) => setFormData({ ...formData, goal_time_period: value })}
                    min={4}
                    max={52}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>Recommended: 8-24 weeks</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Region</FormLabel>
                  <Select
                    value={formData.geographical_region}
                    onChange={(e) => setFormData({ ...formData, geographical_region: e.target.value })}
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                  </Select>
                  <FormHelperText>For local food recommendations</FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Diet Type</FormLabel>
                  <Select
                    value={formData.food_preferences.diet_type}
                    onChange={(e) => setFormData({
                      ...formData,
                      food_preferences: { ...formData.food_preferences, diet_type: e.target.value }
                    })}
                  >
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleo">Paleo</option>
                    <option value="keto">Keto</option>
                    <option value="mediterranean">Mediterranean</option>
                  </Select>
                  <FormHelperText>Your preferred diet type</FormHelperText>
                </FormControl>
              </SimpleGrid>

              <Button
                type="submit"
                variant="solid"
                size="lg"
                width="full"
                height="56px"
                fontSize="lg"
                isLoading={isLoading}
                loadingText="Creating Profile"
              >
                Complete Registration
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 