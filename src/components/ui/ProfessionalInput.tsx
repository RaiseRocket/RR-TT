'use client';

import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
  Box,
  FormErrorMessage
} from '@chakra-ui/react';
import { forwardRef, memo } from 'react';

interface ProfessionalInputProps extends InputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const ProfessionalInput = memo(forwardRef<HTMLInputElement, ProfessionalInputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {label && (
          <FormLabel
            color="brand.neutral.700"
            fontFamily="heading"
            fontSize="sm"
            fontWeight="600"
            mb={2}
          >
            {label}
          </FormLabel>
        )}
        
        <Input
          ref={ref}
          variant="professional"
          fontSize="md"
          h={12}
          borderRadius="8px"
          transition="all 0.2s ease"
          _focus={{
            borderColor: 'brand.primary',
            boxShadow: '0 0 0 1px #236CFF',
            bg: 'white'
          }}
          _hover={{
            borderColor: 'brand.primary'
          }}
          {...props}
        />
        
        {helperText && !error && (
          <Text
            color="brand.neutral.500"
            fontSize="xs"
            mt={1}
          >
            {helperText}
          </Text>
        )}
        
        <FormErrorMessage fontSize="xs" mt={1}>
          {error}
        </FormErrorMessage>
      </FormControl>
    );
  }
));

ProfessionalInput.displayName = 'ProfessionalInput';