'use client';

import {
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
  Text,
  FormErrorMessage
} from '@chakra-ui/react';
import { forwardRef, memo } from 'react';

interface ProfessionalTextareaProps extends TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const ProfessionalTextarea = memo(forwardRef<HTMLTextAreaElement, ProfessionalTextareaProps>(
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
        
        <Textarea
          ref={ref}
          variant="outline"
          fontSize="md"
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

ProfessionalTextarea.displayName = 'ProfessionalTextarea';
