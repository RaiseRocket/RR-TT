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
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProfessionalInput } from '@/components/ui/ProfessionalInput';
import { useState, useCallback, useRef } from 'react';



export default function AssessmentPage() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    offerAmount: '',
    benefits: '',
    additionalContext: '',
    files: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // File validation
  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (file.size > maxSize) {
      return `File "${file.name}" is too large. Maximum size is 10MB.`;
    }

    if (!allowedTypes.includes(file.type)) {
      return `File "${file.name}" is not a supported format. Please upload PDF, DOC, DOCX, JPG, or PNG files.`;
    }

    return null;
  };

  // Handle file selection
  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const errors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setUploadError(errors.join(' '));
    } else {
      setUploadError(null);
      setFormData(prev => ({ 
        ...prev, 
        files: [...prev.files, ...validFiles]
      }));
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  // Remove file
  const removeFile = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store files in localStorage for now (will be saved to database when user creates account)
    const fileData = formData.files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));

    try {
      // Prepare data for OpenAI API
      const analysisData = {
        jobTitle: formData.jobTitle,
        company: formData.company,
        offerAmount: formData.offerAmount,
        benefits: formData.benefits,
        additionalContext: formData.additionalContext,
        uploadedFiles: fileData.length > 0 ? fileData : undefined,
        offerDocumentText: formData.files.length > 0 ? 'Document uploaded (text extraction not implemented yet)' : undefined
      };

      // Call the OpenAI API
      const response = await fetch('/api/analyze-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze offer');
      }

      const result = await response.json();
      
      // Store the analysis results for the results page
      localStorage.setItem('assessmentData', JSON.stringify({
        ...formData,
        files: fileData, // Store file metadata
        analysis: result.analysis,
        rawResponse: result.rawResponse, // Store raw response for debugging
        debugPayload: result.debugPayload, // Store OpenAI payload for debugging
        submittedAt: new Date().toISOString()
      }));
      
      // Redirect to results page
      window.location.href = '/assessment/results';
    } catch (error) {
      console.error('Error analyzing offer:', error);
      // Fallback: store form data without analysis
      localStorage.setItem('assessmentData', JSON.stringify({
        ...formData,
        files: fileData, // Store file metadata
        error: 'Failed to analyze offer. Please try again.',
        rawResponse: null,
        debugPayload: null,
        submittedAt: new Date().toISOString()
      }));
      
      // Still redirect to results page to show error
      window.location.href = '/assessment/results';
    } finally {
      setIsSubmitting(false);
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
                      borderColor={isDragOver ? "brand.primary" : "brand.neutral.300"}
                      borderRadius="8px"
                      p={4}
                      textAlign="center"
                      bg={isDragOver ? "brand.primary.50" : "transparent"}
                      _hover={{
                        borderColor: 'brand.primary',
                        bg: 'brand.neutral.50'
                      }}
                      transition="all 0.2s ease"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      cursor="pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <VStack gap={2}>
                        <Icon as={Upload} boxSize={6} color={isDragOver ? "brand.primary" : "brand.neutral.400"} />
                        <VStack gap={1}>
                          <Text fontSize="sm" fontWeight="500" color="brand.neutral.700">
                            {isDragOver ? "Drop files here" : "Drop your offer letter here, or click to browse"}
                          </Text>
                          <Text fontSize="xs" color="brand.neutral.500">
                            PDF, DOC, DOCX, JPG, or PNG files (max 10MB each)
                          </Text>
                        </VStack>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <ProfessionalButton
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          Choose Files
                        </ProfessionalButton>
                      </VStack>
                    </Box>

                    {/* Upload Error */}
                    {uploadError && (
                      <Text fontSize="sm" color="brand.accent" mt={2}>
                        {uploadError}
                      </Text>
                    )}

                    {/* Uploaded Files List */}
                    {formData.files.length > 0 && (
                      <Box mt={3}>
                        <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                          Uploaded Files ({formData.files.length})
                        </Text>
                        <VStack gap={2} align="stretch">
                          {formData.files.map((file, index) => (
                            <HStack
                              key={`${file.name}-${index}`}
                              p={3}
                              bg="brand.neutral.50"
                              borderRadius="8px"
                              border="1px solid"
                              borderColor="brand.neutral.200"
                              justify="space-between"
                            >
                              <HStack gap={2}>
                                <Icon as={FileText} boxSize={4} color="brand.primary" />
                                <VStack align="start" gap={0}>
                                  <Text fontSize="sm" fontWeight="500" color="brand.neutral.700">
                                    {file.name}
                                  </Text>
                                  <Text fontSize="xs" color="brand.neutral.500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Text>
                                </VStack>
                              </HStack>
                              <ProfessionalButton
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                color="brand.accent"
                                _hover={{ bg: "brand.accent.50" }}
                              >
                                Remove
                              </ProfessionalButton>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    )}
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
