'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { FaHeartbeat, FaMoon, FaRunning, FaUtensils } from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  averageSleepScore: number;
  averageHeartRate: number;
  totalDaysLogged: number;
  lastMealPlan?: {
    date: string;
    totalCalories: number;
  };
}

function StatCard({ label, value, icon, helpText }: {
  label: string;
  value: string | number;
  icon: React.ComponentType;
  helpText?: string;
}) {
  return (
    <Box
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      shadow="base"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack align="start" spacing={2}>
        <Icon as={icon} boxSize={6} color="brand.500" />
        <Stat>
          <StatLabel fontSize="lg">{label}</StatLabel>
          <StatNumber fontSize="2xl">{value}</StatNumber>
          {helpText && <StatHelpText>{helpText}</StatHelpText>}
        </Stat>
      </VStack>
    </Box>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    averageSleepScore: 0,
    averageHeartRate: 0,
    totalDaysLogged: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    };

    const fetchStats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/users/${userId}/stats`);
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    fetchStats();
  }, [router]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navigation showBack={false} showHome={false} />
      
      <Container maxW="container.xl" pt={20}>
        <VStack spacing={8} align="stretch">
          <VStack align="start" spacing={2}>
            <Heading size="xl">Dashboard</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Track your health metrics and manage your daily activities
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard
              label="Sleep Quality"
              value={`${stats.averageSleepScore.toFixed(1)}/100`}
              icon={FaMoon}
              helpText="30-day average"
            />
            <StatCard
              label="Heart Rate"
              value={`${stats.averageHeartRate.toFixed(0)} BPM`}
              icon={FaHeartbeat}
              helpText="Average resting rate"
            />
            <StatCard
              label="Days Logged"
              value={stats.totalDaysLogged}
              icon={FaRunning}
              helpText="Total entries"
            />
            <StatCard
              label="Last Meal Plan"
              value={stats.lastMealPlan?.totalCalories || 'No data'}
              icon={FaUtensils}
              helpText={stats.lastMealPlan?.date ? new Date(stats.lastMealPlan.date).toLocaleDateString() : 'Generate a plan'}
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Button
              as={Link}
              href="/daily"
              size="lg"
              variant="solid"
              height="64px"
              leftIcon={<FaRunning />}
            >
              Log Today's Activities
            </Button>
            <Button
              as={Link}
              href="/mealplan"
              size="lg"
              variant="outline"
              height="64px"
              leftIcon={<FaUtensils />}
            >
              View Meal Plan
            </Button>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
} 