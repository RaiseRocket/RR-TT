'use client';

import { Box, HStack, Text, VStack, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (stepIndex: number) => void;
}

export const ProgressIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps = [], 
  onStepClick 
}: ProgressIndicatorProps) => {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <VStack gap={6} width="100%" maxW="4xl" mx="auto">
      {/* Progress Bar */}
      <Box width="100%">
        <Progress
          value={progressPercentage}
          size="sm"
          colorScheme="blue"
          bg="brand.neutral.200"
          borderRadius="full"
          height="8px"
        />
        <Text
          fontSize="sm"
          color="brand.neutral.600"
          textAlign="center"
          mt={2}
          fontWeight="500"
        >
          Step {currentStep + 1} of {steps.length}
        </Text>
      </Box>

      {/* Step Indicators */}
      <HStack
        gap={{ base: 2, md: 4 }}
        width="100%"
        justify="space-between"
        flexWrap="wrap"
      >
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && (isCompleted || index < currentStep);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{ flex: 1, minWidth: '120px' }}
            >
              <VStack
                gap={2}
                cursor={isClickable ? 'pointer' : 'default'}
                onClick={isClickable ? () => onStepClick(index) : undefined}
                opacity={index > currentStep ? 0.5 : 1}
                transition="opacity 0.2s ease"
              >
                {/* Step Circle */}
                <motion.div
                  whileHover={isClickable ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    width="40px"
                    height="40px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={
                      isCompleted
                        ? 'brand.secondary'
                        : isCurrent
                        ? 'brand.primary'
                        : 'brand.neutral.200'
                    }
                    color={
                      isCompleted || isCurrent ? 'white' : 'brand.neutral.500'
                    }
                    fontWeight="600"
                    fontSize="sm"
                    border={
                      isCurrent
                        ? '3px solid'
                        : isCompleted
                        ? '2px solid'
                        : '2px solid'
                    }
                    borderColor={
                      isCurrent
                        ? 'brand.primary'
                        : isCompleted
                        ? 'brand.secondary'
                        : 'brand.neutral.300'
                    }
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Text fontSize="sm" fontWeight="600">
                        {index + 1}
                      </Text>
                    )}
                  </Box>
                </motion.div>

                {/* Step Text */}
                <VStack gap={1} textAlign="center">
                  <Text
                    fontSize="sm"
                    fontWeight={isCurrent ? '600' : '500'}
                    color={
                      isCurrent
                        ? 'brand.primary'
                        : isCompleted
                        ? 'brand.secondary'
                        : 'brand.neutral.600'
                    }
                    lineHeight="1.2"
                  >
                    {step.title}
                  </Text>
                  {step.description && (
                    <Text
                      fontSize="xs"
                      color="brand.neutral.500"
                      lineHeight="1.2"
                      textAlign="center"
                    >
                      {step.description}
                    </Text>
                  )}
                </VStack>
              </VStack>
            </motion.div>
          );
        })}
      </HStack>
    </VStack>
  );
};
