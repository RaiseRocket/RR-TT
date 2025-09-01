'use client';

import { Box, Text, VStack, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ProfessionalLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfessionalLoader = ({ 
  message = "Processing your information...", 
  size = 'md' 
}: ProfessionalLoaderProps) => {
  const sizeMap = {
    sm: { spinner: 'md', text: 'sm' },
    md: { spinner: 'lg', text: 'md' },
    lg: { spinner: 'xl', text: 'lg' }
  };

  const dimensions = sizeMap[size];

  return (
    <VStack gap={4}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Spinner
          thickness="3px"
          speed="0.8s"
          emptyColor="brand.neutral.200"
          color="brand.primary"
          size={dimensions.spinner}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Text
          color="brand.neutral.600"
          fontFamily="heading"
          fontSize={dimensions.text}
          textAlign="center"
          fontWeight="500"
        >
          {message}
        </Text>
      </motion.div>
    </VStack>
  );
};