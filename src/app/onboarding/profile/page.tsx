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
  Textarea,
  SimpleGrid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  User,
  Building,
  Link as LinkIcon,
  Info
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useState } from 'react';

const onboardingSteps = [
  { id: 'profile', title: 'Professional Profile', description: 'Share your background' },
  { id: 'strategy', title: 'Negotiation Goals', description: 'Set your targets' }
];

export default function OnboardingProfilePage() {
  const [formData, setFormData] = useState({
    jobDescription: '',
    company: '',
    linkedinUrl: '',
    additionalInfo: '',
    resume: null as File | null,
    coverLetter: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'resume' | 'coverLetter', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to next step
    window.location.href = '/onboarding/strategy';
  };

  return (
    <MainLayout>
      <VStack gap={12} py={12} align="center">
        {/* Progress Indicator */}
        <ProgressIndicator
          steps={onboardingSteps}
          currentStep={0}
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
              bg="brand.primary"
              color="white"
            >
              <User size={32} />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Tell Us About Your Professional Background
            </Heading>
            <Text
              fontSize="lg"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Help us understand your experience, skills, and current situation so we can 
              create the most effective negotiation strategy for you.
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
                  {/* Basic Information */}
                  <VStack gap={6} width="100%" align="start">
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Basic Information
                    </Heading>
                    
                    <VStack gap={4} width="100%">
                      <Box width="100%">
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="brand.neutral.700"
                          mb={2}
                        >
                          Job Description / Role Details
                        </Text>
                        <Textarea
                          width="100%"
                          minH="120px"
                          p={4}
                          border="2px solid"
                          borderColor="brand.neutral.300"
                          borderRadius="8px"
                          fontSize="md"
                          fontFamily="body"
                          placeholder="Describe your current or target role, key responsibilities, required skills, and any unique aspects of the position..."
                          value={formData.jobDescription}
                          onChange={(e) => handleInputChange('jobDescription', e.target.value)}
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

                      <ProfessionalInput
                        label="Company Name"
                        placeholder="e.g. Google, Microsoft, Startup Inc."
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        leftIcon={<Building size={16} />}
                        required
                      />
                      
                      <ProfessionalInput
                        label="LinkedIn Profile URL"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        leftIcon={<LinkIcon size={16} />}
                        type="url"
                      />
                    </VStack>
                  </VStack>

                  {/* File Uploads */}
                  <VStack gap={6} width="100%" align="start">
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Supporting Documents
                    </Heading>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} width="100%">
                      {/* Resume Upload */}
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="brand.neutral.700"
                          mb={2}
                        >
                          Resume / CV
                        </Text>
                        <Box
                          border="2px dashed"
                          borderColor="brand.neutral.300"
                          borderRadius="8px"
                          p={6}
                          textAlign="center"
                          _hover={{
                            borderColor: 'brand.primary',
                            bg: 'brand.neutral.50'
                          }}
                          transition="all 0.2s ease"
                        >
                          <VStack gap={3}>
                            <Icon as={Upload} boxSize={8} color="brand.neutral.400" />
                            <VStack gap={1}>
                              <Text fontSize="md" fontWeight="500" color="brand.neutral.700">
                                {formData.resume ? formData.resume.name : 'Drop your resume here'}
                              </Text>
                              <Text fontSize="sm" color="brand.neutral.500">
                                PDF, DOC, or DOCX (max 10MB)
                              </Text>
                            </VStack>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                              style={{ display: 'none' }}
                              id="resume-upload"
                            />
                            <ProfessionalButton
                              variant="secondary"
                              size="sm"
                              onClick={() => document.getElementById('resume-upload')?.click()}
                            >
                              Choose Resume
                            </ProfessionalButton>
                          </VStack>
                        </Box>
                      </Box>

                      {/* Cover Letter Upload */}
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="brand.neutral.700"
                          mb={2}
                        >
                          Cover Letter (Optional)
                        </Text>
                        <Box
                          border="2px dashed"
                          borderColor="brand.neutral.300"
                          borderRadius="8px"
                          p={6}
                          textAlign="center"
                          _hover={{
                            borderColor: 'brand.primary',
                            bg: 'brand.neutral.50'
                          }}
                          transition="all 0.2s ease"
                        >
                          <VStack gap={3}>
                            <Icon as={FileText} boxSize={8} color="brand.neutral.400" />
                            <VStack gap={1}>
                              <Text fontSize="md" fontWeight="500" color="brand.neutral.700">
                                {formData.coverLetter ? formData.coverLetter.name : 'Drop your cover letter here'}
                              </Text>
                              <Text fontSize="sm" color="brand.neutral.500">
                                PDF, DOC, or DOCX (max 10MB)
                              </Text>
                            </VStack>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleFileChange('coverLetter', e.target.files?.[0] || null)}
                              style={{ display: 'none' }}
                              id="cover-letter-upload"
                            />
                            <ProfessionalButton
                              variant="secondary"
                              size="sm"
                              onClick={() => document.getElementById('cover-letter-upload')?.click()}
                            >
                              Choose Cover Letter
                            </ProfessionalButton>
                          </VStack>
                        </Box>
                      </Box>
                    </SimpleGrid>
                  </VStack>

                  {/* Additional Information */}
                  <VStack gap={6} width="100%" align="start">
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Additional Information
                    </Heading>
                    
                    <Box width="100%">
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="brand.neutral.700"
                        mb={2}
                      >
                        Anything else we should know?
                      </Text>
                      <Textarea
                        width="100%"
                        minH="120px"
                        p={4}
                        border="2px solid"
                        borderColor="brand.neutral.300"
                        borderRadius="8px"
                        fontSize="md"
                        fontFamily="body"
                        placeholder="Share any additional context about your situation, concerns, or specific goals for the negotiation..."
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
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
                  </VStack>

                  {/* Help Text */}
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
                          Why we need this information
                        </Text>
                        <Text fontSize="sm" color="brand.neutral.600" lineHeight="tall">
                          The more context you provide, the better we can tailor your negotiation strategy. 
                          This information helps us understand your market position, leverage points, and 
                          potential negotiation opportunities.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  <ProfessionalButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    width="100%"
                    isLoading={isSubmitting}
                    loadingText="Saving Your Profile..."
                  >
                    Continue to Negotiation Goals
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
