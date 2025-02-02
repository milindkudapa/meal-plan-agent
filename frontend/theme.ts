import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    accent: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        _focus: {
          boxShadow: 'outline',
          outline: 'none',
        },
      },
      variants: {
        solid: {
          bg: 'black',
          color: 'white',
          _hover: {
            bg: 'gray.800',
            _disabled: {
              bg: 'black',
            },
          },
          _active: {
            bg: 'gray.700',
          },
          _dark: {
            bg: 'white',
            color: 'black',
            _hover: {
              bg: 'gray.100',
            },
            _active: {
              bg: 'gray.200',
            },
          },
        },
        outline: {
          borderColor: 'black',
          color: 'black',
          _hover: {
            bg: 'gray.50',
          },
          _dark: {
            borderColor: 'white',
            color: 'white',
            _hover: {
              bg: 'whiteAlpha.200',
            },
          },
        },
        ghost: {
          color: 'black',
          _hover: {
            bg: 'gray.100',
          },
          _dark: {
            color: 'white',
            _hover: {
              bg: 'whiteAlpha.200',
            },
          },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'black',
      },
      _dark: {
        focusBorderColor: 'white',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'black',
      },
      _dark: {
        focusBorderColor: 'white',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'black' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      ':focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
      ':focus-visible': {
        boxShadow: 'outline',
        outline: 'none',
      },
    }),
  },
  space: {
    '4xs': '0.125rem',
    '3xs': '0.25rem',
    '2xs': '0.375rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
  },
  radii: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
});

export default theme; 