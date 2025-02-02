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
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your login API call here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store the token in localStorage or a secure cookie
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      // Check if user has completed profile
      const profileResponse = await fetch(`/api/users/${data.userId}`);
      const profileData = await profileResponse.json();

      if (!profileData.height) {
        // If profile is incomplete, redirect to registration
        router.push('/register');
      } else {
        // If profile is complete, redirect to dashboard
        router.push('/dashboard');
      }

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navigation showBack={true} showHome={true} />
      
      <Container maxW="container.sm" pt={20}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} textAlign="center">
            <Heading size="xl">Welcome Back</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Sign in to access your personalized health journey
            </Text>
          </VStack>

          <Box
            as="form"
            onSubmit={handleLogin}
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            shadow="base"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button
                type="submit"
                variant="solid"
                size="lg"
                width="full"
                isLoading={isLoading}
                loadingText="Signing in"
              >
                Sign In
              </Button>
            </VStack>
          </Box>

          <Text textAlign="center">
            Don't have an account?{' '}
            <ChakraLink as={Link} href="/register" color={useColorModeValue('black', 'white')}>
              Create one now
            </ChakraLink>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
} 