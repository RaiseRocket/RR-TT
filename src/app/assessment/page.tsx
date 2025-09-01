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
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Shield, 
  CheckCircle,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useState, useCallback } from 'react';

const assessmentSteps = [
  { id: 'offer-info', title: 'Offer Details', description: 'Share your offer' },
  { id: 'analysis', title: 'Free Analysis', description: 'Get insights' }
];

export default function AssessmentPage() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    offerAmount: '',
    benefits: '',
    additionalContext: '',
    files: null as FileList | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJobTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, jobTitle: e.target.value }));
  }, []);

  const handleCompanyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, company: e.target.value }));
  }, []);

  const handleOfferAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, offerAmount: e.target.value }));
  }, []);

  const handleBenefitsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, benefits: e.target.value }));
  }, []);

  const handleAdditionalContextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, additionalContext: e.target.value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, files: e.target.files }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store form data for the results page (placeholder for future AI integration)
    localStorage.setItem('assessmentData', JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString()
    }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to results page
    window.location.href = '/assessment/results';
  };

  return (
    <MainLayout>
      <VStack gap={6} py={6} align="center" minH="100vh" justify="center">
        {/* Progress Indicator */}
        <ProgressIndicator
          steps={assessmentSteps}
          currentStep={0}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={3} textAlign="center" maxW="2xl">
            <Heading
              as="h1"
              size="xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Get Your Free Offer Assessment
            </Heading>
            <Text
              fontSize="md"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Share your offer details and get expert insights on your negotiation potential.
            </Text>
          </VStack>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <HStack gap={6} flexWrap="wrap" justify="center" color="brand.neutral.600" fontSize="sm">
            <HStack>
              <Shield size={14} color="#00A651" />
              <Text fontWeight="500">100% Confidential</Text>
            </HStack>
            <HStack>
              <CheckCircle size={14} color="#00A651" />
              <Text fontWeight="500">Free Analysis</Text>
            </HStack>
            <HStack>
              <TrendingUp size={14} color="#00A651" />
              <Text fontWeight="500">Expert Insights</Text>
            </HStack>
          </HStack>
        </motion.div>

        {/* Assessment Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card
            maxW="2xl"
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
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
                    <ProfessionalInput
                      label="Job Title / Role"
                      placeholder="e.g. Senior Software Engineer"
                      value={formData.jobTitle}
                      onChange={handleJobTitleChange}
                      required
                    />
                    
                    <ProfessionalInput
                      label="Company Name"
                      placeholder="e.g. Google, Microsoft, Startup Inc."
                      value={formData.company}
                      onChange={handleCompanyChange}
                      required
                    />
                    
                    <ProfessionalInput
                      label="Offer Amount"
                      placeholder="e.g. $120,000"
                      value={formData.offerAmount}
                      onChange={handleOfferAmountChange}
                      required
                    />
                    
                    <ProfessionalInput
                      label="Benefits Package"
                      placeholder="e.g. Health insurance, 401k match, stock options, PTO"
                      value={formData.benefits}
                      onChange={handleBenefitsChange}
                    />
                  </SimpleGrid>
                  
                  <Box width="100%">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                      mb={2}
                    >
                      Additional Context (Optional)
                    </Text>
                    <Box
                      as="textarea"
                      width="100%"
                      minH="80px"
                      p={3}
                      border="2px solid"
                      borderColor="brand.neutral.300"
                      borderRadius="8px"
                      fontSize="md"
                      fontFamily="body"
                      placeholder="Tell us more about the role, your experience, or any specific concerns..."
                      value={formData.additionalContext}
                      onChange={handleAdditionalContextChange}
                      _focus={{
                        borderColor: 'brand.primary',
                        boxShadow: '0 0 0 1px #236CFF',
                        outline: 'none'
                      }}
                      _placeholder={{
                        color: 'brand.neutral.400'
                      }}
                    />
                  </Box>

                  {/* File Upload */}
                  <Box width="100%">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                      mb={2}
                    >
                      Upload Offer Documents (Optional)
                    </Text>
                    <Box
                      border="2px dashed"
                      borderColor="brand.neutral.300"
                      borderRadius="8px"
                      p={4}
                      textAlign="center"
                      _hover={{
                        borderColor: 'brand.primary',
                        bg: 'brand.neutral.50'
                      }}
                      transition="all 0.2s ease"
                    >
                      <VStack gap={2}>
                        <Icon as={Upload} boxSize={6} color="brand.neutral.400" />
                        <VStack gap={1}>
                          <Text fontSize="sm" fontWeight="500" color="brand.neutral.700">
                            Drop your offer letter here, or click to browse
                          </Text>
                          <Text fontSize="xs" color="brand.neutral.500">
                            PDF, DOC, or image files (max 10MB)
                          </Text>
                        </VStack>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="file-upload"
                        />
                        <ProfessionalButton
                          variant="secondary"
                          size="sm"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Choose Files
                        </ProfessionalButton>
                      </VStack>
                    </Box>
                  </Box>

                  <ProfessionalButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    width="100%"
                    isLoading={isSubmitting}
                    loadingText="Analyzing Your Offer..."
                  >
                    Get My Free Assessment
                  </ProfessionalButton>

                  <Text fontSize="xs" color="brand.neutral.500" textAlign="center">
                    By submitting, you agree to our Privacy Policy and Terms of Service
                  </Text>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </motion.div>


      </VStack>
    </MainLayout>
  );
}
