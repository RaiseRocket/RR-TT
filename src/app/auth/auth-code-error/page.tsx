'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useRouter } from 'next/navigation';

export default function AuthCodeErrorPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <VStack gap={6} py={6} align="center" minH="100vh" justify="center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={6} textAlign="center" maxW="2xl">
            <Box
              p={4}
              borderRadius="full"
              bg="brand.accent"
              color="white"
            >
              <AlertTriangle size={32} />
            </Box>
            <Heading
              as="h1"
              size="xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Authentication Error
            </Heading>
            <Text
              fontSize="md"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              There was an issue with your authentication. This could be due to an expired link or an invalid authentication code.
            </Text>
          </VStack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card
            maxW="md"
            width="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="lg"
          >
            <CardBody p={6}>
              <VStack gap={6}>
                <VStack gap={3} textAlign="center">
                  <Text fontSize="sm" color="brand.neutral.600">
                    Please try signing in again or contact support if the problem persists.
                  </Text>
                </VStack>

                <VStack gap={3} width="100%">
                  <ProfessionalButton
                    variant="primary"
                    size="lg"
                    width="100%"
                    onClick={() => router.push('/auth/signup')}
                  >
                    Try Again
                  </ProfessionalButton>
                  
                  <ProfessionalButton
                    variant="secondary"
                    size="md"
                    width="100%"
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={() => router.push('/')}
                  >
                    Back to Home
                  </ProfessionalButton>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
