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
  StatHelpText
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
  FileText
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useState } from 'react';

const assessmentSteps = [
  { id: 'offer-info', title: 'Offer Details', description: 'Share your offer' },
  { id: 'analysis', title: 'Free Analysis', description: 'Get insights' }
];

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
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Get stored assessment data (placeholder for future AI integration)
  const storedData = typeof window !== 'undefined' ? localStorage.getItem('assessmentData') : null;
  const userInput = storedData ? JSON.parse(storedData) : null;

  const handleGetFullStrategy = () => {
    window.location.href = '/auth/signup';
  };

  const handleCreateAccount = () => {
    setIsCreatingAccount(true);
    // Simulate account creation
    setTimeout(() => {
      window.location.href = '/auth/signup';
    }, 1000);
  };

  return (
    <MainLayout>
      <VStack gap={12} py={12} align="center">
        {/* Progress Indicator */}
        <ProgressIndicator
          steps={assessmentSteps}
          currentStep={1}
          completedSteps={[0]}
        />

        {/* Success Header */}
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
              <CheckCircle size={48} />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Your Offer Assessment is Ready!
            </Heading>
            <Text
              fontSize="lg"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Based on our analysis, you have significant negotiation potential. 
              Here's what we found and how we can help you maximize your offer.
            </Text>
          </VStack>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%" maxW="4xl">
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Negotiation Potential
                  </StatLabel>
                  <StatNumber color="brand.primary" fontSize="3xl" fontWeight="700">
                    {assessmentData.negotiationPotential}%
                  </StatNumber>
                  <StatHelpText color="brand.secondary" fontSize="sm" fontWeight="500">
                    High potential for improvement
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Market Position
                  </StatLabel>
                  <StatNumber color="brand.neutral.700" fontSize="2xl" fontWeight="700">
                    Below Average
                  </StatNumber>
                  <StatHelpText color="brand.accent" fontSize="sm" fontWeight="500">
                    ${assessmentData.currentOffer.toLocaleString()} vs ${assessmentData.marketRange.min.toLocaleString()}-${assessmentData.marketRange.max.toLocaleString()}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Recommended Target
                  </StatLabel>
                  <StatNumber color="brand.secondary" fontSize="2xl" fontWeight="700">
                    ${assessmentData.recommendedTarget.toLocaleString()}
                  </StatNumber>
                  <StatHelpText color="brand.secondary" fontSize="sm" fontWeight="500">
                    +${(assessmentData.recommendedTarget - assessmentData.currentOffer).toLocaleString()} potential increase
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Analysis Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} width="100%" maxW="6xl">
            {/* Red Flags */}
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <VStack gap={4} align="start">
                  <HStack>
                    <Icon as={AlertTriangle} boxSize={6} color="brand.accent" />
                    <Heading
                      as="h3"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Areas of Concern
                    </Heading>
                  </HStack>
                  <VStack gap={3} align="start" width="100%">
                    {assessmentData.redFlags.map((flag, index) => (
                      <HStack key={index} align="start">
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="full"
                          bg="brand.accent"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text color="brand.neutral.600" fontSize="sm" lineHeight="tall">
                          {flag}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Opportunities */}
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <VStack gap={4} align="start">
                  <HStack>
                    <Icon as={TrendingUp} boxSize={6} color="brand.secondary" />
                    <Heading
                      as="h3"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Negotiation Opportunities
                    </Heading>
                  </HStack>
                  <VStack gap={3} align="start" width="100%">
                    {assessmentData.opportunities.map((opportunity, index) => (
                      <HStack key={index} align="start">
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="full"
                          bg="brand.secondary"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text color="brand.neutral.600" fontSize="sm" lineHeight="tall">
                          {opportunity}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card
            maxW="2xl"
            width="100%"
            bg="brand.neutral.50"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="md"
          >
            <CardBody p={6}>
              <VStack gap={4}>
                <HStack>
                  <Icon as={Award} boxSize={6} color="brand.primary" />
                  <Heading
                    as="h3"
                    size="md"
                    fontFamily="heading"
                    color="brand.neutral.700"
                    fontWeight="600"
                  >
                    Negotiation Confidence Score
                  </Heading>
                </HStack>
                <VStack gap={3} width="100%">
                  <HStack justify="space-between" width="100%">
                    <Text fontSize="sm" color="brand.neutral.600">
                      Based on market data and your profile
                    </Text>
                    <Text fontSize="sm" fontWeight="600" color="brand.primary">
                      {assessmentData.confidenceScore}%
                    </Text>
                  </HStack>
                  <Progress
                    value={assessmentData.confidenceScore}
                    size="lg"
                    colorScheme="blue"
                    bg="brand.neutral.200"
                    borderRadius="full"
                    height="12px"
                  />
                  <Text fontSize="sm" color="brand.neutral.600" textAlign="center">
                    High confidence in successful negotiation outcome
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="brand.primary"
            color="white"
            borderRadius="12px"
            boxShadow="xl"
          >
            <CardBody p={8}>
              <VStack gap={6} textAlign="center">
                <VStack gap={4}>
                  <Heading
                    as="h2"
                    size="xl"
                    fontFamily="heading"
                    fontWeight="700"
                  >
                    Ready to Get Your Full Negotiation Strategy?
                  </Heading>
                  <Text fontSize="lg" opacity={0.9} maxW="2xl">
                    Get personalized scripts, email templates, and step-by-step guidance 
                    to maximize your offer. Our experts will help you negotiate with confidence.
                  </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} width="100%" maxW="2xl">
                  {[
                    { icon: Target, text: "Personalized Strategy" },
                    { icon: FileText, text: "Email Templates" },
                    { icon: Star, text: "Expert Guidance" }
                  ].map((item, index) => (
                    <HStack key={index} justify="center" gap={2}>
                      <Icon as={item.icon} boxSize={5} />
                      <Text fontSize="sm" fontWeight="500">
                        {item.text}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>

                <HStack gap={4} flexWrap="wrap" justify="center">
                  <ProfessionalButton
                    variant="secondary"
                    size="lg"
                    bg="white"
                    color="brand.primary"
                    _hover={{
                      bg: 'brand.neutral.50',
                      transform: 'translateY(-2px)'
                    }}
                    onClick={handleGetFullStrategy}
                  >
                    Get Full Strategy - $97
                  </ProfessionalButton>
                  <ProfessionalButton
                    variant="accent"
                    size="lg"
                    bg="brand.secondary"
                    color="white"
                    _hover={{
                      bg: '#008A42',
                      transform: 'translateY(-2px)'
                    }}
                    onClick={handleCreateAccount}
                    isLoading={isCreatingAccount}
                    loadingText="Creating Account..."
                  >
                    Create Free Account
                  </ProfessionalButton>
                </HStack>

                <Text fontSize="sm" opacity={0.8}>
                  Money-back guarantee • No long-term commitment
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Card
            maxW="2xl"
            width="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="md"
          >
            <CardBody p={6}>
              <VStack gap={4}>
                <HStack gap={2}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={Star} boxSize={4} color="brand.secondary" />
                  ))}
                </HStack>
                <Text
                  fontSize="md"
                  color="brand.neutral.700"
                  lineHeight="tall"
                  textAlign="center"
                  fontStyle="italic"
                >
                  "The assessment was spot-on. I followed their strategy and increased my offer by $25,000. 
                  The email templates and negotiation scripts were incredibly helpful."
                </Text>
                <HStack>
                  <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                    Sarah M.
                  </Text>
                  <Text fontSize="sm" color="brand.neutral.500">
                    Software Engineer
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
