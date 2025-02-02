'use client';

import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Text,
  SimpleGrid,
  Icon,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { FaChartLine, FaUtensils, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FeatureProps {
  icon: React.ComponentType;
  title: string;
  text: string;
}

function Feature({ icon, title, text }: FeatureProps) {
  return (
    <VStack
      align="start"
      p={6}
      bg={useColorModeValue('white', 'black')}
      rounded="xl"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'lg',
      }}
    >
      <Box
        p={2}
        bg={useColorModeValue('gray.100', 'gray.900')}
        rounded="md"
        color={useColorModeValue('black', 'white')}
      >
        <Icon as={icon} w={6} h={6} />
      </Box>
      <Heading size="md" mt={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  );
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <Box as="main" minH="100vh" bg={useColorModeValue('white', 'black')}>
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('black', 'white')}
        color={useColorModeValue('white', 'black')}
        py={{ base: 16, md: 24 }}
        px={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              fontWeight="extrabold"
              lineHeight="shorter"
              mb={4}
            >
              Transform Your Health with
              <br />
              AI-Powered Diet Planning
            </Heading>
            
            <Text
              fontSize="xl"
              maxW="2xl"
              opacity={0.9}
            >
              Get personalized meal plans, track your progress, and achieve your health goals
              with our intelligent diet planning system.
            </Text>

            <HStack spacing={4} pt={4}>
              <Button
                as={Link}
                href="/login"
                size="lg"
                variant="solid"
                bg={useColorModeValue('white', 'black')}
                color={useColorModeValue('black', 'white')}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.900') }}
                px={8}
                height="56px"
                fontSize="lg"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                href="/create-account"
                size="lg"
                variant="outline"
                borderColor={useColorModeValue('white', 'black')}
                borderWidth={2}
                _hover={{ bg: useColorModeValue('whiteAlpha.200', 'blackAlpha.200') }}
                px={8}
                height="56px"
                fontSize="lg"
                color="white"
              >
                Create Account
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} px={8} bg={useColorModeValue('white', 'black')}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Everything You Need</Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.400')}
                maxW="2xl"
              >
                Our comprehensive platform provides all the tools you need to maintain
                a healthy lifestyle and achieve your fitness goals.
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
              w="full"
            >
              <Feature
                icon={FaChartLine}
                title="Track Progress"
                text="Monitor your health metrics and see your improvement over time."
              />
              <Feature
                icon={FaUtensils}
                title="AI Meal Plans"
                text="Get personalized meal plans based on your preferences and goals."
              />
              <Feature
                icon={FaHeartbeat}
                title="Health Insights"
                text="Receive detailed insights about your daily activities and health."
              />
              <Feature
                icon={FaCalendarCheck}
                title="Daily Logging"
                text="Keep track of your daily activities and nutrition intake."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
} 