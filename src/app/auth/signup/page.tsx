'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Icon,
  Checkbox,
  Link,
  Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle,
  DollarSign,
  Target,
  Award,
  Lock,
  Mail
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsCreating(true);
    setErrors({});
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        setErrors({ general: error.message });
      } else {
        setSuccess(true);
        // Store assessment data if it exists
        const assessmentData = localStorage.getItem('assessmentData');
        if (assessmentData) {
          // Assessment data will be saved to user's profile after email confirmation
          localStorage.setItem('pendingAssessmentData', assessmentData);
        }
        
        // Redirect to success page or onboarding
        setTimeout(() => {
          router.push('/onboarding/profile');
        }, 2000);
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsCreating(false);
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
              Create Your Account
            </Heading>
            <Text
              fontSize="md"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Join thousands of professionals who have successfully negotiated better offers.
            </Text>
          </VStack>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} width="100%" maxW="3xl">
            {[
              {
                icon: Target,
                title: "Personalized Strategy",
                description: "Custom negotiation plan tailored to your situation."
              },
              {
                icon: DollarSign,
                title: "Proven Templates",
                description: "Email templates and scripts that work."
              },
              {
                icon: Award,
                title: "Expert Support",
                description: "Guidance from certified negotiation experts."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card
                  height="100%"
                  bg="brand.neutral.50"
                  border="1px solid"
                  borderColor="brand.neutral.200"
                  borderRadius="8px"
                >
                  <CardBody p={4}>
                    <VStack gap={3} align="start">
                      <Box
                        p={2}
                        borderRadius="full"
                        bg="brand.primary"
                        color="white"
                      >
                        <Icon as={benefit.icon} boxSize={5} />
                      </Box>
                      <VStack gap={1} align="start">
                        <Heading
                          as="h3"
                          size="sm"
                          fontFamily="heading"
                          color="brand.neutral.700"
                          fontWeight="600"
                        >
                          {benefit.title}
                        </Heading>
                        <Text color="brand.neutral.600" lineHeight="tall" fontSize="xs">
                          {benefit.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
                  {success && (
                    <Box
                      p={4}
                      bg="brand.secondary.50"
                      border="1px solid"
                      borderColor="brand.secondary.200"
                      borderRadius="8px"
                      width="100%"
                    >
                      <HStack gap={2}>
                        <CheckCircle size={16} color="#00A651" />
                        <Text fontSize="sm" color="brand.secondary" fontWeight="500">
                          Account created successfully! Please check your email to confirm your account.
                        </Text>
                      </HStack>
                    </Box>
                  )}

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
                      label="Full Name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      error={errors.fullName}
                      required
                    />
                    
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
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                      helperText="Must be at least 8 characters"
                      required
                    />
                    
                    <ProfessionalInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      error={errors.confirmPassword}
                      required
                    />
                  </VStack>

                  <VStack gap={3} width="100%" align="start">
                    <Checkbox
                      isChecked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      colorScheme="blue"
                      size="sm"
                    >
                      <Text fontSize="xs" color="brand.neutral.600">
                        I agree to the{' '}
                        <Link color="brand.primary" href="#" textDecoration="underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link color="brand.primary" href="#" textDecoration="underline">
                          Privacy Policy
                        </Link>
                      </Text>
                    </Checkbox>
                    {errors.agreeToTerms && (
                      <Text fontSize="xs" color="brand.accent">
                        {errors.agreeToTerms}
                      </Text>
                    )}

                    <Checkbox
                      isChecked={formData.agreeToMarketing}
                      onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                      colorScheme="blue"
                      size="sm"
                    >
                      <Text fontSize="xs" color="brand.neutral.600">
                        Send me negotiation tips and updates (optional)
                      </Text>
                    </Checkbox>
                  </VStack>

                  <ProfessionalButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    width="100%"
                    isLoading={isCreating}
                    loadingText="Creating Account..."
                  >
                    Create Account & Continue
                  </ProfessionalButton>

                  <Text fontSize="xs" color="brand.neutral.500" textAlign="center">
                    Already have an account?{' '}
                    <Link color="brand.primary" href="#" textDecoration="underline">
                      Sign in here
                    </Link>
                  </Text>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <HStack gap={6} flexWrap="wrap" justify="center" color="brand.neutral.600" fontSize="sm">
            <HStack>
              <Shield size={14} color="#00A651" />
              <Text fontWeight="500">Bank-level Security</Text>
            </HStack>
            <HStack>
              <CheckCircle size={14} color="#00A651" />
              <Text fontWeight="500">Money-back Guarantee</Text>
            </HStack>
            <HStack>
              <Award size={14} color="#00A651" />
              <Text fontWeight="500">94% Success Rate</Text>
            </HStack>
          </HStack>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
