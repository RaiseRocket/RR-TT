'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Target, 
  DollarSign,
  Shield,
  Info
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { ProfessionalTextarea } from '@/components/ui/ProfessionalTextarea';
import { useState } from 'react';

const onboardingSteps = [
  { id: 'profile', title: 'Professional Profile', description: 'Share your background' },
  { id: 'strategy', title: 'Negotiation Goals', description: 'Set your targets' }
];

export default function OnboardingStrategyPage() {
  const [formData, setFormData] = useState({
    reservationPrice: '',
    targetPrice: '',
    batna: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to coach experience
    window.location.href = '/coach/input';
  };

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    return isNaN(numValue) ? '' : numValue.toLocaleString();
  };

  const parseCurrency = (value: string) => {
    return value.replace(/[^0-9.-]+/g, '');
  };

  return (
    <MainLayout>
      <VStack gap={12} py={12} align="center">
        {/* Progress Indicator */}
        <ProgressIndicator
          steps={onboardingSteps}
          currentStep={1}
          completedSteps={[0]}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={6} textAlign="center" maxW="3xl">
            <Box
              p={4}
              borderRadius="full"
              bg="brand.secondary"
              color="white"
            >
              <Target size={32} />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Set Your Negotiation Goals
            </Heading>
            <Text
              fontSize="lg"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Define your negotiation parameters to help us create the most effective strategy. 
              These goals will guide our recommendations and help you stay focused during negotiations.
            </Text>
          </VStack>
        </motion.div>

        {/* Onboarding Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="lg"
          >
            <CardBody p={8}>
              <form onSubmit={handleSubmit}>
                <VStack gap={8}>
                  {/* Financial Goals */}
                  <VStack gap={6} width="100%" align="start">
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Financial Goals
                    </Heading>
                    
                    <VStack gap={6} width="100%">
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} width="100%">
                        <Box>
                          <ProfessionalInput
                            label="Reservation Price (Minimum)"
                            placeholder="$100,000"
                            value={formData.reservationPrice}
                            onChange={(e) => handleInputChange('reservationPrice', parseCurrency(e.target.value))}
                            leftIcon={<DollarSign size={16} />}
                            helperText="The lowest offer you'll accept"
                            required
                          />
                        </Box>
                        
                        <Box>
                          <ProfessionalInput
                            label="Target Price (Ideal)"
                            placeholder="$120,000"
                            value={formData.targetPrice}
                            onChange={(e) => handleInputChange('targetPrice', parseCurrency(e.target.value))}
                            leftIcon={<Target size={16} />}
                            helperText="Your ideal compensation"
                            required
                          />
                        </Box>
                      </SimpleGrid>
                      
                      <Box width="100%">
                        <ProfessionalTextarea
                          label="BATNA (Best Alternative)"
                          placeholder="e.g. Current job, other offers, freelance work"
                          value={formData.batna}
                          onChange={(e) => handleInputChange('batna', e.target.value)}
                          helperText="Your best alternative if this negotiation fails"
                          required
                          minH="100px"
                          resize="vertical"
                        />
                      </Box>
                    </VStack>

                    {/* Financial Goals Explanation */}
                    <Box
                      p={4}
                      bg="brand.neutral.50"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor="brand.neutral.200"
                      width="100%"
                    >
                      <HStack align="start" gap={3}>
                        <Icon as={Info} boxSize={5} color="brand.primary" mt={0.5} />
                        <VStack align="start" gap={2}>
                          <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                            Understanding Your Financial Goals
                          </Text>
                          <VStack align="start" gap={1}>
                            <Text fontSize="sm" color="brand.neutral.600">
                              • <strong>Reservation Price:</strong> The absolute minimum you'll accept
                            </Text>
                            <Text fontSize="sm" color="brand.neutral.600">
                              • <strong>Target Price:</strong> Your ideal outcome from the negotiation
                            </Text>
                            <Text fontSize="sm" color="brand.neutral.600">
                              • <strong>BATNA:</strong> Your best alternative if this negotiation doesn't work out
                            </Text>
                          </VStack>
                        </VStack>
                      </HStack>
                    </Box>
                  </VStack>



                  {/* Strategy Preview */}
                  <VStack gap={6} width="100%" align="start">
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Strategy Preview
                    </Heading>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
                      <Card
                        bg="brand.neutral.50"
                        border="1px solid"
                        borderColor="brand.neutral.200"
                        borderRadius="8px"
                      >
                        <CardBody p={4}>
                          <Stat textAlign="center">
                            <StatLabel color="brand.neutral.600" fontSize="xs">
                              Negotiation Range
                            </StatLabel>
                            <StatNumber color="brand.primary" fontSize="lg">
                              {formData.reservationPrice && formData.targetPrice 
                                ? `$${parseFloat(formData.reservationPrice).toLocaleString()} - $${parseFloat(formData.targetPrice).toLocaleString()}`
                                : 'Set your goals'
                              }
                            </StatNumber>
                          </Stat>
                        </CardBody>
                      </Card>

                      <Card
                        bg="brand.neutral.50"
                        border="1px solid"
                        borderColor="brand.neutral.200"
                        borderRadius="8px"
                      >
                        <CardBody p={4}>
                          <Stat textAlign="center">
                            <StatLabel color="brand.neutral.600" fontSize="xs">
                              BATNA
                            </StatLabel>
                            <StatNumber color="brand.secondary" fontSize="md">
                              {formData.batna ? formData.batna.substring(0, 20) + (formData.batna.length > 20 ? '...' : '') : 'Set your alternative'}
                            </StatNumber>
                          </Stat>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </VStack>

                  <ProfessionalButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    width="100%"
                    isLoading={isSubmitting}
                    loadingText="Setting Up Your Strategy..."
                  >
                    Complete Setup & Start Coaching
                  </ProfessionalButton>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
