'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle,
  Lock,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSigningIn(true);
    setErrors({});
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setErrors({ general: error.message });
      } else {
        // Redirect to dashboard or onboarding
        router.push('/onboarding/profile');
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <MainLayout>
      <VStack gap={6} py={6} align="center" minH="100vh" justify="center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={3} textAlign="center" maxW="2xl">
            <Box
              p={3}
              borderRadius="full"
              bg="brand.primary"
              color="white"
            >
              <Lock size={24} />
            </Box>
            <Heading
              as="h1"
              size="xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Welcome Back
            </Heading>
            <Text
              fontSize="md"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Sign in to access your personalized negotiation strategy and continue your journey.
            </Text>
          </VStack>
        </motion.div>

        {/* Login Form */}
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
              <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                  {errors.general && (
                    <Box
                      p={4}
                      bg="brand.accent.50"
                      border="1px solid"
                      borderColor="brand.accent.200"
                      borderRadius="8px"
                      width="100%"
                    >
                      <Text fontSize="sm" color="brand.accent" fontWeight="500">
                        {errors.general}
                      </Text>
                    </Box>
                  )}

                  <VStack gap={3} width="100%">
                    <ProfessionalInput
                      label="Email Address"
                      type="email"
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      leftIcon={<Mail size={16} />}
                      required
                    />
                    
                    <ProfessionalInput
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                      required
                    />
                  </VStack>

                  <VStack gap={3} width="100%">
                    <Link 
                      color="brand.primary" 
                      href="#" 
                      textDecoration="underline"
                      fontSize="sm"
                      alignSelf="flex-end"
                    >
                      Forgot your password?
                    </Link>

                    <ProfessionalButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      width="100%"
                      isLoading={isSigningIn}
                      loadingText="Signing In..."
                    >
                      Sign In
                    </ProfessionalButton>

                    <Text fontSize="xs" color="brand.neutral.500" textAlign="center">
                      Don't have an account?{' '}
                      <Link color="brand.primary" href="/auth/signup" textDecoration="underline">
                        Create one here
                      </Link>
                    </Text>
                  </VStack>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HStack gap={6} flexWrap="wrap" justify="center" color="brand.neutral.600" fontSize="sm">
            <HStack>
              <Shield size={14} color="#00A651" />
              <Text fontWeight="500">Bank-level Security</Text>
            </HStack>
            <HStack>
              <CheckCircle size={14} color="#00A651" />
              <Text fontWeight="500">Your Data is Protected</Text>
            </HStack>
          </HStack>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
