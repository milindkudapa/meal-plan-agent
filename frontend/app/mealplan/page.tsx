'use client';

import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import Navigation from '@/components/Navigation';
// ... other imports ...

export default function MealPlan() {
  return (
    <Box as="main">
      <Navigation />
      
      <Container maxW="container.xl" py={20}>
        {/* Rest of your existing MealPlan component code */}
      </Container>
    </Box>
  );
} 