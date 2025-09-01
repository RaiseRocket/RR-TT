import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      // TurboTax-inspired professional colors
      primary: '#236CFF',        // TurboTax blue
      primaryDark: '#1E5BCC',    // Darker blue for hover states
      secondary: '#00A651',      // Success green
      accent: '#FF4444',         // Alert red
      
      // Professional grayscale palette
      neutral: {
        50: '#F8F9FA',
        100: '#F1F3F4', 
        200: '#E8EAED',
        300: '#DADCE0',
        400: '#9AA0A6',
        500: '#5F6368',
        600: '#3C4043',
        700: '#202124',
        800: '#1A1A1A',
        900: '#000000'
      },
      
      // Legacy space colors (updated for professional use)
      electricBlue: '#236CFF',
      cosmicOrange: '#FF4444', 
      lunarGreen: '#00A651',
      deepSpace: '#202124',
      stellarWhite: '#FFFFFF',
      nebulaGray: '#9AA0A6',
      auroraPurple: '#8B5CF6'
    }
  },
  fonts: {
    // TurboTax uses Avenir Next, fallback to system fonts
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem'
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'white',
          fontWeight: '600',
          borderRadius: '8px',
          px: 6,
          py: 3,
          fontSize: 'md',
          _hover: {
            bg: 'brand.primaryDark',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(35, 108, 255, 0.3)'
          },
          _active: {
            transform: 'translateY(0px)'
          },
          _focus: {
            boxShadow: '0 0 0 3px rgba(35, 108, 255, 0.3)'
          },
          transition: 'all 0.2s ease-in-out'
        },
        secondary: {
          bg: 'transparent',
          color: 'brand.primary',
          border: '2px solid',
          borderColor: 'brand.primary',
          fontWeight: '600',
          borderRadius: '8px',
          px: 6,
          py: 3,
          fontSize: 'md',
          _hover: {
            bg: 'brand.primary',
            color: 'white',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(35, 108, 255, 0.2)'
          },
          _active: {
            transform: 'translateY(0px)'
          },
          _focus: {
            boxShadow: '0 0 0 3px rgba(35, 108, 255, 0.3)'
          },
          transition: 'all 0.2s ease-in-out'
        },
        accent: {
          bg: 'brand.secondary',
          color: 'white',
          fontWeight: '600',
          borderRadius: '8px',
          px: 6,
          py: 3,
          fontSize: 'md',
          _hover: {
            bg: '#008A42',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 166, 81, 0.3)'
          },
          _active: {
            transform: 'translateY(0px)'
          },
          _focus: {
            boxShadow: '0 0 0 3px rgba(0, 166, 81, 0.3)'
          },
          transition: 'all 0.2s ease-in-out'
        }
      }
    },
    Input: {
      variants: {
        professional: {
          field: {
            bg: 'white',
            border: '2px solid',
            borderColor: 'brand.neutral.300',
            color: 'brand.neutral.700',
            borderRadius: '8px',
            fontSize: 'md',
            px: 4,
            py: 3,
            _hover: {
              borderColor: 'brand.primary',
            },
            _focus: {
              borderColor: 'brand.primary',
              boxShadow: '0 0 0 1px #236CFF',
            },
            _placeholder: {
              color: 'brand.neutral.400'
            }
          }
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.neutral.700',
        fontFamily: 'body'
      },
      '*': {
        scrollBehavior: 'smooth'
      }
    }
  }
});

export default theme;