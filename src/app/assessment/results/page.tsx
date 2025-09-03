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
  Badge,
  Progress,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Target,
  Award,
  ArrowRight,
  Star,
  FileText,
  Shield,
  Users,
  Clock,
  Eye,
  Code
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



// TODO: Replace with AI-generated assessment data
// This will be generated based on user input from the assessment form
const assessmentData = {
  currentOffer: 120000,
  marketRange: { min: 110000, max: 140000 },
  negotiationPotential: 85,
  redFlags: [
    "Base salary is 15% below market average",
    "No equity or stock options mentioned",
    "Limited PTO compared to industry standards"
  ],
  opportunities: [
    "Strong market demand for your skills",
    "Company has budget flexibility",
    "Your experience exceeds role requirements"
  ],
  recommendedTarget: 135000,
  confidenceScore: 92
};

export default function AssessmentResultsPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get stored assessment data
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('assessmentData') : null;
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAnalysisData(parsed);
      if (parsed.error) {
        setError(parsed.error);
      }
    }
  }, []);

  const handleGetFullStrategy = () => {
    if (user) {
      // User is authenticated, redirect to onboarding or dashboard
      router.push('/onboarding/profile');
    } else {
      // User is not authenticated, redirect to signup
      router.push('/auth/signup');
    }
  };

  // Format the OpenAI response for display
  const formatAnalysisResponse = () => {
    if (!analysisData?.analysis) {
      return `Based on your assessment, here's your personalized salary negotiation analysis:

**Current Offer Analysis:**
Your current offer of ${analysisData?.offerAmount || '$120,000'} is being analyzed against market data for ${analysisData?.jobTitle || 'your role'} at ${analysisData?.company || 'your company'}.

**Analysis Status:**
${error ? `Error: ${error}` : 'Analysis in progress...'}

**Next Steps:**
1. Review your personalized negotiation strategy
2. Get expert guidance on implementation
3. Access our proven templates and scripts`;
    }

    const analysis = analysisData.analysis;
    return `Based on your assessment, here's your personalized salary negotiation analysis:

**Offer Summary:**
${analysis.offerSummary}

**Market Benchmarking:**
${analysis.benchmarkAssessment}

**Strengths of Your Offer:**
${analysis.strengths}

**Negotiation Opportunities:**
${analysis.negotiationOpportunities}

**Recommended Strategy:**
${analysis.suggestedStrategy}

**Risks & Considerations:**
${analysis.risksConsiderations}`;
  };

  return (
    <MainLayout>
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} py={12}>
        {/* Success Header */}
        <VStack gap={8} mb={12}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack gap={4} textAlign="center">
              <Box
                p={3}
                borderRadius="full"
                bg={error ? "brand.accent" : "brand.secondary"}
                color="white"
              >
                <CheckCircle size={32} />
              </Box>
              <Heading
                as="h1"
                size="xl"
                fontFamily="heading"
                color="brand.neutral.700"
                fontWeight="700"
              >
                {error ? 'Assessment Complete' : 'Your Offer Assessment is Ready!'}
              </Heading>
            </VStack>
          </motion.div>
        </VStack>

        {/* Two Column Layout */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={8}
          align="start"
        >
          {/* Left Column - OpenAI Response */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ flex: 1 }}
          >
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
              height="fit-content"
            >
              <CardBody p={6}>
                <VStack gap={4} align="start">
                  <HStack>
                    <Icon as={TrendingUp} boxSize={6} color="brand.primary" />
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Your Personalized Analysis
                    </Heading>
                  </HStack>

                  {/* Tabs for Analysis and Debug */}
                  <Tabs width="100%" variant="enclosed">
                    <TabList>
                      <Tab>
                        <HStack gap={2}>
                          <Icon as={Eye} boxSize={4} />
                          <Text>Analysis</Text>
                        </HStack>
                      </Tab>
                      <Tab>
                        <HStack gap={2}>
                          <Icon as={Code} boxSize={4} />
                          <Text>Debug</Text>
                        </HStack>
                      </Tab>
                    </TabList>

                    <TabPanels>
                      {/* Analysis Tab */}
                      <TabPanel px={0} py={4}>
                        <Box
                          bg="brand.neutral.50"
                          p={4}
                          borderRadius="8px"
                          border="1px solid"
                          borderColor="brand.neutral.200"
                          width="100%"
                        >
                          <Text
                            fontSize="sm"
                            color="brand.neutral.700"
                            lineHeight="tall"
                            whiteSpace="pre-line"
                          >
                            {formatAnalysisResponse()}
                          </Text>
                        </Box>

                        {/* Uploaded Files Information */}
                        {analysisData?.files && analysisData.files.length > 0 && (
                          <Box
                            bg="brand.primary.50"
                            p={4}
                            borderRadius="8px"
                            border="1px solid"
                            borderColor="brand.primary.200"
                            width="100%"
                            mt={4}
                          >
                            <HStack gap={2} mb={3}>
                              <Icon as={FileText} boxSize={4} color="brand.primary" />
                              <Text fontSize="sm" fontWeight="600" color="brand.primary">
                                Documents Analyzed ({analysisData.files.length})
                              </Text>
                            </HStack>
                            <VStack gap={2} align="stretch">
                              {analysisData.files.map((file: any, index: number) => (
                                <HStack key={index} justify="space-between" p={2} bg="white" borderRadius="6px">
                                  <Text fontSize="xs" color="brand.neutral.600">
                                    {file.name}
                                  </Text>
                                  <Text fontSize="xs" color="brand.neutral.500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Text>
                                </HStack>
                              ))}
                            </VStack>
                            <Text fontSize="xs" color="brand.neutral.600" mt={2}>
                              Your documents have been analyzed and included in your assessment. When you create an account, these files will be securely stored for future reference.
                            </Text>
                          </Box>
                        )}
                      </TabPanel>

                      {/* Debug Tab */}
                      <TabPanel px={0} py={4}>
                        <VStack gap={4} align="stretch">
                          {/* OpenAI Payload */}
                          <Box>
                            <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                              OpenAI API Payload:
                            </Text>
                            <Box
                              bg="brand.neutral.50"
                              p={3}
                              borderRadius="6px"
                              border="1px solid"
                              borderColor="brand.neutral.200"
                              maxH="400px"
                              overflowY="auto"
                            >
                              <Text
                                fontSize="xs"
                                color="brand.neutral.600"
                                fontFamily="mono"
                                whiteSpace="pre-wrap"
                              >
                                {JSON.stringify(analysisData?.debugPayload, null, 2)}
                              </Text>
                            </Box>
                          </Box>

                          {/* Input Data */}
                          <Box>
                            <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                              Input Data Sent to AI:
                            </Text>
                            <Box
                              bg="brand.neutral.50"
                              p={3}
                              borderRadius="6px"
                              border="1px solid"
                              borderColor="brand.neutral.200"
                            >
                              <Text
                                fontSize="xs"
                                color="brand.neutral.600"
                                fontFamily="mono"
                                whiteSpace="pre-wrap"
                              >
                                {JSON.stringify(analysisData, null, 2)}
                              </Text>
                            </Box>
                          </Box>

                          {/* Raw AI Response */}
                          <Box>
                            <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                              Raw AI Response:
                            </Text>
                            <Box
                              bg="brand.neutral.50"
                              p={3}
                              borderRadius="6px"
                              border="1px solid"
                              borderColor="brand.neutral.200"
                              maxH="400px"
                              overflowY="auto"
                            >
                              <Text
                                fontSize="xs"
                                color="brand.neutral.600"
                                whiteSpace="pre-wrap"
                              >
                                {analysisData?.rawResponse || 'No raw response available'}
                              </Text>
                            </Box>
                          </Box>

                          {/* Parsed Analysis */}
                          <Box>
                            <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                              Parsed Analysis Object:
                            </Text>
                            <Box
                              bg="brand.neutral.50"
                              p={3}
                              borderRadius="6px"
                              border="1px solid"
                              borderColor="brand.neutral.200"
                              maxH="400px"
                              overflowY="auto"
                            >
                              <Text
                                fontSize="xs"
                                color="brand.neutral.600"
                                fontFamily="mono"
                                whiteSpace="pre-wrap"
                              >
                                {JSON.stringify(analysisData?.analysis, null, 2)}
                              </Text>
                            </Box>
                          </Box>
                        </VStack>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </VStack>
              </CardBody>
            </Card>
          </motion.div>

          {/* Right Column - Purchase CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ flex: 1, minWidth: '300px' }}
          >
            <Card
              bg="brand.primary"
              color="white"
              borderRadius="12px"
              boxShadow="xl"
              height="fit-content"
            >
              <CardBody p={6}>
                <VStack gap={6} align="stretch">
                  <VStack gap={3} textAlign="center">
                    <Heading
                      as="h2"
                      size="lg"
                      fontFamily="heading"
                      fontWeight="700"
                    >
                      Get Your Complete Strategy
                    </Heading>
                    <Text fontSize="md" opacity={0.9}>
                      Unlock your full negotiation potential with our expert guidance
                    </Text>
                  </VStack>

                  {/* Features */}
                  <VStack gap={3} align="stretch">
                    {[
                      { icon: Target, text: "Personalized negotiation strategy", highlight: "Customized for your situation" },
                      { icon: FileText, text: "Email templates & scripts", highlight: "Ready-to-use communications" },
                      { icon: Users, text: "1-on-1 expert consultation", highlight: "30-minute strategy session" },
                      { icon: Shield, text: "Money-back guarantee", highlight: "Risk-free investment" },
                      { icon: Clock, text: "24/7 access to resources", highlight: "Learn at your own pace" }
                    ].map((feature, index) => (
                      <HStack key={index} align="start" gap={3}>
                        <Box
                          p={2}
                          borderRadius="full"
                          bg="white"
                          color="brand.primary"
                          flexShrink={0}
                        >
                          <Icon as={feature.icon} boxSize={4} />
                        </Box>
                        <VStack gap={1} align="start">
                          <Text fontSize="sm" fontWeight="600">
                            {feature.text}
                          </Text>
                          <Text fontSize="xs" opacity={0.8}>
                            {feature.highlight}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>

                  <Divider borderColor="white" opacity={0.2} />

                  {/* Pricing */}
                  <VStack gap={3}>
                    <HStack justify="space-between" width="100%">
                      <Text fontSize="lg" fontWeight="600">
                        Total Value:
                      </Text>
                      <Text fontSize="lg" textDecoration="line-through" opacity={0.7}>
                        $497
                      </Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                      <Text fontSize="xl" fontWeight="700">
                        Your Price:
                      </Text>
                      <Text fontSize="xl" fontWeight="700" color="brand.secondary">
                        $97
                      </Text>
                    </HStack>
                    <Badge
                      bg="brand.secondary"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="600"
                    >
                      80% OFF - Limited Time
                    </Badge>
                  </VStack>

                  {/* CTA Button */}
                  <ProfessionalButton
                    variant="secondary"
                    size="lg"
                    bg="white"
                    color="brand.primary"
                    width="100%"
                    _hover={{
                      bg: 'brand.neutral.50',
                      transform: 'translateY(-2px)'
                    }}
                    onClick={handleGetFullStrategy}
                  >
                    Get Full Strategy - $97
                  </ProfessionalButton>

                  <Text fontSize="xs" opacity={0.8} textAlign="center">
                    Money-back guarantee • No long-term commitment • Instant access
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </motion.div>
        </Flex>
      </Container>
    </MainLayout>
  );
}
