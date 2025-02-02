import {
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue,
  useColorMode,
  Box,
  Button,
  Icon,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { FaHome, FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  showBack?: boolean;
  showHome?: boolean;
}

export default function Navigation({ showBack = true, showHome = true }: NavigationProps) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={2}
      shadow="sm"
    >
      <HStack spacing={4} justify="space-between" maxW="container.xl" mx="auto">
        <HStack spacing={2}>
          {showBack && (
            <Tooltip label="Go Back" aria-label="Go back to previous page">
              <IconButton
                aria-label="Go Back"
                icon={<FaArrowLeft />}
                onClick={() => router.back()}
                variant="ghost"
                size="md"
              />
            </Tooltip>
          )}
          
          {showHome && (
            <Tooltip label="Home" aria-label="Go to home page">
              <IconButton
                as={Link}
                href="/"
                aria-label="Home"
                icon={<FaHome />}
                variant="ghost"
                size="md"
              />
            </Tooltip>
          )}
        </HStack>

        <Button
          onClick={toggleColorMode}
          variant="outline"
          size="md"
          leftIcon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} boxSize={5} />}
          display={{ base: 'none', sm: 'flex' }}
          px={6}
          h="40px"
        >
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>

        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          icon={colorMode === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          onClick={toggleColorMode}
          variant="outline"
          size="md"
          display={{ base: 'flex', sm: 'none' }}
        />
      </HStack>
    </Box>
  );
} 