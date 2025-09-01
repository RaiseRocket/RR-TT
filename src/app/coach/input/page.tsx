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
  Select,
  SimpleGrid,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Upload, 
  FileText,
  Clock,
  User,
  Building,
  Info
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useState } from 'react';

export default function CoachInputPage() {
  const [formData, setFormData] = useState({
    communicationType: '',
    latestCommunication: '',
    companyResponse: '',
    additionalContext: '',
    files: null as FileList | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (files: FileList | null) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to strategy page
    window.location.href = '/coach/strategy';
  };

  return (
    <MainLayout>
      <VStack gap={12} py={12} align="center">
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
              <MessageSquare size={32} />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Share Your Latest Communication
            </Heading>
            <Text
              fontSize="lg"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Help us understand the current state of your negotiation by sharing your latest 
              communication with the company and any relevant context.
            </Text>
          </VStack>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%" maxW="4xl">
            <Card
              bg="brand.neutral.50"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
            >
              <CardBody p={6}>
                <VStack gap={3}>
                  <Icon as={User} boxSize={8} color="brand.primary" />
                  <VStack gap={1}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Your Profile
                    </Text>
                    <Text fontSize="xs" color="brand.neutral.500">
                      Senior Software Engineer
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg="brand.neutral.50"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
            >
              <CardBody p={6}>
                <VStack gap={3}>
                  <Icon as={Building} boxSize={8} color="brand.primary" />
                  <VStack gap={1}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Target Company
                    </Text>
                    <Text fontSize="xs" color="brand.neutral.500">
                      TechCorp Inc.
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg="brand.neutral.50"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
            >
              <CardBody p={6}>
                <VStack gap={3}>
                  <Icon as={Clock} boxSize={8} color="brand.primary" />
                  <VStack gap={1}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Timeline
                    </Text>
                    <Text fontSize="xs" color="brand.neutral.500">
                      30 days remaining
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Communication Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
                  {/* Communication Type */}
                  <VStack gap={4} width="100%" align="start">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                    >
                      Type of Communication
                    </Text>
                    <Select
                      placeholder="Select communication type"
                      value={formData.communicationType}
                      onChange={(e) => handleInputChange('communicationType', e.target.value)}
                      border="2px solid"
                      borderColor="brand.neutral.300"
                      borderRadius="8px"
                      _focus={{
                        borderColor: 'brand.primary',
                        boxShadow: '0 0 0 1px #236CFF'
                      }}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="meeting">In-Person Meeting</option>
                      <option value="video">Video Call</option>
                      <option value="text">Text Message</option>
                      <option value="other">Other</option>
                    </Select>
                  </VStack>

                  {/* Latest Communication */}
                  <VStack gap={4} width="100%" align="start">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                    >
                      Latest Communication Details
                    </Text>
                    <Textarea
                      width="100%"
                      minH="150px"
                      p={4}
                      border="2px solid"
                      borderColor="brand.neutral.300"
                      borderRadius="8px"
                      fontSize="md"
                      fontFamily="body"
                      placeholder="Share the details of your latest communication with the company. Include what you said, their response, and any important context..."
                      value={formData.latestCommunication}
                      onChange={(e) => handleInputChange('latestCommunication', e.target.value)}
                      _focus={{
                        borderColor: 'brand.primary',
                        boxShadow: '0 0 0 1px #236CFF',
                        outline: 'none'
                      }}
                      _placeholder={{
                        color: 'brand.neutral.400'
                      }}
                    />
                  </VStack>

                  {/* Company Response */}
                  <VStack gap={4} width="100%" align="start">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                    >
                      Company's Response or Feedback
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
                      placeholder="What did the company say in response? Any feedback, concerns, or questions they raised?"
                      value={formData.companyResponse}
                      onChange={(e) => handleInputChange('companyResponse', e.target.value)}
                      _focus={{
                        borderColor: 'brand.primary',
                        boxShadow: '0 0 0 1px #236CFF',
                        outline: 'none'
                      }}
                      _placeholder={{
                        color: 'brand.neutral.400'
                      }}
                    />
                  </VStack>

                  {/* Additional Context */}
                  <VStack gap={4} width="100%" align="start">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                    >
                      Additional Context
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
                      placeholder="Any other relevant information? Changes in your situation, new opportunities, concerns, or insights?"
                      value={formData.additionalContext}
                      onChange={(e) => handleInputChange('additionalContext', e.target.value)}
                      _focus={{
                        borderColor: 'brand.primary',
                        boxShadow: '0 0 0 1px #236CFF',
                        outline: 'none'
                      }}
                      _placeholder={{
                        color: 'brand.neutral.400'
                      }}
                    />
                  </VStack>

                  {/* File Upload */}
                  <VStack gap={4} width="100%" align="start">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="brand.neutral.700"
                    >
                      Supporting Documents (Optional)
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
                            Drop email screenshots, documents, or notes here
                          </Text>
                          <Text fontSize="sm" color="brand.neutral.500">
                            PDF, DOC, JPG, PNG (max 10MB each)
                          </Text>
                        </VStack>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e.target.files)}
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
                          What we're looking for
                        </Text>
                        <Text fontSize="sm" color="brand.neutral.600" lineHeight="tall">
                          The more context you provide, the better our strategy recommendations will be. 
                          We'll analyze your communication style, the company's responses, and identify 
                          the best next steps for your negotiation.
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
                    loadingText="Analyzing Your Communication..."
                  >
                    Get My Strategy & Scripts
                  </ProfessionalButton>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card
            maxW="2xl"
            width="100%"
            bg="brand.primary"
            color="white"
            borderRadius="12px"
            boxShadow="lg"
          >
            <CardBody p={6}>
              <VStack gap={4} textAlign="center">
                <Heading
                  as="h3"
                  size="md"
                  fontFamily="heading"
                  fontWeight="600"
                >
                  What Happens Next?
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} width="100%">
                  <VStack gap={2}>
                    <Badge colorScheme="white" variant="solid" px={3} py={1}>
                      Step 1
                    </Badge>
                    <Text fontSize="sm" opacity={0.9}>
                      Analyze your communication and company responses
                    </Text>
                  </VStack>
                  <VStack gap={2}>
                    <Badge colorScheme="white" variant="solid" px={3} py={1}>
                      Step 2
                    </Badge>
                    <Text fontSize="sm" opacity={0.9}>
                      Create personalized strategy and talking points
                    </Text>
                  </VStack>
                  <VStack gap={2}>
                    <Badge colorScheme="white" variant="solid" px={3} py={1}>
                      Step 3
                    </Badge>
                    <Text fontSize="sm" opacity={0.9}>
                      Provide email templates and scripts
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
