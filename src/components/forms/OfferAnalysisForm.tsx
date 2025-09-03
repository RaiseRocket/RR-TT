'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Upload, FileText, X } from 'lucide-react';
import { ProfessionalTextarea } from '@/components/ui/ProfessionalTextarea';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { OfferAnalysisRequest, OfferAnalysisResponse, ExtractedOfferInfo } from '@/types';
// PDF.js will be imported dynamically on the client side only

interface OfferAnalysisFormProps {
  onAnalysisComplete?: (analysis: OfferAnalysisResponse) => void;
  onExtractedInfo?: (info: ExtractedOfferInfo) => void;
}

export const OfferAnalysisForm: React.FC<OfferAnalysisFormProps> = ({
  onAnalysisComplete,
  onExtractedInfo,
}) => {
  const [offerInput, setOfferInput] = useState('');
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<OfferAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const fileDisplayBg = useColorModeValue('gray.50', 'gray.700');
  const textareaBg = useColorModeValue('gray.50', 'gray.700');
  const extractedInfoBg = useColorModeValue('blue.50', 'blue.900');
  const extractedInfoBorder = useColorModeValue('blue.200', 'blue.700');

  // Function to process PDF files on the server
  const processPDFFile = async (file: File): Promise<string> => {
    try {
      // Convert file to base64 for sending to server
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      
      // Send to server for PDF processing
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileData: base64,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('File too large. Please upload a PDF smaller than 10MB.');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process PDF file');
      }

      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('PDF processing error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to process PDF file. Please try copying and pasting the text content instead.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'text/plain',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a text file, PDF, or Word document.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 10MB.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setUploadedFile(file);
      setInputType('file');
      
      // Show processing message for PDFs
      if (file.type === 'application/pdf') {
        toast({
          title: 'PDF Uploaded',
          description: 'PDF received! For best results, please copy and paste the text content into the text area above.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
      
      try {
        let content = '';
        
        if (file.type === 'application/pdf') {
          // Process PDF on server
          const result = await processPDFFile(file);
          content = result;
          
          // Check if this is the placeholder message
          if (content.includes('received successfully') && content.includes('copy and paste')) {
            toast({
              title: 'PDF Uploaded - Manual Input Required',
              description: 'Please copy and paste the actual text content from your PDF into the text area above to proceed with the analysis.',
              status: 'warning',
              duration: 8000,
              isClosable: true,
            });
            // Don't set the content to the placeholder text
            return;
          }
        } else {
          // Read text files normally
          const reader = new FileReader();
          content = await new Promise<string>((resolve, reject) => {
            reader.onload = (e) => {
              resolve(e.target?.result as string);
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
          });
        }
        
        setOfferInput(content);
        
        toast({
          title: 'File processed successfully',
          description: `Content extracted from ${file.name}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
        
        // Provide helpful suggestions based on error type
        let suggestion = '';
        if (errorMessage.includes('No text content found')) {
          suggestion = 'The PDF may contain only images. Please copy and paste the text content instead.';
        } else if (errorMessage.includes('password-protected')) {
          suggestion = 'Please copy and paste the text content from your PDF instead.';
        } else if (errorMessage.includes('Failed to extract text')) {
          suggestion = 'Please try copying and pasting the text content instead.';
        } else {
          suggestion = 'Please try uploading a different file or copy the text content instead.';
        }
        
        toast({
          title: 'File processing failed',
          description: `${errorMessage} ${suggestion}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
        setUploadedFile(null);
        setInputType('text');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setOfferInput('');
    setInputType('text');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextInput = () => {
    setInputType('text');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!offerInput.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter your offer details or upload a file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if the input contains placeholder or instruction text
    const placeholderTexts = [
      'PDF file',
      'received successfully',
      'copy and paste',
      'text content from your PDF',
      'best experience',
      'Please copy and paste',
      'upload your offer letter',
      'paste the content directly'
    ];
    
    const isPlaceholderText = placeholderTexts.some(placeholder => 
      offerInput.toLowerCase().includes(placeholder.toLowerCase())
    );
    
    if (isPlaceholderText) {
      toast({
        title: 'Please provide actual offer details',
        description: 'Please copy and paste the actual content from your offer letter into the text area above.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const requestData: OfferAnalysisRequest = {
        offerInput: offerInput.trim(),
        inputType,
        fileName: uploadedFile?.name,
      };

      const response = await fetch('/api/analyze-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze offer');
      }

      const result = await response.json();
      setAnalysis(result.analysis);
      
      // Call callbacks if provided
      if (onAnalysisComplete) {
        onAnalysisComplete(result.analysis);
      }
      if (onExtractedInfo) {
        onExtractedInfo(result.analysis.extractedInfo);
      }

      toast({
        title: 'Analysis complete!',
        description: 'Your offer has been analyzed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: 'Analysis failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderExtractedInfo = () => {
    if (!analysis?.extractedInfo) return null;

    const { companyName, jobTitle, baseSalary, confidence } = analysis.extractedInfo;
    const confidenceColor = confidence === 'high' ? 'green' : confidence === 'medium' ? 'yellow' : 'red';

    return (
      <Box
        p={4}
        bg={extractedInfoBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={extractedInfoBorder}
      >
        <Text fontSize="lg" fontWeight="semibold" mb={3} color="brand.primary">
          📋 Extracted Information
        </Text>
        <VStack align="stretch" spacing={2}>
          {companyName && (
            <HStack>
              <Text fontWeight="medium" minW="120px">Company:</Text>
              <Text>{companyName}</Text>
            </HStack>
          )}
          {jobTitle && (
            <HStack>
              <Text fontWeight="medium" minW="120px">Position:</Text>
              <Text>{jobTitle}</Text>
            </HStack>
          )}
          {baseSalary && (
            <HStack>
              <Text fontWeight="medium" minW="120px">Base Salary:</Text>
              <Text>{baseSalary}</Text>
            </HStack>
          )}
          <HStack>
            <Text fontWeight="medium" minW="120px">Confidence:</Text>
            <Badge colorScheme={confidenceColor} variant="subtle">
              {confidence.toUpperCase()}
            </Badge>
          </HStack>
        </VStack>
      </Box>
    );
  };

  return (
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
        <VStack spacing={6} align="stretch">

        {/* Input Type Selection */}
        <HStack spacing={4} justify="center">
          <Button
            variant={inputType === 'text' ? 'solid' : 'outline'}
            colorScheme="brand"
            leftIcon={<FileText size={16} />}
            onClick={handleTextInput}
          >
            Enter Text
          </Button>
          <Button
            variant={inputType === 'file' ? 'solid' : 'outline'}
            colorScheme="brand"
            leftIcon={<Upload size={16} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload File
          </Button>
        </HStack>

        {/* File Upload Input (Hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {/* Helpful tip for file uploads */}
        <Text fontSize="sm" color="gray.600" textAlign="center" fontStyle="italic">
          💡 Tip: For best results, copy and paste your offer letter text directly into the text area above
        </Text>

        {/* File Display */}
        {uploadedFile && (
          <Box
            p={4}
            bg={fileDisplayBg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <HStack justify="space-between">
              <HStack>
                <FileText size={16} color="#236CFF" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">{uploadedFile.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </Text>
                </VStack>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                leftIcon={<X size={14} />}
                onClick={handleRemoveFile}
              >
                Remove
              </Button>
            </HStack>
          </Box>
        )}

        {/* Text Input */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            {inputType === 'file' ? 'File Content Preview' : 'Offer Details'}
          </Text>
          <ProfessionalTextarea
            value={offerInput}
            onChange={(e) => setOfferInput(e.target.value)}
            placeholder={
              inputType === 'file'
                ? 'File content will appear here...'
                : 'Paste your job offer details here. Include information about:\n• Company name\n• Job title/position\n• Base salary\n• Benefits package\n• Any other relevant details'
            }
            minH="200px"
            isReadOnly={inputType === 'file'}
            bg={inputType === 'file' ? textareaBg : undefined}
          />
        </Box>

        {/* Error Display */}
        {error && (
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Analysis Failed!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Analyze Button */}
        <Box textAlign="center">
          <ProfessionalButton
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            loadingText="Analyzing Offer..."
            size="lg"
            isDisabled={!offerInput.trim()}
            width="100%"
          >
            {isAnalyzing ? (
              <HStack>
                <Spinner size="sm" />
                <Text>Analyzing Your Offer...</Text>
              </HStack>
            ) : (
              'Get My Free Assessment'
            )}
          </ProfessionalButton>
          
          <Text fontSize="xs" color="brand.neutral.500" textAlign="center" mt={3}>
            By submitting, you agree to our Privacy Policy and Terms of Service
          </Text>
        </Box>

        {/* Extracted Information */}
        {analysis && renderExtractedInfo()}

        {/* Analysis Results */}
        {analysis && (
          <Box>
            <Divider my={6} />
            <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.primary">
              📊 Analysis Results
            </Text>
            
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Offer Summary
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.offerSummary}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Market Benchmark
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.benchmarkAssessment}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Strengths
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.strengths}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Negotiation Opportunities
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.negotiationOpportunities}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Suggested Strategy
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.suggestedStrategy}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  Risks & Considerations
                </Text>
                <Text whiteSpace="pre-wrap">{analysis.risksConsiderations}</Text>
              </Box>
            </VStack>
          </Box>
        )}
        </VStack>
      </CardBody>
    </Card>
  );
};
