'use client';

import {
  VStack,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { OfferAnalysisForm } from '@/components/forms/OfferAnalysisForm';
import { OfferAnalysisResponse, ExtractedOfferInfo } from '@/types';
import { useRouter } from 'next/navigation';



export default function AssessmentPage() {
  const router = useRouter();

  const handleAnalysisComplete = (analysis: OfferAnalysisResponse) => {
    // Store the analysis results for the results page
    localStorage.setItem('assessmentData', JSON.stringify({
      analysis,
      rawResponse: analysis.rawResponse,
      debugPayload: analysis.debugPayload,
      submittedAt: new Date().toISOString()
    }));
    
    // Redirect to results page
    router.push('/assessment/results');
  };

  const handleExtractedInfo = (info: ExtractedOfferInfo) => {
    // Store extracted info for potential future use
    localStorage.setItem('extractedOfferInfo', JSON.stringify(info));
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

        {/* New Offer Analysis Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <OfferAnalysisForm
            onAnalysisComplete={handleAnalysisComplete}
            onExtractedInfo={handleExtractedInfo}
          />
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
